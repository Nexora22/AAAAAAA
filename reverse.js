const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "reverse",
    aliases: ["rev", "backwards"],
    description: "Reverse text",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔄 *TEXT REVERSER*\n\nUsage: !reverse <text>\n\nExample:\n!reverse Hello World`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = args.join(' ');
        const reversed = text.split('').reverse().join('');
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🔄 *REVERSED TEXT*\n\nOriginal: ${text}\n\nReversed: ${reversed}`,
            contextInfo 
        }, { quoted: msg });
    }
};
