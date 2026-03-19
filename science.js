const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "sciencefact",
    aliases: ["science", "scifact"],
    description: "Get random science facts",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🔬', key: msg.key } });
        
        const facts = [
            "The human body contains enough carbon to make 900 pencils.",
            "Hot water freezes faster than cold water in some conditions (Mpemba effect).",
            "There are more atoms in a glass of water than glasses of water in all the oceans.",
            "The speed of light is slower than it used to be (the universe is expanding).",
            "A teaspoon of neutron star material would weigh about 6 billion tons.",
            "Venus is the only planet that spins clockwise.",
            "Your stomach gets a new lining every 3-4 days.",
            "The human brain uses 20% of the body's total energy.",
            "Sound travels about 4 times faster in water than in air.",
            "Gold can be made into a thread and used in embroidery.",
            "A cloud can weigh more than a million pounds.",
            "The Eiffel Tower can grow 15 cm taller during hot summer days.",
            "A jiffy is an actual unit of time: 1/100th of a second.",
            "The average person walks the equivalent of three times around the world in their lifetime.",
            "Sharks existed before trees.",
            "Bananas are slightly radioactive due to their potassium content.",
            "A flea can accelerate faster than the Space Shuttle.",
            "The human nose can detect over 1 trillion different scents.",
            "Water can boil and freeze at the same time (triple point).",
            "There are more possible chess games than atoms in the observable universe."
        ];
        
        const fact = facts[Math.floor(Math.random() * facts.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🔬 *SCIENCE FACT*\n\n${fact}`,
            contextInfo 
        }, { quoted: msg });
    }
};
