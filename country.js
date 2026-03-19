const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "country",
    aliases: ["countryinfo", "nation"],
    description: "Get information about a country",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌍 *COUNTRY INFO*\n\nUsage: !country <country name>\n\nExample:\n!country Japan\n!country Nigeria\n!country Brazil`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const country = args.join(' ');
        
        await sock.sendMessage(from, { react: { text: '🌍', key: msg.key } });
        
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`);
            
            if (!response.data || response.data.length === 0) {
                throw new Error('Not found');
            }
            
            const c = response.data[0];
            
            const languages = c.languages ? Object.values(c.languages).join(', ') : 'N/A';
            const currencies = c.currencies ? Object.values(c.currencies).map(cu => `${cu.name} (${cu.symbol})`).join(', ') : 'N/A';
            const timezones = c.timezones ? c.timezones.join(', ') : 'N/A';
            
            const text = `🌍 *${c.name.common}* ${c.flag}\n\n` +
                        `🏛️ *Capital:* ${c.capital?.[0] || 'N/A'}\n` +
                        `🗣️ *Languages:* ${languages}\n` +
                        `💰 *Currencies:* ${currencies}\n` +
                        `👥 *Population:* ${c.population.toLocaleString()}\n` +
                        `📏 *Area:* ${c.area?.toLocaleString() || 'N/A'} km²\n` +
                        `🌐 *Region:* ${c.region}\n` +
                        `🕐 *Timezones:* ${timezones}\n` +
                        `🚗 *Driving:* ${c.car?.side || 'N/A'}\n` +
                        `📞 *Calling Code:* +${c.callingCode}`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Country "${country}" not found.\n\nPlease check the name and try again.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
