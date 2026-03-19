const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "fact",
    aliases: ["randomfact", "didyouknow", "facts"],
    description: "Get a random interesting fact",

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        
        try {
            const response = await axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
            const fact = response.data?.text || "Did you know? Cats sleep for 70% of their lives!";
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `💡 Random Fact:\\n\\n${fact}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const facts = [
                "Honey never spoils - archaeologists have found 3000-year-old honey still perfectly preserved!",
                "Octopuses have three hearts and blue blood!",
                "The shortest war in history lasted just 38-45 minutes!",
                "Bananas are berries, but strawberries aren't!",
                "A day on Venus is longer than a year on Venus!"
            ];
            const fact = facts[Math.floor(Math.random() * facts.length)];
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `💡 Random Fact:\\n\\n${fact}`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
