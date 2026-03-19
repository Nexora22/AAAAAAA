const { createForwardedContext } = require('./_helpers');

const songs = [
    "🎵 *Blinding Lights* - The Weeknd",
    "🎵 *Shape of You* - Ed Sheeran",
    "🎵 *Dance Monkey* - Tones and I",
    "🎵 *Someone You Loved* - Lewis Capaldi",
    "🎵 *Bad Guy* - Billie Eilish",
    "🎵 *Señorita* - Shawn Mendes & Camila Cabello",
    "🎵 *Sunflower* - Post Malone & Swae Lee",
    "🎵 *Stay* - The Kid LAROI & Justin Bieber",
    "🎵 *Believer* - Imagine Dragons",
    "🎵 *Perfect* - Ed Sheeran",
    "🎵 *Uptown Funk* - Bruno Mars",
    "🎵 *Shallow* - Lady Gaga & Bradley Cooper",
    "🎵 *Closer* - The Chainsmokers",
    "🎵 *Rockstar* - Post Malone",
    "🎵 *Happier* - Marshmello"
];

module.exports = {
    name: "song",
    aliases: ["music", "recommend", "songs"],
    description: "Get a song recommendation",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const song = songs[Math.floor(Math.random() * songs.length)];
        
        await sock.sendMessage(from, { 
            text: `🎵 *SONG RECOMMENDATION:*\n\n━━━━━━━━━━━━━━━━\n\n${song}\n\n━━━━━━━━━━━━━━━━\n\n🎧 Use !song again for more recommendations!`,
            contextInfo 
        }, { quoted: msg });
    }
};
