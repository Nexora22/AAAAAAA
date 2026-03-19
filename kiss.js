const { createForwardedContext } = require('./_helpers');

const kisses = [
    "💋 *Sends a sweet kiss!*",
    "😘 *Muaah!*",
    "💕 *Smooch!*",
    "🥰 *Love kiss!*",
    "✨ *Magical kiss!*",
    "💖 *Heart kiss!*",
    "😚 *Soft kiss!*",
    "🌸 *Butterfly kiss!*"
];

module.exports = {
    name: "kiss",
    aliases: ["kisses", "smooch", "muah"],
    description: "Send a virtual kiss",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const kiss = kisses[Math.floor(Math.random() * kisses.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `💋 *${sender} kisses ${target}!*\n\n${kiss}\n\n💕 Love is in the air!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `💋 *${sender} blows a kiss!*\n\n${kiss}\n\n😘 *Muah!*`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
