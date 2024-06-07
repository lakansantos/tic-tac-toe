'use client';
import {alpha, Box, Divider, Typography} from '@mui/material';
import {Games} from 'app/types/game/gameType';
import React from 'react';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeMatchHistoryPagination from './HomeMatchHistoryPagination';

const HomeMatchHistory = ({
  data,
  meta,
}: {
  data?: Games;
  meta?: Meta | undefined;
}) => {
  return (
    <Box
      sx={{
        height: 'fit-content',
        maxHeight: '70%',
        width: '100%',
        bgcolor: 'secondary.light',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ReceiptLongIcon />

        <Typography fontSize={20} mt="7px">
          Match History
        </Typography>
      </Box>
      <Divider
        sx={{
          bgcolor: alpha('#fff', 0.2),
        }}
      />
      <Box
        sx={{
          overflowX: 'auto',
          maxHeight: 400,
          width: '100%',
          minHeight: 100,
          '&::-webkit-scrollbar': {
            width: '.5vh',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'primary.main',
            borderRadius: '20px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: '#444',
          },
        }}
      >
        {(data || []).map((game) => {
          const {game_id, players, draw_count, created_at} = game;
          const {player1, player2} = players;

          return (
            <Box
              key={game_id}
              sx={{
                bgcolor: 'secondary.light',
                '&:hover': {
                  bgcolor: alpha('#444', 0.7),
                },
              }}
            >
              <Box
                sx={{
                  height: '150px',
                }}
              >
                <p>Created at: {created_at}</p>
                <p>Player 1 name: {player1.name}</p>
                <p>Player 2 name: {player2.name}</p>
                <p>Player 1 Score: {player1.score} </p>
              </Box>
              <Divider
                sx={{
                  bgcolor: alpha('#fff', 0.2),
                }}
              />
            </Box>
          );
        })}
        {data && data.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              color: '#c5c9ca',
              gap: 1,
            }}
          >
            <SportsEsportsIcon />
            No games data yet.
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 50,
          bgcolor: 'secondary.light',
        }}
      >
        <HomeMatchHistoryPagination meta={meta} />
      </Box>
    </Box>
  );
};

export default HomeMatchHistory;
