const { createForwardedContext } = require('./_helpers');

const pickupLines = [
    "🌟 Are you a keyboard? Because you're my type!",
    "💫 Do you have a map? I keep getting lost in your eyes!",
    "✨ If you were a fruit, you'd be a Fine-apple!",
    "🌺 Is your name WiFi? Because I'm feeling a connection!",
    "💖 Do you believe in love at first sight, or should I walk by again?",
    "🔥 Are you a magician? Because whenever I look at you, everyone else disappears!",
    "⭐ Did it hurt when you fell from the sky? You're an angel!",
    "💎 Are you made of copper and tellurium? Because you are CuTe!",
    "🌙 Do you have a Band-Aid? I just scraped my knee falling for you!",
    "🎯 Are you a camera? Because every time I look at you, I smile!",
    "💫 Is your name Google? Because you have everything I've been searching for!",
    "🌸 Are you a bank loan? Because you have my interest!",
    "✨ Do you have a sunburn or are you always this hot?",
    "💖 Are you French? Because Eiffel for you!",
    "🌈 Is your dad a baker? Because you're a cutie pie!",
    "🔥 Are you a time traveler? Because I can't imagine my future without you!",
    "⭐ Do you like stars? Because you're out of this world!",
    "💎 Are you an alien? Because you just abducted my heart!",
    "🌺 If you were a cat, you'd purr-fect!",
    "✨ Are you a keyboard? Because you're my favorite key!",
    "💫 Is your name Jessica? Because you're so sweet!",
    "🌸 Are you a WiFi signal? Because I'm feeling a strong connection!",
    "💖 Do you have a name, or can I call you mine?",
    "🔥 Are you made of money? Because you're priceless!",
    "⭐ Are you a camera? Because you made me smile!"
];

module.exports = {
    name: "pickup",
    aliases: ["flirt", "chatup", "lines"],
    description: "Cheesy pickup lines for fun",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const line = pickupLines[Math.floor(Math.random() * pickupLines.length)];
        
        await sock.sendMessage(from, { 
            text: `💕 *PICKUP LINE:*\n\n${line}\n\n😅 Don't blame me, I'm just the messenger!`,
            contextInfo 
        }, { quoted: msg });
    }
};
