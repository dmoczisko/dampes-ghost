const Discord = require('discord.js');
const config = require("./config.json");
const cron = require('node-cron');
const winston = require('winston');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'dampelogs.log' }),
    ],
});

client.on('ready', () => {
    logger.info('Hookshot started!');

    const channelID = '740285381320114306';
    const channel = client.channels.cache.get(channelID);
    if (channel) {
        logger.info('Dampes Back - boot up start gif');
        channel.send({
            files: [
                "./graves/imback.gif"
            ]
        });
    }
    else {
        logger.error('Error: else block of startup imback gif ran with channel id: ' + channel);
    }

    cron.schedule('15 14 * * 3', () => {
        const channelID = '740285381320114306';
        const channel = client.channels.cache.get(channelID);
        if (channel) {
            logger.info('Game Night!');
            channel.send({
                files: [
                    "./graves/gamenight.gif"
                ]
            });
        }
        else {
            logger.error('Error: else block of Game Night ran with channel id: ' + channel);
        }
    }, {
        timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    });

    cron.schedule('15 19 * * 3', () => {
        const channelID = '740285381320114306';
        const channel = client.channels.cache.get(channelID);
        if (channel) {
            logger.info('Bomb Back');
            channel.send('4 to 1, eh? I like these odds');
            channel.send({
                files: [
                    "./graves/aliens.gif"
                ]
            });
        }
        else {
            logger.error('Error: else block of bomb back message ran with channel id: ' + channel);
        }
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
    const validCommands = ["dadjoke", "tassi", "markmad", "perf", "pjk", "pulphalo", "socool", "teacher", "twistedtbag", "usererror", "ball", "jennaspying", "done", "jfc", "begun", "addtogap", "revenge", "luigi", "imback", "gamenight", "aliens"];
    const seshCommands = ["create", "poll", "settings", "link", "list", "delete", "remind", "patreon", "vote"];

    //Process message
    if (msg.content === fullMessage && validCommands.includes(command)) {
        msg.delete();
        logger.info(command);
        msg.channel.send({
            content: "Sent via | " + msg.author.username,
            files: [
                "./graves/" + command + ".gif"
            ]
        });
    }
    else if (msg.content === "testingSesh") {
        logger.info("else if statement: " + command);
    }
    else {
        msg.delete();
        logger.info("else statement " + command);
        msg.channel.send({
            content: "Nice Try, " + msg.author.username + " - I'm NEVA GONNA DIE!",
            files: [
                "./graves/dampe.gif"
            ]
        });
    }
});
