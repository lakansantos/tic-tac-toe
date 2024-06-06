'use client';
import {Button} from '@mui/material';
import React from 'react';
import HomeStartDialog from './HomeStartDialog';
import useHomeStart from './useHomeStart';

const HomeStart = () => {
  const {isOpen, setIsOpen} = useHomeStart();

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Start Game
      </Button>
      <HomeStartDialog open={isOpen} handleClose={handleClose} />
    </>
  );
};

export default HomeStart;
