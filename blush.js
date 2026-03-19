const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "blush",
    aliases: ["😳", "shy", "embarrassed"],
    description: "Send a blushing reaction",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const blushes = [
            "😳 *goes bright red!*",
            "🥺 *is blushing so hard!*",
            "😆 *nervously smiles!*",
            "💕 *feels shy!*",
            "😅 *turns all shades of red!*"
        ];
        
        const blush = blushes[Math.floor(Math.random() * blushes.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `😳 *${sender} blushes at ${target}!*\n\n${blush}\n\n💕 So cute!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `😳 *${sender} is blushing!*\n\n${blush}\n\n💕 Aw!`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
