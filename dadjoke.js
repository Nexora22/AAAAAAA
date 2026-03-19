const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "dadjoke",
    aliases: ["dad", "badjoke"],
    description: "Get a dad joke",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '👨', key: msg.key } });
        
        const jokes = [
            "I'm afraid for the calendar. Its days are numbered.",
            "I used to hate facial hair, but then it grew on me.",
            "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
            "What do you call a fake noodle? An impasta.",
            "I used to play piano by ear. Now I use my hands.",
            "Why don't scientists trust atoms? Because they make up everything.",
            "I'm reading a book about anti-gravity. It's impossible to put down.",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
            "Why did the bicycle fall over? Because it was two-tired.",
            "What do you call a bear with no teeth? A gummy bear."
        ];
        
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "👨 *DAD JOKE*\n\n" + joke,
            contextInfo 
        }, { quoted: msg });
    }
};
