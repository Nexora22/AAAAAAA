const { createForwardedContext } = require('./_helpers');

const movies = [
    "🎬 *Inception* - Mind-bending sci-fi thriller",
    "🎬 *The Dark Knight* - Epic superhero drama",
    "🎬 *Interstellar* - Space odyssey",
    "🎬 *Parasite* - Award-winning thriller",
    "🎬 *Avengers: Endgame* - Epic crossover",
    "🎬 *The Shawshank Redemption* - Inspirational classic",
    "🎬 *Joker* - Dark psychological thriller",
    "🎬 *Spider-Man: Into the Spider-Verse* - Animated masterpiece",
    "🎬 *Oppenheimer* - Historical drama",
    "🎬 *Barbie* - Fun comedy adventure",
    "🎬 *Avatar* - Visual spectacle",
    "🎬 *Everything Everywhere All at Once* - Wild multiverse ride",
    "🎬 *Top Gun: Maverick* - High-octane action",
    "🎬 *The Godfather* - Timeless crime saga",
    "🎬 *Forrest Gump* - Heartwarming story"
];

module.exports = {
    name: "movie",
    aliases: ["films", "watch", "movies"],
    description: "Get a movie recommendation",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const movie = movies[Math.floor(Math.random() * movies.length)];
        
        await sock.sendMessage(from, { 
            text: `🎬 *MOVIE RECOMMENDATION:*\n\n━━━━━━━━━━━━━━━━\n\n${movie}\n\n━━━━━━━━━━━━━━━━\n\n🍿 Use !movie again for more recommendations!`,
            contextInfo 
        }, { quoted: msg });
    }
};
