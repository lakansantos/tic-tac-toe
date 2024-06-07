import Game from '../../models/gameModel.js';
import { validationErrorMessageMapper } from '../../utils/string.js';
const saveGameController = async (req, res) => {
  try {
    const { players, draw_count, winner, rounds_count } = req.body;
    const newGame = new Game({
      players,
      draw_count,
      winner,
      rounds_count,
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
