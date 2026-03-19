const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "techfact",
    aliases: ["tech", "technology"],
    description: "Get technology facts",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '💻', key: msg.key } });
        
        const facts = [
            "The first computer bug was an actual moth found in the Mark II computer in 1947.",
            "The QWERTY keyboard was designed to slow down typists to prevent jamming.",
            "The first domain name ever registered was Symbolics.com in 1985.",
            "More than 4 billion people use the internet daily.",
            "The first mobile phone call was made in 1973.",
            "Over 90% of the world's data was created in the last two years.",
            "The average person checks their phone 58 times a day.",
            "The first 1GB hard drive weighed about 550 pounds in 1980.",
            "Google processes over 8.5 billion searches per day.",
            "The first computer programmer was a woman, Ada Lovelace."
        ];
        
        const fact = facts[Math.floor(Math.random() * facts.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "💻 *TECH FACT*\n\n" + fact,
            contextInfo 
        }, { quoted: msg });
    }
};
