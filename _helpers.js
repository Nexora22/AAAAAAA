/**
 * Utility helper for creating forwarded message context
 */

const CHANNEL_CODE = process.env.NEWSLETTER_JID ? process.env.NEWSLETTER_JID.replace('@newsletter', '') : '0029VbCFEZv60eBdlqXqQz20';
const CHANNEL_NAME = 'NEXORA';

/**
 * Creates contextInfo for forwarded message simulation
 * @param {string} messageText - Optional message to show as forwarded
 * @returns {object} contextInfo object for forwarded message
 */
function createForwardedContext(messageText = null) {
    return {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid: `${CHANNEL_CODE}@newsletter`,
            newsletterName: CHANNEL_NAME,
            serverMessageId: Math.floor(Math.random() * 1000000)
        }
    };
}

/**
 * Sends a message as if forwarded from a channel
 * @param {object} sock - WhatsApp socket
 * @param {string} from - Chat JID
 * @param {string|object} content - Message content (text or media object)
 * @param {object} msg - Original message to quote
 * @param {string} contentType - Type: 'text', 'image', 'video', etc.
 */
async function sendForwarded(sock, from, content, msg, contentType = 'text') {
    const contextInfo = createForwardedContext();
    
    const messageObj = {};
    
    if (contentType === 'text') {
        messageObj.text = content;
    } else if (contentType === 'image') {
        messageObj.image = content;
    } else if (contentType === 'video') {
        messageObj.video = content;
    } else if (contentType === 'sticker') {
        messageObj.sticker = content;
    }
    
    messageObj.contextInfo = contextInfo;
    
    await sock.sendMessage(from, messageObj, { quoted: msg });
}

module.exports = {
    createForwardedContext,
    sendForwarded,
    CHANNEL_CODE,
    CHANNEL_NAME
};
