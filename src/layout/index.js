import { Box, alpha, lighten, useTheme, styled } from '@mui/material';
import PropTypes from 'prop-types';
import Sidebar from 'src/components/Sidebar';
import Header from 'src/components/Header';
import OnTop from 'src/components/onTop';
import { useSidebarContext } from 'src/contexts/SidebarContext';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

export default function Layout({ children }) {
  const { open } = useSidebarContext();

  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <OnTop />
        <Box
          sx={{
            mt: { sm: '80px', md: '59px', lg: '59px' },
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            [theme.breakpoints.up('xs')]: {
              ml: `${theme.sidebar.width}`,
              mt: '80px'
            }
          }}
        >
          <Box display="block">
            <Main open={open}>{children}</Main>
          </Box>
        </Box>
      </Box>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
