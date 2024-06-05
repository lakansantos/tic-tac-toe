'use client';
import React from 'react';
import {Box} from '@mui/material';
import Board from 'modules/Board/Board';
import {useSearchParams} from 'next/navigation';

function TicTacToe() {
  const searchParams = useSearchParams();
  const message = searchParams.get('test');

  console.log(message);
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
      <Box sx={{mt: 2}}>
        <Board />
      </Box>
    </Box>
  );
}

export default TicTacToe;
