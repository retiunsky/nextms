import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button, css, Menu, MenuItem, Typography } from "@mui/material";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";

const MODE_BY_OPTIONS = [
  { value: "system", label: "system" },
  { value: "light", label: "light" },
  { value: "dark", label: "dark" },
  { value: "graphite", label: "graphite" },
  { value: "forest", label: "forest" },
  { value: "aqua", label: "aqua" },
];

export default function ThemeUpdater() {
  const [mounted, setMounted] = useState(false);
  const [openTheme, setOpenTheme] = useState(null);
  const { theme: nextTheme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleOpen = (event) => {
    setOpenTheme(event.currentTarget);
  };
  const handleClose = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setTheme(myValue);
    setOpenTheme(null);
  };
  const onClose = () => {
    setOpenTheme(null);
  };

  if (!mounted) return <></>;

  return (
    <>
      <Button
        sx={{ minWidth: "200px" }}
        disableRipple
        onClick={handleOpen}
        startIcon={<BrightnessLowTwoToneIcon />}
      >
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
          Theme: {nextTheme}
        </Typography>
      </Button>
      <Menu
        sx={{ ml: 4, zIndex: 1000000 }}
        keepMounted
        anchorEl={openTheme}
        open={Boolean(openTheme)}
        onClose={onClose}
      >
        {MODE_BY_OPTIONS.map((option) => (
          <MenuItem
            data-my-value={option.value}
            key={option.value}
            onClick={handleClose}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
