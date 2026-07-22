import { GoogleGenerativeAI } from '@google/generative-ai';

// Model definitions: Primary active model + fallback model if primary is rate-limited/deprecated
const PRIMARY_MODEL = 'gemini-3.5-flash';
const FALLBACK_MODEL = 'gemini-2.5-flash-lite';

async function callGeminiModel(genAI, modelName, message, formattedHistory, systemInstruction) {
  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction,
    });

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (err) {
    // Single-turn fallback if chat format is unsupported on specific model
    const model = genAI.getGenerativeModel({ model: modelName });
    const promptWithSystem = `${systemInstruction}\n\nUser Question: ${message}`;
    const result = await model.generateContent(promptWithSystem);
    return result.response.text();
  }
}

export const generateChatResponse = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing in server/.env. Returning mock response.");
      return res.status(200).json({
        reply: "Hi! I'm currently running in preview mode. To activate my full live AI powers, please add your `GEMINI_API_KEY` to the `server/.env` file! 🤖✨",
        actionContext: null
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `You are the official AI Technical Assistant for "Re-Gadgets", a premium doorstep gadget repair platform.
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

    // Sanitize & Format History for Gemini SDK
    const rawHistory = Array.isArray(history) ? history : [];
    let pastMessages = [...rawHistory];

    // Strip out current message if present at the end of history
    if (pastMessages.length > 0 && pastMessages[pastMessages.length - 1].text === message) {
      pastMessages.pop();
    }

    const formattedHistory = [];
    let expectedRole = 'user';

    pastMessages.forEach((msg) => {
      if (!msg || !msg.text || typeof msg.text !== 'string' || !msg.text.trim()) return;

      const role = msg.sender === 'ai' || msg.sender === 'model' ? 'model' : 'user';

      if (role === expectedRole) {
        formattedHistory.push({
          role,
          parts: [{ text: msg.text.trim() }],
        });
        expectedRole = role === 'user' ? 'model' : 'user';
      }
    });

    // Ensure history ends with 'model' before sending current user message
    if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === 'user') {
      formattedHistory.pop();
    }

    let responseText = null;

    // 1. Try Primary Model (gemini-3.5-flash)
    try {
      responseText = await callGeminiModel(genAI, PRIMARY_MODEL, message, formattedHistory, systemInstruction);
    } catch (err) {
      console.warn(`[Gemini SDK] Primary model (${PRIMARY_MODEL}) failed:`, err.message);

      // 2. Fallback Model (gemini-2.5-flash-lite)
      try {
        console.warn(`Primary model rate-limited/failed, falling back to ${FALLBACK_MODEL}`);
        responseText = await callGeminiModel(genAI, FALLBACK_MODEL, message, formattedHistory, systemInstruction);
      } catch (fallbackErr) {
        console.error(`[Gemini SDK] Fallback model (${FALLBACK_MODEL}) also failed:`, fallbackErr.message);
      }
    }

    if (!responseText) {
      return res.status(200).json({
        reply: "Our assistant is a little busy right now — please try again in a moment.",
        actionContext: null,
      });
    }

    // Parse out ACTION codes for frontend button rendering
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

    return res.status(200).json({
      reply: finalReply,
      actionContext,
    });
  } catch (error) {
    console.error('Chat Controller Fatal Error:', error);
    return res.status(200).json({
      reply: "Our assistant is a little busy right now — please try again in a moment.",
      actionContext: null,
    });
  }
};
