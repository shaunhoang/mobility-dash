import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Or use next/link if using Next.js

const navItems = [
  // { label: 'Home', path: '/' },
  { label: 'Stats', path: '/smart-mobility-goals' },
  { label: 'Data', path: '/data-catalogue' },
  { label: 'About', path: '/about' },
];

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: theme.palette.roseShades.dark }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo image icon */}
        <Box
          component={Link}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}        >
          <img
            src="/src/assets/logo.png" // Replace with your logo path
            alt="Logo"
            style={{ width: '40px', height: '40px', marginRight: '8px' }} // Adjust size as needed
          />

        </Box>
        {/* <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: theme.palette.roseShades.lightest,
            fontWeight: 'bold',
          }}
        >
        </Typography> */}

        {/* Right: Navigation Links */}
        <Stack direction="row" spacing={2}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                color: theme.palette.roseShades.lightest,
                '&:hover': {
                  backgroundColor: theme.palette.roseShades.dark,
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;