import { UUID } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const gameSchema = new Schema({
  player1_name: {
    type: String,
  },
  player2_name: {
    type: String,
  },
  scores: {
    player1_score: Number,
    player2_score: Number,
  },
  draw_count: Number,
  game_room_name: String,
  game_id: {
    type: String,
    default: () => new UUID(),
  },
});

const Game =
  mongoose.models.Game || gameSchema.model('Game', gameSchema);

export default Game;
