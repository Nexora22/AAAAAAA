const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "sparkle",
    aliases: ["✨", "stars", "magic"],
    description: "Add sparkle emojis to text",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        if (args.length === 0) {
            await sock.sendMessage(from, { 
                text: "✨ *SPARKLE TEXT*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !sparkle <text>\n\nExample: !sparkle Magic\n\nAdds ✨ to your text!",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = args.join(" ");
        
        await sock.sendMessage(from, { 
            text: `✨✨✨ ✨✨ ✨\n\n${text}\n\n✨✨ ✨✨ ✨✨`,
            contextInfo 
        }, { quoted: msg });
    }
};
