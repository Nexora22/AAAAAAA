const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "simsimi",
    aliases: ["chat", "talk", "chatbot"],
    description: "Chat with SimSimi AI",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        if (args.length === 0) {
            await sock.sendMessage(from, { 
                text: "💬 *SIMSIMI CHATBOT*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !simsimi <message>\n\nExample: !simsimi Hello!",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const message = args.join(" ");
        
        try {
            await sock.sendPresenceUpdate('composing', from);
            
            const response = await axios.get(`https://simsimi.net/api/泡泡鱼.php?msg=${encodeURIComponent(message)}&lc=zh`);
            
            const reply = response.data?.data?.text || response.data?.success || "I'm thinking...";
            
            await sock.sendMessage(from, { 
                text: `💬 *SimSimi:* ${reply}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            // Fallback responses
            const fallbacks = [
                "🤔 I'm thinking about that!",
                "😅 That's an interesting one!",
                "🤓 Let me think...",
                "💭 Hmm... interesting!"
            ];
            const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            
            await sock.sendMessage(from, { 
                text: `💬 ${fallback}`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
