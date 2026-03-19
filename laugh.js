const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "laugh",
    aliases: ["😂", "lmao", "funny"],
    description: "Send a laughing reaction",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const laughs = [
            "😂 *is laughing out loud!*",
            "🤣 *can't stop laughing!*",
            "💀 *died laughing!*",
            "😅 *roflmao!*",
            "😂 *losing it!*"
        ];
        
        const laugh = laughs[Math.floor(Math.random() * laughs.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `😂 *${sender} laughs at ${target}!*\n\n${laugh}\n\n🤣 Too funny!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `😂 *${sender} is laughing!*\n\n${laugh}\n\n🤣 LOL!`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
