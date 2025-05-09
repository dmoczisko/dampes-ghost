const Discord = require('discord.js');
const config = require("./config.json");
const cron = require('node-cron');
const winston = require('winston');
const { getRandomJoke } = require('./dadJokes');
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
    const gChannelID = '252199801746227205';
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

    // Schedule a dad joke to be sent every day at 8 AM US Central Time
    cron.schedule('0 8 * * *', async () => {
        const channel = client.channels.cache.get(gChannelID);
        if (channel) {
            logger.info('Sending daily dad joke');
            const joke = await getRandomJoke();
            channel.send({
                content: joke,
                files: [
                    "./graves/dadjoke.gif"
                ]
            });
        }
        else {
            logger.error('Error: daily dad joke message did not work: ' + channel);
        }
    }, {
        timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    });

    // Schedule the videogame grid link to be sent every day at 8:30 AM US Central Time
    // dude didn't fix his app so commenting out until i build my own and link it here
    // cron.schedule('30 8 * * *', async () => {
    //     const channel = client.channels.cache.get(channelID);
    //     if (channel) {
    //         logger.info('Sending daily videogame grid link');
    //         channel.send({
    //             content: 'Test your might! [videogame.io](https://videogamegrid.io)'
    //         });
    //     }
    //     else {
    //         logger.error('Error: daily videogame grid link message did not work: ' + channel);
    //     }
    // }, {
    //     timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    // });

    // Happy Birthday Kyle!
    cron.schedule('0 7 16 2 *', () => {
        const channel = client.channels.cache.get(channelID);
        if (channel) {
            logger.info('Kyles Birthday');
            channel.send('Happy Birthday Kyle!!!');
            channel.send({
                files: [
                    "./graves/gruntbday.gif"
                ]
            });
        }
        else {
            logger.error('Error: Kyles Birthday message did not work: ' + channel);
        }
    }, {
        timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    });


    // Happy Birthday Danny!
    cron.schedule('0 7 19 5 *', () => {
        const channel = client.channels.cache.get(channelID);
        if (channel) {
            logger.info('Dannys Birthday');
            channel.send('Happy Birthday Danny!!!');
            channel.send({
                files: [
                    "./graves/gruntbday.gif"
                ]
            });
        }
        else {
            logger.error('Error: Dannys Birthday message did not work: ' + channel);
        }
    }, {
        timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    });

    // Happy Birthday Mark!
    cron.schedule('0 7 22 5 *', () => {
        const channel = client.channels.cache.get(channelID);
        if (channel) {
            logger.info('Marks Birthday');
            channel.send('Happy Birthday Mark!!!');
            channel.send({
                files: [
                    "./graves/gruntbday.gif"
                ]
            });
        }
        else {
            logger.error('Error: Marks Birthday message did not work: ' + channel);
        }
    }, {
        timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    });

    // Happy Birthday Sean!
    cron.schedule('0 7 14 10 *', () => {
        const channel = client.channels.cache.get(channelID);
        if (channel) {
            logger.info('Seans Birthday');
            channel.send('Happy Birthday Sean!!!');
            channel.send({
                files: [
                    "./graves/gruntbday.gif"
                ]
            });
        }
        else {
            logger.error('Error: Seans Birthday message did not work: ' + channel);
        }
    }, {
        timezone: 'America/Chicago' // Set the timezone to US Central Time (CT)
    });
});

client.login(config.BOT_TOKEN);

client.on('messageCreate', async (msg) => {
    //prefix variable is "!"
    const prefix = '!';

    const { MessageEmbed } = require('discord.js');

    //if message doesn't start with prefix or is from bot, return
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    //variables to slice the message and shift to lowercase
    const args = msg.content.slice(prefix.length).trim().split(/ !/);
    const command = args.shift().toLowerCase();

    //Get the variable for full message to use on the message content check
    const fullMessage = prefix + command;
    String(command);

    //Set up array for valid commands
    const validCommands = ["dadjoke", "dadjokev", "tassi", "markmad", "perf", "pjk", "pulphalo", "socool", "teacher", "twistedtbag", "usererror", "ball", "jennaspying", "done", "jfc", "begun", "addtogap", "revenge", "luigi", "imback", "gamenight", "aliens", "helldivers", "hdsamples", "chronos", "gruntbday", "shrug", "spin", "coneofshame", "excuseyou", "imsorrywhat", "ohyea"];
    const seshCommands = ["create", "poll", "settings", "link", "list", "delete", "remind", "patreon", "vote"];

    // dadjoke message first to usurp all other commands
    if (msg.content === `${prefix}dadjoke`) {
        msg.delete();
        logger.info("Dad Joke requested");
        const joke = await getRandomJoke();
        msg.channel.send({
            content: joke,
            files: [
                "./graves/dadjoke.gif"
            ]
        });
    }
    else if (msg.content === `${prefix}commands`) {
        msg.delete();
        logger.info("Commands list requested");

        const embed = new MessageEmbed()
            .setTitle('Available Commands')
            .setDescription(validCommands.join('\n'))
            .setColor('#ff0077');

        msg.channel.send({ embeds: [embed] });
    }
    //Process other messages
    else if (msg.content === fullMessage && validCommands.includes(command)) {
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
        const embed = new MessageEmbed()
            .setTitle('Available Commands')
            .setDescription(validCommands.join('\n'))
            .setColor('#ff0077');

        msg.channel.send({
            content: "It's dangerous to go alone, take these " + msg.author.username,
            embeds: [embed],
            files: [
                "./graves/coneofshame.gif"
            ]
        });
    }
});
