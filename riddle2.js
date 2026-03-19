const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "todayspecial",
    aliases: ["today", "specialday"],
    description: "Get today's special day",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '🎉', key: msg.key } });
        
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        const holidays = {
            "1-1": "New Year's Day",
            "1-20": "World Day of Snow",
            "2-14": "Valentine's Day",
            "3-8": "International Women's Day",
            "3-14": "Pi Day",
            "4-1": "April Fools' Day",
            "4-22": "Earth Day",
            "5-1": "International Workers' Day",
            "6-1": "Children's Day",
            "7-4": "Independence Day (USA)",
            "8-12": "International Youth Day",
            "10-31": "Halloween",
            "11-11": "Singles Day",
            "12-25": "Christmas Day"
        };
        
        const key = month + "-" + day;
        const holiday = holidays[key];
        
        if (holiday) {
            const text = "🎉 *TODAY'S SPECIAL DAY*\n\n*" + holiday + "*\n\nHappy celebrating!";
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
        } else {
            const text = "🎉 *TODAY*\n\nToday is a regular day.\n\n*Month:* " + today.toLocaleString('default', { month: 'long' }) + "\n*Day:* " + day;
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
        }
    }
};
