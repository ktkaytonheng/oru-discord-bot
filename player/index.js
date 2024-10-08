import { Player } from 'discord-player';
import Logger from '../logger/index.js';

export const initializePlayer = Logger.logExecution((client) => {
  const player = new Player(client);

  player.on("error", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
  });
  player.on("connectionError", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
  });

  player.on("trackStart", (queue, track) => {
    queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
  });

  player.on("trackAdd", (queue, track) => {
    queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
  });

  player.on("botDisconnect", (queue) => {
    queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
  });

  player.on("channelEmpty", (queue) => {
    queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
  });

  player.on("queueEnd", (queue) => {
    queue.metadata.send("✅ | Queue finished!");
  });

  return player;
}, { startText: 'Initializing player...', endText: 'Player initialized' });