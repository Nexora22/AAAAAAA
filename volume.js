const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "volume",
    aliases: ["vol", "convertvolume"],
    description: "Convert volume units",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🧊 *VOLUME CONVERTER*\n\nUsage: !volume <value> <unit>\n\nUnits: L (liters), ML (milliliters), GAL (gallons), CUP\n\nExample:\n!volume 1 GAL",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🧊', key: msg.key } });
        
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
        
        let liters;
        
        if (unit === 'L' || unit === 'LITERS') {
            liters = value;
        } else if (unit === 'ML' || unit === 'MILLILITERS') {
            liters = value / 1000;
        } else if (unit === 'GAL' || unit === 'GALLONS') {
            liters = value * 3.78541;
        } else if (unit === 'CUP' || unit === 'CUPS') {
            liters = value * 0.236588;
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Invalid unit. Use L, ML, GAL, or CUP.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = "🧊 *VOLUME CONVERSION*\n\n" +
                     "Liters: *" + liters.toFixed(4) + " L*\n" +
                     "Milliliters: *" + (liters * 1000).toFixed(2) + " mL*\n" +
                     "Gallons: *" + (liters / 3.78541).toFixed(4) + " gal*\n" +
                     "Cups: *" + (liters / 0.236588).toFixed(2) + " cups*";
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
