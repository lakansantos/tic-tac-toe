'use client';
import {BASE_URL} from 'app/configs/environment';
import {Game} from 'app/types/game/gameType';
import {useState} from 'react';

const useBoardSaveGame = () => {
  const [isGameSaving, setIsGameSaving] = useState<boolean | null>(null);
  const [isSaved, setIsSaved] = useState<boolean | null>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const saveGame = async (gameData: Game) => {
    setIsGameSaving(true);
    try {
      const response = await fetch(`${BASE_URL}/save-game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (response.status === 400) throw new Error('404, Not found');
      if (response.status === 500)
        throw new Error('500, internal server error');
      setIsGameSaving(false);
      setIsSaved(true);
    } catch (error) {
      setErrorMessage('Something went wrong!');
      setIsGameSaving(null);
      setIsSaved(false);
    }
  };

  return {
    saveGame,
    isGameSaving,
    isSaved,
    errorMessage,
  };
};

export default useBoardSaveGame;
