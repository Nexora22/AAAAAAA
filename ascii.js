const { createForwardedContext } = require('./_helpers');

const asciiArt = {
    shrug: `¯\\_(ツ)_/¯`,
    tableflip: `(╯°□°)╯︵ ┻━┻`,
    unflip: '┬─┬ノ( º _ ºノ)',
    lenny: '( ͡° ͜ʖ ͡°)',
    disapprove: 'ಠ_ಠ',
    bear: 'ʕ•ᴥ•ʔ',
    sparkles: '✧･ﾟ: *✧･ﾟ:*',
    heart: '♥‿♥',
    cry: '(ಥ﹏ಥ)',
    cool: '( ̄ー ̄)',
    trippy: '(╭ರ_•́)',
    confused: '(◎_◎;)',
    angry: '(ノಠ益ಠ)ノ彡┻━┻',
    shrug2: '┐(´д`)┌',
    magic: '(ノ°∀°)ノ⌒・*:.。',
    fight: '(ง' + "'" + `_')ง`,
    sad: '(╥_╥)',
    yay: '(◕‿◕)'
};

module.exports = {
    name: "ascii",
    aliases: ["textface", "face", "emoticon"],
    description: "Get ASCII text faces",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        const faces = Object.keys(asciiArt).map(f => `!ascii ${f}`).join('\n');
        
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `ASCII *TEXT FACES*\n\nAvailable faces:\n\n${faces}`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const face = args[0].toLowerCase();
        
        if (asciiArt[face]) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: asciiArt[face],
                contextInfo 
            }, { quoted: msg });
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `Face not found. Use !ascii without args to see available faces.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
