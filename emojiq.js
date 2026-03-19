const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "guess",
    aliases: ["emoji", "guessemoji", "quiz"],
    description: "Emoji guessing game",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🎯', key: msg.key } });
        
        const puzzles = [
            { emoji: "🌧️☀️", answer: "Rainbow" },
            { emoji: "⏰💣", answer: "Time bomb" },
            { emoji: "🌙💤", answer: "Good night / Sleep" },
            { emoji: "🔥🐶", answer: "Hot dog" },
            { emoji: "🌻🐝", answer: "Honey" },
            { emoji: "🍎📱", answer: "iPhone" },
            { emoji: "👻🏠", answer: "Haunted house" },
            { emoji: "🦁👑", answer: "Lion king" },
            { emoji: "🌽🍞", answer: "Cornbread" },
            { emoji: "🎂🕯️", answer: "Birthday cake" }
        ];
        
        const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "🎯 *GUESS THE EMOJI*\n\n" + puzzle.emoji + "\n\nReply with your answer!",
            contextInfo 
        }, { quoted: msg });
    }
};
