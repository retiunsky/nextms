import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Card,
  Grid,
  Typography,
  alpha,
  styled,
  useTheme
} from '@mui/material';
import { UPLOAD_URL, NEXT_URL } from 'src/lib/config';
import { motion } from 'framer-motion';

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid `
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid `
  }
}));

export default function ItemCard({ item }) {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [hoverColor, setHoverColor] = useState();
  const [hoverBoxShadow, setHoverBoxShadow] = useState();

  const colorHandler = () => {
    setHoverColor(alpha(theme.palette.action.hover, 0.3));
    setHoverBoxShadow(`inset 0px 2px 8px 3px ${theme.palette.primary.main}`);
  };
  const colorHandlerUp = () => {
    setHoverColor(theme.palette.background.paper);
    setHoverBoxShadow('0 1px 7px 0 rgb(32 40 45 / 4%)');
  };

  useEffect(() => {
    setLoading(false);
    setHoverColor(theme.palette.background.paper);
    setHoverBoxShadow('0 1px 7px 0 rgb(32 40 45 / 4%)');
  }, [theme]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Link
        href={`${NEXT_URL}/products/product/${item.id}`}
        style={{ textDecoration: 'none' }}
      >
        <Card
          onMouseDown={colorHandler}
          onMouseLeave={colorHandlerUp}
          component={motion.div}
          layout
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          elevation={0}
          sx={{
            backgroundColor: hoverColor,
            boxShadow: `0 4px 15px 0 ${theme.palette.primary.main}`,
            borderRadius: '30px',
            ':hover': {
              borderColor: theme.palette.primary.light,
              boxShadow: hoverBoxShadow,
              cursor: 'pointer'
            }
          }}
        >
          <Box sx={{ pt: 2, display: 'flex', justifyContent: 'center' }}>
            <img
              height={176}
              alt={UPLOAD_URL + item.attributes.img.data.attributes.url}
              src={UPLOAD_URL + item.attributes.img.data.attributes.url}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
                textAlign: 'center',
                m: 0.5
              }}
            >
              ${item.attributes.price}
              {' - '}
              {item.attributes.title}
            </Typography>
          </Box>
        </Card>
      </Link>
    </Grid>
  );
}
