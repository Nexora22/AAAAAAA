const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "shuffle",
    aliases: ["randomize", "mix"],
    description: "Randomly shuffle a list of items",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || !args.includes('|')) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔀 *SHUFFLE LIST*\n\nUsage: !shuffle <item1> | <item2> | <item3>\n\nExample:\n!shuffle A | B | C | D | E`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🔀', key: msg.key } });
        
        const items = args.join(' ').split('|').map(o => o.trim()).filter(o => o);
        
        // Fisher-Yates shuffle
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🔀 *SHUFFLED LIST*\n\nOriginal: ${args.join(' ').split('|').map(o => o.trim()).filter(o => o).join(', ')}\n\nShuffled:\n${items.map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
            contextInfo 
        }, { quoted: msg });
    }
};
