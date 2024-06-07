// modules/home/useGetHomeGames.ts
import {BASE_URL} from 'app/configs/environment';
import {Games} from 'app/types/game/gameType';

type ApiResponse = {
  data: Games;
  meta?: Meta;
};

const useGetHomeGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all-games`);

    const metadata: ApiResponse = await response.json();
    return metadata as ApiResponse;
  } catch (error) {
    console.error(error);
  }
};

export default useGetHomeGames;
