const OpenAI = require('openai');
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "img",
    aliases: ["image", "generate", "draw", "art"],
    description: "Generate AI images with DALL-E 3",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        // Check if user wants help
        if (!args.length || args[0] === 'help' || args[0] === '-h') {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🎨 *AI Image Generator*\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                      `*Usage:* !img <prompt>\n\n` +
                      `*Examples:*\n` +
                      `• !img a cute cat on a couch\n` +
                      `• !img a futuristic city at night\n` +
                      `• !img a beautiful sunset over ocean\n\n` +
                      `*Style Options:*\n` +
                      `• !img --realistic <prompt>\n` +
                      `• !img --anime <prompt>\n` +
                      `• !img --3d <prompt>\n` +
                      `• !img --digital <prompt>\n` +
                      `• !img --pencil <prompt>\n\n` +
                      `*Generate 4 images:*\n` +
                      `• !img <prompt> --4\n\n` +
                      `✨ Powered by DALL-E 3`,
                contextInfo 
            }, { quoted: msg });
            return;
        }

        // Parse for style flags
        let prompt = args.join(' ');
        let style = null;
        let count = 1;

        // Check for style flags
        if (prompt.includes('--realistic') || prompt.includes('-r')) {
            style = 'natural';
            prompt = prompt.replace(/--realistic|-r/g, '').trim();
        } else if (prompt.includes('--anime') || prompt.includes('-a')) {
            style = 'anime';
            prompt = prompt.replace(/--anime|-a/g, '').trim();
        } else if (prompt.includes('--3d')) {
            style = '3d';
            prompt = prompt.replace(/--3d/g, '').trim();
        } else if (prompt.includes('--digital')) {
            style = 'digital';
            prompt = prompt.replace(/--digital/g, '').trim();
        } else if (prompt.includes('--pencil') || prompt.includes('--sketch')) {
            style = 'pencil-sketch';
            prompt = prompt.replace(/--pencil|--sketch/g, '').trim();
        }

        // Check for --4 flag to generate 4 images
        if (prompt.includes('--4') || prompt.includes('-4')) {
            count = 4;
            prompt = prompt.replace(/--4|-4/g, '').trim();
        }

        if (!prompt) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🎨 Please provide a prompt!\n\nExample: !img a cute cat", 
                contextInfo 
            }, { quoted: msg });
            return;
        }

        try {
            // Send typing indicator
            await sock.sendPresenceUpdate('composing', from);
            
            // Send reaction to show processing
            await sock.sendMessage(from, { react: { text: '🎨', key: msg.key } });

            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

            const response = await openai.images.generate({
                model: 'dall-e-3',
                prompt: prompt,
                size: '1024x1024',
                quality: 'hd',
                n: count,
                style: style || 'vivid'
            });

            const images = response.data;
            
            if (!images || images.length === 0) {
                throw new Error('No image URL returned');
            }

            // Send images one by one
            for (const imgData of images) {
                const imageUrl = imgData.url;
                const contextInfo = createForwardedContext();
                
                await sock.sendMessage(from, { 
                    image: { url: imageUrl }, 
                    caption: `🎨 Generated: ${prompt}\n\n✨ Nexora AI (DALL-E 3)`, 
                    contextInfo 
                }, { quoted: msg });
            }
            
            // Success reaction
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            
        } catch (err) {
            console.error('Error generating image:', err);
            // Error reaction
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to generate image.\n\nPossible causes:\n• Invalid or inappropriate prompt\n• API limit reached\n• Network error\n\nPlease try again with a different prompt.", 
                contextInfo 
            }, { quoted: msg });
        }
    }
}
