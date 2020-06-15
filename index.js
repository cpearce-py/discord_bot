
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

bot.login(token);

bot.once('ready', () => {
    console.log(`Bot loged in as ${bot.user.tag}!`);
});

async function streamWebhook(client){
    try {
        const listener = await WebHookListener.create(client, {
        hostName: 'fde34306ca03.ngrok.io',
        port: 8000,
        reverseProxy: {  port:  443, ssl: true }
        });

        listener.listen();



        const myUser = await client.helix.users.getUserByName('citotester');
        console.log(`user is: ${myUser.id}`)

        let stream = await client.helix.streams.getStreamByUserId(myUser);

        let prevStream = null
        const subscription = await listener.subscribeToStreamChanges(myUser, async (stream) => {
            if (stream) {
                if (!prevStream) {
                    console.log(`${stream.userDisplayName} just went live with title: ${stream.title}`);

                }
            } else {
                const user = await client.helix.users.getUserById(myUser);
                console.log(`${user.displayName} just went offline`);
            }
            prevStream = stream
        }
    );
    return subscription

    } catch (err) {
        console.log(err)
    }


};

async function sendMessage(client, stream){
    const user = `${stream.userDisplayName}`
    const title = `${user} just went live!!`
    const url = `twitch.tv/${user}`

    const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor('#0099ff')
        .setURL(url)

}
let rep = streamWebhook(client);


console.log('Subscription =', rep);


