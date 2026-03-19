const { isSameUser } = require("../utils/identity");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "promote",

    async execute(sock, msg, args = []) {
        const jid = msg.key.remoteJid;

        try {
            if (!jid.endsWith("@g.us")) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(jid, { text: "This command works only in groups.", contextInfo }, { quoted: msg });
                return;
            }

            const metadata = await sock.groupMetadata(jid);
            const participants = metadata.participants || [];
            const sender = msg.key.participant || msg.participant || msg.key.remoteJid;
            const botJid = sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

            const ownerJid = global.ownerJid || sock.user?.id;
            const senderData = participants.find((p) => isSameUser(p.id, sender));
            const botData = participants.find((p) => isSameUser(p.id, botJid));
            const ownerData = participants.find((p) => isSameUser(p.id, ownerJid));
            const senderIsAdmin = !!senderData?.admin;
            const isOwner = isSameUser(sender, ownerJid);
            const botIsAdmin = !!botData?.admin || !!ownerData?.admin;

            if (!senderIsAdmin && !isOwner) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(jid, { text: "Only group admins or the bot owner can use !promote.", contextInfo }, { quoted: msg });
                return;
            }

            if (!botIsAdmin) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(jid, { text: "I need admin rights to promote users.", contextInfo }, { quoted: msg });
                return;
            }

            const contextInfo = msg.message?.extendedTextMessage?.contextInfo || {};
            const mentioned = contextInfo.mentionedJid || [];
            const replied = contextInfo.participant || null;
            let target = mentioned[0] || replied || null;

            if (!target && args[0]) {
                const number = args[0].replace(/\D/g, "");
                if (number) target = `${number}@s.whatsapp.net`;
            }

            if (!target) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(jid, { text: "Usage: !promote @user (or reply to user's message).", contextInfo }, { quoted: msg });
                return;
            }

            if (target === sender) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(jid, { text: "You are already in control of your own role.", contextInfo }, { quoted: msg });
                return;
            }

            const targetData = participants.find((p) => p.id === target);
            if (!targetData) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(jid, { text: "Target user is not in this group.", contextInfo }, { quoted: msg });
                return;
            }

            if (targetData.admin) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(jid, { text: "That user is already an admin.", contextInfo }, { quoted: msg });
                return;
            }

            await sock.groupParticipantsUpdate(jid, [target], "promote");
            const ctxInfo = createForwardedContext();
            await sock.sendMessage(jid, {
                text: `Promoted @${target.split("@")[0]} to admin.`,
                mentions: [target],
                contextInfo: ctxInfo
            }, { quoted: msg });
        } catch (error) {
            console.error("Promote command error:", error);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(jid, {
                text: "Failed to promote user. Ensure bot is admin and target is valid.",
                contextInfo
            }, { quoted: msg });
        }
    }
};
