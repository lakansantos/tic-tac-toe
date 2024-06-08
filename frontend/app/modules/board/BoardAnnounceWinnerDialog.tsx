'use client';
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Typography from '@mui/material/Typography';
import {Box, CircularProgress, IconButton, Stack, alpha} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useRouter} from 'next/navigation';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

export default function BoardAnnounceWinnerDialog({
  status,
  handleStop,
  handleNextRound,
  isRoundFinished,
  isGameSaving,
  isSaved,
  timer,
  errorMessage,
}: {
  status?: string;
  isRoundFinished: boolean;
  isGameSaving: boolean | null;
  handleStop: () => void;
  handleNextRound: () => void;
  isSaved: boolean | null;
  timer: number;
  errorMessage: string | null;
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

  const router = useRouter();

  return (
    <React.Fragment>
      <Dialog
        open={open}
        sx={{
          '& .MuiDialogContent-root': {
            width: '500px',
            height: 'fit-content',
            minHeight: '300px',
          },
        }}
      >
        {errorMessage !== null && (
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              color: 'primary.main',
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}

        <DialogContent
          dividers
          sx={{
            bgcolor: 'secondary.main',
            color: '#fff',
            alignContent: 'center',
          }}
        >
          {isGameSaving ? (
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <CircularProgress /> Saving game data...
            </Box>
          ) : isSaved ? (
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 72,
                  color: 'primary.main',
                }}
              />
              <Typography fontSize={30}>Game saved!</Typography>
              Redirect in {timer}
              <Button
                variant="contained"
                onClick={() => {
                  router.push('/');
                  router.refresh();
                }}
              >
                Go Home
              </Button>
            </Box>
          ) : errorMessage ? (
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <ErrorIcon
                sx={{
                  fontSize: 72,
                  color: '#e74c3c',
                }}
              />
              <Typography fontSize={30}>{errorMessage}</Typography>
              <Button variant="contained" onClick={handleStop}>
                Try again
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography fontSize={36} color="primary.main">
                {status}
              </Typography>
              <Typography fontSize={24} color="#fff">
                Do you still want to proceed?
              </Typography>
              <Stack direction="row" spacing={1} sx={{mt: 2}}>
                <Stack>
                  <Button
                    variant="outlined"
                    sx={{
                      minWidth: '100px',
                      color: '#fff',
                      ':ho  ver': {
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
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
