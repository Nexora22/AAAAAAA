const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "If you really look closely, most overnight successes took a long time.", author: "Steve Jobs" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" }
];

module.exports = {
    name: "quote",
    aliases: ["quotes", "inspire", "inspirational"],
    description: "Get an inspirational quote",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '💬', key: msg.key } });
        
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `💬 *QUOTE OF THE DAY*\n\n"${quote.text}"\n\n— ${quote.author}`,
            contextInfo 
        }, { quoted: msg });
    }
};
