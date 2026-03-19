const { createForwardedContext } = require('./_helpers');

const emojis = ['🍒', '🍋', '🍇', '💎', '🔔', '⭐', '7️⃣'];
const jackpot = '💎💎💎';

module.exports = {
    name: "slot",
    aliases: ["slots", "casino"],
    description: "Play a slot machine game",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🎰', key: msg.key } });
        
        const spin = () => {
            return Array(3).fill(0).map(() => emojis[Math.floor(Math.random() * emojis.length)]);
        };
        
        const result = spin();
        const resultStr = result.join(' ');
        
        let message;
        
        if (result[0] === result[1] && result[1] === result[2]) {
            message = `🎰 *JACKPOT!*\n\n${resultStr}\n\n🎉 YOU WIN! 🎉`;
        } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
            message = `🎰 *SPIN RESULT*\n\n${resultStr}\n\n✨ Close! You almost had it!`;
        } else {
            message = `🎰 *SPIN RESULT*\n\n${resultStr}\n\n❌ Better luck next time!`;
        }
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: message,
            contextInfo 
        }, { quoted: msg });
    }
};
