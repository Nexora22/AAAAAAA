const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "weather",
    aliases: ["wea", "wttr"],
    description: "Get weather information for a city",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🌤️ Weather Checker\\n\\nUsage: !weather <city>\\n\\nExample: !weather Lagos\\n!weather London UK\\n!weather New York",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const city = args.join(' ');
        
        try {
            // Send reaction
            await sock.sendMessage(from, { react: { text: '🌤️', key: msg.key } });
            
            // Using wttr.in - free weather service
            const weatherUrl = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
            const response = await axios.get(weatherUrl);
            
            const current = response.data.current_condition[0];
            const location = response.data.nearest_area[0]?.areaName[0]?.value || city;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌤️ Weather for ${location}:\n\n` +
                      `🌡️ Temperature: ${current.temp_C}°C (${current.temp_F}°F)\n` +
                      `💧 Humidity: ${current.humidity}%\n` +
                      `🌬️ Wind: ${current.windspeedKmph} km/h\n` +
                      `☁️ Condition: ${current.weatherDesc[0].value}\n` +
                      `👁️ Visibility: ${current.visibility} km\n` +
                      `🌡️ Feels like: ${current.FeelsLikeC}°C`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            console.error("Weather error:", err);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Could not get weather for that location.\\n\\nPlease check the city name and try again.",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
