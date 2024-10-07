import 'dotenv/config';
import Logger from '../logger/index.js';
import { playerPlay } from '../player/engine.js';

const play = (interaction) => {
  playerPlay(interaction);
}

export const handleCommand = (interaction) => {
  switch (interaction.commandName) {
    case 'play':
      play(interaction);
  }
}