import { Box, IconButton, Tooltip } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSidebarContext } from 'src/contexts/SidebarContext';

export default function SidebarButton() {
  const { open, handleDrawerOpen, handleDrawerClose } = useSidebarContext();

  return (
    <Box sx={{ mt: 0.2, display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <Tooltip
        PopperProps={{ style: { zIndex: 100000 } }}
        arrow
        title={'Sidebar open'}
      >
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: 'none' }) }}
        >
          <MenuTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip
        PopperProps={{ style: { zIndex: 100000 } }}
        arrow
        title={'Sidebar close'}
      >
        <IconButton
          onClick={handleDrawerClose}
          color="primary"
          aria-label="open drawer"
          edge="start"
          sx={{ ml: 0.0, ...(!open && { display: 'none' }) }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
