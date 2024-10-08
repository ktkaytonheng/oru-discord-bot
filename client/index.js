import { Client, IntentsBitField } from 'discord.js';
import { useMainPlayer } from 'discord-player';
import Logger from '../logger/index.js';
import { handleCommand } from '../commands/index.js';
import 'dotenv/config';

export const createClient = Logger.logExecution(() => {
  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildVoiceStates,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ]
  })

  client.on('ready', (context) => {
    Logger.success(`${context.user.tag} is ready!`, { padding: true });

    if (process.env.DEBUG_MODE === 'true') {
      const player = useMainPlayer();
      console.log(player.scanDeps());
      player.on('debug', console.log);
      player.events.on('debug', (queue, message) => console.log(`[DEBUG ${queue.guild.id}] ${message}`));
    }
  });

  client.on('messageCreate', (msg) => {
    Logger.info('Received message', { padding: true, module: 'LISTENER', submodule: 'MESSAGE' });
    Logger.info(`${msg.author.displayName}: ${msg.content}`);
  })

  client.on('interactionCreate', (interaction) => {
    Logger.info('Received interaction', { padding: true, module: 'LISTENER', submodule: 'INTERACTION' })

    handleCommand(interaction);
  })

  return client;
} , { startText: 'Initializing client...', endText: 'Client initialized!' });