const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "fire",
    aliases: ["🔥", "lit", "flames"],
    description: "Add fire emojis to text",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        if (args.length === 0) {
            await sock.sendMessage(from, { 
                text: "🔥 *FIRE TEXT*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !fire <text>\n\nExample: !fire That's lit\n\nAdds 🔥 to your text!",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = args.join(" ");
        
        await sock.sendMessage(from, { 
            text: `🔥🔥🔥 🔥🔥 🔥\n\n${text}\n\n🔥🔥 🔥🔥 🔥🔥`,
            contextInfo 
        }, { quoted: msg });
    }
};
