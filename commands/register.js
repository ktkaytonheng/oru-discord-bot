import 'dotenv/config';
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';
import Logger from '../logger/index.js';

const commands = [
  {
    name: 'play',
    description: 'Plays a song',
    options: [
      {
        name: 'query',
        description: 'YouTube link',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: 'queue',
    description: 'Adds a track to the queue',
    options: [
      {
        name: 'query',
        description: 'YouTube link',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: 'stop',
    description: 'Stops Oru from playing',
  },
  {
    name: 'pause',
    description: 'Pause playback',
  },
  {
    name: 'resume',
    description: 'Resume playback'
  },
  {
    name: 'list',
    description: 'Shows the current queue, show a page number if there are more than 1',
    options: [
      {
        name: 'page',
        description: 'Page number',
        type: ApplicationCommandOptionType.Number
      }
    ]
  },
  {
    name: 'remove',
    description: 'Removes a track at the given index, first by default',
    options: [
      {
        name: 'index',
        description: 'Index of song to remove',
        type: ApplicationCommandOptionType.Number
      }
    ]
  },
  {
    name: 'insert',
    description: 'Brings a song at the given index to the top of the list',
    options: [
      {
        name: 'index',
        description: 'Index of song to insert',
        required: true,
        type: ApplicationCommandOptionType.Number
      }
    ]
  }
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    Logger.info('Registering slash commands...', { module: 'INIT' });
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.APP_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands
      }
    );
    Logger.success('Commands registered successfully');
  } catch (e) {
    Logger.error(`Something went wrong: ${e}`);
  }
})();