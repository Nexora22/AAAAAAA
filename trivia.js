const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "trivia",
    aliases: ["quiz", "question"],
    description: "Get a random trivia question",

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        
        try {
            const response = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
            const data = response.data.results[0];
            
            if (!data) throw new Error("No data");
            
            // Decode HTML entities
            const decode = (str) => str.replace(/"/g, '"').replace(/&#039;/g, "'").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
            
            const question = decode(data.question);
            const correctAnswer = decode(data.correct_answer);
            const allAnswers = [...data.incorrect_answers.map(decode), correctAnswer].sort();
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🧠 Trivia Question:\\n\\n${question}\\n\\nAnswers:\\n${allAnswers.map((a, i) => `${i + 1}. ${a}`).join("\\n")}\\n\\n💡 Reply with the correct number!`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to get trivia question. Please try again!",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
