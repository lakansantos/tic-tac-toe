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
    draw_count: {
      type: Number,
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
