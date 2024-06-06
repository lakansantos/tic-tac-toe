import {BASE_URL} from 'app/configs/environment';
import {Games} from 'app/types/game/gameType';

const useGetHomeGames = async (): Promise<Games | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/all-games`);

    const {data} = await response.json();

    return data as Games;
  } catch (error) {
    console.error(error);
  }
};

export default useGetHomeGames;
