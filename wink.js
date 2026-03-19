const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "wink",
    aliases: ["😉", "winkey", "flirty"],
    description: "Send a winking message",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `😉 *${sender} winks at ${target}!*\n\n😏 *Gotcha!*`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `😉 *${sender} winks!*\n\n😏 *Clever you!*`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
