'use client';
import React, {useEffect, useState} from 'react';
import {alpha, Box, Button, Stack, Tooltip, Typography} from '@mui/material';
import BoardSquare from 'modules/board/BoardSquare';
import calculateWinner from './boardCalculateWinner';
import BoardAnnounceWinnerDialog from './BoardAnnounceWinnerDialog';

import RefreshIcon from '@mui/icons-material/Refresh';
import {useRouter, useSearchParams} from 'next/navigation';

import {Game} from 'app/types/game/gameType';
import useBoardSaveGame from './useBoardSaveGame';

type Players = {
  [key: string]: string;
};
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

  const isDraw = !winner && squares.filter(Boolean).length === 9;
  useEffect(() => {
    if (isDraw) {
      setDrawScores((prev) => prev + 1);
    }
  }, [isDraw]);

  const searchParams = useSearchParams();

  // Convert searchParams to an object
  const playersObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    playersObj[key] = value;
  });

  const {player1Name, player2Name} = playersObj;

  const players: Players = {
    X: player1Name,
    O: player2Name,
  };
  const handleClick = (index: number) => {
    if (winner || squares[index]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const turn = `${isXNext ? 'X' : 'O'}`;

  let status;

  if (winner) {
    status = `${players[winner]} (${winner}) Has Won!`;
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

  const handleRefresh = () => {
    setRound(1);
    setIsXNext(true);
    setDrawScores(0);
    setScores({X: 0, O: 0});
    setSquares(defaultSquares);
  };

  const router = useRouter();

  let gameWinner;

  if (scores.X > scores.O) {
    gameWinner = player1Name;
  } else if (scores.X < scores.O) {
    gameWinner = player2Name;
  } else {
    gameWinner = 'draw';
  }

  const gameData = {
    players: {
      player1: {
        name: player1Name,
        score: scores.X,
      },
      player2: {
        name: player2Name,
        score: scores.O,
      },
    },
    rounds_count: round,
    draw_count: drawScores,
    winner: gameWinner,
  };

  const {isSaved, isGameSaving, saveGame} = useBoardSaveGame();
  const handleStop = async () => {
    await saveGame(gameData as Game);
  };

  const [timer, setTimer] = useState(3); // 3 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isSaved && !isGameSaving) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval); // Clear the interval when the timer reaches 1
            router.push('/');
            router.refresh();
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isSaved, isGameSaving, router]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
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
        <Typography fontSize={24} color="#fff">
          {' '}
          Ties: {drawScores}
        </Typography>
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
                bgcolor: '#fff',
                py: 2,
                borderRadius: '4px 0 0 4px',
              }}
            >
              <Typography>{player1Name}</Typography>
            </Box>
            <Box
              sx={{
                width: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.main',
                color: '#000',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <Typography fontSize={36} mt={0.5}>
                {scores.X}
              </Typography>
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
                bgcolor: '#fff',
                py: 2,
                borderRadius: '0 4px 4px 0',
              }}
            >
              <Typography>{player2Name}</Typography>
            </Box>
            <Box
              sx={{
                width: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.main',
                color: '#000',
                borderRadius: '4px 0 0 4px',
              }}
            >
              <Typography fontSize={36} mt={0.5}>
                {scores.O}
              </Typography>
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
            gap={1}
            flex={1}
          >
            <Typography
              component="span"
              display="inline-block"
              color="primary.main"
              fontSize={28}
            >
              X
            </Typography>
            <Typography
              component="span"
              display="inline-block"
              color="#f1c40f"
              fontSize={28}
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
              component="span"
              display="inline-block"
              fontSize={24}
              sx={{
                py: 1,
                px: 1,
              }}
            >
              TURN
            </Typography>
            <Typography
              component="span"
              display="inline-block"
              fontSize={24}
              sx={{
                color: isXNext ? 'primary.main' : '#f1c40f',
                py: 1,
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
          isGameSaving={isGameSaving}
          isSaved={isSaved}
          timer={timer}
        />
      </Box>
    </Box>
  );
}

export default BoardPage;
