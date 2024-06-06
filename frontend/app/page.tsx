import React from 'react';
import {Box} from '@mui/material';
import HomeStart from 'modules/home/HomeStart';
import useGetHomeGames from 'modules/home/useGetHomeGames';

async function Home() {
  const data = await useGetHomeGames();

  console.log(data);
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
      <HomeStart />
    </Box>
  );
}

export default Home;
