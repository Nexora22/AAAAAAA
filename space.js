const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "spacefact",
    aliases: ["space", "nasa"],
    description: "Get random space facts",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🚀', key: msg.key } });
        
        const facts = [
            "There are more stars in the universe than grains of sand on all Earth's beaches.",
            "One million Earths could fit inside the Sun.",
            "Saturn would float if you put it in water.",
            "The footprints on the Moon will stay there for millions of years.",
            "A year on Venus is shorter than a day on Venus.",
            "Neutron stars can spin at 600 rotations per second.",
            "The largest known star (UY Scuti) could fit billions of Suns inside it.",
            "Space is completely silent because there's no air for sound to travel through.",
            "The Milky Way galaxy is on a collision course with the Andromeda galaxy.",
            "The International Space Station travels at about 28,000 km/h.",
            "There is a planet made entirely of diamonds (55 Cancri e).",
            "The Sun loses 4 million tons of mass every second.",
            "A day on Mars is only 37 minutes longer than a day on Earth.",
            "Jupiter's Great Red Spot is a storm that has been raging for over 400 years.",
            "The Voyager 1 spacecraft is the most distant human-made object from Earth.",
            "Light from the Sun takes about 8 minutes to reach Earth.",
            "There are more than 100 billion galaxies in the observable universe.",
            "The Moon is slowly drifting away from Earth (about 3.8 cm per year).",
            "The hottest planet in our solar system is Venus, not Mercury.",
            "A black hole the mass of a coin would have stronger gravity than Earth."
        ];
        
        const fact = facts[Math.floor(Math.random() * facts.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🚀 *SPACE FACT*\n\n${fact}`,
            contextInfo 
        }, { quoted: msg });
    }
};
