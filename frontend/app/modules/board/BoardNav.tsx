'use client';
import {Box, Button, Typography} from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {useRouter} from 'next/navigation';
const BoardNav = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: '100%',
        pl: 3,
        mt: 2,
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => {
          router.push('/');
        }}
      >
        <Typography mt={0.3}>Home</Typography>
      </Button>
    </Box>
  );
};

export default BoardNav;
