const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

const currencies = {
    usd: { name: "US Dollar", symbol: "$" },
    eur: { name: "Euro", symbol: "€" },
    gbp: { name: "British Pound", symbol: "£" },
    jpy: { name: "Japanese Yen", symbol: "¥" },
    cny: { name: "Chinese Yuan", symbol: "¥" },
    inr: { name: "Indian Rupee", symbol: "₹" },
    krw: { name: "South Korean Won", symbol: "₩" },
    brl: { name: "Brazilian Real", symbol: "R$" },
    cad: { name: "Canadian Dollar", symbol: "$" },
    aud: { name: "Australian Dollar", symbol: "$" },
    chf: { name: "Swiss Franc", symbol: "Fr" },
    ngn: { name: "Nigerian Naira", symbol: "₦" },
    ghs: { name: "Ghanaian Cedi", symbol: "₵" },
    zar: { name: "South African Rand", symbol: "R" },
    mxn: { name: "Mexican Peso", symbol: "$" },
    sgd: { name: "Singapore Dollar", symbol: "$" },
    hkd: { name: "Hong Kong Dollar", symbol: "$" },
    rub: { name: "Russian Ruble", symbol: "₽" },
    try: { name: "Turkish Lira", symbol: "₺" },
    php: { name: "Philippine Peso", symbol: "₱" }
};

module.exports = {
    name: "currency",
    aliases: ["convert", "exchange", "money"],
    description: "Convert currencies",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        await sock.sendMessage(from, { react: { text: '💱', key: msg.key } });
        
        if (!args.length || args.length < 3) {
            const currencyList = Object.keys(currencies).join(', ').toUpperCase();
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `💱 *CURRENCY CONVERTER*\n\nUsage: !currency <amount> <from> <to>\n\nExample:\n!currency 100 USD EUR\n!currency 50 USD NGN\n\nAvailable currencies:\n${currencyList}`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        const amount = parseFloat(args[0]);
        const fromCurrency = args[1].toLowerCase();
        const toCurrency = args[2].toLowerCase();
        
        if (isNaN(amount)) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Please enter a valid amount.`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        if (!currencies[fromCurrency] || !currencies[toCurrency]) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Invalid currency code. Use !currency to see available currencies.`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.toUpperCase()}`);
            const rate = response.data.rates[toCurrency.toUpperCase()];
            const result = (amount * rate).toFixed(2);
            
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `💱 *Currency Conversion*\n\n` +
                      `${currencies[fromCurrency].symbol}${amount} ${currencies[fromCurrency].name}\n\n` +
                      `= ${currencies[toCurrency].symbol}${result} ${currencies[toCurrency].name}\n\n` +
                      `Rate: 1 ${fromCurrency.toUpperCase()} = ${rate} ${toCurrency.toUpperCase()}`,
                contextInfo 
            }, { quoted: msg });
            
        } catch (err) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `❌ Could not get exchange rate. Please try again later.`,
                contextInfo 
            }, { quoted: msg });
        }
    }
};
