const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "hack",
    aliases: ["gamehack", "cheat"],
    description: "Generate random game hack codes",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎮 *GAME HACKS*\n\nUsage: !hack <game>\n\nAvailable games:\ngta\ncod\nfortnite\nminecraft\nroblox\ngenshin\npubg\nfreefire",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🎮', key: msg.key } });
        
        const game = args[0].toLowerCase();
        
        const hacks = {
            gta: ["Give $1,000,000 - GTA5-MONEY", "Unlock All Weapons - GTA5-WEAPONS", "Invincibility - GTA5-SHIELD"],
            cod: ["Unlimited Ammo - CODE-AMMO", "Speed Boost - CODE-SPEED", "No Recoil - CODE-ACCURACY"],
            fortnite: ["Unlimited V-Bucks - FORT-VBUCKS", "Free Skins - FORT-SKINS", "Win Zone Wars - FORT-WIN"],
            minecraft: ["Creative Mode - MC-CREATIVE", "Infinite Items - MC-INV", "Night Vision - MC-NIGHT"],
            roblox: ["Free Robux - RBX-FREE", "Premium Membership - RBX-PREMIUM", "Unlimited Coins - RBX-COINS"],
            genshin: ["Primogems x10000 - GEN-PRIMO", "Adventure Rank 60 - GEN-RANK", "All Characters - GEN-ALL"],
            pubg: ["Unlimited UC - PUBG-UC", "Airdrop x10 - PUBG-AIR", "VIP Membership - PUBG-VIP"],
            freefire: ["Free Diamonds - FF-DIAMONDS", "Elite Pass - FF-PASS", "Character Unlocked - FF-CHAR"]
        };
        
        const gameHacks = hacks[game];
        
        if (gameHacks) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎮 *HACK CODES FOR " + game.toUpperCase() + "*\n\n" + gameHacks.join('\n'),
                contextInfo 
            }, { quoted: msg });
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Game not found. Use !hack to see available games.",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
