const Discord = require('discord.js');
const config = require("./config.json");
const cron = require('node-cron');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();

newdate = month + "/" + day;

client.on('ready', () => {
    console.log("You've found the Hookshot!");
    // Schedule the message to be sent every day at 8:00 AM CT
    cron.schedule('34 12 * * *', () => {
        console.log("YOOOO 1234");
        msg.channel.send({
            content: "Does this shit work? | " + msg.author.username,
        });
    }, {
        timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    });
});

client.login(config.BOT_TOKEN);

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
    const validCommands = ["dadjoke", "tassi", "markmad", "perf", "pjk", "pulphalo", "socool", "teacher", "twistedtbag", "usererror", "ball", "jennaspying", "done", "jfc", "begun", "addtogap", "revenge", "luigi"];
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
        console.log("else statement " + command);
        msg.channel.send({
            content: "Nice Try, " + msg.author.username + " - I'm NEVA GONNA DIE!",
            files: [
                "./graves/dampe.gif"
            ]
        });
    }
});
