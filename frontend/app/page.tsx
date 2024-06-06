'use client';
import React from 'react';
import {Box, Button} from '@mui/material';
import HomeStartDialog from 'modules/home/HomeStartDialog';
import useHomeStart from 'modules/home/useHomeStart';

function Home() {
  const {isOpen, setIsOpen} = useHomeStart();

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
      <HomeStartDialog open={isOpen} handleClose={handleClose} />
    </Box>
  );
}

export default Home;
