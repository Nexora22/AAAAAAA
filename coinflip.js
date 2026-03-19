const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "coinflip",
    aliases: ["flip", "coin", "cf"],
    description: "Flip a coin",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🪙', key: msg.key } });
        
        const result = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
        const emoji = result === 'HEADS' ? '� heads' : '🔴 TAILS';
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🪙 *COIN FLIP*\n\nThe coin landed on...\n\n*${result}* ${emoji}`,
            contextInfo 
        }, { quoted: msg });
    }
};
