const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

// Truth or Dare questions
const truths = [
    "What is your biggest fear?",
    "What is the most embarrassing thing you've ever done?",
    "What is a secret you've never told anyone?",
    "What is your biggest regret?",
    "Who is your secret crush?",
    "What is the most trouble you've ever been in?",
    "What is the worst gift you've ever received?",
    "Have you ever lied about your age?",
    "What is the most embarrassing thing in your search history?",
    "Have you ever cheated on a test?",
    "What is your guilty pleasure?",
    "Who was your worst kiss?",
    "What is the weirdest dream you've ever had?",
    "Have you ever stalked an ex on social media?",
    "What is the most childish thing you still do?",
    "What is your biggest pet peeve?",
    "Have you ever been in love with two people at once?",
    "What is the biggest lie you've ever told?",
    "What is something you're glad you'll never have to do again?",
    "What is the most embarrassing thing your parents have caught you doing?"
];

const dares = [
    "Do the chicken dance for 30 seconds",
    "Sing the chorus of your favorite song",
    "Let the group DM someone from your contacts",
    "Post an embarrassing photo on your story and delete it after 1 minute",
    "Do 10 pushups",
    "Eat a spoonful of hot sauce",
    "Talk in an accent for the next 3 rounds",
    "Let someone look through your camera roll for 30 seconds",
    "Do your best impression of another player",
    "Show the last thing you texted to the group",
    "Try to lick your elbow",
    "Call a random contact and sing happy birthday",
    "Do your best celebrity impression",
    "Let the group give you a new haircut (with imaginary scissors)",
    "Text your crush 'I like you'",
    "Do a dramatic reading of your last sent message",
    "Let someone send a message from your phone",
    "Eat a raw garlic clove",
    "Do your best animal impression",
    "Hold a plank for 30 seconds"
];

module.exports = {
    name: "truthordare",
    aliases: ["tod", "truthdare", "truth"],
    description: "Play Truth or Dare",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🎯', key: msg.key } });
        
        const choice = args[0]?.toLowerCase();
        let text;
        
        if (choice === 'dare' || choice === 'd') {
            const dare = dares[Math.floor(Math.random() * dares.length)];
            text = `🎯 *DARE*\n\n${dare}`;
        } else if (choice === 'random' || choice === 'r') {
            const isTruth = Math.random() > 0.5;
            if (isTruth) {
                const truth = truths[Math.floor(Math.random() * truths.length)];
                text = `🎯 *TRUTH*\n\n${truth}`;
            } else {
                const dare = dares[Math.floor(Math.random() * dares.length)];
                text = `🎯 *DARE*\n\n${dare}`;
            }
        } else {
            const truth = truths[Math.floor(Math.random() * truths.length)];
            text = `🎯 *TRUTH*\n\n${truth}\n\n💡 Use !tod dare for a dare`;
        }
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: text,
            contextInfo 
        }, { quoted: msg });
    }
};
