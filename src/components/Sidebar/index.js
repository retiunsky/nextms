import Scrollbar from 'src/components/Scrollbar';
import { useSidebarContext } from 'src/contexts/SidebarContext';
import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
} from '@mui/material';
import SidebarMenu from './sidebarMenu';
import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        position: relative;
        z-index: -10;
        height: 100%;
`
);

function Sidebar() {
  const { open, sidebarToggle, closeSidebar } = useSidebarContext();
  const theme = useTheme();

  return (
    <>
    <Drawer
    PaperProps={{
      sx: {
        background:
        `linear-gradient(to top, ${alpha(lighten(theme.header.background, 0.1), 0.5)},
         rgba(0,0,0,0))`,
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none', 
        top: 0,
      }
    }}
        open={open}
        variant="persistent"
        anchor="left"
        sx={{ display: {
          xs: 'none',
          md: 'inline-block'
        },
          zIndex: -100,
          width: theme.sidebar.width,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: theme.sidebar.width,
            boxSizing: "border-box",
          },
        }}
      >
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
           }}
      >
        <Scrollbar>
          <Box mt={10}/>                   
          <SidebarMenu />
        </Scrollbar>     
      </SidebarWrapper>
      </Drawer>

      <Drawer
      PaperProps={{
        sx: {
          background:
               alpha(lighten(theme.header.background, 0.1), 0.5),
            boxShadow:
              theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none', 
        }
      }}
        sx={{
          zIndex: 100000,
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx= {{
            background:
                 alpha(lighten(theme.header.background, 0.1), 0.5),
          }}
        >
          <Scrollbar>           
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
