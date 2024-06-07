import {Box, Tooltip, Typography} from '@mui/material';
import React from 'react';

import HandshakeIcon from '@mui/icons-material/Handshake';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import dayjs from 'dayjs';
type Props = {
  rounds_count: number;
  draw_count: number;
  created_at: string;
};
const HomeMatchOtherDetails = (props: Props) => {
  const {rounds_count, draw_count, created_at} = props;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
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
          <Tooltip
            arrow
            placement="top"
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
            title="Total Number of rounds"
          >
            <SportsEsportsIcon
              sx={{
                verticalAlign: 'middle',
                mr: 1,
                cursor: 'pointer',
              }}
            />
          </Tooltip>
          {rounds_count}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
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
          <Tooltip
            arrow
            placement="top"
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
            title="Total Number of draws"
          >
            <HandshakeIcon
              sx={{
                verticalAlign: 'middle',
                mr: 1,
                cursor: 'pointer',
              }}
            />
          </Tooltip>
          {draw_count}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            flex: 1,
            fontSize: 10,
            justifyContent: 'center',
            marginLeft: 'auto',
          }}
        >
          <Tooltip
            arrow
            placement="top"
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
            title="Date"
          >
            <AccessTimeFilledIcon
              sx={{
                verticalAlign: 'middle',
                mr: 1,
                cursor: 'pointer',
              }}
            />
          </Tooltip>
          <Typography component="span" fontSize={10} mt={0.5}>
            {dayjs(created_at).format('MMMM-DD-YYYY')}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeMatchOtherDetails;
