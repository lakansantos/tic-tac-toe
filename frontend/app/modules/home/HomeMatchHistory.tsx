'use client';
import {alpha, Box, Divider, Tooltip, Typography} from '@mui/material';
import {Games} from 'app/types/game/gameType';
import React from 'react';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import HomeMatchHistoryPagination from './HomeMatchHistoryPagination';

import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';

import HomeMatchOtherDetails from './HomeMatchOtherDetails';
import HomeMatchScoreDetails from './HomeMatchScoreDetails';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopy from 'app/hooks/useCopy';
import {useSearchParams} from 'next/navigation';

const HomeMatchHistory = ({
  data,
  meta,
}: {
  data?: Games;
  meta?: Meta | undefined;
}) => {
  const {copied, onCopy} = useCopy();

  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  return (
    <Box
      sx={{
        height: 'fit-content',
        maxHeight: '70%',
        width: '100%',
        bgcolor: 'secondary.light',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ReceiptLongIcon />

        <Typography fontSize={20} mt="7px">
          Match History
        </Typography>
      </Box>
      <Divider
        sx={{
          bgcolor: alpha('#fff', 0.2),
        }}
      />
      <Box
        sx={{
          overflowX: 'auto',
          maxHeight: 400,
          width: '100%',
          minHeight: 100,
          '&::-webkit-scrollbar': {
            width: '.5vh',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'primary.main',
            borderRadius: '20px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: '#444',
          },
        }}
      >
        {(data || []).map((game) => {
          const {
            game_id,
            players,
            winner,
            draw_count,
            rounds_count,
            created_at,
          } = game || {};
          const {player1, player2} = players || {};

          const scoreDetails = {
            players,
            winner,
          };
          const otherDetails = {
            draw_count,
            rounds_count,
            created_at,
          };

          let status;

          if (winner === 'draw') {
            status = 'Draw!';
          } else {
            status = `${winner} Won!`;
          }
          return (
            <Box
              key={game_id}
              sx={{
                bgcolor: 'secondary.light',
                '&:hover': {
                  bgcolor: alpha('#444', 0.7),
                },
              }}
            >
              <Box
                sx={{
                  height: 'fit-content',
                  display: 'flex',
                  minHeight: '150px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {status}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 10,
                    top: 6,
                  }}
                >
                  <Tooltip
                    arrow
                    placement="top"
                    title={copied ? 'Copied' : 'Copy'}
                    onClick={() => onCopy(game_id)}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: 'common.black',
                          '& .MuiTooltip-arrow': {
                            color: 'common.black',
                          },
                        },
                      },
                    }}
                  >
                    <ContentCopyIcon
                      sx={{
                        fontSize: 10,
                        mr: 0.5,
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                  <Typography component="span" fontSize={10}>
                    Game ID:
                  </Typography>{' '}
                  <Typography
                    component="span"
                    fontSize={10}
                    sx={{
                      color: '#d5d5d5',
                    }}
                  >
                    {game_id}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      marginLeft: 'auto',
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <Typography fontSize={70}>{player1.score}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      flex: 1,
                    }}
                  >
                    <HomeMatchScoreDetails {...scoreDetails} />
                    <HomeMatchOtherDetails {...otherDetails} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                      marginRight: 'auto',
                    }}
                  >
                    <Typography fontSize={70}>{player2.score}</Typography>
                  </Box>
                </Box>
              </Box>
              <Divider
                sx={{
                  bgcolor: alpha('#fff', 0.2),
                }}
              />
            </Box>
          );
        })}
        {data && data.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              color: '#c5c9ca',
              gap: 1,
            }}
          >
            <VideogameAssetOffIcon />
            No games data yet.
          </Box>
        )}
      </Box>
      {!search && data && data.length > 0 && meta && (
        <>
          <Divider
            sx={{
              bgcolor: alpha('#fff', 0.2),
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: 50,
              bgcolor: 'secondary.light',
            }}
          >
            <HomeMatchHistoryPagination meta={meta} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default HomeMatchHistory;
