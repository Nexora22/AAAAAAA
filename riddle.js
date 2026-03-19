const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

// Fun Commands - Riddles
const riddles = [
    { q: "What has keys but can't open locks?", a: "A piano" },
    { q: "What can you hold in your left hand but not in your right?", a: "Your right elbow" },
    { q: "What gets wetter the more it dries?", a: "A towel" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
    { q: "What has words but never speaks?", a: "A book" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What goes up but never comes down?", a: "Your age" },
    { q: "What is always in front of you but can't be seen?", a: "The future" },
    { q: "I speak without a mouth and hear without ears. What am I?", a: "A phone" },
    { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
    { q: "What can be cracked, made, told, and played?", a: "A joke" },
    { q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", a: "A map" },
    { q: "What has many teeth but can't bite?", a: "A comb" },
    { q: "What is so fragile that saying its name breaks it?", a: "Silence" }
];

module.exports = {
    name: "riddle",
    aliases: ["riddles", "riddleme"],
    description: "Get a random riddle to solve",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🧩', key: msg.key } });
        
        const riddle = riddles[Math.floor(Math.random() * riddles.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🧩 *RIDDLE*\n\n${riddle.q}\n\n💡 Type !answer <your answer> to answer`,
            contextInfo 
        }, { quoted: msg });
    }
};
