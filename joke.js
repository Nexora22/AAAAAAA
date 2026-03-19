const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "joke",
    aliases: ["jokes"],

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const jokes = [
            "Why did the JavaScript developer go broke? Because he kept using up all his cache.",
            "I would tell you a UDP joke, but you might not get it.",
            "Debugging: being the detective in a crime movie where you are also the murderer.",
            "There are two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
            "Why do Java developers wear glasses? Because they can't C#.",
            "A programmer's wife tells him: Go to the store and get a loaf of bread. If they have eggs, get a dozen. He comes home with 12 loaves of bread.",
            "Why did the developer go to therapy? Because he had too many issues.",
            "There is no place like 127.0.0.1",
            "The best thing about a keyboard joke is your ALMOST gets it.",
            "Why do programmers hate nature? It has too many bugs."
        ];
        const pick = jokes[Math.floor(Math.random() * jokes.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: pick, contextInfo }, { quoted: msg });
    }
};
