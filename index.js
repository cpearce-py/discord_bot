require('dotenv').config();

const ngrok = require('ngrok');
const WebHookListener = require('twitch-webhooks').default;

// (async function() {
//     const url = await ngrok.connect(8000);

// })();


const Twitch = require('twitch').default;
const twitch_clientID = process.env.TWITCH_CLIENT_ID;
const twitch_token = process.env.TWITCH_ACCESS_TOKEN;
const client = Twitch.withClientCredentials(twitch_clientID, twitch_token);

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
const prefix = '$';


bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

});

bot.login(token);



async function streamWebhook(client){

    // const listener = await WebHookListener.create(client, {
    // hostName: '86d78d2a.ngrok.io',
    // port: 8000,
    // reverseProxy: {  port:  443, ssl: true }
    // });

    const myUser = await client.helix.users.getUserByName('Citobor');

    const stream = {
        'hub.callback': '86d78d2a.ngrok.io',
        'hub.mode':  'subscribe',
        'hub.topic': `https://api.twitch.tv/helix/streams?user_id=${myUser.id}`,
        'hub.lease_seconds': 864000
    }

    console.log(stream["hub.topic"])


    // const subscription = await listener.subscribeToStreamChanges(myUser, async (stream?: HelixStream) => {
    //     if (stream) {
    //         console.log(`${stream.userDisplayName} just went live with title: ${stream.title}`);
    //     } else {
    //         const user = await client.helix.users.getUserById(myUser.id);
    //         console.log(`${user.displayName} just went offline`);
    //     } }); 

    // listener.listen();



};


streamWebhook(client);


