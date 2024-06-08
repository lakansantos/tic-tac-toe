import React from 'react';
import {Box} from '@mui/material';
import BoardPage from 'modules/board/BoardPage';
import BoardNav from 'modules/board/BoardNav';

function TicTacToe() {
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
      <BoardNav />
      <BoardPage />
    </Box>
  );
}

export default TicTacToe;
