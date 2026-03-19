const fs = require('fs');
const path = require('path');

const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbCFEZv60eBdlqXqQz20';
const CHANNEL_CODE = '0029VbCFEZv60eBdlqXqQz20';

function getAllCommands() {
    try {
        const files = fs.readdirSync(__dirname).filter((file) => file.endsWith('.js'));
        const commands = new Set();

        for (const file of files) {
            try {
                const cmd = require(path.join(__dirname, file));
                if (cmd?.name) commands.add(String(cmd.name).toLowerCase());
                if (Array.isArray(cmd?.aliases)) {
                    for (const alias of cmd.aliases) {
                        if (alias) commands.add(String(alias).toLowerCase());
                    }
                }
            } catch {
                const fallback = file.replace(/\.js$/i, '').toLowerCase();
                if (fallback) commands.add(fallback);
            }
        }

        return Array.from(commands).sort((a, b) => a.localeCompare(b));
    } catch {
        return [];
    }
}

function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

module.exports = {
    name: 'menu',
    aliases: ['commands', 'cmd', 'list'],

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const allCommands = getAllCommands();
        
        // Group commands alphabetically
        const commandsList = allCommands.map(cmd => `│ ⌬ !${cmd}`).join('\n');
        
        const menuHeader = `╔══════════════════════════════════╗
║        ⟦ 𓆩𖤍 NΞXØRΛ 𖤍𓆪 ⟧        ║
║        COMMAND MENU (ALL)         ║
╚══════════════════════════════════╝

╭─〔 📋 ALL COMMANDS 〕─╮
│ Total: ${allCommands.length} commands
╰──────────────────────╯
`;

        const menuFooter = `
> Powered by ⟦ 𓆩𖤍 NΞXØRΛ 𖤍𓆪 ⟧ ⚡`;

        const newsletterJid = process.env.NEWSLETTER_JID || `${CHANNEL_CODE}@newsletter`;

        const contextInfo = {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
                newsletterJid,
                newsletterName: 'NEXORA',
                serverMessageId: 1
            },
            externalAdReply: {
                title: 'NEXORA Commands',
                body: `Total: ${allCommands.length} commands`,
                sourceUrl: CHANNEL_LINK,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        };

        // Split into chunks if too long (WhatsApp message limit)
        const chunks = chunkArray(allCommands, 30);
        
        // Send the image first (like help menu)
        await sock.sendMessage(
            from,
            {
                image: { url: 'https://i.postimg.cc/FzwNWQ4g/file-000000005b5072468571f4147581121f.png' },
                caption: menuHeader + '│ ⌬ !' + allCommands.slice(0, 30).join('\n│ ⌬ !') + menuFooter,
                contextInfo
            },
            { quoted: msg }
        ).catch(async (err) => {
            console.error('menu command image send failed, using text fallback:', err?.message || err);
            return sock.sendMessage(
                from,
                { text: menuHeader + '│ ⌬ !' + allCommands.slice(0, 30).join('\n│ ⌬ !') + menuFooter, contextInfo },
                { quoted: msg }
            );
        });

        // Send remaining chunks if there are more than 30 commands
        if (allCommands.length > 30) {
            for (let i = 1; i < chunks.length; i++) {
                const chunkMenu = `╭─〔 📋 COMMANDS ${i * 30 + 1}-${Math.min((i + 1) * 30, allCommands.length)} 〕─╮
╰──────────────────────╯
│ ⌬ !${chunks[i].join('\n│ ⌬ !')}

> Powered by ⟦ 𓆩𖤍 NΞXØRΛ 𖤍𓆪 ⟧ ⚡`;
                
                setTimeout(() => {
                    sock.sendMessage(
                        from,
                        { text: chunkMenu, contextInfo },
                        { quoted: msg }
                    ).catch((err) => {
                        console.error('menu command chunk send failed:', err?.message || err);
                    });
                }, 1000 * i);
            }
        }
    }
};