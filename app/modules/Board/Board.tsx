import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import BoardSquare from 'modules/Board/BoardSquare';
import calculateWinner from './boardCalculateWinner';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState<{
    winner: string | null;
    line: number[];
  }>({winner: null, line: []});

  const result = calculateWinner(squares);
  const handleClick = (index: number) => {
    const newSquares = [...squares];
    if (result || squares[index]) {
      return;
    }
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    if (result) {
      setWinnerInfo(result);
    }
  };

  let status;
  const isDraw = squares.filter(Boolean).length === 9 && !winnerInfo.winner;

  if (result) {
    status = 'Winner: ' + result.winner;
  } else if (isDraw) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O');
  }

  const renderSquare = (key: number, styles?: Record<string, unknown>) => {
    const highlight = result ? result.line.includes(key) : false;
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

  return (
    <Box>
      <Typography fontSize={24}>{status}</Typography>
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
    </Box>
  );
}

export default Board;
