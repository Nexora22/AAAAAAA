const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "dance",
    aliases: ["💃", "party", "groove"],
    description: "Send a dancing reaction",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const dances = [
            "💃 *starts dancing!*",
            "🕺 *is grooving!*",
            "💫 *drops the beat!*",
            "🎶 *gets down!*",
            "🎵 *is vibing hard!*"
        ];
        
        const dance = dances[Math.floor(Math.random() * dances.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `💃 *${sender} dances with ${target}!*\n\n${dance}\n\n🎉 Party time!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `💃 *${sender} is dancing!*\n\n${dance}\n\n🎶 Let's groove!`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
