const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "date",
    aliases: ["today", "calendar"],
    description: "Get current date and day info",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '📅', key: msg.key } });
        
        const now = new Date();
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();
        
        const formatted = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        const timeNow = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        // Days until end of year
        const endOfYear = new Date(year, 11, 31);
        const daysLeft = Math.ceil((endOfYear - now) / (1000 * 60 * 60 * 24));
        
        // Week number
        const startOfYear = new Date(year, 0, 1);
        const pastDays = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
        const weekNum = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `📅 *DATE & TIME*\n\n` +
                  `*Day:* ${dayName}\n` +
                  `*Date:* ${monthName} ${date}, ${year}\n` +
                  `*Full:* ${formatted}\n\n` +
                  `⏰ *Time:* ${timeNow}\n\n` +
                  `📊 *Info:*\n` +
                  `Week ${weekNum} of ${year}\n` +
                  `${daysLeft} days until New Year`,
            contextInfo 
        }, { quoted: msg });
    }
};
