const fs = require("fs");
const path = require("path");
const { createForwardedContext } = require('./_helpers');

// User-specific prefix storage
const userPrefixPath = path.join(__dirname, '../user_prefixes.json');

function loadUserPrefixes() {
    try {
        if (fs.existsSync(userPrefixPath)) {
            return JSON.parse(fs.readFileSync(userPrefixPath, 'utf8'));
        }
    } catch (e) {
        console.error("Error loading user prefixes:", e);
    }
    return {};
}

function saveUserPrefixes(prefixes) {
    try {
        fs.writeFileSync(userPrefixPath, JSON.stringify(prefixes, null, 2));
        return true;
    } catch (e) {
        console.error("Error saving user prefixes:", e);
        return false;
    }
}

function getUserPrefix(senderJid) {
    const prefixes = loadUserPrefixes();
    return prefixes[senderJid] || null;
}

function setUserPrefix(senderJid, prefix) {
    const prefixes = loadUserPrefixes();
    prefixes[senderJid] = prefix;
    return saveUserPrefixes(prefixes);
}

function deleteUserPrefix(senderJid) {
    const prefixes = loadUserPrefixes();
    delete prefixes[senderJid];
    return saveUserPrefixes(prefixes);
}

// Export for use in bot.js
module.exports = {
    name: "prefix",
    aliases: ["setprefix", "changeprefix", "cmdprefix", "myprefix"],
    description: "Set your personal command prefix",
    
    // Export helper functions
    getUserPrefix,
    setUserPrefix,
    deleteUserPrefix,
    loadUserPrefixes,

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        
        // Get current user prefix
        const currentPrefix = getUserPrefix(sender);
        
        // Check if user wants to view, set, or reset their prefix
        const action = args[0]?.toLowerCase();
        
        // If no args, show current prefix
        if (!args.length) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `📌 *Your Personal Prefix*\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                      `Current prefix: "${currentPrefix || '!'}" (default)\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                      `*Commands to manage your prefix:*\n\n` +
                      `• !setprefix <symbol> - Set your personal prefix\n` +
                      `• !setprefix reset - Reset to default (!)\n` +
                      `• !setprefix view - View your current prefix\n\n` +
                      `*Examples:*\n` +
                      `• !setprefix !\n` +
                      `• !setprefix .\n` +
                      `• !setprefix /\n` +
                      `• !setprefix #\n\n` +
                      `*Note:* Your prefix only works for you! Other users will still use their own prefix or the default.`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        // Handle "view" command
        if (action === 'view') {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `📌 Your current prefix: "${currentPrefix || '!'}"`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        // Handle "reset" command
        if (action === 'reset' || action === 'default') {
            const oldPrefix = currentPrefix || '!';
            if (!currentPrefix) {
                const contextInfo = createForwardedContext();
                await sock.sendMessage(from, { 
                    text: `ℹ️ You're already using the default prefix (!)`,
                    contextInfo 
                }, { quoted: msg });
                return;
            }
            
            deleteUserPrefix(sender);
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `✅ *Prefix Reset!*\n\n` +
                      `Old prefix: "${oldPrefix}"\n` +
                      `New prefix: "!" (default)\n\n` +
                      `Your prefix has been reset to the default.`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        // Set new prefix
        const newPrefix = args[0];
        
        if (newPrefix.length > 1) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Prefix must be a single character!\n\nExample: !setprefix !",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        // Prevent using spaces or special characters that might break parsing
        if (newPrefix === ' ' || newPrefix === '\n') {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Invalid prefix! Please use a visible character like !, ., /, #, etc.",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const oldPrefix = currentPrefix || '!';
        
        if (setUserPrefix(sender, newPrefix)) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `✅ *Prefix Set!*\n\n` +
                      `Old prefix: "${oldPrefix}"\n` +
                      `New prefix: "${newPrefix}"\n\n` +
                      `Now you can use: ${newPrefix}help, ${newPrefix}ping, ${newPrefix}alive, etc.\n\n` +
                      `⚠️ This prefix is personal to you only!`,
                contextInfo 
            }, { quoted: msg });
        } else {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "❌ Failed to save your prefix configuration!",
                contextInfo 
            }, { quoted: msg });
        }
    }
};
