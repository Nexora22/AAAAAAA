const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "math",
    aliases: ["calculate", "calc", "maths"],
    description: "Calculate a math expression",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🧮 Math Calculator\n\nUsage: !math <expression>\n\nExamples:\n!math 2+2\n!math 10*5\n!math 100/5\n!math 2^8",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const expression = args.join(' ');
        
        try {
            // Simple math evaluation (basic operations only)
            let e = expression.replace(/\^/g, '**');
            
            // Only allow numbers, operators, parentheses, and pi/e
            if (!/^[0-9+\-*/().pi\\s]+$/.test(e)) {
                throw new Error('Invalid characters');
            }
            
            // Replace pi and e with values
            e = e.replace(/pi/gi, String(Math.PI)).replace(/\be\b/, String(Math.E));
            
            const result = eval(e);
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🧮 Calculator\n\nExpression: ${expression}\n\nResult: ${result}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Invalid expression!\n\nPlease check your math expression and try again.",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
