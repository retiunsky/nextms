import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useTheme } from "next-themes";
import {
  Dark,
  Graphite,
  Forest,
  Light,
  Aqua
} from './schemes';

const ThemeProviderWrapper = (props) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(Dark);

  useEffect(() => {
    switch (resolvedTheme) {
      case 'light':
        return setCurrentTheme(Light);
      case 'dark':
        return setCurrentTheme(Dark);
      case 'graphite':
        return setCurrentTheme(Graphite);
      case 'forest':
        return setCurrentTheme(Forest);
      case 'aqua':
        return setCurrentTheme(Aqua);
      default:
        return setCurrentTheme(Light);
    }
  }, [resolvedTheme]);
  return (
      
        <ThemeProvider theme={currentTheme}>{props.children}</ThemeProvider>
      
  );
};

export default ThemeProviderWrapper;
