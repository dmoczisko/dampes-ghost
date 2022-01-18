const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('ready', () => {
    console.log("You've found the Hookshot!");
});

client.login(process.env.BOT_TOKEN)

client.on('messageCreate', (msg) => {
    if (msg.content === '!dadjoke') {
        msg.delete();
        msg.channel.send({
            content: "Dad Joke of the Day | Sent via " + msg.author.username,
            files: [
                "./graves/dadjoke.gif"
            ]
        });
    }
});




client.on('messageCreate', (msg) => {
    //prefix variable is "!"
    const prefix = '!';

    //if message doesn't start with prefix or is from bot, return
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    //variables to slice the message and shift to lowercase
    const args = msg.content.slice(prefix.length).trim().split(/ !/);
    const command = args.shift().toLowerCase();


    const fullMessage = prefix + command;
    String(fullMessage);
    console.log(fullMessage);

    // if (msg.content === fullMessage) {
    //     msg.delete();
    //     msg.channel.send({
    //         content: "Command: " + fullMessage | "Sent via " + msg.author.username
    //     });
    // }


});