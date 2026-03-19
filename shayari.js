const { createForwardedContext } = require('./_helpers');

const shayari = [
    "💕 *तेरी मुस्कान मेरी जान है,\nतू मेरी शान है।*\n\n~ Love",
    
    "🌹 *तुम्हारी यादों का सहारा है मुझे,\nतुम्हारा इंतज़ार प्यारा है मुझे।*\n\n~ Romance",
    
    "✨ *मोहब्बत में तेरी इस कदर खो गए,\nकि अपने आप से भी बेगाने हो गए।*\n\n~ Deep Love",
    
    "💫 *चाँद को देखा तो तेरा चेहरा याद आया,\nफूलों को देखा तो तेरी खुशबू याद आई।*\n\n~ Missing You",
    
    "🌸 *तेरी आँखों में खो जाने का मन है,\nतेरे बिना जीने का मन नहीं है।*\n\n~ Romance",
    
    "💖 *मोहब्बत सच्ची होती है,\nजो दिल से दिल मिलती है।*\n\n~ Truth",
    
    "⭐ *तू है तो सब कुछ है,\nतेरे बिना अधूरा है।*\n\n~ Complete",
    
    "🔥 *तुम्हारी बाहों में खो जाने का मन है,\nएक पल के लिए तुम्हारा हो जाने का मन है।*\n\n~ Desire",
    
    "🌺 *प्यार में तेरे पागल हूं मैं,\nतेरी हर बात का तालू हूं मैं।*\n\n~ Crazy Love",
    
    "💝 *दिल में तेरी जगह है,\nआँखों में तेरी चाह है।*\n\n~ Heart"
];

const englishPoetry = [
    "💕 *In your eyes, I found my home,\nIn your heart, I found my own.*\n\n~ Love",
    
    "✨ *You are my sunshine on cloudy days,\nMy anchor when I drift away.*\n\n~ You",
    
    "🌙 *Two souls, one beat,\nTogether complete.*\n\n~ Us",
    
    "💫 *Love is not about how long we stay,\nBut how deeply we're willing to stay.*\n\n~ Truth",
    
    "⭐ *In a garden of roses, you are my rose,\nIn a world of many, you're the one I chose.*\n\n~ Forever"
];

module.exports = {
    name: "shayari",
    aliases: ["poetry", "lovepoem", "romantic"],
    description: "Beautiful romantic shayari and poetry",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const useEnglish = args.join(" ").toLowerCase().includes("english");
        
        const poem = useEnglish 
            ? englishPoetry[Math.floor(Math.random() * englishPoetry.length)]
            : shayari[Math.floor(Math.random() * shayari.length)];
        
        await sock.sendMessage(from, { 
            text: `💕 *ROMANTIC SHAYARI:*\n\n${poem}\n\n🌹 @Nexora`,
            contextInfo 
        }, { quoted: msg });
    }
};
