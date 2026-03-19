const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

const compliments = [
    "🌟 You're absolutely amazing!",
    "💫 You light up every room you enter!",
    "✨ You're stronger than you know!",
    "🌈 Your smile is contagious!",
    "💖 You're one of a kind!",
    "🔥 You're doing incredible!",
    "⭐ You make the world better!",
    "💎 You're precious!",
    "🎯 You're amazing at being you!",
    "🌺 You're wonderfully unique!",
    "💫 Your energy is pure magic!",
    "🦋 You inspire others!",
    "🌻 You're a ray of sunshine!",
    "💝 You deserve all the happiness!",
    "👑 You're royalty!",
    "🌸 You're beautiful inside and out!",
    "💪 You're unstoppable!",
    "🎭 You're incredibly talented!",
    "⭐ You're a star!",
    "🌙 You're simply the best!"
];

const sweetMessages = [
    "💕 Thinking of you right now!",
    "🌸 You're amazing! Don't forget that!",
    "✨ Sending you positive vibes!",
    "💖 You make everything better!",
    "🌺 You deserve all the love!",
    "⭐ Keep shining, beautiful!",
    "💫 You're stronger than you know!",
    "🌈 Life is better with you in it!"
];

module.exports = {
    name: "compliment",
    aliases: ["sweet", "kind", "love"],
    description: "Send a sweet compliment to someone",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length > 0) {
            // Compliment a specific person
            const target = args.join(" ");
            const compliment = compliments[Math.floor(Math.random() * compliments.length)];
            const sweet = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
            
            await sock.sendMessage(from, { 
                text: `💖 *Compliment for ${target}:*\n\n${compliment}\n\n${sweet}\n\n_From: ${sender}_`,
                contextInfo 
            }, { quoted: msg });
        } else {
            // General compliment
            const compliment = compliments[Math.floor(Math.random() * compliments.length)];
            
            await sock.sendMessage(from, { 
                text: `💖 *Hey ${sender}!*\n\n${compliment}\n\n✨ You're special just the way you are!`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
