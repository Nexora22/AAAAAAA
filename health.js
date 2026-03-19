const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "health",
    aliases: ["healthtip", "wellness"],
    description: "Get health and wellness tips",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '💪', key: msg.key } });
        
        const tips = [
            "Drink 8 glasses of water daily.",
            "Get 7-9 hours of sleep each night.",
            "Exercise for at least 30 minutes daily.",
            "Eat a balanced diet rich in fruits and vegetables.",
            "Take breaks from screens every hour.",
            "Practice deep breathing exercises.",
            "Maintain good posture throughout the day.",
            "Limit processed food consumption.",
            "Spend time outdoors daily.",
            "Practice gratitude daily."
        ];
        
        const tip = tips[Math.floor(Math.random() * tips.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "💪 *HEALTH TIP*\n\n" + tip,
            contextInfo 
        }, { quoted: msg });
    }
};
