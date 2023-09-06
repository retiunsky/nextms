import { useState } from 'react';
import SidebarLayout from 'src/layout';
import { useAuthContext } from 'src/contexts/AuthContext';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CMS_URL, UPLOAD_URL } from 'src/lib/config';
import GoBackButton from 'src/components/GoBackButton';
import Head from 'next/head';

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${CMS_URL}/products/${id}?populate=*`);
  const response = await res.json();
  const product = response.data;
  return {
    props: { product, id }
  };
}

export default function ProductPage({ product, id }) {
  const [quan, setQuan] = useState(1);
  const theme = useTheme();
  const { user, addCart } = useAuthContext();

  const handleSubmit = async (e) => {
    addCart({ quan, products: id, userId: user.id });
  };

  return (
    <SidebarLayout>
      <Head>
        <title>MNS - {product.attributes.title}</title>
      </Head>
        <Grid sx={{ pl: 3 }} container spacing={3}>
          <Grid
            item
            sm={6}
            md={4}
            className="animate__animated animate__fadeInLeft"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <GoBackButton
                category={
                  product.attributes.categories.data[0].attributes.title
                }
              />
            </Box>
            <Card sx={{ maxHeight: '500px', maxWidth: '400px' }} raised>
              <Box sx={{ m: 3, display: 'flex', justifyContent: 'center' }}>
                <img
                  height={350}
                  src={UPLOAD_URL + product.attributes.img.data.attributes.url}
                  alt={UPLOAD_URL + product.attributes.img.data.attributes.url}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <Typography
              variant="h3"
              sx={{ mt: { xs: 'none', sm: 10 } }}
              gutterBottom
            >
              {product.attributes.sub_categories.data[0].attributes.title}{' '}
              {product.attributes.title}
            </Typography>
            <Divider />
            <Typography className="mb-8">{product.attributes.desc}</Typography>
            <Divider />
            <Typography variant="h4">
              price : $ {product.attributes.price}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {user && (
              <TextField
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    handleSubmit;
                    ev.preventDefault();
                  }
                }}
                size="small"
                style={{
                  width: '120px',
                  borderRadius: 30,
                  boxShadow: '5px 5px 5px 5px rgb(32 40 45 / 4%)'
                }}
                sx={{
                  '& fieldset': { borderRadius: `30px` },
                  backgroundColor: theme.palette.background.paper
                }}
                type="number"
                min="1"
                value={quan.toString()}
                onChange={(event) => setQuan(parseInt(event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        disableRipple
                        sx={{
                          minWidth: 10,
                          ...theme.typography.commonAvatar,
                          background: 'transparent',
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            background: 'transparent',
                            color: theme.palette.primary.main
                          }
                        }}
                        onClick={handleSubmit}
                      >
                        <AddShoppingCartIcon fontSize="xs" />
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            )}
          </Grid>
        </Grid>
    </SidebarLayout>
  );
}
