const { createForwardedContext } = require('./_helpers');

const roasts = [
    "🔥 You're proof that evolution can go backwards!",
    "😂 I'd agree with you but then we'd both be wrong!",
    "😴 You're the reason the pillow was invented!",
    "🤡 You're not stupid; you just have bad luck thinking!",
    "💀 If you were any more inbred, you'd be a sandwich!",
    "🐢 You're so slow, even the snail passed you!",
    "🧠 You're the reason god created the delete button!",
    "👀 If you were any more inbred, you'd be a cornbread!",
    "🌵 You're so dry, the Sahara is jealous!",
    "🦴 You're the bone to pick!",
    "📱 You're like a smartphone - full of apps but not smart!",
    "🎭 You're the whole circus!",
    "💩 You're the cherry on top of the garbage cake!",
    "🦆 You're like a duck - calm on top, paddling like crazy underneath!",
    "🚽 You're the flush that didn't go through!",
    "🐒 Evolution skip you?",
    "🍪 You're like a cookie - crumbles!",
    "🎯 You miss 100% of the shots you don't take - oh wait, that's everything!",
    "🧂 You're so salty, the ocean is jealous!",
    "🌻 You're like the sun - hot air with nothing inside!",
    "📦 You're an empty box!",
    "🎪 The circus called - they want their clown back!",
    "🦠 You're not a virus, but you should be quarantined!",
    "🍂 You're so dead inside, the zombie apocalypse looks at you with envy!",
    "💿 You're like a CD - burned out and worthless!"
];

module.exports = {
    name: "roast",
    aliases: ["burn", "roastme", "fire"],
    description: "Roast someone (playful banter)",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length > 0) {
            const target = args.join(" ");
            const roast = roasts[Math.floor(Math.random() * roasts.length)];
            
            await sock.sendMessage(from, { 
                text: `🔥 *ROASTING ${target}:*\n\n${roast}\n\n🔥🔥 🔥`,
                contextInfo 
            }, { quoted: msg });
        } else {
            // Roasting the person who asked
            const roast = roasts[Math.floor(Math.random() * roasts.length)];
            
            await sock.sendMessage(from, { 
                text: `🔥 *Roasting ${sender}:*\n\n${roast}\n\n😂 Don't @ me!`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
