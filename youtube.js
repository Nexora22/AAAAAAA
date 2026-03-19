const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "yt",

    async execute(sock, msg, args) {
        let ytdl;
        try {
            ytdl = require("ytdl-core");
        } catch (_) {
            const contextInfo = createForwardedContext();
            return sock.sendMessage(msg.key.remoteJid, {
                text: "ytdl-core is not installed. Run: npm i ytdl-core",
                contextInfo
            }, { quoted: msg });
        }

        const url = args[0];

        if (!url || !ytdl.validateURL(url)) {
            const contextInfo = createForwardedContext();
            return sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Please provide a valid YouTube URL",
                contextInfo
            }, { quoted: msg });
        }

        try {

            // ⬇️ reaction
            await sock.sendMessage(msg.key.remoteJid, {
                react: { text: "⬇️", key: msg.key }
            });

            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title;

            // premium loading message
            await sock.sendMessage(msg.key.remoteJid, {
                text:
`╭━━━〔 👑 NEXORA PREMIUM 〕━━━╮
┃ 🎬 YouTube Downloader
┃ ⚡ Fetching HD Video...
┃ 📡 Optimizing Quality
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
                contextInfo: createForwardedContext()
            }, { quoted: msg });

            const videoStream = ytdl(url, { quality: "18" });

            await sock.sendMessage(msg.key.remoteJid, {
                video: videoStream,
                caption:
`╭━━━〔 👑 NEXORA PREMIUM 〕━━━╮
┃ 🎬 ${title}
┃ 📥 HD Video Download
┃ ⚡ Powered by Nexora
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
                contextInfo: createForwardedContext()
            }, { quoted: msg });

            // success reaction
            await sock.sendMessage(msg.key.remoteJid, {
                react: { text: "✅", key: msg.key }
            });

        } catch (err) {

            console.log(err);

            await sock.sendMessage(msg.key.remoteJid, {
                react: { text: "❌", key: msg.key }
            });

            await sock.sendMessage(msg.key.remoteJid, {
                text:
`╭━━━〔 ❌ ERROR 〕━━━╮
┃ Failed to fetch video
┃ Try another link
╰━━━━━━━━━━━━━━╯`,
                contextInfo: createForwardedContext()
            }, { quoted: msg });

        }
    }
};
