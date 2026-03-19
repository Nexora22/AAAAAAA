const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "confess",
    aliases: ["confession", "secret", "admit"],
    description: "Make a confession",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length === 0) {
            await sock.sendMessage(from, { 
                text: `💕 *CONFESSION TIME*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !confess <message>\n\nExample: !confess I like you\n\nGet something off your chest!`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const confession = args.join(" ");
        const truths = [
            "😱 *GASP* That's bold!",
            "💕 *Love it!* So brave!",
            "😅 *Wow* Didn't see that coming!",
            "🤭 *Shhh* Your secret is safe!",
            "💪 *Respect* for being honest!"
        ];
        
        const truth = truths[Math.floor(Math.random() * truths.length)];
        
        await sock.sendMessage(from, { 
            text: `💕 *CONFESSION FROM ${sender}:*\n\n━━━━━━━━━━━━━━━━\n\n"${confession}"\n\n━━━━━━━━━━━━━━━━\n\n${truth}`,
            contextInfo 
        }, { quoted: msg });
    }
};
