require('dotenv').config();

const ngrok = require('ngrok');
const WebHookListener = require('twitch-webhooks').default;

const Twitch = require('twitch').default;
const twitch_clientID = process.env.TWITCH_CLIENT_ID;
const twitch_token = process.env.TWITCH_ACCESS_TOKEN;
const client = Twitch.withClientCredentials(twitch_clientID, twitch_token);

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
const prefix = '$';

// bot.login(token);

// bot.once('ready', () => {
//     console.log(`Logged in as ${bot.user.tag}!`);

// });





async function streamWebhook(client){
    try {
        const listener = await WebHookListener.create(client, {
        hostName: '2a3c4af71731.ngrok.io',
        port: 8000,
        reverseProxy: {  port:  443, ssl: true }
        });

        listener.listen();

        const myUser = await client.helix.users.getUserByName('citotester');
        console.log(`user is: ${myUser.id}`)

        const stream = await client.helix.streams.getStreamByUserId(myUser);

        const subscription = await listener.subscribeToStreamChanges(myUser, async (stream) => {
            if (stream) {
                console.log(`${streamID.userDisplayName} just went live with title: ${stream.title}`);
            } else {
                const user = await client.helix.users.getUserById(myUser);
                console.log(`${user.displayName} just went offline`);
            } }, 100000); 

        
    } catch (err) {

        console.log(err)
    }


};



streamWebhook(client);


