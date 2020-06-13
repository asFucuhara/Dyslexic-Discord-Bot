import { Client, ClientOptions } from 'discord.js';
import commandList from './commands';

const { DISCORD_TOKEN, PREFIX } = require('../../config/');

const client = new Client({ disableEveryone: true } as ClientOptions);

client.on('warn', console.warn);
client.on('error', console.error);
client.on('ready', () => console.log('Yo this ready!'));
client.on('disconnect', () =>
  console.log(
    'I just disconnected, making sure you know, I will reconnect now...'
  )
);

client.on('message', async (msg) => {
  //Filtering out user commands
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(PREFIX)) return undefined;

  //cleaning up message //todo add to commands.js
  const command = msg.content.toLowerCase().slice(PREFIX.length).trim();

  commandList[command](msg);
});

client.login(DISCORD_TOKEN);
