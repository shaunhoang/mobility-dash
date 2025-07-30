import { Box, Grid, Typography } from '@mui/material';
import backgroundImage from '../../assets/jaipur.jpg';
import logo from '../../assets/logo.png';



const Title = () => {
  return (
    // This Box is the main container with the background image and gradient effect.
    <Box sx={{
      position: 'relative', // This is necessary for the overlay to work.
      color: 'white',
      p: 4,

      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.79), rgba(98, 0, 0, 0.26))',
        zIndex: 1,
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Grid item component="a" href="/">
            <img
              src={logo}
              alt="Logo"
              style={{ width: 50, height: 50 }}
            />
          </Grid>
          <Grid item >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 'bold',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)'
              }}
            >
              Jaipur Smart Mobility Hub
            </Typography>


            <Box component="section">
              <Typography variant="body1" sx={{ fontSize: '1.2rem', maxWidth: '75ch' }}>
                Empowering a more sustainable transport future for all residents with data
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Title;