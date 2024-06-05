'use client';
import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import BoardSquare from 'modules/Board/BoardSquare';
import calculateWinner from './boardCalculateWinner';
import BoardAnnounceWinnerDialog from './BoardAnnounceWinnerDialog';
import {useRouter} from 'next/navigation';

function Board() {
  const defaultSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(defaultSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
  });

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
  const handleClick = (index: number) => {
    if (winner || squares[index]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const turn = 'Turn: ' + (isXNext ? 'X' : 'O');

  let status;
  const draw = !winner && squares.filter(Boolean).length === 9;
  if (winner) {
    status = `${winner} Won!`;
  } else if (draw) {
    status = 'Draw';
  }
  const isRoundFinished = !!winner || draw;

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

  const {O, X} = scores;

  const handleNextRound = () => {
    setRound(round + 1);
    setSquares(defaultSquares);
    setWinner(null);
    setIsXNext(true);
  };

  const router = useRouter();

  const handleStop = () => {
    router.push('/');
  };
  return (
    <Box sx={{width: '100%'}}>
      <Typography fontSize={24}>Player X Score: {X}</Typography>
      <Typography fontSize={24}>Player O Score: {O}</Typography>
      <Typography fontSize={24}>Round: {round}</Typography>
      <Typography fontSize={24}>{turn}</Typography>
      <Box>
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

export default Board;
