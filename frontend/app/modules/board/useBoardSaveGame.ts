import {BASE_URL} from 'app/configs/environment';
import {Game} from 'app/types/game/gameType';

const boardSaveGame = async (gameData: Game) => {
  try {
    await fetch(`${BASE_URL}/save-game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
  } catch (error) {
    console.error(error);
  }
};

export default boardSaveGame;
