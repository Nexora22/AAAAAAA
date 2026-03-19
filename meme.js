const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "meme",
    aliases: ["memes"],

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const memes = [
            "When the bug disappears after you add a console.log.",
            "Works on my machine.",
            "Deploy on Friday? Bold choice.",
            "Me: just one more feature. Also me at 3AM: why is prod down?",
            "It works on my machine: the most famous lie in programming.",
            "I'm not lazy, I'm on energy-saving mode.",
            "404: Motivation not found",
            "Please wait... loading my excuses...",
            "SPOILER: The code works... I have no idea why",
            "Commit now, pray it works."
        ];
        const pick = memes[Math.floor(Math.random() * memes.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: `😂 Meme:\n${pick}`, contextInfo }, { quoted: msg });
    }
};
