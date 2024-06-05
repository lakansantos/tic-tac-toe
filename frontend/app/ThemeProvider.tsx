'use client';
import React, {ReactNode} from 'react';
import {createTheme, ThemeProvider} from '@mui/material';

type ThemeWithProps = {
  children: ReactNode;
};
const AppThemeProvider = ({children}: ThemeWithProps) => {
  const theme = createTheme({
    typography: {
      fontFamily: 'marhey',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1536,
      },
    },
    palette: {
      background: {
        default: '#333',
      },
      primary: {
        main: '#9DECF9',
      },
      secondary: {
        main: '#333',
        light: '#fff',
      },
      warning: {
        main: 'rgb(230, 126, 34)',
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
