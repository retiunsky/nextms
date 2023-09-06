import { Card, CardMedia, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { UPLOAD_URL } from "src/lib/config";

export default function CategoryItem({ category }) {
  const theme = useTheme();

  return (
    <Link
      href={`/products/${category.id}`}
      style={{ textDecoration: "none", cursor: "pointer" }}
    >
      <Card sx={{ "&:hover": { cursor: "pointer" } }}>
        <CardMedia
          sx={{
            "&:hover, &.Mui-focusVisible": {
              transform: "scale3d(1.05, 1.05, 1)",
            },
            height: "250px",
            maxWidth: 310,
            transition: "transform 0.15s ease-in-out",
          }}
          component="img"
          src={UPLOAD_URL + category.attributes.img.data.attributes.url}
        />
        <Typography
          gutterBottom
          variant="h1"
          component="h1"
          sx={{
            textShadow: "1px 1px 1px #fff",
            position: "absolute",
            top: "42%",
            width: "100%",
            textAlign: "center",
            backgroundColor: "none",
            fontFamily: "Dm-Sans, monospace",
            color: theme.palette.primary.main,
          }}
        >
          {category.attributes.title}
        </Typography>
      </Card>
    </Link>
  );
}
