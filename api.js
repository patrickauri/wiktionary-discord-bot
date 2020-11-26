const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const commandPrefix = '!';
const commandName = 'dict';

const LookUp = (lang, query) => {
    console.log(`Looking up query: ${query} in language: ${lang}`);
}

const parseInput = (t) => {
    let x = t.split(' ');
    console.log(x)
    if (x.length >= 3) {
        LookUp(x[1], x[2]);
    }
}

client.on('message', (msg) => {
    if (msg.content[0] === commandPrefix) {
        parseInput(msg.content);
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);