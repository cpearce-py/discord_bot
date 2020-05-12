require('dotenv').config();


const Twitch = require('twitch').default;
const twitch_clientID = process.env.TWITCH_CLIENT_ID;
const twitch_token = process.env.TWITCH_ACCESS_TOKEN;
const twitchClient = Twitch.withCredentials(twitch_clientID, twitch_token);


const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.BOT_TOKEN;
const prefix = '$';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

})


client.login(token);