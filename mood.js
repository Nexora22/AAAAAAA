const { createForwardedContext } = require('./_helpers');

const moods = [
    { emoji: "😄", mood: "HAPPY", desc: "You're radiating pure joy today! Spread that positivity!" },
    { emoji: "😢", mood: "SAD", desc: "Things will get better. Remember, even the darkest night ends with sunrise." },
    { emoji: "😡", mood: "ANGRY", desc: "Take a deep breath. Count to 10. You're stronger than your anger!" },
    { emoji: "🥰", mood: "LOVE", desc: "You're swimming in love! Share that warmth with others!" },
    { emoji: "😴", mood: "TIRED", desc: "Rest is important. Take a break, you've earned it!" },
    { emoji: "🤔", mood: "THINKING", desc: "Your mind is active. Great thoughts lead to great actions!" },
    { emoji: "😎", mood: "COOL", desc: "You're as cool as a cucumber! Nothing fazes you!" },
    { emoji: "🥳", mood: "PARTY", desc: "It's party time! Let the good vibes roll!" },
    { emoji: "😰", mood: "ANXIOUS", desc: "Take it easy. One step at a time. You've got this!" },
    { emoji: "🤩", mood: "EXCITED", desc: "Your energy is off the charts! Ride this wave!" },
    { emoji: "😌", mood: "PEACEFUL", desc: "Inner peace is your superpower. Namaste!" },
    { emoji: "🥺", mood: "HOPEFUL", desc: "Hope springs eternal! Great things are coming your way!" },
    { emoji: "😤", mood: "DETERMINED", desc: "Nothing can stop you! Onward to victory!" },
    { emoji: "🤭", mood: "SHY", desc: "Aw, how cute! Your timidity is adorable!" },
    { emoji: "😱", mood: "SHOCKED", desc: "Whoa! Take a moment to process this!" }
];

module.exports = {
    name: "mood",
    aliases: ["feeling", "emotion", "howami"],
    description: "Check your current mood",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.pushName || "You";
        
        const contextInfo = createForwardedContext();
        
        // If user provides a mood, check that
        if (args.length > 0) {
            const input = args.join(" ").toLowerCase();
            const found = moods.find(m => m.mood.toLowerCase().includes(input));
            
            if (found) {
                await sock.sendMessage(from, { 
                    text: `🎭 *MOOD CHECK:*\n\n${found.emoji} *${found.mood}*\n\n${found.desc}`,
                    contextInfo 
                }, { quoted: msg });
                return;
            }
        }
        
        // Random mood
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        
        await sock.sendMessage(from, { 
            text: `🎭 *Hey ${sender}!*\n\nYour mood right now:\n\n${randomMood.emoji} *${randomMood.mood}*\n\n_${randomMood.desc}_\n\n📝 Use: !mood <happy/sad/etc> to check specific mood`,
            contextInfo 
        }, { quoted: msg });
    }
};
