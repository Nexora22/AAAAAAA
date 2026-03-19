const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "pokemon",
    aliases: ["poke", "pokedex"],
    description: "Get Pokemon information",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🎮 *POKEDEX*\n\nUsage: !pokemon <name or number>\n\nExample:\n!pokemon pikachu\n!pokemon 25`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const query = args.join(' ').toLowerCase();
        
        await sock.sendMessage(from, { react: { text: '🎮', key: msg.key } });
        
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`);
            
            const p = response.data;
            const types = p.types.map(t => t.type.name).join(', ');
            const abilities = p.abilities.map(a => a.ability.name).join(', ');
            const stats = p.stats.slice(0, 3).map(s => `${s.stat.name}: ${s.base_stat}`).join('\n');
            
            const text = `🎮 *${p.name.toUpperCase()}* #${p.id}\n\n` +
                         `🔮 Types: ${types}\n\n` +
                         `💪 Abilities: ${abilities}\n\n` +
                         `📊 Base Stats:\n${stats}\n\n` +
                         `⚖️ Height: ${p.height / 10}m\n` +
                         `⚖️ Weight: ${p.weight / 10}kg`;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Pokemon not found.\n\nTry: !pokemon pikachu`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
