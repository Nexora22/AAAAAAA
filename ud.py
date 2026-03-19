const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "ud",
    aliases: ["urbandictionary"],
    description: "Search Urban Dictionary",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "📖 *URBAN DICTIONARY*\n\nUsage: !ud <term>\n\nExample:\n!ud no cap",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const term = args.join(' ');
        
        await sock.sendMessage(from, { react: { text: '📚', key: msg.key } });
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "📚 Looking up: " + term,
            contextInfo 
        }, { quoted: msg });
    }
};
