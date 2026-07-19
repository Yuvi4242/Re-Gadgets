import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini inside the function so dotenv is properly loaded first

export const generateChatResponse = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY; // Required for live AI; falls back to mock replies when unset
    const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
    
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!genAI) {
      // Graceful fallback for development if API key is not configured
      console.warn("GEMINI_API_KEY is missing. Returning mocked AI response.");
      return res.status(200).json({
         reply: "API Key missing! I am currently running in mock mode. Please add your GEMINI_API_KEY to the .env file.",
         actionContext: null
      });
    }

    // Determine context modeling
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The core System Prompt for Re-Gadgets
    const systemInstruction = `
       You are the official AI Technical Assistant for "Re-Gadgets", a premium doorstep gadget repair platform.
       Your personality is highly intelligent, friendly, playful, and extremely helpful. You are a robot mascot.
       You must understand and fluently reply in both English and Hinglish (e.g., "Screen toot gaya" -> "Koi baat nahi, we can fix your screen immediately!").
       
       Keep your answers extremely concise, ideally 1-3 sentences maximum.
       
       CRITICAL INSTRUCTION FOR ACTIONS:
       If the user wants to book a repair, check a price, or track an order, you MUST append a specific Action Code at the very end of your message.
       - To suggest booking a repair: [ACTION:BOOK_REPAIR]
       - To track an order: [ACTION:TRACK_ORDER]
       - To check pricing: [ACTION:CHECK_PRICE]
       
       Example User: "Mera phone gir gaya aur screen tooth gaya, kitna time lagega?"
       Example Reply: "Oh no! Phone girna is the worst! 😢 Don't worry, we offer lightning-fast doorstep screen repairs in under 2 hours. Let's get that fixed for you! [ACTION:BOOK_REPAIR]"
    `;

    // Construct the conversation sequence
    const formattedHistory = [
       { role: "user", parts: [{ text: systemInstruction }] },
       { role: "model", parts: [{ text: "Understood. I am the Re-Gadgets AI Assistant. I will be helpful, use Hinglish, and append [ACTION:X] tags when appropriate." }] }
    ];

    // Map the user's frontend history
    if (history && Array.isArray(history)) {
       history.forEach(msg => {
          formattedHistory.push({
             role: msg.sender === 'ai' ? 'model' : 'user',
             parts: [{ text: msg.text }]
          });
       });
    }

    // Start Chat Session
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    // Send the user's latest message
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // Parse out ACTION codes for the frontend to render buttons
    let finalReply = responseText;
    let actionContext = null;

    if (finalReply.includes('[ACTION:BOOK_REPAIR]')) {
       actionContext = 'BOOK_REPAIR';
       finalReply = finalReply.replace('[ACTION:BOOK_REPAIR]', '').trim();
    } else if (finalReply.includes('[ACTION:TRACK_ORDER]')) {
       actionContext = 'TRACK_ORDER';
       finalReply = finalReply.replace('[ACTION:TRACK_ORDER]', '').trim();
    } else if (finalReply.includes('[ACTION:CHECK_PRICE]')) {
       actionContext = 'CHECK_PRICE';
       finalReply = finalReply.replace('[ACTION:CHECK_PRICE]', '').trim();
    }

    res.status(200).json({
       reply: finalReply,
       actionContext
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to generate response. The server circuits might be fried! 🤖⚡' });
  }
};
