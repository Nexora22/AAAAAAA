const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "ttsoff",
    aliases: ["ttsdisable", "voiceoff"],
    description: "Disable TTS mode - AI responses as text only",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        // Initialize ttsMode if not exists
        if (!global.ttsMode) {
            global.ttsMode = {};
        }
        
        global.ttsMode[from] = false;
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "🔇 TTS Mode Disabled!\\n\\nAI responses will now be sent as text only.\\n\\nUse !tts or !ttson to enable voice mode again.",
            contextInfo 
        }, { quoted: msg });
    }
};
