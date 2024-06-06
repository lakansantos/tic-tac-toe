import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Typography from '@mui/material/Typography';
import {Box, Stack, alpha} from '@mui/material';

export default function BoardAnnounceWinnerDialog({
  status,
  handleStop,
  handleNextRound,
  isRoundFinished,
}: {
  status?: string;
  isRoundFinished: boolean;
  handleStop: () => void;
  handleNextRound: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isRoundFinished) {
      const timeoutId = setTimeout(() => {
        setOpen(true);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setOpen(false);
    }
  }, [isRoundFinished]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        sx={{
          '& .MuiDialogContent-root': {
            width: '500px',
            height: '200px',
          },
        }}
      >
        <DialogContent
          dividers
          sx={{
            bgcolor: 'secondary.main',
            color: '#fff',
          }}
        >
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
            <Typography fontSize={24} color="primary.main">
              Do you still want to proceed?
            </Typography>
            <Stack direction="row" spacing={1} sx={{mt: 2}}>
              <Stack>
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: '100px',
                    color: '#fff',
                    ':hover': {
                      bgcolor: alpha('#95a5a6', 0.9),
                    },
                    '&.MuiButton-root': {
                      border: '1px solid #95a5a6',
                    },
                  }}
                  onClick={handleStop}
                >
                  Stop
                </Button>
              </Stack>
              <Stack>
                <Button
                  variant="contained"
                  onClick={handleNextRound}
                  sx={{
                    bgcolor: '#fff',

                    ':hover': {
                      bgcolor: alpha('#fff', 0.7),
                    },
                  }}
                >
                  Continue?
                </Button>
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
