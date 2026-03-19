const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "bmi",
    aliases: ["weight"],
    description: "Calculate BMI (Body Mass Index)",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `⚖️ *BMI CALCULATOR*\n\nUsage: !bmi <weight> <height>\n\nUnits:\n!bmi 70 kg 175 cm\n!bmi 150 lbs 5.8 ft`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '⚖️', key: msg.key } });
        
        const weight = parseFloat(args[0]);
        const unit = args[1].toLowerCase();
        
        let weightKg = weight;
        let heightCm;
        
        // Convert weight to kg if needed
        if (unit === 'lbs' || unit === 'lb') {
            weightKg = weight * 0.453592;
            heightCm = parseFloat(args[2]);
        } else if (unit === 'kg' || unit === 'kgs') {
            heightCm = parseFloat(args[2]);
        } else {
            heightCm = parseFloat(args[1]);
        }
        
        // Get height in cm if provided in different unit
        if (args.length >= 4) {
            const heightUnit = args[3].toLowerCase();
            if (heightUnit === 'ft' || heightUnit === 'feet') {
                heightCm = heightCm * 30.48;
            } else if (heightUnit === 'in' || heightUnit === 'inches') {
                heightCm = heightCm * 2.54;
            }
        }
        
        if (isNaN(weightKg) || isNaN(heightCm) || heightCm <= 0) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Invalid values. Please check your input.`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        const bmiRounded = bmi.toFixed(1);
        
        let category;
        let emoji;
        if (bmi < 18.5) {
            category = "Underweight";
            emoji = "📉";
        } else if (bmi < 25) {
            category = "Normal weight";
            emoji = "✅";
        } else if (bmi < 30) {
            category = "Overweight";
            emoji = "⚠️";
        } else {
            category = "Obese";
            emoji = "❗";
        }
        
        const idealWeightMin = (18.5 * heightM * heightM).toFixed(1);
        const idealWeightMax = (24.9 * heightM * heightM).toFixed(1);
        
        const text = `⚖️ *BMI RESULT*\n\n` +
                     `Weight: ${weightKg.toFixed(1)} kg\n` +
                     `Height: ${heightCm.toFixed(1)} cm\n\n` +
                     `Your BMI: *${bmiRounded}*\n` +
                     `Category: ${emoji} ${category}\n\n` +
                     `Ideal weight range: ${idealWeightMin} - ${idealWeightMax} kg`;
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
