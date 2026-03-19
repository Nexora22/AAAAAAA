const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "calculate",
    aliases: ["calc", "maths", "math"],
    description: "Calculate mathematical expressions",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🧮 *CALCULATOR*\n\nUsage: !calculate <expression>\n\nExamples:\n!calculate 2 + 2\n!calculate 10 * 5\n!calculate 2^8\n!calculate sqrt(144)\n!calculate 25% of 200\n\nSupported:\n+ - * / ^ % sqrt`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        let expression = args.join(' ').toLowerCase();
        
        await sock.sendMessage(from, { react: { text: '🧮', key: msg.key } });
        
        try {
            // Handle percentage
            if (expression.includes('%')) {
                const percentMatch = expression.match(/(\d+)\s*%\s*of\s*(\d+)/i);
                if (percentMatch) {
                    const result = (parseFloat(percentMatch[1]) / 100) * parseFloat(percentMatch[2]);
                    const contextInfo = createForwardedContext();
                    await sock.sendMessage(from, { 
                        text: `🧮 *CALCULATION*\n\n${percentMatch[1]}% of ${percentMatch[2]} = *${result}*`,
                        contextInfo 
                    }, { quoted: msg });
                    return;
                }
            }
            
            // Handle sqrt
            expression = expression.replace(/sqrt\((\d+)\)/g, 'Math.sqrt($1)');
            expression = expression.replace(/\^/g, '**');
            
            // Validate expression (only allow numbers and math operators)
            if (!/^[\d\s+\-*/().Mathsqrt*]+$/.test(expression)) {
                throw new Error('Invalid characters');
            }
            
            const result = eval(expression);
            
            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid result');
            }
            
            const formatted = Number.isInteger(result) ? result : result.toFixed(4).replace(/\.?0+$/, '');
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🧮 *CALCULATION*\n\n${args.join(' ')} = *${formatted}*`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Invalid expression.\n\nUse: !calc <expression>\nExample: !calc 2 + 2`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
