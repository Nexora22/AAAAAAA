const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "spam",
    aliases: ["repeat"],
    description: "Repeat text multiple times",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🔁 *TEXT REPEATER*\n\nUsage: !spam <count> <text>\n\nExample:\n!spam 5 Hello",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const count = parseInt(args[0]);
        const text = args.slice(1).join(' ');
        
        if (isNaN(count) || count < 1 || count > 10) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Count must be between 1 and 10.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const result = Array(count).fill(text).join('\n');
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: result, contextInfo }, { quoted: msg });
    }
};
