import 'dotenv/config';
import PlayerEngine from '../player/engine.js';
import Logger from "../logger/index.js";

export const handleCommand = (interaction) => {
  Logger.info(interaction.commandName);
  switch (interaction.commandName) {
    case 'play':
      PlayerEngine.play(interaction);
      break;
    case 'pause':
      PlayerEngine.pause(interaction);
      break;
    case 'resume':
      PlayerEngine.resume(interaction);
      break;
  }
}