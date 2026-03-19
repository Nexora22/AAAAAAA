const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "nhie",
    aliases: ["neverhaveiever", "never"],
    description: "Never have I ever...",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🙈', key: msg.key } });
        
        const prompts = [
            "Never have I ever lied on my resume.",
            "Never have I ever ghosted someone.",
            "Never have I ever eaten food off the floor.",
            "Never have I ever snooped through someone's phone.",
            "Never have I ever pretended to be sick to skip work.",
            "Never have I ever stalked an ex on social media.",
            "Never have I ever lied to get out of a ticket.",
            "Never have I ever cried during a movie.",
            "Never have I ever broken something and blamed someone else.",
            "Never have I ever regretted a tattoo."
        ];
        
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "🙈 *NEVER HAVE I EVER*\n\n" + prompt,
            contextInfo 
        }, { quoted: msg });
    }
};
