const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "tongue",
    aliases: ["twister", "tonguetwister"],
    description: "Get a tongue twister",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '👅', key: msg.key } });
        
        const twisters = [
            "She sells seashells by the seashore.",
            "Peter Piper picked a peck of pickled peppers.",
            "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
            "Betty Botter bought some butter, but she said the butter's bitter.",
            "If you must cross a course cross cow across a crowded cow crossing, cross the cross coarse cow across the crowded cow crossing carefully.",
            "Unique New York, you know you need unique New York.",
            "Red lorry, yellow lorry, red lorry, yellow lorry.",
            "Six slippery snails slid slowly seaward.",
            "Which wristwatches are Swiss wristwatches?",
            "Around the rugged rocks the ragged rascal ran."
        ];
        
        const twister = twisters[Math.floor(Math.random() * twisters.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "👅 *TONGUE TWISTER*\n\n" + twister,
            contextInfo 
        }, { quoted: msg });
    }
};
