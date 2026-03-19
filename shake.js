const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "shake",
    aliases: ["shock", "shakehead"],
    description: "Send a shaking head reaction",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `😕 *${sender} shakes head at ${target}*\n\n🤷 *I don't know...*`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `😕 *${sender} shakes their head*\n\n🤷 *Hmm...*`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
