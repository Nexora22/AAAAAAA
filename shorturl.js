const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "short",
    aliases: ["shorten", "shorturl", "tinyurl"],
    description: "Shorten a long URL",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        // Get URL from args or from message
        let url = args[0];
        
        // Try to extract URL from message if not in args
        if (!url) {
            const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
            const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
            if (urlMatch) {
                url = urlMatch[1];
            }
        }
        
        if (!url) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🔗 URL Shortener\\n\\nUsage: !short <url>\\n\\nExample: !short https://google.com\\n!short https://youtube.com/watch?v=...",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        // Validate URL
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        try {
            // Send reaction
            await sock.sendMessage(from, { react: { text: '🔗', key: msg.key } });
            
            // Using tinyurl API
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
            const shortUrl = response.data;
            
            if (shortUrl === 'Error') {
                throw new Error('Invalid URL');
            }
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔗 URL Shortened!\\n\\n📤 Original: ${url}\\n\\n📥 Short: ${shortUrl}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            console.error("Short URL error:", err);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to shorten URL.\\n\\nPlease check the URL and try again.",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
