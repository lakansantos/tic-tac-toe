import {Button} from '@mui/material';
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
        bgcolor: highlight ? 'secondary.main' : 'primary.main', // Highlight color for winner
        border: '1px solid #fff',
        display: 'flex',
        fontSize: '24px',
        color: highlight ? 'primary.main' : 'primary.light',
        cursor: 'pointer',
        borderRadius: 0,
        ':hover': {
          bgcolor: highlight ? 'secondary.main' : 'primary.light',
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
