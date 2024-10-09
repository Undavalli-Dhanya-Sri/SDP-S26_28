import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        All rights reserved to KLEF Education
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [role, setRole] = React.useState(''); // State to manage selected role

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Basic validation
    if (!email) {
      setEmailError('Email is required.');
      return;
    }
    if (!password) {
      setPasswordError('Password is required.');
      return;
    }
    if (!role) {
      alert('Please select a role.');
      return;
    }

    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      console.log({ email, password, role });
      alert('Logged in successfully!'); // Simulating successful login
    }, 2000);
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          {/* Role Selection */}
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            aria-label="role selection"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            <ToggleButton
              value="Guest"
              aria-label="guest"
              sx={{
                flex: 1,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  backgroundColor: '#1976d2', // Highlight background
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: '#1976d2', // Hover color
                  color: 'white',
                },
              }}
            >
              <PersonIcon />
              <Typography variant="body2">Guest</Typography>
            </ToggleButton>
            <ToggleButton
              value="User"
              aria-label="user"
              sx={{
                flex: 1,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  backgroundColor: '#1976d2', // Highlight background
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: '#1976d2', // Hover color
                  color: 'white',
                },
              }}
            >
              <SupervisorAccountIcon />
              <Typography variant="body2">User</Typography>
            </ToggleButton>
            <ToggleButton
              value="Admin"
              aria-label="admin"
              sx={{
                flex: 1,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  backgroundColor: '#1976d2', // Highlight background
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: '#1976d2', // Hover color
                  color: 'white',
                },
              }}
            >
              <AdminPanelSettingsIcon />
              <Typography variant="body2">Admin</Typography>
            </ToggleButton>
          </ToggleButtonGroup>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>

            {/* Footer Links */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
