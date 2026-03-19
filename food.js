const { createForwardedContext } = require('./_helpers');

const foods = [
    "🍕 *Pizza* - Everyone's favorite!",
    "🍔 *Burger* - Classic comfort food",
    "🍟 *Fries* - Perfect crispy snack",
    "🌮 *Tacos* - Flavor explosion!",
    "🍣 *Sushi* - Elegant and delicious",
    "🍜 *Noodles* - Comfort in a bowl",
    "🥗 *Salad* - Fresh and healthy",
    "🍛 *Curry* - Rich and aromatic",
    "🍝 *Pasta* - Italian perfection",
    "🌯 *Burrito* - Filling and tasty",
    "🍩 *Donuts* - Sweet treat!",
    "🍦 *Ice Cream* - Cold delight",
    "🥑 *Avocado Toast* - Trendy brunch",
    "🍗 *Fried Chicken* - Crispy goodness",
    "🥩 *Steak* - For meat lovers!"
];

module.exports = {
    name: "food",
    aliases: ["eat", "foodie", "recommendfood"],
    description: "Get a food recommendation",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const contextInfo = createForwardedContext();
        
        const food = foods[Math.floor(Math.random() * foods.length)];
        
        await sock.sendMessage(from, { 
            text: `🍔 *FOOD RECOMMENDATION:*\n\n━━━━━━━━━━━━━━━━\n\n${food}\n\n━━━━━━━━━━━━━━━━\n\n😋 Use !food again for more ideas!`,
            contextInfo 
        }, { quoted: msg });
    }
};
