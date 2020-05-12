require('dotenv').config();


const Discord = require('discord.js');
const bot = new Discord.Client();

const  token = process.env.BOT_TOKEN;

bot.on('ready', () => {
    console.log('This bot is online.');

})

bot.login(token);