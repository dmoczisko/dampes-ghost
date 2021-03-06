const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();

newdate = month + "/" + day;

client.on('ready', () => {
    console.log("You've found the Hookshot!");
    
    if (newdate == "5/19") {
        console.log("Happy birthday Frosty!")
    }
    else if (newdate == "5/22") {
        console.log("Happy birthday Maerkus!")
    }
    else {
        console.log("It's nobody's birthday")
    }    
});

client.login(process.env.BOT_TOKEN)

client.on('messageCreate', (msg) => {
    //prefix variable is "!"
    const prefix = '!';

    //if message doesn't start with prefix or is from bot, return
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    //variables to slice the message and shift to lowercase
    const args = msg.content.slice(prefix.length).trim().split(/ !/);
    const command = args.shift().toLowerCase();

    //Get the variable for full message to use on the message content check
    const fullMessage = prefix + command;
    String(command);

    //Set up array for valid commands
    const validCommands = ["dadjoke", "tassi" , "markmad", "perf", "pjk", "pulphalo", "socool", "teacher", "twistedtbag", "usererror", "ball", "jennaspying"];
    const seshCommands = ["create", "poll", "settings", "link", "list", "delete", "remind", "patreon", "vote"];
    
    //Process message
    if (msg.content === fullMessage && validCommands.includes(command)) {
        msg.delete();
        console.log(command);
        msg.channel.send({
            content: "Sent via | " + msg.author.username,
            files: [
                "./graves/" + command + ".gif"
            ]
        });
    }
    else if (msg.content === "testingSesh") {
        console.log("else if statement: " + command);
    }
    else {
        msg.delete();
        console.log( "else statement " + command);
        msg.channel.send({
            content: "Nice Try, " +  msg.author.username + " - I'm NEVA GONNA DIE!",
            files: [
                "./graves/dampe.gif"
            ]
        });
    }
});
