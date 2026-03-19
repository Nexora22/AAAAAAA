const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "insult",
    aliases: ["roast", "burn"],
    description: "Get a friendly insult",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '😏', key: msg.key } });
        
        const insults = [
            "You're proof that evolution can go in reverse.",
            "The first day i took you to a market, u were missing inside garri bowl.",
            "Your mother is fatter dan the whole universe.",
            "You treked to the extent your skelenton forsaked you to a cab.",
            "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
            "You bring everyone so much joy... when you leave.",
            "Whenever you pass our estate, everyone always shuts the doors and cottons cus of ur ugliness.",
            "I'd agree with you but then we'd both be wrong.",
            "You're not stupid; you just have bad luck thinking.",
            "A mad man is better than you destiny.",
            "You passed my backyard and in the process, you impregnated all my banana.",
            "The Greatest man in your village fears Knockout.",
            "If you were any more in love with yourself, you'd be your own crush."
        ];
        
        const insult = insults[Math.floor(Math.random() * insults.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: "😏 *ROAST*\n\n" + insult,
            contextInfo 
        }, { quoted: msg });
    }
};
