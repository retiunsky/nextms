import { alpha, Badge, IconButton, Tooltip } from '@mui/material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { styled } from '@mui/material/styles';
import {useAuthContext} from 'src/contexts/AuthContext';
import { useRouter } from 'next/router';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

export default function Cart() {
  const {user, cartItems } = useAuthContext();
  const router = useRouter();
  const cartEmpty = 'Your cart is empty';
  return (
    <>
      <Tooltip PopperProps={{style:{zIndex:100000}}} arrow
       title={user && cartItems?.data.carts.length ? '' : cartEmpty}>
        <IconButton color="primary" onClick={() => router.push(`/cart`)}>
          <NotificationsBadge
            badgeContent={user && cartItems?.data.carts.length}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <ShoppingCartTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
    </>
  );
}
