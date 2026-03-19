const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "count",
    aliases: ["charcount", "letters"],
    description: "Count characters and words in text",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔢 *TEXT COUNTER*\n\nUsage: !count <text>\n\nExample:\n!count Hello World`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = args.join(' ');
        const charCount = text.length;
        const wordCount = text.split(/\s+/).filter(w => w).length;
        const lineCount = text.split('\n').length;
        const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;
        const consonantCount = (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
        const numberCount = (text.match(/[0-9]/g) || []).length;
        
        const textResult = `🔢 *TEXT ANALYSIS*\n\n` +
                          `Original: "${text}"\n\n` +
                          `📝 Characters: *${charCount}*\n` +
                          `📝 Words: *${wordCount}*\n` +
                          `📝 Lines: *${lineCount}*\n` +
                          `🔤 Vowels: *${vowelCount}*\n` +
                          `🔤 Consonants: *${consonantCount}*\n` +
                          `🔢 Numbers: *${numberCount}*`;
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: textResult, contextInfo }, { quoted: msg });
    }
};
