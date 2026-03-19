const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "sh",
    aliases: ["shorthelp", "qhelp", "quickhelp"],
    description: "Quick help - shows command categories",

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        
        const menu = `╔══════════════════════════════╗
║   ⟦ NEXORA QUICK HELP ⟧    ║
╚══════════════════════════════╝

📖 General
!help → Full menu
!bot → AI chat
!ping → Check latency

👑 Admin
!kick → Remove member
!promote → Make admin
!tagall → Mention all

🎵 Media
!play → Spotify search
!yt → YouTube download
!tiktok → TikTok download

🎮 Fun
!joke, !meme, !quote
!8ball, !rps, !ttt

🛠 Tools
!img → AI image
!apk → Search APKs
!antidelete → Catch deleted messages

⚙️ System
!alive → Bot status
!uptime → Check uptime

> Use !help for full menu`;

        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: menu, contextInfo }, { quoted: msg });
    }
};
