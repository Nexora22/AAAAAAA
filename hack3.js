const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "hack3",
    aliases: ["hax3", "ghack3", "superhack"],

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        
        // Check if it's a group
        if (!isGroup) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, {
                text: "⚠️ This command only works in groups!",
                contextInfo
            }, { quoted: msg });
            return;
        }

        const target = args[0] ? args.join(" ") : "this chat";
        
        const hackSteps = [
            "🔐 Establishing secure connection...",
            "🔐 Bypassing WhatsApp encryption...",
            "🔐 Accessing Meta servers...",
            "🔐 Injecting SQL payload...",
            "🔐 Brute-forcing password...",
            "🔐 Installing keylogger...",
            "🔐 Downloading contacts...",
            "🔐 Accessing camera...",
            "🔐 Reading messages...",
            "🔐 Finalizing access..."
        ];

        const contextInfo = createForwardedContext();
        
        // Send hacking steps with progress
        for (let i = 0; i < hackSteps.length; i++) {
            const progress = Math.round(((i + 1) / hackSteps.length) * 100);
            const bar = "█".repeat(Math.floor(progress / 5)) + "░".repeat(20 - Math.floor(progress / 5));
            
            await sock.sendMessage(from, {
                text: `${hackSteps[i]}\n\n[${bar}] ${progress}%`,
                contextInfo
            }, { quoted: msg });
            
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Final hack message
        const finalMessages = [
            `🎯 TARGET ACQUIRED: ${target}\n\n💀 SYSTEM STATUS: COMPROMISED\n✅ Access: ROOT\n🔓 Encryption: BYPASSED\n📊 Data: DOWNLOADED\n🗑️ Evidence: WIPED`,
            `🔥 MISSION ACCOMPLISHED!\n\nTarget has been successfully hacked.\nAll data has been extracted.\nBackdoor installed.\nLeaving no trace...`,
            `🏆 HACK COMPLETE!\n\n📱 Full device access granted\n💰 Bank accounts compromised\n📸 Private data exposed\n✅ Target is now fully owned`
        ];
        
        for (const finalMsg of finalMessages) {
            await sock.sendMessage(from, {
                text: finalMsg,
                contextInfo
            }, { quoted: msg });
            await new Promise(resolve => setTimeout(resolve, 400));
        }
    }
};
