const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "fight",
    aliases: ["slap", "hit", "attack"],
    description: "Send a fight/attack message",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const attacks = [
            "🥊 *throws a punch!*",
            "🦵 *delivers a roundhouse kick!*",
            "👊 *lands a solid hit!*",
            "💥 *unleashes a devastating combo!*",
            "🔥 *uses fire fist!*",
            "⚡ *strikes with lightning speed!*"
        ];
        
        const attack = attacks[Math.floor(Math.random() * attacks.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `⚔️ *${sender} attacks ${target}!*\n\n${attack}\n\n💥 *KO!*`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `⚔️ *${sender} wants to fight!*\n\n${attack}\n\n🥊 Who's next?`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
