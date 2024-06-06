import { UUID } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const gameSchema = new Schema(
  {
    player1_name: {
      type: String,
      required: true,
    },
    player2_name: {
      type: String,
      required: true,
    },
    scores: {
      player1_score: {
        type: Number,
        required: true,
      },
      player2_score: {
        type: Number,
        required: true,
      },
    },
    draw_count: {
      type: Number,
      required: true,
    },
    game_room_name: {
      type: String,
      required: true,
    },
    game_id: {
      type: String,
      default: () => new UUID(),
    },
    winner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Game =
  mongoose.models.Game || mongoose.model('Game', gameSchema);

export default Game;
