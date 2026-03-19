const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "compliment",
    aliases: ["respect", "praise", "flirt"],
    description: "Get a nice compliment",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '✨', key: msg.key } });
        
        const compliments = [
            "You're an amazing person!",
            "Your smile brightens everyone's day.",
            "You have a great sense of humor.",
            "You're smarter than you think.",
            "Your kindness makes the world better.",
            "You're doing great! Keep it up!",
            "You inspire others around you.",
            "Your creativity is impressive.",
            "You're stronger than you know.",
            "The world is better with you in it."
        ];
        
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "✨ *COMPLIMENT*\n\n" + compliment,
            contextInfo 
        }, { quoted: msg });
    }
};
