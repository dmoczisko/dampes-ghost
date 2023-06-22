const Discord = require('discord.js');
const config = require("./config.json");
const cron = require('node-cron');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })


client.on('ready', () => {
    console.log("You've found the Hookshot!");
});

// Set the desired time for the message in 24-hour format (e.g., '18:00' for 6:00 PM)
const scheduledTime = '12:10';
// Function to send the message
function sendMessage() {
    const channelID = 'YOUR_CHANNEL_ID'; // Replace with the channel ID where you want to send the message
    const channel = client.channels.cache.get(channelID);

    if (channel) {
        channel.send('This is your daily scheduled message!'); // Replace with your desired message content
    } else {
        console.error(`Unable to find channel with ID ${channelID}`);
    }
}

client.login(config.BOT_TOKEN);

// Schedule the task to run every day at the specified time
cron.schedule(`0 ${scheduledTime} * * *`, () => {
    sendMessage();
});

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
