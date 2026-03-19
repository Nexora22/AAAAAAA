const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "news",
    aliases: ["headlines", "latestnews"],
    description: "Get latest news headlines",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '📰', key: msg.key } });
        
        try {
            const response = await axios.get('https://newsdata.io/api/1/news?apikey=pub_demo&q=technology&language=en&size=5');
            
            const articles = response.data.results;
            
            if (!articles || articles.length === 0) {
                throw new Error('No news');
            }
            
            let text = `📰 *LATEST NEWS*\n\n`;
            
            articles.forEach((article, i) => {
                text += `${i + 1}. *${article.title}*\n`;
                if (article.source_id) text += `   📍 ${article.source_id}\n`;
                if (article.pubDate) text += `   📅 ${article.pubDate}\n\n`;
            });
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            // Fallback to local news data
            const news = [
                { title: "AI continues to transform industries worldwide", source: "Tech News" },
                { title: "New smartphone features announced", source: "Gadget Daily" },
                { title: "Cryptocurrency market shows growth", source: "Crypto Times" },
                { title: "Space exploration reaches new milestones", source: "Science Daily" },
                { title: "Global tech conference highlights innovation", source: "Event News" }
            ];
            
            let text = `📰 *LATEST NEWS*\n\n`;
            news.forEach((n, i) => {
                text += `${i + 1}. *${n.title}*\n   📍 ${n.source}\n\n`;
            });
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
        }
    }
};
