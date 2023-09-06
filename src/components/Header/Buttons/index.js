import { Box } from '@mui/material';
import HeaderSearch from './Search';
import Cart from './Cart';
import ThemeToggle from './ThemeToggle';
import User from './User';
import Menu from './Menu';

export default function HeaderButtons() {
  return (
    <Box>
      <HeaderSearch />
      <Cart />
      <ThemeToggle />
      <User />
      <Menu />
    </Box>
  );
}
