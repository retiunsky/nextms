import {useAuthContext} from 'src/contexts/AuthContext';
import Layout from 'src/layout';
import BasicTable from 'src/components/cartTable';
import { Typography } from '@mui/material';

export default function CartPage() {
  const { cartItems } = useAuthContext();

  return (
    <>
      {cartItems ? (
        <BasicTable
          key={cartItems.data.carts.id}
          cartItems={cartItems.data.carts}
        />
      ) : (
        <Typography sx={{m:3}}variant="h3" component="h3">Cart is Empty</Typography>
      )}
    </>
  );
}

CartPage.getLayout = (page) => <Layout>{page}</Layout>;
