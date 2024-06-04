type Result = {
  winner: string;
  line: number[];
};
function calculateWinner(squares: string[]): Result | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let result = null;
  lines.some(([a, b, c]) => {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      result = {winner: squares[a], line: [a, b, c]};
      return true;
    }
    return false;
  });

  return result;
}

export default calculateWinner;
