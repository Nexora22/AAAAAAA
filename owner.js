const { loadOwnerInfo } = require('../ownerStorage');

module.exports = {
    name: "owner",

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const ownerJid = global.ownerJid || sock.user?.id || "";
        const ownerNumber = ownerJid.split("@")[0].split(":")[0].replace(/\D/g, "");
        
        // Load owner info including name
        const ownerInfo = loadOwnerInfo();
        const ownerName = ownerInfo.ownerName || "Owner";
        
        if (!ownerNumber || ownerNumber === "") {
            await sock.sendMessage(from, { text: "Owner is not configured yet. Use !setowner <number> to set one." }, { quoted: msg });
            return;
        }

        if (!ownerNumber) {
            await sock.sendMessage(from, { text: "Owner is not configured yet." }, { quoted: msg });
            return;
        }

        const vcard = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `FN:${ownerName}`,
            "ORG:Nexora;",
            `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}`,
            "END:VCARD"
        ].join("\n");

        await sock.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: msg });
    }
};
