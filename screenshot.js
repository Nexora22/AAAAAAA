const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "ss",
    aliases: ["screenshot", "capture"],
    description: "Take a screenshot of a website",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "📸 *SCREENSHOT*\n\nUsage: !ss <url>\n\nExample:\n!ss https://google.com",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        let url = args.join(' ');
        
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }
        
        await sock.sendMessage(from, { react: { text: '📸', key: msg.key } });
        
        try {
            const ssUrl = "https://api.screenshotlayer.com/api/capture?access_key=c90d5521e2f08a3b44f19e4101e8797f&url=" + encodeURIComponent(url) + "&width=1280&height=720";
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                image: { url: ssUrl },
                caption: "📸 Screenshot of " + url,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Could not take screenshot.",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
