const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "study",
    aliases: ["studyfact", "study tip"],
    description: "Get study tips and facts",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '📚', key: msg.key } });
        
        const tips = [
            "Break your study sessions into 25-minute chunks with 5-minute breaks (Pomodoro technique).",
            "Practice active recall - test yourself instead of just re-reading notes.",
            "Teach what you learn to someone else - it reinforces understanding.",
            "Get enough sleep - your brain consolidates learning during sleep.",
            "Exercise before studying - it boosts blood flow to the brain.",
            "Use the Feynman technique - explain concepts in simple terms.",
            "Take notes by hand instead of typing - it helps retention.",
            "Study in short, focused sessions rather than long cramming sessions.",
            "Mix different subjects in one study session for better retention.",
            "Use spaced repetition - review material at increasing intervals."
        ];
        
        const tip = tips[Math.floor(Math.random() * tips.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "📚 *STUDY TIP*\n\n" + tip,
            contextInfo 
        }, { quoted: msg });
    }
};
