'use client';
import {Box, Button, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import HomeStartDialog from './HomeStartDialog';
import useHomeStart from './useHomeStart';

const HomeStart = () => {
  const {isOpen, setIsOpen} = useHomeStart();

  const handleClose = () => setIsOpen(false);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'end',
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        startIcon={<AddIcon />}
      >
        <Typography> Start Game</Typography>
      </Button>
      <HomeStartDialog open={isOpen} handleClose={handleClose} />
    </Box>
  );
};

export default HomeStart;
