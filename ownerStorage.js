const fs = require('fs');
const path = require('path');

// keep owner info in the same sessions folder used by other utilities
const SESSIONS = path.join(__dirname, '..', 'sessions');
if (!fs.existsSync(SESSIONS)) fs.mkdirSync(SESSIONS, { recursive: true });
const OWNER_FILE = path.join(SESSIONS, 'owner.json');

function loadOwner() {
    try {
        const raw = fs.readFileSync(OWNER_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        return parsed.owner || null;
    } catch (e) {
        return null;
    }
}

function loadOwnerInfo() {
    try {
        if (fs.existsSync(OWNER_FILE)) {
            const raw = fs.readFileSync(OWNER_FILE, 'utf8');
            return JSON.parse(raw);
        }
    } catch (e) {
        console.error('ownerStorage: failed to load owner info', e);
    }
    return { owner: null, ownerName: null };
}

function saveOwner(jid, name = null) {
    try {
        const existing = loadOwnerInfo();
        fs.writeFileSync(OWNER_FILE, JSON.stringify({ 
            owner: jid, 
            ownerName: name || existing.ownerName || null 
        }, null, 2), 'utf8');
    } catch (e) {
        console.error('ownerStorage: failed to save owner jid', e);
    }
}

function saveOwnerName(name) {
    try {
        const existing = loadOwnerInfo();
        fs.writeFileSync(OWNER_FILE, JSON.stringify({ 
            owner: existing.owner, 
            ownerName: name 
        }, null, 2), 'utf8');
    } catch (e) {
        console.error('ownerStorage: failed to save owner name', e);
    }
}

module.exports = { loadOwner, saveOwner, loadOwnerInfo, saveOwnerName };
