import {Box, Typography} from '@mui/material';

import React from 'react';

import Image from 'next/image';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import {Game} from 'app/types/game/gameType';

type Props = {
  winner: string;
  players: Game['players'];
};
const HomeMatchScoreDetails = (props: Props) => {
  const {winner, players} = props;

  const {player1, player2} = players;

  const isPlayer1Winner = winner === player1.name;
  const isPlayer2Winner = winner === player2.name;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          marginLeft: 'auto',
        }}
      >
        {isPlayer1Winner && (
          <EmojiEventsIcon
            sx={{
              verticalAlign: 'middle',
              mr: 1,
            }}
          />
        )}
        {player1.name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Image
          src="/battle-icon.png"
          alt="guy"
          width={200}
          height={200}
          style={{height: 'auto', width: 'auto'}} //for console warning
          priority
        />
      </Box>
      <Typography
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          marginRight: 'auto',
        }}
      >
        {player2.name}
        {isPlayer2Winner && (
          <EmojiEventsIcon
            sx={{
              verticalAlign: 'middle',
              ml: 1,
            }}
          />
        )}
      </Typography>
    </Box>
  );
};

export default HomeMatchScoreDetails;
