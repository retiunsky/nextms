import { IconButton, Tooltip } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useSidebarContext } from 'src/contexts/SidebarContext';

export default function Menu() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <Tooltip
        PopperProps={{ style: { zIndex: 100000 } }}
        arrow
        title={'Menu open'}
      >
    <IconButton
    sx={{  height:41, display: { md: 'none',  xs: 'inline-block' }}}
    color="primary"
    onClick={toggleSidebar}>
        <MenuTwoToneIcon sx={{pb:0.5}} fontSize="medium" />
    </IconButton>
    </Tooltip>
  );
}
         
