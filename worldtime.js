const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "worldtime",
    aliases: ["worldclock", "timezone", "tz"],
    description: "Get current time in different timezones",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const timezones = [
                { name: "New York", tz: "America/New_York" },
                { name: "London", tz: "Europe/London" },
                { name: "Tokyo", tz: "Asia/Tokyo" },
                { name: "Sydney", tz: "Australia/Sydney" },
                { name: "Dubai", tz: "Asia/Dubai" },
                { name: "Paris", tz: "Europe/Paris" },
                { name: "Singapore", tz: "Asia/Singapore" },
                { name: "Hong Kong", tz: "Asia/Hong_Kong" }
            ];
            
            let text = `🌍 *WORLD CLOCK*\n\n`;
            
            for (const tz of timezones) {
                try {
                    const response = await axios.get(`https://worldtimeapi.org/api/timezone/${tz.tz}`);
                    const time = new Date(response.data.datetime).toLocaleTimeString('en-US', { timeZone: tz.tz });
                    text += `🕐 ${tz.name}: *${time}*\n`;
                } catch (e) {
                    text += `🕐 ${tz.name}: *--* \n`;
                }
            }
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            return;
        }
        
        const query = args.join(' ').toLowerCase().replace(/ /g, '_');
        
        await sock.sendMessage(from, { react: { text: '🌍', key: msg.key } });
        
        try {
            const response = await axios.get(`https://worldtimeapi.org/api/timezone/${query}`);
            
            const now = new Date(response.data.datetime);
            const time = now.toLocaleTimeString('en-US', { timeZone: response.data.timezone });
            const date = now.toLocaleDateString('en-US', { timeZone: response.data.timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            
            const text = `🌍 *TIME IN ${response.data.timezone.toUpperCase()}*\n\n` +
                         `🕐 Time: *${time}*\n` +
                         `📅 Date: ${date}\n` +
                         `🌅 UTC Offset: ${response.data.utc_offset}`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Timezone not found.\n\nUse !worldtime without args to see major cities.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
