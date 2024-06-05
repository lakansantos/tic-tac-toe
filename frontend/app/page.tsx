'use client';
import React from 'react';
import {Box, Button} from '@mui/material';
import {useRouter} from 'next/navigation';
import StartDialog from 'modules/start/StartDialog';
import useStart from 'modules/start/useStart';

function Home() {
  const router = useRouter();

  const {isOpen, setIsOpen} = useStart();

  const handleClose = () => setIsOpen(false);

  const handleStart = () => {
    router.push('/game');
  };

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
        Start
      </Button>
      <StartDialog
        open={isOpen}
        handleClose={handleClose}
        handleStart={handleStart}
      />
    </Box>
  );
}

export default Home;
