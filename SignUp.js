// src/components/SignUp.js

import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  FormControl, // Ensure FormControl is imported
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  Person as PersonIcon,
  SupervisorAccount as SupervisorAccountIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Validation Schema using Yup
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name should be at least 2 characters'),
  role: yup
    .string()
    .oneOf(['Guest', 'User', 'Admin'], 'Select a valid role')
    .required('Role is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number'),
  receiveEmails: yup.boolean(),
});

// Define role options with icons
const roles = [
  {
    value: 'Guest',
    label: 'Guest',
    icon: <PersonIcon fontSize="large" />,
  },
  {
    value: 'User',
    label: 'User',
    icon: <SupervisorAccountIcon fontSize="large" />,
  },
  {
    value: 'Admin',
    label: 'Admin',
    icon: <AdminPanelSettingsIcon fontSize="large" />,
  },
];

// Custom Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize as needed
    },
    secondary: {
      main: '#dc004e', // Customize as needed
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

export default function SignUp() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      role: '',
      email: '',
      password: '',
      receiveEmails: false,
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      // Map role string to numerical value if required by backend
      const roleMapping = {
        Guest: 0,
        User: 1,
        Admin: 2,
      };

      const payload = {
        role: roleMapping[data.role],
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await axios.post('http://localhost:8080/user', payload);

      if (response.status === 201 || response.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Sign up successful!');
        setOpenSnackbar(true);
        reset();
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Sign up failed. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Background Image */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url(/background.jpg)', // Ensure the image is in the public folder
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent background
            borderRadius: 2,
            boxShadow: 3,
            padding: 4,
          }}
        >
          <CssBaseline />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Name"
                        autoComplete="name"
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Role Selection */}
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    error={Boolean(errors.role)}
                    fullWidth
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Select Your Role
                    </Typography>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <ToggleButtonGroup
                          {...field}
                          value={field.value}
                          exclusive
                          onChange={(event, newValue) => {
                            if (newValue !== null) {
                              field.onChange(newValue);
                            }
                          }}
                          aria-label="role selection"
                          fullWidth
                        >
                          {roles.map((role) => (
                            <ToggleButton
                              key={role.value}
                              value={role.value}
                              aria-label={role.label}
                              sx={{
                                py: 2,
                                border:
                                  field.value === role.value
                                    ? '2px solid #1976d2' // Highlight border
                                    : '1px solid #ccc',
                                boxShadow:
                                  field.value === role.value
                                    ? 6 // Elevated shadow
                                    : 1,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  boxShadow: 6,
                                  border: '2px solid #1976d2',
                                },
                                backgroundColor:
                                  field.value === role.value
                                    ? 'primary.light' // Highlight background
                                    : 'transparent',
                                color:
                                  field.value === role.value
                                    ? 'primary.contrastText'
                                    : 'text.primary',
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                }}
                              >
                                {role.icon}
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                  {role.label}
                                </Typography>
                              </Box>
                            </ToggleButton>
                          ))}
                        </ToggleButtonGroup>
                      )}
                    />
                    {errors.role && (
                      <Typography variant="caption" color="error">
                        {errors.role.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Email Field */}
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Password Field */}
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Receive Emails Checkbox */}
                <Grid item xs={12}>
                  <Controller
                    name="receiveEmails"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            {...field}
                            checked={field.value}
                          />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* Sign Up Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Button>

              {/* Link to Sign In */}
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://klef.edu.in/">
                KLEF Education
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
