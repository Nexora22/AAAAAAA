const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "cry",
    aliases: ["sad", "tears", "😭"],
    description: "Send crying reaction",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const cries = [
            "😢 * bursts into tears!*",
            "💧 *is crying their heart out!*",
            "😭 *can't stop crying!*",
            "🥺 *has tears in their eyes!*",
            "😿 *is sobbing!*"
        ];
        
        const cry = cries[Math.floor(Math.random() * cries.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `${sender} cries because of ${target}\n\n${cry}\n\n💔 Too sad!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `${sender} is crying\n\n${cry}\n\n💔 It's okay to cry!`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
