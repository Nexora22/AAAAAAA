const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "motivation",
    aliases: ["motivate", "inspire"],
    description: "Get motivational quotes",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🔥', key: msg.key } });
        
        const quotes = [
            "The only way to do great work is to love what you do.",
            "Believe you can and you're halfway there.",
            "Success is not final, failure is not fatal.",
            "Don't watch the clock; do what it does - keep going.",
            "The future belongs to those who believe in their dreams.",
            "Everything you've ever wanted is on the other side of fear.",
            "Hard work beats talent when talent doesn't work hard.",
            "The secret of getting ahead is getting started.",
            "Your limitation—it's only your imagination.",
            "Dream it. Wish it. Do it."
        ];
        
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "🔥 *MOTIVATION*\n\n" + quote,
            contextInfo 
        }, { quoted: msg });
    }
};
