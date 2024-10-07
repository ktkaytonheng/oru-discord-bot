import { YoutubeiExtractor } from 'discord-player-youtubei';
import 'dotenv/config';
import { createClient } from './client/index.js';
import { initializePlayer } from './player/index.js';

const client = createClient();
const player = initializePlayer(client);

await player.extractors.loadDefault((ext) => ext !== 'YoutubeExtractor');
await player.extractors.register(YoutubeiExtractor);

client.login(process.env.DISCORD_TOKEN);