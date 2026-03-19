const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "animal",
    aliases: ["animalfact", "facts"],
    description: "Get random animal facts",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🐾', key: msg.key } });
        
        const facts = [
            "Dolphins sleep with one eye open.",
            "Octopuses have three hearts.",
            "A group of flamingos is called a 'flamboyance'.",
            "Honey never spoils. You could eat 3000-year-old honey.",
            "Bananas are berries, but strawberries aren't.",
            "A day on Venus is longer than a year on Venus.",
            "Wombat poop is cube-shaped.",
            "Crows can recognize human faces.",
            "Sea otters hold hands while sleeping.",
            "Sloths can hold their breath longer than dolphins.",
            "A snail can sleep for 3 years.",
            "Butterflies taste with their feet.",
            "Elephants are the only animals that can't jump.",
            "A group of owls is called a 'parliament'.",
            "Penguins propose to their mates with a pebble.",
            "Dogs have wet noses to help absorb scent chemicals.",
            "Cats sleep for 70% of their lives.",
            "The unicorn is the national animal of Scotland.",
            "Bats are the only mammals that can fly.",
            "Sharks are older than trees."
        ];
        
        const fact = facts[Math.floor(Math.random() * facts.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🐾 *ANIMAL FACT*\n\n${fact}`,
            contextInfo 
        }, { quoted: msg });
    }
};
