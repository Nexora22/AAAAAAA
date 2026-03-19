const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "tiktok", // command trigger
    description: "Download TikTok videos in HD without watermark.",
    
    async execute(sock, msg, args) {
        // auto-detect link if not provided in command
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        const url = args[0] || (text.match(/https?:\/\/(www\.)?tiktok\.com\/[^\s]+/)?.[0]);
        if (!url) {
            const contextInfo = createForwardedContext();
            return sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a valid TikTok URL!", contextInfo });
        }

        try {
            // ⬇️ Send reaction emoji
            await sock.sendMessage(msg.key.remoteJid, { react: { text: "⬇️", key: msg.key } });

            // Premium loading message
            const loadingMsg = await sock.sendMessage(msg.key.remoteJid, {
                text: 
`╭━━━〔 👑 NEXORA PREMIUM 〕━━━╮
┃ 🎬 TikTok HD Downloader
┃ ⚡ Fetching Ultra HD Version...
┃ 🔓 No Watermark
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
                contextInfo: createForwardedContext()
            }, { quoted: msg });

            // Fetch HD video
            const response = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`);
            const videoUrl = response.data.data?.hdplay || response.data.data?.play;

            if (!videoUrl) throw new Error("Video not found!");

            // Send premium video
            const contextInfo = createForwardedContext();
            await sock.sendMessage(msg.key.remoteJid, {
                video: { url: videoUrl },
                caption:
`╭━━━〔 👑 NEXORA PREMIUM 〕━━━╮
┃ 🎬 TikTok Video (HD)
┃ 🚫 No Watermark
┃ ⚡ Ultra Quality
╰━━━━━━━━━━━━━━━━━━━━━━╯

✨ Thank you for using Nexora Premium`,
                contextInfo
            }, { quoted: msg });

            // ✅ Success reaction
            await sock.sendMessage(msg.key.remoteJid, { react: { text: "✅", key: msg.key } });

        } catch (error) {
            console.error(error);

            // ❌ Failure reaction
            await sock.sendMessage(msg.key.remoteJid, { react: { text: "❌", key: msg.key } });
            const contextInfo = createForwardedContext();
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to fetch TikTok video. Check the link.", contextInfo }, { quoted: msg });
        }
    }
};
