const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "crush",
    aliases: ["lovecheck", "lovecalc", "crushcalc"],
    description: "Calculate crush compatibility",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        if (args.length < 1) {
            await sock.sendMessage(from, { 
                text: `💕 *CRUSH CALCULATOR*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !crush <name>\n\nExample: !crush Sarah\n\nFind out your crush compatibility! 💖`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const crushName = args.join(" ");
        
        // Generate a "calculated" percentage based on names
        const nameSum = (crushName + from).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const percentage = (nameSum % 101);
        
        let result;
        let emoji;
        
        if (percentage >= 90) {
            result = "💍 MATCH MADE IN HEAVEN!";
            emoji = "👼";
        } else if (percentage >= 75) {
            result = "🔥 HOT! Strong connection!";
            emoji = "🔥";
        } else if (percentage >= 50) {
            result = "💕 Good chances! Go for it!";
            emoji = "💕";
        } else if (percentage >= 25) {
            result = "🤔 Might need more time...";
            emoji = "🤔";
        } else {
            result = "💀 Friendzone alert!";
            emoji = "💀";
        }
        
        await sock.sendMessage(from, { 
            text: `💕 *CRUSH CALCULATOR*\n\n━━━━━━━━━━━━━━━━\n\n👤 Your Crush: *${crushName}*\n\n💖 Compatibility: *${percentage}%*\n\n${emoji} ${result}\n\n━━━━━━━━━━━━━━━━\n\n⚠️ Just for fun! Don't take it seriously!`,
            contextInfo 
        }, { quoted: msg });
    }
};
