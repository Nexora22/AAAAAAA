const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "bomb",
    aliases: ["spam", "nuke"],

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, {
                text: "💣 Bomb Command\n\nUsage: !bomb <message> [count]\n\nExample: !bomb Hello 5",
                contextInfo
            }, { quoted: msg });
            return;
        }

        const isGroup = from.endsWith('@g.us');
        
        // Check if it's a group
        if (!isGroup) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, {
                text: "⚠️ This command only works in groups!",
                contextInfo
            }, { quoted: msg });
            return;
        }

        // Parse count from args (last argument if it's a number)
        let count = 5; // default
        let message = args.join(" ");
        
        const lastArg = args[args.length - 1];
        if (/^\d+$/.test(lastArg) && parseInt(lastArg) > 0) {
            count = Math.min(parseInt(lastArg), 20); // Max 20 messages
            message = args.slice(0, -1).join(" ");
        }
        
        if (!message) {
            message = "💣 BOOM!";
        }

        const contextInfo = createForwardedContext();
        
        for (let i = 0; i < count; i++) {
            await sock.sendMessage(from, {
                text: `${message}\n\n${i + 1}/${count}`,
                contextInfo
            }, { quoted: msg });
        }
    }
};
