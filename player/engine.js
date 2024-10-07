import { useMainPlayer } from 'discord-player';
import Logger from '../logger/index.js';

export async function playerPlay(interaction) {
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

export async function playerAddToQueue(interaction) {
  const player = useMainPlayer();
  const channel = interaction.member.voice.channel;
  if (!channel) return interaction.reply('You are not connected to a voice channel!');
  const query = interaction.options.getString('query', true);

  await interaction.deferReply();

  try {
    const { track } = await player.stop(channel, query, {
      nodeOptions: {
        metadata: interaction
      }
    });
    return interaction.followUp(`Okay, I've stopped the player!`);
  } catch (e) {
    Logger.error(`${e}`)
    return interaction.reply('Something went wrong...');
  }
}