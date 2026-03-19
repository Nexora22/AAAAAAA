const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "typing",
    aliases: ["typingtest", "wpm"],
    description: "Get typing speed tips",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '⌨️', key: msg.key } });
        
        const tips = [
            "Keep your fingers on the home row (ASDF JKL;).",
            "Don't look at the keyboard while typing.",
            "Practice daily for 15-30 minutes.",
            "Use all fingers, not just two.",
            "Take breaks to avoid strain.",
            "Keep your wrists in a neutral position.",
            "Start slow and gradually increase speed.",
            "Accuracy is more important than speed."
        ];
        
        const tip = tips[Math.floor(Math.random() * tips.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "⌨️ *TYPING TIP*\n\n" + tip,
            contextInfo 
        }, { quoted: msg });
    }
};
