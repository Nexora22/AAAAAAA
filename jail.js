const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "jail",
    aliases: ["wanted", "prison", "arrest"],
    description: "Send someone to jail (meme)",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "Someone";
        
        const contextInfo = createForwardedContext();
        
        if (args.length === 0) {
            await sock.sendMessage(from, { 
                text: "🚔 *JAIL COMMAND*\n\n━━━━━━━━━━━━━━━━\n\nUsage: !jail <name>\n\nExample: !jail John\n\n🚨 Send someone to jail! (Fun meme)",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const target = args.join(" ");
        const crimes = [
            "Being too handsome",
            "Stealing hearts",
            "Bad puns",
            "Cracking bad jokes",
            "Spreading vibes",
            "Being too cool",
            "Loving too much",
            "Being awesome",
            "Existing too much"
        ];
        const crime = crimes[Math.floor(Math.random() * crimes.length)];
        
        await sock.sendMessage(from, { 
            text: `🚔 *WANTED: ${target}*\n\n━━━━━━━━━━━━━━━━\n\n📜 *CRIME:* ${crime}\n\n💰 *REWARD:* $1,000,000\n\n👤 *STATUS:* LOCKED UP!\n\n━━━━━━━━━━━━━━━━\n\n😅 Just a joke! No one is actually arrested!`,
                contextInfo 
            }, { quoted: msg });
    }
};
