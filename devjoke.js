const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "devjoke",
    aliases: ["dj", "devjokes"],

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const jokes = [
            "Why do programmers confuse Halloween and Christmas? Because OCT 31 == DEC 25.",
            "I changed my password to 'incorrect' so the computer reminds me when I forget.",
            "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
            "There are only 10 types of people: those who understand binary and those who don't.",
            "Why do developers never sleep? Because sleep is a bug they can't patch.",
            "A C++ developer walks into a bar and asks for 1.0000001 beers. The bartender says: 'Get out, we don't serve floats here.'",
            "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
            "What do you call a programmer who doesn't comment their code? An optimist.",
            "Why do Python programmers wear glasses? Because they can't C#.",
            "A programmer's wife says: Go to the store and get a loaf of bread. If they have eggs, get a dozen. He comes home with 12 loaves of bread."
        ];
        const pick = jokes[Math.floor(Math.random() * jokes.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: pick, contextInfo }, { quoted: msg });
    }
};
