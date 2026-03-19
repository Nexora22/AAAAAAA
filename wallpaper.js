const { createForwardedContext } = require('./_helpers');
const axios = require('axios');

module.exports = {
    name: "wallpaper",
    aliases: ["wall", "bg", "background", "hdwallpaper"],
    description: "Get HD wallpapers",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        // Check for search query
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🖼️ *Wallpaper Search*\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                      `*Usage:* !wallpaper <search>\n\n` +
                      `*Examples:*\n` +
                      `• !wallpaper nature\n` +
                      `• !wallpaper anime\n` +
                      `• !wallpaper cars\n` +
                      `• !wallpaper dark\n` +
                      `• !wallpaper sunset\n\n` +
                      `Get beautiful HD wallpapers!`,
                contextInfo 
            }, { quoted: msg });
            return;
        }

        const query = args.join(' ');

        try {
            // Send typing indicator
            await sock.sendPresenceUpdate('composing', from);
            
            // Loading reaction
            await sock.sendMessage(from, { react: { text: '🔍', key: msg.key } });

            // Using Pexels API (free, no key needed via proxy) or fallback to another source
            // Try using a wallpaper API
            const searchTerms = query.toLowerCase().split(' ').join(',');
            
            // Using wallhaven.cc API (requires API key, so we'll use a fallback)
            // Using Lorem Picsum for demo - free service
            const wallpapers = [
                `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query)}`,
                `https://picsum.photos/seed/${encodeURIComponent(query)}/1920/1080`
            ];

            // Try to get a wallpaper
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                image: { url: wallpapers[0] }, 
                caption: `🖼️ *Wallpaper: ${query}*\n\n` +
                        `✨ Searched by: ${msg.pushName || 'User'}\n\n` +
                        `Type !wallpaper <topic> for more!`, 
                contextInfo 
            }, { quoted: msg });

            // Try to send a few more options
            setTimeout(async () => {
                try {
                    await sock.sendMessage(from, { 
                        image: { url: `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query + ' dark')}` }, 
                        caption: `🌙 Dark version`, 
                        contextInfo: createForwardedContext()
                    }, { quoted: msg });
                } catch (e) {}
            }, 1000);
            
            // Success reaction
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            
        } catch (err) {
            console.error('Wallpaper error:', err);
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to get wallpaper.\n\nPlease try a different search term.", 
                contextInfo 
            }, { quoted: msg });
        }
    }
}
