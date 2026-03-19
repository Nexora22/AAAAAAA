const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "logo",
    aliases: ["make logo", "brand", "text art"],
    description: "Create logos and text designs",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        // Check for search query
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `✨ *Logo Generator*\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                      `*Usage:* !logo <text>\n\n` +
                      `*Styles:*\n` +
                      `• !logo <text> --retro\n` +
                      `• !logo <text> --modern\n` +
                      `• !logo <text> --gaming\n` +
                      `• !logo <text> --neon\n` +
                      `• !logo <text> --metal\n\n` +
                      `*Examples:*\n` +
                      `• !logo NEXORA\n` +
                      `• !logo MyBrand --gaming\n` +
                      `• !logo Nexora --neon`,
                contextInfo 
            }, { quoted: msg });
            return;
        }

        let text = args.join(' ');
        let style = 'default';

        // Check for style flags
        if (text.includes('--retro')) {
            style = 'retro';
            text = text.replace(/--retro/g, '').trim();
        } else if (text.includes('--modern')) {
            style = 'modern';
            text = text.replace(/--modern/g, '').trim();
        } else if (text.includes('--gaming') || text.includes('--game')) {
            style = 'gaming';
            text = text.replace(/--gaming|--game/g, '').trim();
        } else if (text.includes('--neon')) {
            style = 'neon';
            text = text.replace(/--neon/g, '').trim();
        } else if (text.includes('--metal')) {
            style = 'metal';
            text = text.replace(/--metal/g, '').trim();
        }

        if (!text) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "✨ Please provide text for the logo!", 
                contextInfo 
            }, { quoted: msg });
            return;
        }

        if (text.length > 20) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Text too long! Please use 20 characters or less.", 
                contextInfo 
            }, { quoted: msg });
            return;
        }

        try {
            // Send typing indicator
            await sock.sendPresenceUpdate('composing', from);
            
            // Loading reaction
            await sock.sendMessage(from, { react: { text: '✨', key: msg.key } });

            // Generate logo using different ASCII art styles
            const logos = {
                retro: `
╔══════════════════════════╗
║      ${text.toUpperCase()}       ║
║     【 Retro Style 】    ║
╚══════════════════════════╝`,
                modern: `
┌─────────────────────────┐
│      ${text.toUpperCase()}       │
│     ◇ Modern Style ◇    │
└─────────────────────────┘`,
                gaming: `
░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░
▒█      ${text.toUpperCase()}       █▒
▒█     【 Gaming Style 】  █▒
░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░`,
                neon: `
◈━━━━━━━━━━━━━━━━━━━━━◈
┃  ${text.toUpperCase().padEnd(14)}  ┃
┃  ▸ Neon Style ◂   ┃
◈━━━━━━━━━━━━━━━━━━━━━━◈`,
                metal: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓      ${text.toUpperCase()}       ▓▓
▓▓     ══ Metal ══     ▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`,
                default: `
╭──────────────────────╮
│     ${text.toUpperCase()}      │
│    ◆ Default Style ◆   │
╰──────────────────────╯`
            };

            const logo = logos[style] || logos.default;

            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `✨ *Logo Generated*\n\n${logo}\n\nStyle: ${style}`, 
                contextInfo 
            }, { quoted: msg });
            
            // Success reaction
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            
        } catch (err) {
            console.error('Logo error:', err);
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to generate logo.", 
                contextInfo 
            }, { quoted: msg });
        }
    }
}
