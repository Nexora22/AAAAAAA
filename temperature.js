const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "temp",
    aliases: ["temperature", "convertunit"],
    description: "Convert temperature units",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🌡️ *TEMPERATURE CONVERTER*\n\nUsage: !temp <value> <unit>\n\nExample:\n!temp 100 C (Celsius to Fahrenheit)\n!temp 32 F (Fahrenheit to Celsius)\n!temp 0 C (Celsius to Kelvin)",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🌡️', key: msg.key } });
        
        const value = parseFloat(args[0]);
        const unit = args[1].toUpperCase();
        
        if (isNaN(value)) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Invalid number.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        let celsius, fahrenheit, kelvin;
        
        if (unit === 'C' || unit === 'CELSIUS') {
            celsius = value;
            fahrenheit = (value * 9/5) + 32;
            kelvin = value + 273.15;
        } else if (unit === 'F' || unit === 'FAHRENHEIT') {
            celsius = (value - 32) * 5/9;
            fahrenheit = value;
            kelvin = celsius + 273.15;
        } else if (unit === 'K' || unit === 'KELVIN') {
            celsius = value - 273.15;
            fahrenheit = (celsius * 9/5) + 32;
            kelvin = value;
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Invalid unit. Use C, F, or K.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = "🌡️ *CONVERSION*\n\n" +
                     "Celsius: *" + celsius.toFixed(2) + "°C*\n" +
                     "Fahrenheit: *" + fahrenheit.toFixed(2) + "°F*\n" +
                     "Kelvin: *" + kelvin.toFixed(2) + "K*";
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
