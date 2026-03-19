const { createForwardedContext } = require('./_helpers');

const hugs = [
    "🤗 *Sends a warm, cozy hug!*",
    "🫂 *Gives a tight, comforting embrace!*",
    "💝 *Wraps arms around you gently!*",
    "🧸 *Bear hug from a distance!*",
    "✨ *Magical healing hug!*",
    "🌸 *Soft and gentle hug!*",
    "🔥 *Warm and cozy hug!*",
    "💕 *Friendly hug!*",
    "🙆 *Big bear hug!*",
    "🫶 *Heartwarming embrace!*"
];

module.exports = {
    name: "hug",
    aliases: ["hugs", "warm", "comfort"],
    description: "Send a virtual hug",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        const hug = hugs[Math.floor(Math.random() * hugs.length)];
        
        if (args.length > 0) {
            const target = args.join(" ");
            await sock.sendMessage(from, { 
                text: `🤗 *${sender} hugs ${target}!*\n\n${hug}\n\n💕 Spread the love!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { 
                text: `🤗 *${sender} wants a hug!*\n\n${hug}\n\n💕 Everyone needs a hug sometimes!`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
