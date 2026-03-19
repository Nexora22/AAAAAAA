const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "weight",
    aliases: ["mass", "convertweight"],
    description: "Convert weight units",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "⚖️ *WEIGHT CONVERTER*\n\nUsage: !weight <value> <unit>\n\nUnits: KG (kilograms), G (grams), LB (pounds), OZ (ounces)\n\nExample:\n!weight 100 KG",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '⚖️', key: msg.key } });
        
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
        
        let kg;
        
        if (unit === 'KG' || unit === 'KILOGRAMS') {
            kg = value;
        } else if (unit === 'G' || unit === 'GRAMS') {
            kg = value / 1000;
        } else if (unit === 'LB' || unit === 'POUNDS') {
            kg = value * 0.453592;
        } else if (unit === 'OZ' || unit === 'OUNCES') {
            kg = value * 0.0283495;
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Invalid unit.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = "⚖️ *WEIGHT CONVERSION*\n\n" +
                     "Kilograms: *" + kg.toFixed(4) + " kg*\n" +
                     "Grams: *" + (kg * 1000).toFixed(2) + " g*\n" +
                     "Pounds: *" + (kg / 0.453592).toFixed(2) + " lb*\n" +
                     "Ounces: *" + (kg / 0.0283495).toFixed(2) + " oz*";
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
