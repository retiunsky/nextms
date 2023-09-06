import { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeTwoToneIcon from '@mui/icons-material/BedtimeTwoTone';
import { useTheme } from "next-themes";
import { IconButton, Tooltip } from '@mui/material';

export default function ThemeToggle() {
  const { theme: nextTheme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  return (
    <Tooltip PopperProps={{style:{zIndex:100000}}} arrow title={`Active ${resolvedTheme} theme`}>
        <IconButton
          color="primary"
          onClick={() => {
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          }}
        >
          {resolvedTheme === 'light' ? (
            <BedtimeTwoToneIcon fontSize="small" />
          ) : (
            <LightModeIcon fontSize="small" />
          )}
        </IconButton>
        </Tooltip>
  );
}
