const { createForwardedContext } = require('./_helpers');

const datePlans = [
    "🌅 *Sunset Picnic:* Pack some snacks and watch the sunset at a scenic spot!",
    "🎬 *Movie Marathon:* Pick a theme (rom-com, horror, action) and watch back-to-back films!",
    "🍳 *Cook Together:* Try a new recipe together or have a cooking competition!",
    "🎨 *Art Day:* Visit a museum or try painting/drawing each other!",
    "🌳 *Adventure Hike:* Find a new trail and explore nature together!",
    "🎮 *Gaming Night:* Play video games or board games for some fun competition!",
    "☕ *Café Date:* Find a cozy café and talk for hours over coffee!",
    "🏖️ *Beach Day:* Sun, sand, and waves! Perfect for relaxation!",
    "🎭 *Try Something New:* Take a dance class, cooking class, or pottery together!",
    "📚 *Book Date:* Go to a bookstore, pick books for each other, and read together!",
    "🎵 *Karaoke Night:* Sing your hearts out at a karaoke bar!",
    "🌃 *Stargazing:* Find a dark spot and count stars together!",
    "🚴 *Bike Ride:* Explore your city on bicycles!",
    "🎪 *Amusement Park:* Thrills and fun all day long!",
    "🏠 *Movie Night In:* Order pizza, make popcorn, and watch your favorite movies!"
];

module.exports = {
    name: "dateplan",
    aliases: ["dateidea", "romance", "couple"],
    description: "Get a date plan idea",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const plan = datePlans[Math.floor(Math.random() * datePlans.length)];
        
        await sock.sendMessage(from, { 
            text: `💕 *DATE PLAN IDEA:*\n\n━━━━━━━━━━━━━━━━\n\n${plan}\n\n━━━━━━━━━━━━━━━━\n\n✨ Use !dateplan again for more ideas!`,
            contextInfo 
        }, { quoted: msg });
    }
};
