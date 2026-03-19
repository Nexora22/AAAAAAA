const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "length",
    aliases: ["dist", "convertlength", "distance"],
    description: "Convert length units",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "📏 *LENGTH CONVERTER*\n\nUsage: !length <value> <unit>\n\nUnits: M (meters), CM (centimeters), KM (kilometers), MI (miles), FT (feet), IN (inches)\n\nExample:\n!length 1 MI",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '📏', key: msg.key } });
        
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
        
        let meters;
        
        if (unit === 'M' || unit === 'METERS') {
            meters = value;
        } else if (unit === 'CM' || unit === 'CENTIMETERS') {
            meters = value / 100;
        } else if (unit === 'KM' || unit === 'KILOMETERS') {
            meters = value * 1000;
        } else if (unit === 'MI' || unit === 'MILES') {
            meters = value * 1609.34;
        } else if (unit === 'FT' || unit === 'FEET') {
            meters = value * 0.3048;
        } else if (unit === 'IN' || unit === 'INCHES') {
            meters = value * 0.0254;
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Invalid unit.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = "📏 *LENGTH CONVERSION*\n\n" +
                     "Meters: *" + meters.toFixed(4) + " m*\n" +
                     "Centimeters: *" + (meters * 100).toFixed(2) + " cm*\n" +
                     "Kilometers: *" + (meters / 1000).toFixed(4) + " km*\n" +
                     "Miles: *" + (meters / 1609.34).toFixed(4) + " mi*\n" +
                     "Feet: *" + (meters / 0.3048).toFixed(2) + " ft*\n" +
                     "Inches: *" + (meters / 0.0254).toFixed(2) + " in*";
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
