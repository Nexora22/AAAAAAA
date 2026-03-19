const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "urban",
    aliases: ["urbandict", "slang"],
    description: "Search Urban Dictionary",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "📖 *URBAN DICTIONARY*\n\nUsage: !urban <word>\n\nExample:\n!urban no cap\n!urban bet",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const term = args.join(' ');
        
        await sock.sendMessage(from, { react: { text: '📖', key: msg.key } });
        
        try {
            const response = await axios.get("https://api.urbandictionary.com/v0/define?term=" + encodeURIComponent(term));
            
            if (!response.data.list || response.data.list.length === 0) {
                throw new Error('No results');
            }
            
            const def = response.data.list[0];
            
            const text = "📖 *" + def.word + "*\n\n" +
                         "📝 Definition:\n" + def.definition + "\n\n" +
                         "💡 Example:\n" + def.example + "\n\n" +
                         "👍 " + def.thumbs_up + " | 👎 " + def.thumbs_down;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Could not find definition for \"" + term + "\".",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
