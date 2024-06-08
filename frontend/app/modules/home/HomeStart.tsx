'use client';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import HomeStartDialog from './HomeStartDialog';
import useHomeStart from './useHomeStart';
import useSearchGameById from './useSearchGameById';

const HomeStart = () => {
  const {isOpen, setIsOpen} = useHomeStart();

  const {searchedValue, setSearchedValue, onSearch} = useSearchGameById();
  const handleClose = () => setIsOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="row" gap={1} component="form" onSubmit={onSearch}>
        <TextField
          variant="outlined"
          label="Search game id"
          value={searchedValue}
          onChange={(e) => setSearchedValue(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#d5d5d5',
            },
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              // - The Input-root, inside the TextField-root
              '& fieldset': {
                // - The <fieldset> inside the Input-root
                borderColor: '#fff', // - Set the Input border
              },
              '&:hover fieldset': {
                borderColor: 'primary.main', // - Set the Input border when parent has :hover
              },
              '&.Mui-focused fieldset': {
                // - Set the Input border when parent is focused
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <Button variant="contained" type="submit">
          <SearchIcon />
        </Button>
      </Stack>
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
