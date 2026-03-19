const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "pick",
    aliases: ["choose", "choice", "pickone"],
    description: "Pick a random option from a list",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || !args.includes('|')) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🎯 *RANDOM PICKER*\n\nUsage: !pick <option1> | <option2> | <option3>\n\nExample:\n!pick Pizza | Burger | Sushi\n!pick Red | Blue | Green | Yellow`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🎯', key: msg.key } });
        
        const options = args.join(' ').split('|').map(o => o.trim()).filter(o => o);
        
        if (options.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Please provide at least 2 options separated by |`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const choice = options[Math.floor(Math.random() * options.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🎯 *CHOICE MADE*\n\nFrom: ${options.join(', ')}\n\nI choose: *${choice}*`,
            contextInfo 
        }, { quoted: msg });
    }
};
