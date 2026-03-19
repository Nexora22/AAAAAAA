const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "hackall",
    aliases: ["hackmembers", "haxall"],

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
        const memberCount = groupInfo?.participants?.length || 0;
        const groupName = groupInfo?.subject || "this group";
        
        const hackMessages = [
            `👥 MASS MEMBER HACK\n\nGroup: ${groupName}\nMembers detected: ${memberCount}\n\n[░░░░░░░░░░░░░░░░] 10% - Scanning members...`,
            `👥 MASS MEMBER HACK\n\nGroup: ${groupName}\nMembers detected: ${memberCount}\n\n[██░░░░░░░░░░░░░░] 25% - Gathering data...`,
            `👥 MASS MEMBER HACK\n\nGroup: ${groupName}\nMembers detected: ${memberCount}\n\n[█████░░░░░░░░░░░] 45% - Extracting info...`,
            `👥 MASS MEMBER HACK\n\nGroup: ${groupName}\nMembers detected: ${memberCount}\n\n[████████░░░░░░░░░] 65% - Cracking phones...`,
            `👥 MASS MEMBER HACK\n\nGroup: ${groupName}\nMembers detected: ${memberCount}\n\n[██████████░░░░░░] 85% - Downloading data...`,
            `👥 MASS MEMBER HACK\n\nGroup: ${groupName}\nMembers detected: ${memberCount}\n\n[████████████░░░░] 95% - Finalizing...`,
            `👥 MASS MEMBER HACK\n\nGroup: ${groupName}\nMembers detected: ${memberCount}\n\n[██████████████░] 100% - COMPLETE!`
        ];

        const finalResult = `💀 MASS HACK COMPLETE!\n\n┌─ ${groupName} ─┐\n│ Members Hacked: ${memberCount}\n│ Phone Numbers: ✓ STOLEN\n│ Profile Pics: ✓ COPIED\n│ Status Info: ✓ EXPOSED\n│ Last Seen: ✓ TRACKED\n│ Devices: ✓ ROOTED\n└──────────────┘\n\n🔥 All ${memberCount} members have been successfully hacked!\n\n📊 Total data collected: ${(memberCount * 2.5).toFixed(1)} GB`;

        const contextInfo = createForwardedContext();
        
        // Send hacking process
        for (let i = 0; i < hackMessages.length; i++) {
            await sock.sendMessage(from, {
                text: hackMessages[i],
                contextInfo
            }, { quoted: msg });
            
            if (i < hackMessages.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 600));
            }
        }
        
        // Send final result
        await sock.sendMessage(from, {
            text: finalResult,
            contextInfo
        }, { quoted: msg });
    }
};
