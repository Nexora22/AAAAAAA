const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "countdown",
    aliases: ["timer", "count"],
    description: "Set a countdown timer",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '⏱️', key: msg.key } });
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `⏱️ *COUNTDOWN TIMER*\n\nUsage: !countdown <seconds>\n\nExample:\n!countdown 10 (10 seconds)\n!countdown 60 (1 minute)\n!countdown 300 (5 minutes)`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        let seconds = parseInt(args[0]);
        
        if (isNaN(seconds) || seconds < 1) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Please enter a valid number of seconds.`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        if (seconds > 3600) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Maximum is 3600 seconds (1 hour).`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const formatTime = (s) => {
            const mins = Math.floor(s / 60);
            const secs = s % 60;
            return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        };
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `⏱️ *COUNTDOWN STARTED*\n\nTime: *${formatTime(seconds)}*\n\nStarting now...`,
            contextInfo 
        }, { quoted: msg });
        
        const interval = setInterval(async () => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(interval);
                await sock.sendMessage(from, { 
                    text: `⏰ *TIME'S UP!*\n\nYour countdown has finished!`,
                    contextInfo: createForwardedContext()
                });
            }
        }, 1000);
    }
};
