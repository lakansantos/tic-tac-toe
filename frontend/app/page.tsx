'use client';
import React from 'react';
import {Box, Button} from '@mui/material';
import StartDialog from 'modules/start/StartDialog';
import useStart from 'modules/start/useStart';

function Home() {
  const {isOpen, setIsOpen} = useStart();

  const handleClose = () => setIsOpen(false);

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
      Home
      <Button
        variant="outlined"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Start Game
      </Button>
      <StartDialog open={isOpen} handleClose={handleClose} />
    </Box>
  );
}

export default Home;
