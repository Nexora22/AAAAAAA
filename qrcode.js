const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "qrcode",
    aliases: ["qr", "code"],
    description: "Generate a QR code from text",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `📱 *QR CODE GENERATOR*\n\nUsage: !qrcode <text or url>\n\nExample:\n!qrcode Hello World\n!qrcode https://example.com`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = args.join(' ');
        
        await sock.sendMessage(from, { react: { text: '📱', key: msg.key } });
        
        try {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                image: { url: qrUrl },
                caption: `📱 *QR Code*\n\n${text}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Could not generate QR code.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
