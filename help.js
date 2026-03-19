const fs = require('fs');
const path = require('path');

const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbCFEZv60eBdlqXqQz20';
const CHANNEL_CODE = '0029VbCFEZv60eBdlqXqQz20';
const LAGOS_TZ = 'Africa/Lagos';

function getUptimeSeconds() {
    if (global.botStartTime && Number.isFinite(global.botStartTime)) {
        return Math.max(0, Math.floor((Date.now() - global.botStartTime) / 1000));
    }
    return Math.max(0, Math.floor(process.uptime()));
}

function getMessageLatencyMs(msg) {
    const ts = Number(msg?.messageTimestamp || 0);
    if (!Number.isFinite(ts) || ts <= 0) return 0;
    const sentAtMs = ts < 1e12 ? Math.floor(ts * 1000) : Math.floor(ts);
    return Math.max(0, Date.now() - sentAtMs);
}

function formatUptime(totalSeconds) {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
}

function getPluginCount() {
    try {
        const files = fs.readdirSync(__dirname).filter((file) => file.endsWith('.js'));
        let count = 0;
        for (const file of files) {
            try {
                const cmd = require(path.join(__dirname, file));
                if (cmd?.name) count++;
            } catch {
                // ignore broken modules for plugin count accuracy
            }
        }
        return count;
    } catch {
        return 0;
    }
}

function getAllCommands() {
    try {
        const files = fs.readdirSync(__dirname).filter((file) => file.endsWith('.js'));
        const names = new Set();

        for (const file of files) {
            try {
                const cmd = require(path.join(__dirname, file));
                if (cmd?.name) names.add(String(cmd.name).toLowerCase());
                if (Array.isArray(cmd?.aliases)) {
                    for (const alias of cmd.aliases) {
                        if (alias) names.add(String(alias).toLowerCase());
                    }
                }
            } catch {
                const fallback = file.replace(/\.js$/i, '').toLowerCase();
                if (fallback) names.add(fallback);
            }
        }

        return Array.from(names).sort((a, b) => a.localeCompare(b));
    } catch {
        return [];
    }
}

function nowDate() {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: LAGOS_TZ
    }).format(new Date());
}

function nowTime() {
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: LAGOS_TZ
    }).format(new Date());
}

module.exports = {
    name: 'help',

    async execute(sock, msg) {
        const from = msg.key.remoteJid;

        const mode = (global.chatModes && global.chatModes[from]) || 'public';
        const user = msg.pushName || 'NEXORA';
        const plugins = getPluginCount();
        const allCommands = getAllCommands();
        const allCommandsSection = allCommands.length
            ? allCommands.slice(0, 40).map((cmd) => `│ ⌬ !${cmd}`).join('\n')
            : '│ ⌬ (no commands found)';
        const uptime = formatUptime(getUptimeSeconds());
        const ramMb = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
        const ping = getMessageLatencyMs(msg);

        const menu = `╔══════════════════════════════════╗
║        ⟦ 𓆩𖤍 NΞXØRΛ 𖤍𓆪 ⟧        ║
╚══════════════════════════════════╝

┌─〔 SYSTEM STATUS 〕─┐
│ Mode    : ${mode.toUpperCase()}
│ User    : ${user}
│ Plugins : ${plugins}+
│ Uptime  : ${uptime}
│ Date    : ${nowDate()}
│ Time    : ${nowTime()}
│ RAM     : ${ramMb}MB
│ Ping    : ${ping}ms
└────────────────────┘

╭─〔 ⚡ GENERAL 〕─╮
│ ⌬ !help      → Open command menu
│ ⌬ !menu      → All commands list
│ ⌬ !bot       → Nexora AI chat
│ ⌬ !darkai    → Dark horror AI
│ ⌬ !retro     → Retro style text
╰──────────────╯

╭─〔 📊 GROUP STATUS 〕─╮
│ ⌬ !gstatus   → Post group status
│ ⌬ !gst       → Alias for gstatus
│ ⌬ !groupstatus → Alias for gstatus
│ ⌬ !gs        → Alias for gstatus
╰──────────────────────╯

╭─〔 👑 ADMIN CONTROLS 〕─╮
│ ⌬ !kick      → Remove member
│ ⌬ !kickall   → Remove all members
│ ⌬ !promote   → Promote member
│ ⌬ !demote    → Demote member
│ ⌬ !tagall    → Mention all members
│ ⌬ !warn      → Warn member
│ ⌬ !warnings  → Show warnings
│ ⌬ !clearwarnings → Clear warnings
╰────────────────────────╯

╭─〔 🎵 MEDIA 〕─╮
│ ⌬ !play      → Play Spotify track
│ ⌬ !lyrics    → Get song lyrics
│ ⌬ !yt        → Download YouTube
│ ⌬ !tiktok    → Download TikTok
│ ⌬ !instagram → Download Instagram
│ ⌬ !ttsearch  → Search TikTok
╰──────────────╯

╭─〔 🎭 FUN 〕─╮
│ ⌬ !joke      → Random joke
│ ⌬ !meme      → Random meme
│ ⌬ !quote     → Random quote
│ ⌬ !dadjoke   → Dad joke
│ ⌬ !devjoke   → Developer joke
│ ⌬ !fact      → Random fact
│ ⌬ !sciencefact → Science fact
│ ⌬ !historyfact → History fact
│ ⌬ !techfact  → Tech fact
│ ⌬ !food      → Food fact
│ ⌬ !animal    → Animal fact
│ ⌬ !spacefact → Space fact
│ ⌬ !motivation → Motivation quote
│ ⌬ !trivia    → Trivia quiz
│ ⌬ !riddle    → Riddle game
│ ⌬ !todayspecial → Special of the day
│ ⌬ !wyr       → Would you rather
│ ⌬ !neverhave → Never have I ever
│ ⌬ !truth     → Truth or dare
│ ⌬ !ttt       → Tic Tac Toe
│ ⌬ !rps       → Rock Paper Scissors
│ ⌬ !slot      → Slot machine
│ ⌬ !8ball     → Magic 8ball
│ ⌬ !ship      → Love ship calc
│ ⌬ !choose    → Choose option
│ ⌬ !shuffle   → Randomize list
│ ⌬ !bomb      → Bomb command
│ ⌬ !spam      → Spam message
│ ⌬ !hack      → Fun hack
│ ⌬ !hack2     → Fun hack v2
│ ⌬ !hack3     → Fun hack v3
│ ⌬ !hackgc    → Hack group
│ ⌬ !hackall   → Hack all
│ ⌬ !destroy   → Destroy cmd
│ ⌬ !emojimix  → Mix emojis
│ ⌬ !emojify   → Text to emoji
│ ⌬ !emojiq    → Emoji quiz
│ ⌬ !tongue    → Tongue twister
│ ⌬ !insult    → Random insult
│ ⌬ !compliment → Compliment
│ ⌬ !roast     → Roast someone
│ ⌬ !pickup    → Pickup lines
│ ⌬ !shayari   → Romantic poetry
│ ⌬ !mood      → Check mood
│ ⌬ !rate      → Rate anything
│ ⌬ !crush     → Crush calc
│ ⌬ !dateplan  → Date ideas
│ ⌬ !hug       → Send hug
│ ⌬ !pat       → Pat head
│ ⌬ !kiss      → Send kiss
│ ⌬ !marry     → Marriage calc
│ ⌬ !goodmorning → Morning wish
│ ⌬ !goodnight → Night wish
│ ⌬ !song      → Song recommend
│ ⌬ !movie     → Movie recommend
│ ⌬ !fake      → Fake identity
│ ⌬ !glow      → Glow text
│ ⌬ !jail      → Jail meme
│ ⌬ !clap      → Clap emojis
│ ⌬ !sparkle   → Sparkle effect
│ ⌬ !fire      → Fire effect
│ ⌬ !fight     → Fight attack
│ ⌬ !cry       → Cry reaction
│ ⌬ !wink      → Wink
│ ⌬ !like      → Thumbs up
│ ⌬ !blush     → Blush react
│ ⌬ !dance     → Dance
│ ⌬ !laugh     → Laugh
│ ⌬ !shake     → Shake head
│ ⌬ !confess   → Make confession
│ ⌬ !simsimi   → AI chatbot
│ ⌬ !flip      → Flip coin
│ ⌬ !roll      → Roll dice
│ ⌬ !math      → Calculator
│ ⌬ !wasted    → Wasted filter
╰──────────────╯

╭─〔 🧠 TOOLS 〕─╮
│ ⌬ !img       → AI image gen
│ ⌬ !image     → Alias for img
│ ⌬ !apk       → APK search
│ ⌬ !movie     → Movie info
│ ⌬ !imdb      → IMDB info
│ ⌬ !vv        → View-once retriever
│ ⌬ !weather   → Check weather
│ ⌬ !short     → Shorten URL
│ ⌬ !define    → Define a word
│ ⌬ !urban     → Urban dictionary
│ ⌬ !wikipedia → Wiki search
│ ⌬ !time      → Check time
│ ⌬ !date      → Today's date
│ ⌬ !worldtime → World time
│ ⌬ !password  → Generate password
│ ⌬ !qrcode    → QR code gen
│ ⌬ !sticker   → Make sticker
│ ⌬ !screenshot → Screenshot
│ ⌬ !logo      → Logo maker
│ ⌬ !wallpaper → HD wallpaper
│ ⌬ !bitcoin   → Crypto prices
│ ⌬ !stock     → Stock prices
│ ⌬ !currency  → Currency convert
│ ⌬ !horoscope → Horoscope
│ ⌬ !country   → Country info
│ ⌬ !bmi       → BMI calculator
│ ⌬ !weight    → Weight convert
│ ⌬ !temp      → Temp convert
│ ⌬ !length    → Length convert
│ ⌬ !volume    → Volume convert
│ ⌬ !age       → Age calculator
│ ⌬ !health    → Health tip
│ ⌬ !github    → GitHub info
│ ⌬ !news      → Latest news
│ ⌬ !ipinfo    → IP info
╰──────────────╯

╭─〔 🛠 SYSTEM 〕─╮
│ ⌬ !ping      → Check latency
│ ⌬ !alive     → Bot status
│ ⌬ !uptime    → Show uptime
│ ⌬ !antidelete on/off → Toggle antidelete
│ ⌬ !link      → Get pairing code
│ ⌬ !sh        → Quick help menu
╰──────────────╯

╭─〔 👤 OWNER 〕─╮
│ ⌬ !owner     → Show owner
│ ⌬ !setowner  → Set owner number
│ ⌬ !setpp     → Set bot profile photo
│ ⌬ !mode      → Bot public/private mode
│ ⌬ !setprefix   → Change command prefix
╰──────────────╯

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
                title: 'NEXORA Channel',
                body: 'Join the official updates channel',
                sourceUrl: CHANNEL_LINK,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        };

        // Send the help menu image first
        await sock.sendMessage(
            from,
            {
                image: { url: 'https://i.postimg.cc/FzwNWQ4g/file-000000005b5072468571f4147581121f.png' },
                caption: menu,
                contextInfo
            },
            { quoted: msg }
        ).catch(async (err) => {
            console.error('help command image send failed, using text fallback:', err?.message || err);
            return sock.sendMessage(
                from,
                { text: menu, contextInfo },
                { quoted: msg }
            );
        });

        // Send the audio 5 seconds after the help menu (as MP3)
        setTimeout(() => {
            sock.sendMessage(from, {
                audio: { url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3' },
                mimetype: 'audio/mp3',
                ptt: false
            }).catch((err) => {
                console.error('help command audio send failed:', err?.message || err);
            });
        }, 5000);
    }
};
