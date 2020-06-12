import { Client, ClientOptions } from 'discord.js';

const { TOKEN, PREFIX } = require('../../config/');

const client = new Client({ disableEveryone: true } as ClientOptions);

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () =>
  console.log(
    'I just disconnected, making sure you know, I will reconnect now...'
  )
);

interface CommanfList {
  [key: string]: Function;
}

interface boundary {
  char: string;
  index: number;
}
function dyslexify(nickname: string) {
  //TODO: algorithm 1 will programm another one at least
  //alg1 change any 2 letter of place, in a specific word Separated with( space, dashes, /, underline, boundaries of uppaer and lower case)
  //letters next to boundarys do not change

  //intefaces
  interface Boundaries {
    index: number;
    char: string;
  }

  //identify boundaries and groups
  const boundaries = [] as Boundaries[];
  const groups = [] as string[];

  const boundaryDictionary = [
    ' ',
    '-',
    '/',
    '\\',
    "'",
    '"',
    '|',
    ',',
    '.',
    '_',
  ];

  let accumulator = '';
  nickname.split('').forEach((char, index, array) => {
    if (boundaryDictionary.find((x) => x === char)) {
      boundaries.push({ index, char });
      groups.push(accumulator);
      accumulator = '';
    } else {
      accumulator += char;
    }
  });
  groups.push(accumulator);

  console.log('boundaries', boundaries);
  console.log('groups', groups);

  //repeat any number of times
  //todo: change number of times executing it
  const dyslexicGroups = groups.map((group) => {
    const { length } = group;
    const changeTimes = Math.min(length - 3, 5);

    //special case
    if (length <= 3) return group;

    let auxGroup = group;
    for (let i = 0; i <= changeTimes; i++) {
      //swap any 2 letters that is not near boundaries for each group
      //rand1/rand2 cannot be 0 nor length - 1, //todo: nor equals
      const rand1 = Math.round(Math.random() * (length - 3) + 1);
      const rand2 = Math.round(Math.random() * (length - 3) + 1);
      const aux = auxGroup[rand1];
      auxGroup =
        auxGroup.substr(0, rand1) +
        auxGroup[rand2] +
        auxGroup.substr(rand1 + 1);
      auxGroup = auxGroup.substr(0, rand2) + aux + auxGroup.substr(rand2 + 1);
    }
    return auxGroup;
  });

  const dyslexyfied = boundaries.reduce(
    (acc, boundry, index) =>
      `${acc}${boundry.char}${dyslexicGroups[index + 1]}`,
    dyslexicGroups[0]
  );

  return dyslexyfied;
}

client.on('message', async (msg) => {
  //Filtering out user commands
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(PREFIX)) return undefined;

  const command = msg.content.toLowerCase().split(' ')[0].slice(PREFIX.length).trim();

  const commandList = {
    me: async () => {
      const guildMember = await msg.member?.fetch();
      const nickname =
        guildMember?.nickname || guildMember?.user.username || 'bobão';
      setInterval(async () => {
        const newNick = dyslexify(nickname);
        console.log('changed:', newNick);
        await guildMember?.setNickname(newNick);
      }, 5000);
    },
/*     all: async () => {
      const guild = await msg.guild?.fetch();
      const nickname =
        guildMember?.nickname || guildMember?.user.username || 'bobão';
      setInterval(async () => {
        const newNick = dyslexify(nickname);
        console.log('changed:', newNick);
        await guildMember?.setNickname(newNick);
      }, 5000);
    }, */
  } as CommanfList;

  commandList[command]();
});

client.login(TOKEN);

/* (() => {
  console.log(dyslexify('Pé-lava do Saxofone'));
})(); */
