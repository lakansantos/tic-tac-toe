import Game from '../../models/gameModel.js';
import { validationErrorMessageMapper } from '../../utils/string.js';
const saveGameController = async (req, res) => {
  try {
    const {
      player1_name,
      player2_name,
      scores,
      draw_count,
      game_room_name,
      winner,
    } = req.body;

    const doesRoomNameExists = await Game.exists({
      game_room_name: game_room_name.trim(),
    });

    if (doesRoomNameExists) {
      return res.status(400).json({
        message: 'Room name is already taken.',
      });
    }

    const newGame = new Game({
      player1_name,
      player2_name,
      scores,
      draw_count,
      game_room_name,
      winner,
    });

    await newGame.save();
    return res.status(200).json({
      data: newGame,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: validationErrorMessageMapper(error),
      });
    }

    return res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

export default saveGameController;
