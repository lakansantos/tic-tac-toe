import {alpha, Button} from '@mui/material';
import React from 'react';

function BoardSquare({
  value,
  onClick,
  styles,
  highlight = false,
}: {
  value: string;
  index: number;
  onClick: () => void;
  styles?: Record<string, unknown>;
  highlight?: boolean;
}) {
  return (
    <Button
      sx={{
        width: '150px',
        height: '150px',
        bgcolor: highlight ? 'primary.main' : 'secondary.main', // Highlight color for winner
        border: '1px solid #fff',
        display: 'flex',
        fontSize: 70,
        fontWeight: '600',
        color: highlight
          ? '#000'
          : value === 'X'
            ? 'primary.main'
            : value === 'O'
              ? '#f1c40f'
              : '#fff',
        cursor: 'pointer',
        borderRadius: 0,
        ':hover': {
          bgcolor: highlight ? 'primary.main' : alpha('#fff', 0.3),
          color: '#000',
        },
        ...styles,
      }}
      onClick={onClick}
    >
      {value}
    </Button>
  );
}

export default BoardSquare;
