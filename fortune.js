const { createForwardedContext } = require('./_helpers');

const fortunes = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A fresh start will put you on your way.",
    "A friend asks only for your time not your money.",
    "A good way to keep healthy is to eat more Chinese food.",
    "A smile is your passport into the hearts of others.",
    "An unexpected event will bring you fortune.",
    "At least one of your wishes will come true.",
    "Believe it can be done and you will find a way.",
    "Change can hurt, but it leads a path to something better.",
    "Enjoy the good luck a companion brings you.",
    "From now on your kindness will lead you to success.",
    "Get ready for an exciting adventure.",
    "Hard work pays off in the future, laziness pays off now.",
    "Help! I'm trapped in a fortune cookie factory!",
    "If you have something good in your life, don't let it go!",
    "If you look at what you have in life, you'll always have more.",
    "It is now, and in this world, that we must live.",
    "Let the heart decide, the mind will follow.",
    "Life is what happens when you're busy making other plans.",
    "Love will find you when you least expect it.",
    "Meeting adversity well is the source of your strength.",
    "New ideas could be profitable.",
    "Now is a good time to buy stock.",
    "Old love is not forgotten, but new love brings fresh hope.",
    "Someone is thinking of you.",
    "Stay away from people who make you feel stupid.",
    "Success is coming.",
    "The best is yet to come.",
    "The fortune you seek is in another cookie.",
    "The love of your life is right in front of your eyes.",
    "The only way to have a friend is to be one.",
    "There is no greater pleasure than seeing your loved ones prosper.",
    "Time is a great healer, but a great beautifier.",
    "Today, you will conquer the world.",
    "Your creative nature will lead you to success.",
    "Your dream will come true.",
    "Your great attention to detail will lead to success."
];

module.exports = {
    name: "fortune",
    aliases: ["fortunecookie", "lucky"],
    description: "Get your daily fortune",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🍪', key: msg.key } });
        
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `🍪 *FORTUNE COOKIE*\n\n"${fortune}"\n\n✨ Good luck!`,
            contextInfo 
        }, { quoted: msg });
    }
};
