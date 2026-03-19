const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "numberfact",
    aliases: ["number", "factnum"],
    description: "Get interesting facts about numbers",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        let num;
        
        if (args.length) {
            num = parseInt(args[0]);
        } else {
            num = Math.floor(Math.random() * 100) + 1;
        }
        
        if (isNaN(num)) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔢 *NUMBER FACT*\n\nUsage: !numberfact <number>\n\nExample:\n!numberfact 7\n!numberfact 42`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🔢', key: msg.key } });
        
        try {
            const response = await axios.get(`http://numbersapi.com/${num}?json`);
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔢 *FACT ABOUT ${num}*\n\n${response.data.text}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const facts = [
                `${num} is an interesting number!`,
                `Did you know about ${num}?`,
                `Number ${num} has special properties!`
            ];
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔢 *FACT ABOUT ${num}*\n\n${facts[Math.floor(Math.random() * facts.length)]}`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
