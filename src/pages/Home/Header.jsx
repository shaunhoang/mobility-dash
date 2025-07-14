import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/logo.png';

const Header = () => {

  const theme = useTheme();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: theme.palette.roseShades.dark }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="a"
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: '40px', height: '40px', marginRight: '8px' }}
            />
          </Box>

          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              textDecoration: 'none',
              color: theme.palette.roseShades.lightest,
              fontWeight: 'bold',
            }}
          >
            Smart Mobility
          </Typography          >
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;