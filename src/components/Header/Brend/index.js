import { Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Brend() {
  const router = useRouter();
  return (
    <>
      <Tooltip
        PopperProps={{ style: { zIndex: 100000 } }}
        arrow
        title={"Home page"}
      >
        <Typography
          variant="h3"
          sx={{ "&:hover": { cursor: "pointer" } }}
          color="primary"
          onClick={() => router.push(`/`)}
        >
          MNS
        </Typography>
      </Tooltip>
    </>
  );
}
