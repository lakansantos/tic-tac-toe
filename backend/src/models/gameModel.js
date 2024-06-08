import { UUID } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const gameSchema = new Schema(
  {
    players: {
      player1: {
        name: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
      player2: {
        name: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    },
    rounds_count: {
      type: Number,
      required: true,
    },
    draw_count: {
      type: Number,
      required: true,
      default: 0,
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

gameSchema.index({ game_id: 'text' });
const Game =
  mongoose.models.Game || mongoose.model('Game', gameSchema);

export default Game;
