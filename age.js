const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "age",
    description: "Calculate age from birthdate",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🎂 *AGE CALCULATOR*\n\nUsage: !age <birthdate>\n\nFormats:\n!age 2000-01-01\n!age 01/01/2000\n!age January 1 2000`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🎂', key: msg.key } });
        
        const input = args.join(' ');
        let birthDate;
        
        // Try different date formats
        const formats = [
            /^(\d{4})-(\d{1,2})-(\d{1,2})$/,  // YYYY-MM-DD
            /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,  // MM/DD/YYYY
        ];
        
        let matched = false;
        
        // Try YYYY-MM-DD
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(input)) {
            birthDate = new Date(input);
            matched = true;
        }
        // Try MM/DD/YYYY
        else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(input)) {
            const parts = input.split('/');
            birthDate = new Date(parts[2], parts[0] - 1, parts[1]);
            matched = true;
        }
        // Try natural language
        else {
            birthDate = new Date(input);
            matched = !isNaN(birthDate.getTime());
        }
        
        if (!matched || isNaN(birthDate.getTime())) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Invalid date format. Try:\n!age 2000-01-01\n!age 01/01/2000`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const now = new Date();
        const ageMs = now - birthDate;
        const ageDate = new Date(ageMs);
        
        const years = Math.floor(ageMs / (365.25 * 24 * 60 * 60 * 1000));
        const months = ageDate.getMonth();
        const days = ageDate.getDate() - 1;
        
        const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < now) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - now) / (24 * 60 * 60 * 1000));
        
        const text = `🎂 *AGE RESULT*\n\n` +
                     `Birthdate: ${birthDate.toDateString()}\n\n` +
                     `Current Age: *${years}* years, *${months}* months, *${days}* days\n\n` +
                     `Days until next birthday: *${daysUntilBirthday}*`;
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
