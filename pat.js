const { createForwardedContext } = require('./_helpers');

const pats = [
    "🐱 *Gentle pat on the head!*",
    "🖐️ *Pat pat pat!*",
    "✨ *Soft head pat!*",
    "💕 *Friendly pat!*",
    "🌟 *Encouraging pat!*",
    "🐕 *Good boy/girl pat!*",
    "😊 *Comforting pat!*",
    "🤚 *Pat pat!*"
];

module.exports = {
    name: "pat",
    aliases: ["pathead", "headpat", "pet"],
    description: "Pat someone on the head",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const pat = pats[Math.floor(Math.random() * pats.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `🐱 *${sender} pats ${target}'s head!*\n\n${pat}\n\n💕 So cute!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `🐱 *${sender} wants a head pat!*\n\n${pat}\n\n💕 *Pat pat!*`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
