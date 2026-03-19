const { createForwardedContext } = require('./_helpers');

const horoscopes = {
    aries: { emoji: "♈", traits: "Bold, ambitious, spontaneous" },
    taurus: { emoji: "♉", traits: "Patient, reliable, devoted" },
    gemini: { emoji: "♊", traits: "Curious, adaptable, communicative" },
    cancer: { emoji: "♋", traits: "Intuitive, emotional, protective" },
    leo: { emoji: "♌", traits: "Creative, passionate, generous" },
    virgo: { emoji: "♍", traits: "Analytical, practical, loyal" },
    libra: { emoji: "♎", traits: "Diplomatic, fair-minded, social" },
    scorpio: { emoji: "♏", traits: "Resourceful, passionate, brave" },
    sagittarius: { emoji: "♐", traits: "Optimistic, adventurous, honest" },
    capricorn: { emoji: "♑", traits: "Disciplined, responsible, ambitious" },
    aquarius: { emoji: "♒", traits: "Progressive, original, independent" },
    pisces: { emoji: "♓", traits: "Compassionate, artistic, intuitive" }
};

const readings = [
    "Today brings unexpected opportunities. Stay open to new experiences and trust your instincts.",
    "A significant relationship in your life will deepen. Be honest and express your true feelings.",
    "Your hard work is about to pay off. Keep pushing forward and don't give up now.",
    "Financial gains are coming your way. Make wise decisions and avoid impulsive spending.",
    "Creative energy is high today. Channel it into artistic pursuits or innovative projects.",
    "Your communication skills shine. Perfect time for negotiations or important conversations.",
    "Self-care is crucial today. Take time to rest and recharge your energy.",
    "Adventure awaits! Consider taking that trip or trying something new.",
    "A mystery will be solved today. Trust your intuition and pay attention to details.",
    "New friendships form from unexpected places. Be welcoming and open-minded.",
    "Your patience will be tested. Remember, good things come to those who wait.",
    "Love is in the air! Express appreciation to those you care about."
];

module.exports = {
    name: "horoscope",
    aliases: ["horo", "zodiac", "sign"],
    description: "Get your daily horoscope",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🌟', key: msg.key } });
        
        let sign = args[0]?.toLowerCase();
        
        if (!sign) {
            const signsList = Object.keys(horoscopes).join(', ');
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌟 *HOROSCOPE*\n\nPlease specify your zodiac sign:\n\n!horoscope aries\n!horoscope taurus\n!horoscope gemini\n!horoscope cancer\n!horoscope leo\n!horoscope virgo\n!horoscope libra\n!horoscope scorpio\n!horoscope sagittarius\n!horoscope capricorn\n!horoscope aquarius\n!horoscope pisces\n\n_Example: !horoscope leo_`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        if (!horoscopes[sign]) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Invalid sign. Use !horoscope <sign> with these signs: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const h = horoscopes[sign];
        const reading = readings[Math.floor(Math.random() * readings.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🌟 *HOROSCOPE - ${sign.toUpperCase()}* ${h.emoji}\n\n*Traits:* ${h.traits}\n\n📜 *Today's Reading:*\n\n${reading}`,
            contextInfo 
        }, { quoted: msg });
    }
};
