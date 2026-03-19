const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "binary",
    aliases: ["encode", "decode"],
    description: "Encode/decode text to binary or base64",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length || args.length < 2) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔢 *ENCODER/DECODER*\n\nUsage:\n!binary encode <text>\n!binary decode <binary>\n!binary base64 encode <text>\n!binary base64 decode <code>\n\nExample:\n!binary encode Hello\n!binary decode 01001000 01100101 01101100 01101100 01101111\n!binary base64 encode Hello`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const action = args[0].toLowerCase();
        const type = args[1].toLowerCase();
        const text = args.slice(2).join(' ');
        
        await sock.sendMessage(from, { react: { text: '🔢', key: msg.key } });
        
        try {
            let result;
            
            if (action === 'encode' && type === 'text') {
                // Text to binary
                result = text.split('').map(char => 
                    char.charCodeAt(0).toString(2).padStart(8, '0')
                ).join(' ');
            } else if (action === 'decode' && type === 'text') {
                // Binary to text
                result = text.split(' ').map(binary => 
                    String.fromCharCode(parseInt(binary, 2))
                ).join('');
            } else if (action === 'base64' && type === 'encode') {
                result = Buffer.from(text).toString('base64');
            } else if (action === 'base64' && type === 'decode') {
                result = Buffer.from(text, 'base64').toString('utf-8');
            } else {
                throw new Error('Invalid action');
            }
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🔢 *RESULT*\n\n${result}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Invalid input or encoding.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
