const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "password",
    aliases: ["pass", "generatepassword"],
    description: "Generate a secure password",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🔐', key: msg.key } });
        
        let length = 12;
        
        if (args[0]) {
            length = parseInt(args[0]);
            if (length < 6) length = 6;
            if (length > 50) length = 50;
        }
        
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        const text = "🔐 *PASSWORD GENERATED*\n\nLength: " + length + " characters\n\n*Password:*\n```" + password + "```\n\n⚠️ Use with caution!";
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
