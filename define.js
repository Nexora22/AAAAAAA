const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "define",
    aliases: ["meaning", "dictionary", "dict"],
    description: "Get the definition of a word",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `📖 *DICTIONARY*\n\nUsage: !define <word>\n\nExample:\n!define happiness\n!define algorithm`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const word = args.join(' ');
        
        await sock.sendMessage(from, { react: { text: '📖', key: msg.key } });
        
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
            
            if (!response.data || !response.data[0]) {
                throw new Error('Not found');
            }
            
            const entry = response.data[0];
            const definition = entry.meanings?.[0]?.definitions?.[0];
            
            if (!definition) {
                throw new Error('No definition');
            }
            
            const text = `📖 *${entry.word}* ${entry.phonetic || ''}\n\n` +
                        `🔊 *Part of Speech:* ${entry.meanings[0].partOfSpeech}\n\n` +
                        `📝 *Definition:*\n${definition.definition}\n\n` +
                        (definition.example ? `�例 *Example:*\n"${definition.example}"\n\n` : '') +
                        (definition.synonyms?.length ? `🔗 *Synonyms:*\n${definition.synonyms.slice(0, 5).join(', ')}` : '');
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Could not find definition for "${word}".`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
