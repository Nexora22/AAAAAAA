const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "bored",
    aliases: ["activity", "things to do"],
    description: "Get things to do when bored",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🎯', key: msg.key } });
        
        const activities = [
            "Read a book or start a new series.",
            "Learn a new skill on YouTube.",
            "Go for a walk or exercise.",
            "Call a friend you haven't talked to.",
            "Try a new recipe.",
            "Play a video game.",
            "Organize your workspace.",
            "Write in a journal.",
            "Listen to a podcast.",
            "Do some art or crafts."
        ];
        
        const activity = activities[Math.floor(Math.random() * activities.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "🎯 *TRY THIS*\n\n" + activity,
            contextInfo 
        }, { quoted: msg });
    }
};
