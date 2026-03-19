module.exports = {
    name: "instagram",

    async execute(sock, msg) {
        await sock.sendMessage(
            msg.key.remoteJid,
            { text: "Instagram downloader is temporarily unavailable. Use yt/tiktok for now." },
            { quoted: msg }
        );
    }
};
