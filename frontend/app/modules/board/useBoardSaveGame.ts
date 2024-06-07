import {BASE_URL} from 'app/configs/environment';
import {Game} from 'app/types/game/gameType';
import {useState} from 'react';

const useBoardSaveGame = () => {
  const [isGameSaving, setIsGameSaving] = useState<boolean | null>(null);
  const [isSaved, setIsSaved] = useState<boolean | null>(false);
  const saveGame = async (gameData: Game) => {
    setIsGameSaving(true);
    try {
      await fetch(`${BASE_URL}/save-game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      setIsGameSaving(false);
      setIsSaved(true);
    } catch (error) {
      console.error(error);
      setIsGameSaving(null);
      setIsSaved(false);
    }
  };

  return {
    saveGame,
    isGameSaving,
    isSaved,
  };
};

export default useBoardSaveGame;
