const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "format",
    aliases: ["formattext", "styletext"],
    description: "Format text with different styles",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "✨ *TEXT STYLER*\n\nUsage: !format <style> <text>\n\nStyles:\nbold\nitalic\nunderline\ncode\nquote\n\nExample:\n!format bold Hello",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const style = args[0].toLowerCase();
        const text = args.slice(1).join(' ');
        
        let formatted;
        
        if (style === 'bold') {
            formatted = '*' + text + '*';
        } else if (style === 'italic') {
            formatted = '_' + text + '_';
        } else if (style === 'underline') {
            formatted = '__' + text + '__';
        } else if (style === 'code') {
            formatted = '```' + text + '```';
        } else if (style === 'quote') {
            formatted = '>' + text;
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Invalid style. Use: bold, italic, underline, code, or quote.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: formatted, contextInfo }, { quoted: msg });
    }
};
