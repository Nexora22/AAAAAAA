const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "ipinfo",
    aliases: ["ip", "myip"],
    description: "Get IP address information",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🌐', key: msg.key } });
        
        try {
            const response = await axios.get('https://ipapi.co/json/');
            
            const data = response.data;
            
            const text = `🌐 *IP INFORMATION*\n\n` +
                         `📍 IP Address: *${data.ip}*\n` +
                         `🌍 Country: ${data.country_name} ${data.country_flag_emoji}\n` +
                         `🗺️ Region: ${data.region}\n` +
                         `🏙️ City: ${data.city}\n` +
                         `📮 Postal: ${data.postal}\n` +
                         `🌐 ISP: ${data.org}\n` +
                         `🕐 Timezone: ${data.timezone}\n` +
                         `📏 Coordinates: ${data.latitude}, ${data.longitude}`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Could not fetch IP information.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
