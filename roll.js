const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "roll",
    aliases: ["dice", "random"],
    description: "Roll a dice (1-6)",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🎲', key: msg.key } });
        
        // Parse arguments for custom dice
        let sides = 6;
        let count = 1;
        
        if (args[0]) {
            sides = parseInt(args[0]) || 6;
            if (sides < 2) sides = 2;
            if (sides > 100) sides = 100;
        }
        
        if (args[1]) {
            count = parseInt(args[1]) || 1;
            if (count < 1) count = 1;
            if (count > 10) count = 10;
        }
        
        const rolls = [];
        for (let i = 0; i < count; i++) {
            rolls.push(Math.floor(Math.random() * sides) + 1);
        }
        
        const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        const display = count === 1 ? diceEmojis[rolls[0] - 1] : rolls.join(' ');
        const total = rolls.reduce((a, b) => a + b, 0);
        
        const text = count === 1 
            ? `🎲 *DICE ROLL*\n\nYou rolled:\n\n*${rolls[0]}* ${diceEmojis[rolls[0] - 1]}`
            : `🎲 *DICE ROLLS*\n\nYou rolled ${count} dice (${sides} sides):\n\n*${display}*\n\nTotal: *${total}*`;
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: text,
            contextInfo 
        }, { quoted: msg });
    }
};
