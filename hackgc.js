const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "hackgc",
    aliases: ["hackgroup", "haxgc", "grouphack"],

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

        const groupInfo = await sock.groupMetadata(from).catch(() => null);
        const groupName = groupInfo?.subject || "this group";
        
        const hackMessages = [
            `🏴‍☠️ GROUP HACK INITIATED\n\nTarget: ${groupName}\n\n[▓▓▓▓▓▓▓▓░░░░░] 30% - Accessing group data...`,
            `🏴‍☠️ GROUP HACK IN PROGRESS\n\nTarget: ${groupName}\n\n[▓▓▓▓▓▓▓▓▓▓▓░░] 50% - Downloading member list...`,
            `🏴‍☠️ GROUP HACK IN PROGRESS\n\nTarget: ${groupName}\n\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 70% - Extracting admin info...`,
            `🏴‍☠️ GROUP HACK IN PROGRESS\n\nTarget: ${groupName}\n\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 85% - Bypassing privacy...`,
            `🏴‍☠️ GROUP HACK COMPLETE\n\nTarget: ${groupName}\n\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% - DONE!`
        ];

        const finalResult = [
            `🔥 GROUP HACKED: ${groupName}\n\n┌─ GROUP DATA ─┐\n│ Members: EXPOSED\n│ Admins: COMPROMISED\n│ Messages: COPIED\n│ Media: DOWNLOADED\n│ Settings: MODIFIED\n│ Invite: REGENERATED\n└──────────────┘\n\n💀 Group successfully pwned!`,
            `🎯 HACK REPORT - ${groupName}\n\n✓ Admin list extracted\n✓ All members doxxed\n✓ Message history copied\n✓ Media files stolen\n✓ Group settings changed\n✓ Invite link regenerated\n✓ All participants notified\n\n🏴‍☠️ Operation Complete!`
        ];

        const contextInfo = createForwardedContext();
        
        // Send hacking process
        for (let i = 0; i < hackMessages.length; i++) {
            await sock.sendMessage(from, {
                text: hackMessages[i],
                contextInfo
            }, { quoted: msg });
            
            if (i < hackMessages.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 700));
            }
        }
        
        // Send final results
        for (const msgText of finalResult) {
            await sock.sendMessage(from, {
                text: msgText,
                contextInfo
            }, { quoted: msg });
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
};
