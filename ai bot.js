const OpenAI = require("openai");
const { createForwardedContext } = require('./_helpers');

module.exports = {
    name: "bot",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        // Check for creator question
        const fullPrompt = args.join(" ").trim().toLowerCase();
        const creatorKeywords = ['who created you', 'who made you', 'who is your creator', 'your creator', 'your owner', 'who developed you', 'who built you'];
        const isCreatorQuestion = creatorKeywords.some(keyword => fullPrompt.includes(keyword));
        
        if (isCreatorQuestion) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🤖 Nexora was created by Emmanuel Restoration Abimbola who is currently a 200lv student in Bownen University and studying Mechatronic Engineering.\n\nSo now I introduce this AI-powered WhatsApp bot I built alone designed to help with various tasks and provide entertainment and also illegal stuffs...... Use wit care!", 
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const prompt = args.join(" ").trim();
        if (!prompt) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: "Usage: !bot <your question>", contextInfo }, { quoted: msg });
            return;
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, {
                text: `AI is not configured yet.\nYou asked: "${prompt}"`,
                contextInfo
            }, { quoted: msg });
            return;
        }

        try {
            // Send typing indicator
            await sock.sendPresenceUpdate('composing', from);
            
            const client = new OpenAI({ apiKey });
            const res = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are Nexora AI assistant. Reply clearly, concisely, and helpfully. You were created by Emmanuel Restoration Abimbola." },
                    { role: "user", content: prompt }
                ]
            });
            const out = res.choices?.[0]?.message?.content?.trim() || "No response.";
            
            // Check if TTS mode is enabled
            if (global.ttsMode && global.ttsMode[from]) {
                try {
                    // Use Google TTS to convert text to audio
                    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(out)}&tl=en&client=tw-ob`;
                    await sock.sendMessage(from, { 
                        audio: { url: ttsUrl }, 
                        mimetype: 'audio/mp3',
                        ptt: true 
                    }, { quoted: msg });
                } catch (ttsErr) {
                    // Fallback to text if TTS fails
                    const contextInfo = createForwardedContext();
                    await sock.sendMessage(from, { text: out, contextInfo }, { quoted: msg });
                }
            } else {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(from, { text: out, contextInfo }, { quoted: msg });
            }
        } catch (err) {
            console.error("Bot command error:", err);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { text: "AI request failed. Try again later.", contextInfo }, { quoted: msg });
        }
    }
};
