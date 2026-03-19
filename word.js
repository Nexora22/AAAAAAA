const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "word",
    aliases: ["wordoftheday", "dictionary"],
    description: "Get word of the day",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '📝', key: msg.key } });
        
        const words = [
            { word: "Serendipity", meaning: "The occurrence of events by chance in a happy way." },
            { word: "Ephemeral", meaning: "Lasting for a very short time." },
            { word: "Petrichor", meaning: "The pleasant smell of rain on dry earth." },
            { word: "Luminous", meaning: "Full of or shedding light; bright." },
            { word: "Eloquent", meaning: "Fluent or persuasive in speaking or writing." },
            { word: "Resilient", meaning: "Able to recover quickly from difficulties." },
            { word: "Mellifluous", meaning: "Sweet or musical; pleasant to hear." },
            { word: "Quintessential", meaning: "Representing the most perfect example." },
            { word: "Sanguine", meaning: "Optimistic in difficult situations." },
            { word: "Ineffable", meaning: "Too great to be expressed in words." }
        ];
        
        const w = words[Math.floor(Math.random() * words.length)];
        
        const text = "📝 *WORD OF THE DAY*\n\n*" + w.word + "*\n\n" + w.meaning;
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
