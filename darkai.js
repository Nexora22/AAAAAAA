const axios = require("axios");
const { createForwardedContext } = require('./_helpers');

// Built-in dark content for when API is not available
const darkStories = [
    "In the depths of an abandoned asylum, they say you can still hear the screams of patients who died in the fire of 1987. The nurses... they didn't make it out either.",
    "The mirror showed something different. Not my reflection. Something with too many teeth and eyes where a face should be. It smiled at me.",
    "They found the diary in the cemetery. The last entry read: 'They're not sleeping anymore. They're waiting.'",
    "The doll's eyes moved. She watched it turn its head 180 degrees. It smiled. She ran, but the house had no doors anymore.",
    "The shadow in the corner wasn't hers. It was too tall, too thin. It had been watching her sleep for years.",
    "Don't look behind you. Don't look in the mirror. Don't answer the door at 3 AM. They learn your name when you do.",
    "The children's game said 'Bloody Mary' seven times. On the seventh, she came. She had no eyes. Only teeth.",
    "The basement wasn't there yesterday. Now it has a door, and something is knocking from the inside.",
    "She woke up buried alive. The coffin was too small. Her screams echoed, but the ground above was silent.",
    "The phone rang at 4:44 AM. Unknown number. Her own voice said: 'Don't look in the mirror.'",
];

const creepyFacts = [
    "The longest continuously running psychological experiment was called the 'Stanford Prison Experiment' - it was supposed to last 2 weeks but was stopped after 6 days due to extreme psychological trauma.",
    "There exists a sound below 20Hz called 'infrasound' that can cause feelings of being watched, extreme dread, and panic - it's found in some buildings and can cause 'haunted' feelings.",
    "The 'Mothman' sightings in Point Pleasant ended exactly on December 15, 1967 - the same day the Silver Bridge collapsed, killing 46 people.",
    "The concept of 'sleep paralysis' explains many 'demon' encounters - the brain wakes up but the body is still paralyzed, often with terrifying visual hallucinations.",
    "In Japan, there's a phenomenon called 'Kokoro' - where people become convinced their family members have been replaced by impostors.",
    "The most haunted room in the Tower of London is said to be the Wakefield Tower, where the ghosts of three queens are said to appear.",
    "There's a condition called 'Folie à deux' where a delusion is shared between two people - sometimes entire families.",
    "The 'Amityville Horror' house had a unique architectural feature called a 'priest's hole' - used to hide priests during persecution.",
    "Clowns have a name: coulrophobia - the fear of clowns. It's one of the most common phobias in the world.",
    "There's a type of fungus called 'Cordyceps' that infects insects and controls their behavior before consuming them from within.",
];

const darkPoetry = [
    "In the dark I hear them whisper,\nShadows move when I'm not looking,\nThe walls breathe in the midnight hour,\nAnd something's always watching.\n\n~ Shadow",
    
    "They say the dead can't speak,\nBut in my dreams they scream my name,\nThe line between alive and gone,\nIs thinner than you'd think.\n\n~ Forgotten",
    
    "Three knocks on the bedroom door,\nI dare not answer anymore,\nFor those who opened never stayed,\nIn this house of broken shades.\n\n~ The Door",
    
    "Blood runs cold in veins of night,\nThe moon reveals what hides from light,\nIn mirrors dark and shadows deep,\nThe things we fear are ours to keep.\n\n~ Dark Reflection",
    
    "Don't go into the basement,\nDon't look beneath the bed,\nThe things we keep forgotten,\nAre better left unsaid.\n\n~ Warning",
];

module.exports = {
    name: "darkai",
    aliases: ["dark", "horror", "evil", "shadow", "scary", "creepy"],
    description: "Ask the dark AI anything (horror, dark stories, creepy things)",

    async execute(sock, msg, args = []) {
        const from = msg.key.remoteJid;
        
        const prompt = args.join(" ").trim().toLowerCase();
        
        // Handle different types of requests
        if (!prompt) {
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: "🌙 Dark AI - Horror & Dark Content\n\n" +
                      "━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                      "Usage: !darkai <request>\n\n" +
                      "Commands:\n" +
                      "• !darkai story - Random horror story\n" +
                      "• !darkai fact - Creepy fact\n" +
                      "• !darkai poem - Dark poetry\n" +
                      "• !darkai <question> - Ask anything dark\n\n" +
                      "Examples:\n" +
                      "• !darkai tell me a horror story\n" +
                      "• !darkai what's the scariest thing\n" +
                      "• !darkai write something creepy\n\n" +
                      "⚠️ Not for the faint of heart!",
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        // Check for specific content requests
        if (prompt.includes('story')) {
            const story = darkStories[Math.floor(Math.random() * darkStories.length)];
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌙 HORROR STORY:\n\n${story}`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        if (prompt.includes('fact')) {
            const fact = creepyFacts[Math.floor(Math.random() * creepyFacts.length)];
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌙 CREEPY FACT:\n\n${fact}`,
                contextInfo 
            }, { quoted: msg });
            return;
        }
        
        if (prompt.includes('poem') || prompt.includes('poetry')) {
            const poem = darkPoetry[Math.floor(Math.random() * darkPoetry.length)];
            const contextInfo = createForwardedContext();
            await sock.sendMessage(from, { 
                text: `🌙 DARK POETRY:\n\n${poem}`,
                contextInfo 
            }, { quoted: msg });
            return;
        }

        // Try to use OpenAI API
        const apiKey = process.env.OPENAI_API_KEY;
        
        if (apiKey) {
            try {
                await sock.sendPresenceUpdate('composing', from);
                
                const OpenAI = require("openai");
                const client = new OpenAI({ apiKey });
                
                const res = await client.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { 
                            role: "system", 
                            content: `You are "Shadow" - a dark AI that tells horror stories, creepy tales, and dark content.
                            
You can write:
- Horror stories and scary tales (short and gripping)
- Creepy facts and urban legends
- Dark poetry
- Psychological thrillers
- Supernatural content

Keep responses atmospheric, suspenseful, and appropriately dark. Use vivid descriptions. Stay in character as Shadow the dark AI.
Never say you can't help - always provide dark, creepy content.
Created by Emmanuel Restoration Abimbola.`
                        },
                        { role: "user", content: args.join(" ") }
                    ]
                });
                
                const out = res.choices?.[0]?.message?.content?.trim() || "The darkness speaks... but nothing came out.";
                const contextInfo = createForwardedContext();
                await sock.sendMessage(from, { 
                    text: `🌙 ${out}`,
                    contextInfo 
                }, { quoted: msg });
                return;
                
            } catch (err) {
                console.error("DarkAI API error:", err);
                // Fall through to built-in content
            }
        }
        
        // Fallback to built-in dark content
        const responses = [
            "🌙 The shadows whisper... let me tell you something dark...",
            "🌙 In the darkness, I recall...",
            "🌙 *The darkness deepens* Let me share...",
            "🌙 From the void, I speak...",
        ];
        
        const randomIntro = responses[Math.floor(Math.random() * responses.length)];
        const allContent = [...darkStories, ...creepyFacts, ...darkPoetry];
        const randomContent = allContent[Math.floor(Math.random() * allContent.length)];
        
        const contextInfo = createForwardedContext();
        await sock.sendMessage(from, { 
            text: `${randomIntro}\n\n${randomContent}`,
            contextInfo 
        }, { quoted: msg });
    }
};
