const axios = require('axios');

const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbCFEZv60eBdlqXqQz20';
const CHANNEL_CODE = '0029VbCFEZv60eBdlqXqQz20';

const retroArt = `
╔════════════════════════════════════════╗
║     🕹️  WELCOME TO RETRO WORLD  🕹️     ║
╚════════════════════════════════════════╝

    ██████╗ ███████╗ █████╗ ██████╗ 
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗
    ██████╔╝█████╗  ███████║██║  ██║
    ██╔══██╗██╔══╝  ██╔══██║██║  ██║
    ██║  ██║███████╗██║  ██║██████╔╝
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ 
                                    
    ███╗   ███╗ ██████╗ ██████╗ ██╗██╗   ██╗███████╗
    ████╗ ████║██╔═══██╗██╔══██╗██║██║   ██║██╔════╝
    ██╔████╔██║██║   ██║██████╔╝██║██║   ██║█████╗  
    ██║╚██╔╝██║██║   ██║██╔══██╗██║██║   ██║██╔══╝  
    ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║╚██████╔╝███████╗
    ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝

🎮 RETRO GAMES ARE COOL! 🎮
`;

module.exports = {
    name: 'retro',

    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const args = msg.message?.conversation?.split(' ') || [];
        const query = args.slice(1).join(' ');

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
                title: 'RETRO COMMAND',
                body: 'Welcome to Retro World!',
                sourceUrl: CHANNEL_LINK,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        };

        if (!query) {
            // No query - show retro welcome message (no image)
            return sock.sendMessage(
                from,
                {
                    text: `${retroArt}

╭─〔 📖 USAGE 〕─╮
│ !retro <text> →
│ Convert text to
│ retro style!
╰──────────────╯

> Powered by ⟦ 𓆩𖤍 NΞXØRΛ 𖤍𓆪 ⟧ ⚡`,
                    contextInfo
                },
                { quoted: msg }
            );
        }

        // Convert text to retro style (zalgo/retro text)
        const retroText = toRetroStyle(query);

        return sock.sendMessage(
            from,
            {
                text: `${retroArt}

╭─〔 🔄 RETRO CONVERSION 〕─╮
│ Input : ${query}
│ Output:
│ ${retroText}
╰────────────────────────────╯

> Powered by ⟦ 𓆩𖤍 NΞXØRΛ 𖤍𓆪 ⟧ ⚡`,
                contextInfo
            },
            { quoted: msg }
        );
    }
};

function toRetroStyle(text) {
    // Convert text to retro/cool style
    const retroChars = {
        'a': 'ą', 'b': 'ƅ', 'c': 'ċ', 'd': 'đ', 'e': 'ę', 'f': 'ƒ', 
        'g': 'ġ', 'h': 'ħ', 'i': 'į', 'j': 'ĵ', 'k': 'ķ', 'l': 'ł', 
        'm': 'ɱ', 'n': 'ń', 'o': 'ø', 'p': 'þ', 'q': 'ǫ', 'r': 'ŕ', 
        's': 'š', 't': 'ŧ', 'u': 'ų', 'v': 'ṽ', 'w': 'ŵ', 'x': 'χ', 
        'y': 'ý', 'z': 'ž',
        'A': 'Ą', 'B': 'Ɓ', 'C': 'Ċ', 'D': 'Đ', 'E': 'Ę', 'F': 'Ƒ', 
        'G': 'Ġ', 'H': 'Ħ', 'I': 'Į', 'J': 'Ĵ', 'K': 'Ķ', 'L': 'Ł', 
        'M': 'Ṁ', 'N': 'Ń', 'O': 'Ø', 'P': 'Þ', 'Q': 'Ǫ', 'R': 'Ŕ', 
        'S': 'Š', 'T': 'Ŧ', 'U': 'Ų', 'V': 'Ṽ', 'W': 'Ŵ', 'X': 'Χ', 
        'Y': 'Ý', 'Z': 'Ž'
    };
    
    let result = '';
    for (const char of text) {
        if (retroChars[char]) {
            result += retroChars[char];
        } else {
            result += char;
        }
    }
    return result;
}