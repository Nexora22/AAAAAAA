function normalizeJid(jid) {
    if (!jid) return "";
    const s = String(jid).trim().toLowerCase();
    const [left, domain] = s.split("@");
    if (!left || !domain) return s;
    const user = left.split(":")[0];
    return `${user}@${domain}`;
}

function toPhone(jid) {
    const n = normalizeJid(jid).split("@")[0];
    return n.replace(/\D/g, "");
}

function isSameUser(a, b) {
    if (!a || !b) return false;
    const an = normalizeJid(a);
    const bn = normalizeJid(b);
    if (an === bn) return true;
    return toPhone(an) !== "" && toPhone(an) === toPhone(bn);
}

module.exports = {
    normalizeJid,
    toPhone,
    isSameUser
};
