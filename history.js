const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "historyfact",
    aliases: ["history", "historytrivia"],
    description: "Get random history facts",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '📜', key: msg.key } });
        
        const facts = [
            "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
            "Oxford University is older than the Aztec Empire.",
            "The Great Wall of China is not visible from space with the naked eye.",
            "Vikings discovered America 500 years before Columbus.",
            "The shortest war in history lasted 38 minutes.",
            "Napoleon was once attacked by bunnies.",
            "The Titanic sank in 1912, and there was a dog on board that survived.",
            "Cleopatra was not Egyptian - she was Greek.",
            "The first computer programmer was a woman, Ada Lovelace.",
            "Ancient Romans used urine as mouthwash."
        ];
        
        const fact = facts[Math.floor(Math.random() * facts.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "📜 *HISTORY FACT*\n\n" + fact,
            contextInfo 
        }, { quoted: msg });
    }
};
