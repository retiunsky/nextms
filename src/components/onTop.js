import * as React from "react";
import { Zoom, useTheme, useScrollTrigger } from "@mui/material";
import { Fab } from "@mui/material";
import { ArrowCircleUpSharp } from "@mui/icons-material";

const OnTop = () => {
  const theme = useTheme();
  const trigger = useScrollTrigger();

  const handleClick = () => {
    const anchor = document.querySelector("body");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{
          position: `fixed`,
          bottom: `70px`,

          right: `50px`,
          zIndex: `99`,
        }}
      >
        <Fab
          color="transparent"
          size="small"
          sx={{
            background: "transparent",
            color: theme.colors.primary.light,
            "&:hover": {
              color: theme.colors.primary.main,
              background: "transparent",
              boxShadow: `0 1px 10px 2px ${theme.palette.primary.main}`,
            },
          }}
        >
          <ArrowCircleUpSharp sx={{ fontSize: 48 }} />
        </Fab>
      </div>
    </Zoom>
  );
};

export default OnTop;
