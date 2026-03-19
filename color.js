const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "color",
    aliases: ["colour", "colorhex", "hexcolor"],
    description: "Get color information",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎨 *COLOR INFO*\n\nUsage: !color <hex or color name>\n\nExample:\n!color #FF5733\n!color red",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        await sock.sendMessage(from, { react: { text: '🎨', key: msg.key } });
        
        let input = args.join(' ').toLowerCase();
        
        const colors = {
            red: "#FF0000", blue: "#0000FF", green: "#008000", yellow: "#FFFF00",
            orange: "#FFA500", purple: "#800080", pink: "#FFC0CB", black: "#000000",
            white: "#FFFFFF", gray: "#808080", cyan: "#00FFFF", magenta: "#FF00FF"
        };
        
        let hex = colors[input];
        
        if (!hex && input.startsWith('#')) {
            hex = input;
        }
        
        if (!hex) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "Color not recognized.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const text = "🎨 *COLOR INFO*\n\nHex: *" + hex + "*\n\nColor preview:\n█████████████";
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { text: text, contextInfo }, { quoted: msg });
    }
};
