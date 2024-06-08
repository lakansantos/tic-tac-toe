// modules/home/useGetHomeGames.ts
import {BASE_URL} from 'app/configs/environment';
import {Games} from 'app/types/game/gameType';
import {queryStringify} from 'configs/http';

type ApiResponse = {
  data: Games;
  meta?: Meta;
};

const useGetHomeGames = async (searchParams: {offset: number}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/all-games?${queryStringify(searchParams)}`,
      {cache: 'no-store'}
    );

    const metadata: ApiResponse = await response.json();
    return metadata as ApiResponse;
  } catch (error) {
    console.error(error);
  }
};

export default useGetHomeGames;
