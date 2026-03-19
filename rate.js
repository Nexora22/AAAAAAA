const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "rate",
    aliases: ["score", "rating"],
    description: "Rate anything from 0-100",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length === 0) {
            // Rate the person themselves
            const rating = Math.floor(Math.random() * 101);
            let reaction;
            
            if (rating >= 90) reaction = "🏆 LEGENDARY!";
            else if (rating >= 75) reaction = "⭐ AMAZING!";
            else if (rating >= 50) reaction = "👍 GOOD!";
            else if (rating >= 25) reaction = "😅 NEEDS WORK";
            else reaction = "💀 OH NO...";
            
            await sock.sendMessage(from, { 
                text: `📊 *RATING FOR ${sender}:*\n\n🎯 *${rating}/100*\n\n${reaction}`,
                contextInfo 
            }, { quoted: msg });
        } else {
            // Rate whatever they input
            const thing = args.join(" ");
            const rating = Math.floor(Math.random() * 101);
            let reaction;
            
            if (rating >= 90) reaction = "🔥 PERFECT!";
            else if (rating >= 75) reaction = "✨ GREAT!";
            else if (rating >= 50) reaction = "👍 DECENT";
            else if (rating >= 25) reaction = "🤔 MEH...";
            else reaction = "💀 YIKES!";
            
            await sock.sendMessage(from, { 
                text: `📊 *RATING FOR "${thing}":*\n\n🎯 *${rating}/100*\n\n${reaction}`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
