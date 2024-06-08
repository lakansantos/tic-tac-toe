'use client';
import {Box, Typography} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';

export default function Loading() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        bgcolor: 'secondary.main',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'primary.main',
      }}
    >
      <Box sx={{width: '50%', textAlign: 'center'}}>
        <Typography variant="body1">Loading...</Typography>
        <LinearProgress />
      </Box>
    </Box>
  );
}
