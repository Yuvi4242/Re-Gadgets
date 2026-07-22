export const sendChatMessage = async (message, history) => {
  try {
    console.log('[AI Service] Sending request...', { message, historyLength: history?.length });

    // Determine history mapping limit. Keep context light.
    const trimmedHistory = history.slice(-5).map(m => ({
       sender: m.sender,
       text: m.text
    }));

    const rawUrl = import.meta.env.VITE_API_URL || 'https://re-gadgets-backend.vercel.app/api';
    const apiBase = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl.replace(/\/$/, '')}/api`;
    const response = await fetch(`${apiBase}/chat`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ message, history: trimmedHistory })
    });

    console.log('[AI Service] Response Code:', response.status);

    if (!response.ok) {
       console.error('[AI Service] Failed Request. Status:', response.status);
       throw new Error(`API returned status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('[AI Service] Successful Payload:', data);
    return data;

  } catch (error) {
    console.error('[AI Service] Fatal Request Error:', error);
    return { 
       reply: "Something went wrong, please try again. 🤖🛠️", 
       actionContext: null 
    };
  }
};
