import { Box, alpha, Slide, useScrollTrigger, styled } from '@mui/material';
import HeaderButtons from './Buttons';
import Brend from './Brend';
import SidebarButton from './sidebarButton';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
  height: ${theme.header.height};
  color: ${theme.header.textColor};
  padding: ${theme.spacing(0, 2)};
  right: 0;
  z-index: 10000;
  background-color: ${alpha(theme.header.background, 0.7)};
  box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
  backdrop-filter: blur(3px);
  position: fixed;
  justify-content: space-between;
  width: 100%;  
`
);

export default function Header() {
  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      <HeaderWrapper display="flex" alignItems="center">
        <Brend />
        <Box display="flex">
          <HeaderButtons />
          <SidebarButton />
        </Box>
      </HeaderWrapper>
    </Slide>
  );
}
