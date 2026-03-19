const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "clap",
    aliases: ["👏", "applause", "bravo"],
    description: "Add clap emojis to text",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        if (args.length === 0) {
            await sock.sendMessage(from, { 
                text: "👏 *CLAP EMOJIS*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !clap <text>\n\nExample: !clap Well done\n\nAdds 👏 between words!",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = args.join(" ");
        const clappedText = text.split(" ").join(" 👏 ");
        
        await sock.sendMessage(from, { 
            text: `👏 *CLAP!*\n\n━━━━━━━━━━━━━━━━\n\n${clappedText} 👏\n\n━━━━━━━━━━━━━━━━`,
            contextInfo 
        }, { quoted: msg });
    }
};
