import { useMainPlayer, useQueue } from 'discord-player';
import Logger from '../logger/index.js';

async function play(interaction) {
  const player = useMainPlayer();
  const channel = interaction.member.voice.channel;
  if (!channel) return interaction.reply('You are not connected to a voice channel!');
  const query = interaction.options.getString('query', true);

  await interaction.deferReply();

  try {
    const { track } = await player.play(channel, query, {
      nodeOptions: {
        metadata: interaction
      }
    });

    return interaction.followUp(`Playing **${track.title}**~`);
  } catch (e) {
    Logger.error(`${e}`)
    return interaction.reply('Something went wrong...');
  }
}

async function pause(interaction) {
  const player = useMainPlayer();
  const queue = player.queues;

  console.log(queue);
}

async function resume(interaction) {
  const player = useMainPlayer();
  const queue = player.queues;

  console.log(queue);
}

export default {
  play,
  pause,
  resume
}