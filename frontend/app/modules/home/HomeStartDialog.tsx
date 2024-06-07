import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {Box, TextField, alpha} from '@mui/material';
import {useRouter} from 'next/navigation';
import {queryStringify} from 'configs/http';

export default function StartDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const router = useRouter();

  const players = {
    player1Name,
    player2Name,
  };
  const handleStart = () => {
    const playersStringify = queryStringify(players);
    handleClose();
    router.push('/game' + '?' + playersStringify);
  };

  const isStartButtonDisabled = !(player1Name && player2Name);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{m: 0, p: 2}}>Set Up Players</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="Player 1"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <TextField
            required
            label="Player 2"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />

          <DialogActions>
            <Button
              autoFocus
              onClick={handleStart}
              variant="contained"
              disabled={isStartButtonDisabled}
              sx={{
                bgcolor: 'secondary.main',
                color: '#fff',
                ':hover': {
                  bgcolor: alpha('#333', 0.9),
                },
              }}
            >
              Start
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
