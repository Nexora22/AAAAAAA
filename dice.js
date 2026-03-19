const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "8ball",
    aliases: ["8b", "magicball", "fortune"],
    description: "Ask the magic 8 ball",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎱 *MAGIC 8 BALL*\n\nUsage: !8ball <question>\n\nExample:\n!8ball Will I win the lottery?",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🎱', key: msg.key } });
        
        const answers = [
            "Yes, definitely!",
            "It is certain.",
            "Without a doubt.",
            "Yes - definitely!",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes!",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ];
        
        const answer = answers[Math.floor(Math.random() * answers.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "🎱 *MAGIC 8 BALL*\n\nQuestion: " + args.join(' ') + "\n\nAnswer: *" + answer + "*",
            contextInfo 
        }, { quoted: msg });
    }
};
