const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "github",
    aliases: ["gh", "repo"],
    description: "Get GitHub repository information",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🐙 *GITHUB INFO*\n\nUsage: !github <username>/<repo>\n\nExample:\n!github facebook/react\n!github nodejs/node`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const repo = args.join('/');
        
        await sock.sendMessage(from, { react: { text: '🐙', key: msg.key } });
        
        try {
            const response = await axios.get(`https://api.github.com/repos/${repo}`);
            
            const r = response.data;
            
            const text = `🐙 *${r.full_name}*\n\n` +
                         `📝 ${r.description || 'No description'}\n\n` +
                         `⭐ Stars: *${r.stargazers_count.toLocaleString()}*\n` +
                         `🍴 Forks: *${r.forks_count.toLocaleString()}*\n` +
                         `👁️ Watchers: *${r.watchers_count.toLocaleString()}*\n` +
                         `📄 Language: ${r.language || 'N/A'}\n\n` +
                         `🔗 ${r.html_url}`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Repository not found.\n\nUse: !github username/repo`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
