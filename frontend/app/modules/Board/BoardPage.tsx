'use client';
import React, {useEffect, useState} from 'react';
import {alpha, Box, Button, Stack, Tooltip, Typography} from '@mui/material';
import BoardSquare from 'modules/Board/BoardSquare';
import calculateWinner from './boardCalculateWinner';
import BoardAnnounceWinnerDialog from './BoardAnnounceWinnerDialog';

import RefreshIcon from '@mui/icons-material/Refresh';
import {useRouter} from 'next/navigation';

function BoardPage() {
  const defaultSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(defaultSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
  });
  const [drawScores, setDrawScores] = useState(0);

  const [round, setRound] = useState(1);

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
    }
  }, [squares]);

  useEffect(() => {
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner as 'X' | 'O']: prevScores[winner as 'X' | 'O'] + 1,
      }));
    }
  }, [winner]);

  console.log(drawScores);
  const isDraw = !winner && squares.filter(Boolean).length === 9;
  useEffect(() => {
    if (isDraw) {
      setDrawScores((prev) => prev + 1);
    }
  }, [isDraw]);

  const handleClick = (index: number) => {
    if (winner || squares[index]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const turn = `${isXNext ? 'X' : 'O'} TURN`;

  let status;

  if (winner) {
    status = `${winner} Won!`;
  } else if (isDraw) {
    status = 'Draw!';
  }
  const isRoundFinished = !!winner || isDraw;

  const renderSquare = (key: number, styles?: Record<string, unknown>) => {
    const highlight = winner
      ? calculateWinner(squares)?.line.includes(key)
      : false;
    return (
      <BoardSquare
        value={squares[key]}
        onClick={() => handleClick(key)}
        index={key}
        highlight={highlight}
        styles={styles}
      />
    );
  };

  const handleNextRound = () => {
    setRound(round + 1);
    setSquares(defaultSquares);
    setWinner(null);
    setIsXNext(true);
  };

  const router = useRouter();

  const handleRefresh = () => {
    setRound(1);
    setIsXNext(true);
    setDrawScores(0);
    setScores({X: 0, O: 0});
    setSquares(defaultSquares);
  };

  const handleStop = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography fontSize={36}>Round {round}</Typography>
        <Stack
          sx={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              p: 3,
              flexGrow: 1,
              color: '#000',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                width: '90%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.main',
                py: 2,
                borderRadius: '4px 0 0 4px',
              }}
            >
              <Typography>Player 1</Typography>
            </Box>
            <Box
              sx={{
                width: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#fff',
                color: '#000',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <Typography>{scores.X}</Typography>
            </Box>
          </Box>
          <Box sx={{mt: 2}}>
            <Typography fontSize={40}>VS</Typography>
          </Box>

          <Box
            sx={{
              p: 3,
              flexGrow: 1,
              color: '#000',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                width: '90%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.main',
                py: 2,
                borderRadius: '0 4px 4px 0',
              }}
            >
              <Typography>Player 2</Typography>
            </Box>
            <Box
              sx={{
                width: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#fff',
                color: '#000',
                borderRadius: '4px 0 0 4px',
              }}
            >
              <Typography>{scores.O}</Typography>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          display="flex"
          width="100%"
          flexWrap="wrap"
          mb={2}
        >
          <Stack
            direction="row"
            sx={{
              marginRight: 'auto',
            }}
            flex={1}
          >
            <Typography
              component="span"
              display="inline-block"
              color="primary.main"
              fontSize={24}
            >
              X
            </Typography>
            <Typography
              component="span"
              display="inline-block"
              color="#f1c40f"
              fontSize={24}
            >
              O
            </Typography>
          </Stack>
          <Box
            flex={1}
            display="flex"
            sx={{
              justifyContent: 'center',
            }}
          >
            <Typography
              fontSize={24}
              sx={{
                bgcolor: '#444',
                borderRadius: 1,
                p: 1,
              }}
            >
              {turn}
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              justifyContent: 'flex-end',
              flex: 1,
            }}
          >
            <Tooltip title="Reset Game" arrow={true}>
              <Button
                onClick={handleRefresh}
                sx={{
                  bgcolor: '#fff',
                  color: '#000',
                  height: '100%',
                  ':hover': {
                    bgcolor: alpha('#fff', 0.5),
                  },
                }}
              >
                <RefreshIcon />
              </Button>
            </Tooltip>
          </Box>
        </Box>

        <Box display="flex">
          {renderSquare(0, {borderTop: 'none', borderLeft: 'none'})}
          {renderSquare(1, {borderTop: 'none'})}
          {renderSquare(2, {borderTop: 0, borderRight: 'none'})}
        </Box>
        <Box display="flex">
          {renderSquare(3, {borderLeft: 'none'})}
          {renderSquare(4)}
          {renderSquare(5, {borderRight: 'none'})}
        </Box>
        <Box display="flex">
          {renderSquare(6, {borderLeft: 'none', borderBottom: 'none'})}
          {renderSquare(7, {borderBottom: 'none'})}
          {renderSquare(8, {borderBottom: 'none', borderRight: 'none'})}
        </Box>

        <BoardAnnounceWinnerDialog
          status={status}
          isRoundFinished={isRoundFinished}
          handleStop={handleStop}
          handleNextRound={handleNextRound}
        />
      </Box>
    </Box>
  );
}

export default BoardPage;
