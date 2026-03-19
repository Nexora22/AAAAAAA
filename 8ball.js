const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "8ball",
    aliases: ["8ball", "magicball", "mb"],

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, {
                text: "🔮 Magic 8Ball\n\nUsage: !8ball <question>\n\nExample: !8ball Will I become rich?",
                contextInfo
            }, { quoted: msg });
            return;
        }

        const answers = [
            "🎱 Yes, definitely!",
            "🎱 Without a doubt!",
            "🎱 Most definitely!",
            "🎱 Outlook good!",
            "🎱 Yes!",
            "🎱 Signs point to yes!",
            "🎱 Reply hazy, try again!",
            "🎱 Ask again later!",
            "🎱 Better not tell you now!",
            "🎱 Cannot predict now!",
            "🎱 Concentrate and ask again!",
            "🎱 Don't count on it!",
            "🎱 My reply is no!",
            "🎱 My sources say no!",
            "🎱 Outlook not so good!",
            "🎱 Very doubtful!",
            "🎱 Absolutely!",
            "🎱 It's certain!",
            "🎱 You may rely on it!",
            "🎱 As I see it, yes!"
        ];

        const pick = answers[Math.floor(Math.random() * answers.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, {
            text: `🔮 Magic 8Ball\n\nQuestion: ${args.join(" ")}\n\n${pick}`,
            contextInfo
        }, { quoted: msg });
    }
};
