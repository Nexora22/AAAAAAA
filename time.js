const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "time",
    aliases: ["clock", "datetime", "now"],
    description: "Get current time in different timezones",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        const timezones = {
            'local': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'lagos': 'Africa/Lagos',
            'london': 'Europe/London',
            'new york': 'America/New_York',
            'tokyo': 'Asia/Tokyo',
            'dubai': 'Asia/Dubai',
            'paris': 'Europe/Paris',
            'sydney': 'Australia/Sydney',
            'india': 'Asia/Kolkata',
            'gmt': 'GMT'
        };
        
        const tzArg = args.join(' ').toLowerCase();
        const selectedTz = timezones[tzArg] || timezones['local'];
        
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: selectedTz,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            
            const timeStr = formatter.format(now);
            const contextInfo = createForwardedContext();
            
            await sock.sendMessage(from, { 
                text: `🕐 Current Time\\n\\n${timeStr}\\n\\nTimezone: ${selectedTz}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Invalid timezone. Try: london, new york, tokyo, dubai, paris, sydney, india, or lagos",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
