const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "like",
    aliases: ["👍", "thumbsup", "approve"],
    description: "Send a like/thumbs up reaction",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `👍 *${sender} likes ${target}!*\n\n👍 *Thumbs up!*`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `👍 *${sender} gives a thumbs up!*\n\n👍 *Looking good!*`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
