import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  useTheme
} from '@mui/material';
import { useAuthContext } from 'src/contexts/AuthContext';
import SidebarLayout from 'src/layout';
import Head from 'next/head';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuthContext();
  const theme = useTheme();
  useEffect(() => {
    error && toast.error(error);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <SidebarLayout title="User Login">
      <Head>
        <title>MNS - Login Page</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h4">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              style={{
                borderRadius: 8,
                boxShadow: '5px 5px 5px 5px rgb(32 40 45 / 4%)'
              }}
              sx={{
                '& fieldset': { borderRadius: `8px` },
                backgroundColor: theme.palette.background.paper
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{
                borderRadius: 8,
                boxShadow: '5px 5px 5px 5px rgb(32 40 45 / 4%)'
              }}
              sx={{
                '& fieldset': { borderRadius: `8px` },
                backgroundColor: theme.palette.background.paper
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: '8px' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs pl={5}>
                <Typography>Don't have an account?</Typography>
              </Grid>
              <Grid item pl={5} pr={5}>
                <Link href="/auth/register" variant="body2">
                  {'Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </SidebarLayout>
  );
}
