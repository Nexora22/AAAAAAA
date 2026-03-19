const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "stt",
    aliases: ["transcribe", "listen", "hearyou"],
    description: "Speech to text - transcribe voice notes",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        // Check if there's a voice note or audio message
        const message = msg.message;
        const audioMessage = message?.audioMessage || message?.ptvMessage;
        
        if (!audioMessage) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎤 Speech to Text Converter\\n\\nUsage: Reply to a voice note with !stt\\n\\nI'll transcribe the voice note into text!\\n\\nNote: Forward voice notes to this chat and reply with !stt",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        try {
            // Send reaction
            await sock.sendMessage(from, { react: { text: '🎤', key: msg.key } });
            
            // Send processing message
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎤 Transcribing... Please wait...", 
                contextInfo 
            }, { quoted: msg });
            
            // Note: For full STT functionality, you would need a speech-to-text API
            // This is a placeholder that explains the feature
            await sock.sendMessage(from, { 
                text: "📝 Speech to Text\\n\\nNote: Full transcription requires additional API setup.\\n\\nFor now, you can use Google Voice or other transcription services.\\n\\nThis feature will be fully available soon!",
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            console.error("STT error:", err);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to transcribe. Please try again with a clearer voice note.", 
                contextInfo 
            }, { quoted: msg });
        }
    }
};
