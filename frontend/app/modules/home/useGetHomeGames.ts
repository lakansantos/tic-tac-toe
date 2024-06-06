import {BASE_URL} from 'app/configs/environment';

const useGetHomeGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all-games`);

    const data = response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default useGetHomeGames;
