import React from 'react';
import {Box} from '@mui/material';
import BoardPage from 'modules/board/BoardPage';

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
      <BoardPage />
    </Box>
  );
}

export default TicTacToe;
