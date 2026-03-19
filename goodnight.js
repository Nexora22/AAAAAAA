const { createForwardedContext } = require('./_helpers');

const wishes = [
    "🌙 *Good night! Sweet dreams await you!*",
    "✨ *Sleep tight! Tomorrow is another adventure!*",
    "🌟 *Rest well! You've earned it!*",
    "💫 *Dream big and sleep peacefully!*",
    "🌛 *Night vibes! Let the stars watch over you!*",
    "😴 *Time to recharge! See you tomorrow!*",
    "🌃 *Rest your head, clear your mind!*",
    "🛏️ *Sweet dreams are made of this!*",
    "🌙 *Sleep like there's no tomorrow!*",
    "✨ *Close your eyes and drift away!*"
];

module.exports = {
    name: "goodnight",
    aliases: ["gn", "night", "sleep"],
    description: "Good night wishes",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const wish = wishes[Math.floor(Math.random() * wishes.length)];
        
        await sock.sendMessage(from, { 
            text: `🌙 *GOOD NIGHT!*\n\n━━━━━━━━━━━━━━━━\n\n${wish}\n\n━━━━━━━━━━━━━━━━\n\n✨ Rest well! Use !goodmorning to start the day!`,
            contextInfo 
        }, { quoted: msg });
    }
};
