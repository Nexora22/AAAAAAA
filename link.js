const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "link",
    aliases: ["pair", "pairing"],

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const number = (args[0] || "").replace(/\D/g, "");
        
        if (!number) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "📱 WhatsApp Link Command\n\nUsage: !link <phone_number>\n\nExample: !link 234812345678\n\nThis will generate a pairing code to link your WhatsApp account with the bot.",
                contextInfo 
            }, { quoted: msg });
            return;
        }

        // Add country code if not present
        let fullNumber = number;
        if (!number.startsWith('234') && number.length <= 10) {
            fullNumber = '234' + number;
        }

        try {
            const code = await sock.requestPairingCode(fullNumber);
            const formatted = code?.match(/.{1,4}/g)?.join("-") || code;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, {
                text: `📱 *WhatsApp Pairing Code*\n\nNumber: ${fullNumber}\n\n🔢 *Code:* ${formatted}\n\n⏰ This code expires in 60 seconds!\n\n📌 *How to link:*\n1. Open WhatsApp on your phone\n2. Go to Linked Devices\n3. Tap "Link with phone number"\n4. Enter the code above\n\n✨ Enjoy using Nexora on multiple devices!`,
                contextInfo
            }, { quoted: msg });
        } catch (err) {
            console.error("Link command error:", err);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, {
                text: "❌ Failed to generate pairing code!\n\nPossible reasons:\n• Bot is already linked to maximum devices\n• Invalid phone number format\n• WhatsApp server issue\n\nPlease try again or use a different number.",
                contextInfo
            }, { quoted: msg });
        }
    }
};
