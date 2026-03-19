const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "rps",
    aliases: ["rockpaperscissors", "roshambo"],

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const userChoice = (args[0] || "").toLowerCase();
        const valid = ["rock", "paper", "scissors", "r", "p", "s"];
        
        // Map short forms to full
        const choiceMap = { r: "rock", p: "paper", s: "scissors" };
        const userFullChoice = choiceMap[userChoice] || userChoice;
        
        if (!valid.includes(userChoice)) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎮 Rock Paper Scissors\n\nUsage: !rps rock|paper|scissors\nAliases: r, p, s", 
                contextInfo 
            }, { quoted: msg });
            return;
        }

        const botChoice = valid[Math.floor(Math.random() * 3)];
        const choices = ["rock", "paper", "scissors"];
        const botFullChoice = choices[Math.floor(Math.random() * 3)];
        
        let result = "🤝 It's a Draw!";
        if (
            (userFullChoice === "rock" && botFullChoice === "scissors") ||
            (userFullChoice === "paper" && botFullChoice === "rock") ||
            (userFullChoice === "scissors" && botFullChoice === "paper")
        ) {
            result = "🎉 You Win!";
        } else if (userFullChoice !== botFullChoice) {
            result = "🤖 Bot Wins!";
        }

        const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, {
            text: `🎮 Rock Paper Scissors\n\nYou: ${emojis[userFullChoice]} ${userFullChoice}\nBot: ${emojis[botFullChoice]} ${botFullChoice}\n\n${result}`,
            contextInfo
        }, { quoted: msg });
    }
};
