import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Typography from '@mui/material/Typography';
import {Box, Stack} from '@mui/material';

export default function BoardAnnounceWinnerDialog({
  status,
  winner,
  handleStop,
  handleNextRound,
}: {
  status: string;
  winner: string | null;
  handleStop: () => void;
  handleNextRound: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (winner) {
      const timeoutId = setTimeout(() => {
        setOpen(true);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setOpen(false);
    }
  }, [winner]);

  return (
    <React.Fragment>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiDialogContent-root': {
            width: '500px',
            height: '200px',
          },
        }}
      >
        <DialogContent dividers>
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography fontSize={36}>{status}</Typography>
            <Stack direction="column" spacing={1}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#e74c3c',
                  minWidth: '240px',
                }}
                onClick={handleStop}
              >
                Stop
              </Button>
              <Button variant="contained" onClick={handleNextRound}>
                Continue?
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
