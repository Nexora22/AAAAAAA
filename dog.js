const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "dog",
    aliases: ["puppy", "doggo", "dogs"],
    description: "Get a random dog picture",

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        
        try {
            // Send reaction
            await sock.sendMessage(from, { react: { text: "🐕", key: msg.key } });

            // Fetch random dog image
            const response = await axios.get("https://dog.ceo/api/breeds/image/random");
            
            if (!response.data?.message) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(from, { 
                    text: "🐶 Failed to get dog image. Try again!", 
                    contextInfo 
                }, { quoted: msg });
                return;
            }

            const imageUrl = response.data.message;
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                image: { url: imageUrl }, 
                caption: "🐶 Woof! Here's a cute dog for you!",
                contextInfo
            }, { quoted: msg });

            // Success reaction
            await sock.sendMessage(from, { react: { text: "❤️", key: msg.key } });

        } catch (error) {
            console.error("Dog command error:", error);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🐶 Error getting dog image. Please try again!", 
                contextInfo 
            }, { quoted: msg });
        }
    }
};
