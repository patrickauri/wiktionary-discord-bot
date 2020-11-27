const Discord = require('discord.js');
const request = require('request');
require('dotenv').config();
const client = new Discord.Client();
const commandPrefix = '!';
const commandName = 'dict';

const LookUp = (lang, word, msg) => {
    const query = `https://en.wiktionary.org/w/api.php?action=query&list=search&srsearch=${word}&format=json`;
    console.log(`Query: ${query}`);
    request(query, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        if (body.query.searchinfo.totalhits > 0) {
            const result = body.query.search[0].snippet;
            console.log(result);
            msg.channel.send(result);
        }
        else {
            console.log('No Results');
        }
    });
}

const parseInput = (msg) => {
    let x = msg.content.split(' ');
    const cmd = commandPrefix + commandName;
    if (x.length >= 3 && x[0] === cmd) {
        LookUp(x[1], x[2], msg);
    }
}

client.on('message', (msg) => {
    if (msg.content[0] === commandPrefix) {
        parseInput(msg);
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);