const { createForwardedContext } = require('./_helpers');

const greetings = [
    "🌅 *Good morning! May your day be as bright as the sun!*",
    "☀️ *Rise and shine! Today's going to be amazing!*",
    "🌞 *Morning vibes! Make today count!*",
    "✨ *New day, new opportunities! Go crush it!*",
    "🌻 *Good morning! Stay positive, happy, and blessed!*",
    "💪 *Wake up with determination! Go get 'em!*",
    "🌈 *Start your day with a smile!*",
    "☕ *Coffee time! Have a great day ahead!*",
    "🎉 *It's a brand new day! Make it memorable!*",
    "🌸 *Sending you morning sunshine and positive vibes!*"
];

module.exports = {
    name: "goodmorning",
    aliases: ["gm", "morning", "greeting"],
    description: "Good morning wishes",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        await sock.sendMessage(from, { 
            text: `☀️ *GOOD MORNING!*\n\n━━━━━━━━━━━━━━━━\n\n${greeting}\n\n━━━━━━━━━━━━━━━━\n\n✨ Have an amazing day! Use !goodnight for evening wishes!`,
            contextInfo 
        }, { quoted: msg });
    }
};
