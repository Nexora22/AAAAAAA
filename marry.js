const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "marry",
    aliases: ["proposal", "wedding", "propose"],
    description: "Marriage proposal calculator",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length < 1) {
            await sock.sendMessage(from, { 
                text: `💍 *MARRIAGE CALCULATOR*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !marry <name>\n\nExample: !marry Sarah\n\n💕 Will you say yes?`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const partnerName = args.join(" ");
        
        // Generate a "calculated" result
        const nameSum = (partnerName + sender).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const percentage = (nameSum % 101);
        
        let result;
        let emoji;
        
        if (percentage >= 90) {
            result = "💍 SOULMATES! Get married ASAP!";
            emoji = "👼";
        } else if (percentage >= 75) {
            result = "💕 PERFECT MATCH! High chances!";
            emoji = "💕";
        } else if (percentage >= 50) {
            result = "👍 GOOD CHANCE! Try your luck!";
            emoji = "👍";
        } else if (percentage >= 25) {
            result = "🤔 Needs work, but never say never!";
            emoji = "🤔";
        } else {
            result = "💀 Friendzone... or maybe not!";
            emoji = "💀";
        }
        
        await sock.sendMessage(from, { 
            text: `💍 *MARRIAGE CALCULATOR*\n\n━━━━━━━━━━━━━━━━\n\n👤 *${sender}* + *${partnerName}*\n\n💖 Success Rate: *${percentage}%*\n\n${emoji} ${result}\n\n━━━━━━━━━━━━━━━━\n\n⚠️ Just for fun! Don't propose based on this! 😅`,
            contextInfo 
        }, { quoted: msg });
    }
};
