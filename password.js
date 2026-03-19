const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "password",
    aliases: ["pass", "generatepass", "genpass"],
    description: "Generate a secure random password",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        const length = parseInt(args[0]) || 16;
        const useSymbols = args.includes('-s') || args.includes('--symbols');
        const useNumbers = args.includes('-n') || args.includes('--numbers');
        
        const chars = {
            letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        
        let allowedChars = chars.letters;
        if (useNumbers || (!useSymbols && !useNumbers)) allowedChars += chars.numbers;
        if (useSymbols) allowedChars += chars.symbols;
        
        let password = '';
        const array = new Uint32Array(length);
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            crypto.getRandomValues(array);
        } else {
            for (let i = 0; i < length; i++) {
                array[i] = Math.floor(Math.random() * 0xffffffff);
            }
        }
        
        for (let i = 0; i < length; i++) {
            password += allowedChars[array[i] % allowedChars.length];
        }
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🔐 Generated Password (${length} chars):\n\n\`${password}\`\n\n⚠️ Share carefully! Don't share passwords with untrusted people.`,
            contextInfo 
        }, { quoted: msg });
    }
};
