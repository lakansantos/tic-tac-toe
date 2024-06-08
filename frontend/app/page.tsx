import React from 'react';
import {Box, Typography} from '@mui/material';
import HomeStart from 'modules/home/HomeStart';
import useGetHomeGames from 'modules/home/useGetHomeGames';

import HomeMatchHistory from 'modules/home/HomeMatchHistory';

async function Home({
  searchParams,
}: {
  searchParams: {offset: number; search: string};
}) {
  const response = await useGetHomeGames(searchParams);

  const {data = [], meta} = response ?? {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'secondary.main',
        color: '#9DECF9',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: '50%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography fontSize={40}>Tic Tac Toe</Typography>
        <HomeStart />
        <HomeMatchHistory data={data} meta={meta} />
      </Box>
    </Box>
  );
}

export default Home;
