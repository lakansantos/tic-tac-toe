import React from 'react';
import {Box} from '@mui/material';
import HomeStart from 'modules/home/HomeStart';
import useGetHomeGames from 'modules/home/useGetHomeGames';
import {Games} from './types/game/gameType';

async function Home() {
  const data: Games | undefined = await useGetHomeGames();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'secondary.main',
        color: '#9DECF9',
      }}
    >
      <ul>
        {(data || []).map((game) => {
          const {
            game_id,
            player1_name,
            player2_name,
            scores,
            draw_count,
            game_room_name,
            created_at,
          } = game;

          const {player1_score, player2_score} = scores || {};
          return (
            <li key={game_id}>
              <p>Game room name: {game_room_name}</p>
              <p>Created at: {created_at}</p>
              <p>Player 1 name: {player1_name}</p>
              <p>Player 2 name: {player2_name}</p>
              <p>Player 1: {player1_score} </p>
              <p>Player 2: {player2_score} </p>
              <p>Draws: {draw_count}</p>

              <p></p>
              <p></p>
            </li>
          );
        })}
      </ul>
      <HomeStart />
    </Box>
  );
}

export default Home;
