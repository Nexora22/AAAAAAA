const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "wikipedia",
    aliases: ["wiki", "wik"],
    description: "Search Wikipedia for information",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `📚 *WIKIPEDIA SEARCH*\n\nUsage: !wikipedia <search term>\n\nExample:\n!wikipedia JavaScript\n!wikipedia Albert Einstein`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const query = args.join(' ');
        
        await sock.sendMessage(from, { react: { text: '📚', key: msg.key } });
        
        try {
            const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
            const response = await axios.get(searchUrl);
            
            const data = response.data;
            const title = data.title;
            const extract = data.extract;
            const url = data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `📚 *${title}*\n\n${extract}\n\n🔗 ${url}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            // Try search if direct page not found
            try {
                const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=5&format=json`;
                const response = await axios.get(searchUrl);
                
                if (response.data[1]?.length > 0) {
                    const results = response.data[1].slice(0, 5).map((r, i) => `${i + 1}. ${r}`).join('\n');
                    const contextInfo = createForwardedContext();
                    await sock.sendMessage(from, { 
                        text: `📚 *Search Results for "${query}":*\n\n${results}\n\nTry: !wikipedia <exact title>`,
                        contextInfo 
                    }, { quoted: msg });
                } else {
                    throw new Error('No results');
                }
            } catch (e) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(from, { 
                    text: `❌ No results found for "${query}".\n\nTry a different search term.`,
                    contextInfo 
                }, { quoted: msg });
            }
        }
    }
};
