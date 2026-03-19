const OpenAI = require('openai');
const { createForwardedContext } = require('./_helpers');

// Store conversation history per user
const conversationHistory = new Map();

module.exports = {
    name: "chat",
    aliases: ["ai", "ask", "gpt", "talk", "chatgpt"],
    description: "AI Chat with GPT-4",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const pushName = msg.pushName || 'User';

        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🤖 *Nexora AI Chat*\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                      `*Usage:* !chat <message>\n\n` +
                      `*Examples:*\n` +
                      `• !chat Hello, how are you?\n` +
                      `• !chat Write a poem about love\n` +
                      `• !chat Explain quantum physics\n\n` +
                      `*Features:*\n` +
                      `• Remembers your conversation\n` +
                      `• Powered by GPT-4\n` +
                      `• Smart and helpful\n\n` +
                      `*Clear chat:* !chat clear\n\n` +
                      `Start chatting with Nexora AI!`,
                contextInfo 
            }, { quoted: msg });
            return;
        }

        const command = args[0].toLowerCase();

        // Handle clear command
        if (command === 'clear' || command === 'reset') {
            conversationHistory.delete(sender);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "✅ Chat history cleared! Starting fresh conversation.", 
                contextInfo 
            }, { quoted: msg });
            return;
        }

        const userMessage = args.join(' ');

        try {
            // Send typing indicator
            await sock.sendPresenceUpdate('composing', from);
            
            // Loading reaction
            await sock.sendMessage(from, { react: { text: '🤖', key: msg.key } });

            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

            // Get conversation history for this user
            let messages = conversationHistory.get(sender) || [];
            
            // Add system message if no history
            if (messages.length === 0) {
                messages.push({
                    role: 'system',
                    content: `You are Nexora AI, a helpful and friendly AI assistant. You are helpful, creative, clever, and very friendly. Keep responses concise but informative.`
                });
            }

            // Add user message
            messages.push({
                role: 'user',
                content: userMessage
            });

            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: messages,
                max_tokens: 1000,
                temperature: 0.7,
            });

            const aiResponse = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

            // Add AI response to history
            messages.push({
                role: 'assistant',
                content: aiResponse
            });

            // Keep only last 20 messages to prevent memory issues
            if (messages.length > 20) {
                messages = messages.slice(-20);
            }
            conversationHistory.set(sender, messages);

            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🤖 *Nexora AI*\n\n${aiResponse}`, 
                contextInfo 
            }, { quoted: msg });
            
            // Success reaction
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            
        } catch (err) {
            console.error('Chat error:', err);
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to get response from AI.\n\nPlease try again later.", 
                contextInfo 
            }, { quoted: msg });
        }
    }
}
