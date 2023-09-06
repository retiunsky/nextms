import {
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
  Tooltip,
  styled
} from '@mui/material';

import SidebarLayout from 'src/layout';
import Head from 'next/head';
import InstagramIcon from '@mui/icons-material/Instagram';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

function StatusMaintenance() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="lg">
            <Box textAlign="center">
              <Container maxWidth="md">
                <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                  This site is build with NEXTJS and MaterialUI library. 
                </Typography>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  State managmentment implemented width usecontex hook,
                  there is support for a dark theme in system mode;
                  product's filter by brand, navigation and theme selection
                  is done in side menu, sidebar works in desctop and mobile vesrion.
                </Typography>
                <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                  Backend - cms Strapi with SQLite database. 
                </Typography>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  It is possible to log in to the app with a username "user@user.com" 
                  and password "User123" or register as a new user,
                  add one or more products to the cart and remove them from the cart.
                </Typography>
              </Container>
              <img
                alt="Maintenance"
                height={250}
                src="/static/images/status/maintenance.svg"
              />
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="span" variant="subtitle1">
                  Phone:{' '}
                </Typography>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                  + 38 067 372 7557  Retiunsky Roman
                </Typography>
              </Box>
              
            </Box>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default StatusMaintenance;

StatusMaintenance.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
