const { createForwardedContext } = require('./_helpers');
const axios = require('axios');

module.exports = {
    name: "sticker",
    aliases: ["stiker", "s", "to sticker", "make sticker"],
    description: "Convert images to stickers",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;

        // Check for quoted message with image
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const imageMsg = quotedMsg?.imageMessage || msg.message?.imageMessage;
        const videoMsg = quotedMsg?.videoMessage || msg.message?.videoMessage;

        // Check if user wants help
        if (!args.length && !imageMsg && !videoMsg) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `😎 *Sticker Maker*\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                      `*How to use:*\n\n` +
                      `1. Send an image with caption: !sticker\n` +
                      `2. Reply to an image with: !sticker\n` +
                      `3. Send a link: !sticker <image_url>\n\n` +
                      `*Options:*\n` +
                      `• !sticker - Create sticker from image\n` +
                      `• !sticker crop - Crop to square\n` +
                      `• !sticker bg - Transparent background\n\n` +
                      `*Note:* Reply to an image to convert it to a sticker!`,
                contextInfo 
            }, { quoted: msg });
            return;
        }

        // Check for URL in args
        let imageUrl = null;
        if (args.length > 0) {
            const potentialUrl = args[0];
            if (potentialUrl.startsWith('http://') || potentialUrl.startsWith('https://')) {
                imageUrl = potentialUrl;
            }
        }

        // Get image from quoted message or current message
        let mediaMessage = imageMsg || videoMsg;
        
        if (!mediaMessage && !imageUrl) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Please reply to an image or provide an image URL!\n\nExample: !sticker https://example.com/image.jpg", 
                contextInfo 
            }, { quoted: msg });
            return;
        }

        try {
            // Send typing indicator
            await sock.sendPresenceUpdate('composing', from);
            
            // Loading reaction
            await sock.sendMessage(from, { react: { text: '🔄', key: msg.key } });

            let stickerData;

            if (mediaMessage) {
                // Download media from WhatsApp
                const media = await sock.downloadMediaMessage(mediaMessage);
                stickerData = media;
            } else if (imageUrl) {
                // Download image from URL
                const response = await axios.get(imageUrl, { responseType: 'buffer' });
                stickerData = response.data;
            }

            // Send as sticker
            await sock.sendMessage(from, { 
                sticker: stickerData 
            }, { quoted: msg });

            // Success reaction
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            
        } catch (err) {
            console.error('Sticker error:', err);
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to create sticker.\n\nPlease try with a different image.", 
                contextInfo 
            }, { quoted: msg });
        }
    }
}
