const { isSameUser } = require("../utils/identity");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "kick",
    description: "Kick a member from the group (Admin only)",

    async execute(sock, msg, args) {
        try {
            const jid = msg.key.remoteJid;

            if (!jid.endsWith("@g.us")) {
                const contextInfo = createForwardedContext();
                return sock.sendMessage(jid, { 
                    text: "❌ This command only works in groups!\n\nJoin a group chat and try again.", 
                    contextInfo 
                }, { quoted: msg });
            }

            const groupMetadata = await sock.groupMetadata(jid);
            const participants = groupMetadata.participants;
            const sender = msg.key.participant;
            const botJid = (sock.user?.id || "").split(":")[0] + "@s.whatsapp.net";
            const ownerJid = global.ownerJid || sock.user?.id;
            const senderIsAdmin = participants.find((p) => isSameUser(p.id, sender))?.admin;
            const botIsAdmin = participants.find((p) => isSameUser(p.id, botJid))?.admin;
            const ownerIsAdmin = participants.find((p) => isSameUser(p.id, ownerJid))?.admin;

            // Allow bot owner to use admin commands
            const isOwner = sender === ownerJid || sender === global.ownerJid;

            if (!senderIsAdmin && !isOwner) {
                const contextInfo = createForwardedContext();
                return sock.sendMessage(jid, { 
                    text: "⛔ Only group admins can kick members!\n\nAsk a group admin to help you.", 
                    contextInfo 
                }, { quoted: msg });
            }

            if (!botIsAdmin && !ownerIsAdmin) {
                const contextInfo = createForwardedContext();
                return sock.sendMessage(jid, { 
                    text: "⚠️ I need admin rights to kick members!\n\nPlease make me an admin first.", 
                    contextInfo 
                }, { quoted: msg });
            }

            let target = msg.message.extendedTextMessage?.contextInfo?.participant || null;

            if (!target && args[0]) {
                target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            }

            if (!target) {
                const contextInfo = createForwardedContext();
                return sock.sendMessage(jid, { 
                    text: "❓ Usage: !kick @user\n\nReply to a user or mention their number to kick them.", 
                    contextInfo 
                }, { quoted: msg });
            }

            await sock.groupParticipantsUpdate(jid, [target], "remove");
            const contextInfo = createForwardedContext();
            await sock.sendMessage(jid, {
                text: `✅ Successfully kicked @${target.split("@")[0]} from the group!`,
                mentions: [target],
                contextInfo
            });
        } catch (err) {
            console.error("Kick command error:", err);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to kick user!\n\nPossible reasons:\n• User is the group owner\n• Bot lacks admin rights\n• User already left the group",
                contextInfo
            }, { quoted: msg });
        }
    }
};
