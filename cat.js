const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "cat",
    aliases: ["meow", "kitten", "cats"],
    description: "Get a random cat picture",

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        
        try {
            // Send reaction
            await sock.sendMessage(from, { react: { text: "🐱", key: msg.key } });

            // Fetch random cat image
            const response = await axios.get("https://api.thecatapi.com/v1/images/search");
            const imageUrl = response.data[0]?.url;

            if (!imageUrl) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(from, { 
                    text: "😿 Failed to get cat image. Try again!", 
                    contextInfo 
                }, { quoted: msg });
                return;
            }

            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                image: { url: imageUrl }, 
                caption: "🐱 Meow! Here's a cute cat for you!",
                contextInfo
            }, { quoted: msg });

            // Success reaction
            await sock.sendMessage(from, { react: { text: "❤️", key: msg.key } });

        } catch (error) {
            console.error("Cat command error:", error);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "😿 Error getting cat image. Please try again!", 
                contextInfo 
            }, { quoted: msg });
        }
    }
};
