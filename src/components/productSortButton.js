import { useState } from 'react';
import {
  ButtonGroup,
  Menu,
  Button,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useSortContext } from 'src/contexts/SortContext';
import { useSidebarContext } from 'src/contexts/SidebarContext';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

const SORT_BY_OPTIONS = [
  { value: 'Newest', label: 'Newest' },
  { value: 'Price: High-Low', label: 'Price: High-Low' },
  { value: 'Price: Low-High', label: 'Price: Low-High' }
];

export default function ProductSortButton() {
  const theme = useTheme();
  const [openSort, setOpenSort] = useState(null);
  const { sortBy, setSort } = useSortContext();
  const { toggleSidebar, toggleDrawer } = useSidebarContext();

  const handleOpen = (event) => {
    setOpenSort(event.currentTarget);
  };

  const handleClose = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setSort(myValue);
    setOpenSort(null);
  };

  const onClose = (event) => {
    setOpenSort(null);
  };

  const toggle = useMediaQuery((theme) => theme.breakpoints.up('md'))
    ? toggleDrawer
    : toggleSidebar;
  return (
    <>
      <ButtonGroup sx={{ borderRadius: 8 }} variant="outlined">
        <Button variant="contained" disableRipple onClick={toggle}>
          Filters&nbsp;
        </Button>

        <Button
          variant="contained"
          disableRipple
          onClick={handleOpen}
          endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
        >
          Sort by&nbsp;
          <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
            {sortBy}
          </Typography>
        </Button>
      </ButtonGroup>
      <Menu
        keepMounted
        anchorEl={openSort}
        open={Boolean(openSort)}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            data-my-value={option.value}
            key={option.value}
            onClick={handleClose}
            sx={{
              typography: 'body2',
              color: theme.palette.text.secondary
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
