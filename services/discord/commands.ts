import createDyslexify from '../../utils/Dyslexify';

import { Message } from 'discord.js';

const dyslexify = createDyslexify();

interface CommandList {
  [key: string]: Function;
}

const commandList = {
  me: async (msg: Message) => {
    const guildMember = await msg.member?.fetch();
    const nickname =
      guildMember?.nickname || guildMember?.user.username || 'bobão';
    setInterval(async () => {
      const newNick = dyslexify.swapMiddle(nickname);
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
} as CommandList;

export default commandList;
