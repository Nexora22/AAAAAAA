const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "wyr",
    aliases: ["wouldyourather", "choice"],
    description: "Would you rather...?",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { text: '🤔', key: msg.key });
        
        const questions = [
            "Would you rather be able to fly or be invisible?",
            "Would you rather live without music or without movies?",
            "Would you rather have unlimited money or unlimited time?",
            "Would you rather be famous or know famous people?",
            "Would you rather always be 10 minutes late or 20 minutes early?",
            "Would you rather have a rewind button in your life or a pause button?",
            "Would you rather be able to talk to animals or speak all human languages?",
            "Would you rather have no phone or no computer for a year?",
            "Would you rather explore space or the ocean?",
            "Would you rather have super strength or super speed?"
        ];
        
        const question = questions[Math.floor(Math.random() * questions.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "🤔 *WOULD YOU RATHER*\n\n" + question,
            contextInfo 
        }, { quoted: msg });
    }
};
