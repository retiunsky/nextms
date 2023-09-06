import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  useTheme
} from '@mui/material';
import { useAuthContext } from 'src/contexts/AuthContext';
import SidebarLayout from 'src/layout';
import Head from 'next/head';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { register, error } = useAuthContext();
  const theme = useTheme();

  useEffect(() => {
    error && toast.error(error);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match!');
      return;
    }
    register({ username, email, password });
  };

  return (
    <SidebarLayout title="User Registration">
      <Head>
        <title>MNS - Register Page</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 9
          }}
        >
          <Typography component="h1" variant="h4">
            Sign up with email address
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
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              label="Confirm Password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: '8px' }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs pl={8}>
                <Typography>Already have an account?</Typography>
              </Grid>
              <Grid item pr={8}>
                <Link href="/auth/login" variant="body2">
                  {'Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </SidebarLayout>
  );
}
