const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

const languages = {
    en: "English", es: "Spanish", fr: "French", de: "German",
    it: "Italian", pt: "Portuguese", ru: "Russian", ja: "Japanese",
    ko: "Korean", zh: "Chinese", ar: "Arabic", hi: "Hindi",
    tr: "Turkish", nl: "Dutch", pl: "Polish", sv: "Swedish",
    th: "Thai", vi: "Vietnamese", id: "Indonesian", ms: "Malay",
    sw: "Swahili", af: "Afrikaans", el: "Greek", he: "Hebrew"
};

module.exports = {
    name: "translate",
    aliases: ["trans", "tl"],
    description: "Translate text to another language",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const langList = Object.entries(languages).map(([code, name]) => `${code}: ${name}`).join('\n');
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌐 *TRANSLATOR*\n\nUsage: !translate <language code> <text>\n\nExample:\n!translate es Hello World\n!translate fr Bonjour\n!translate ja Hello\n\nLanguage codes:\n${langList}`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const targetLang = args[0].toLowerCase();
        const text = args.slice(1).join(' ');
        
        if (!languages[targetLang]) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Invalid language code.\n\nUse !translate to see available languages.`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🌐', key: msg.key } });
        
        try {
            const response = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
            
            if (response.data.responseStatus !== 200) {
                throw new Error('Translation failed');
            }
            
            const translated = response.data.responseData.translatedText;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌐 *TRANSLATION*\n\nFrom: English\nTo: ${languages[targetLang]} (${targetLang})\n\n📝 *Original:*\n${text}\n\n📝 *Translated:*\n${translated}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Could not translate. Please try again.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
