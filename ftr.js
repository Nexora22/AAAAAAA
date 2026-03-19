const { formatMessage } = require('../fomatter')

module.exports = {
    name: 'ftr',
    aliases: ['fakecord', 'fakerecord'],
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid

        // Get the message to send after the fake typing/recording
        const messageText = args.join(' ').trim()

        if (!messageText) {
            const usage = formatMessage('FTR', `Usage: !ftr <message>\n\nExample: !ftr Hello everyone!`)
            await sock.sendMessage(from, { text: usage }, { quoted: msg })
            return
        }

        try {
            // Show typing indicator
            await sock.sendPresenceUpdate('composing', from)
            
            // Wait for a random time between 1-3 seconds to simulate typing
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

            // Stop typing, start recording
            await sock.sendPresenceUpdate('recording', from)

            // Wait for a random time between 1-2 seconds to simulate recording
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

            // Stop recording
            await sock.sendPresenceUpdate('paused', from)

            // Send the message as if it was recorded as a voice note
            // We'll indicate it's a "voice message" in the output
            const response = formatMessage('🎤 FAKE RECORDING', `📢 Message sent as fake recording:\n\n"${messageText}"`)
            await sock.sendMessage(from, { text: response }, { quoted: msg })

            console.log(`FTR command executed in ${from}: ${messageText}`)
        } catch (err) {
            console.error('FTR command error:', err)
            await sock.sendMessage(from, { text: 'Error executing ftr command' }, { quoted: msg })
        }
    }
}