const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "imdb",
    aliases: ["movieinfo", "film"],
    description: "Get movie/TV show information from IMDB",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🎬 *IMDB SEARCH*\n\nUsage: !imdb <movie or TV show>\n\nExample:\n!imdb Inception\n!imdb Breaking Bad`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const query = args.join(' ');
        
        await sock.sendMessage(from, { react: { text: '🎬', key: msg.key } });
        
        try {
            // Using OMDB API (free tier)
            const response = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=trilogy`);
            
            if (response.data.Response === "False") {
                throw new Error('Not found');
            }
            
            const movie = response.data;
            
            let text = `🎬 *${movie.Title}* (${movie.Year})\n\n`;
            text += `⭐ *Rating:* ${movie.imdbRating}/10\n`;
            text += `🎭 *Genre:* ${movie.Genre}\n`;
            text += `⏱️ *Runtime:* ${movie.Runtime}\n`;
            text += `👥 *Cast:* ${movie.Actors}\n\n`;
            text += `📖 *Plot:* ${movie.Plot}\n\n`;
            text += `🔗 https://imdb.com/title/${movie.imdbID}`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Could not find "${query}".\n\nPlease check the name and try again.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
