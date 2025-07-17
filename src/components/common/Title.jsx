import { Box, Typography } from '@mui/material';
import backgroundImage from '../../assets/jaipur.jpg'; 


const Title = () => {
  return (
    // This Box is the main container with the background image and gradient effect.
    <Box sx={{
      position: 'relative', // This is necessary for the overlay to work.
      color: 'white', 
      p:4,
      
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
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.79), rgba(0, 0, 0, 0))',
        zIndex: 1, 
      }
    }}>
      {/* This Box holds the content and places it on top of the background layers. */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box component="section" sx={{ mb: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.52)'
            }}
          >
            Jaipur Open Mobility Data Hub
          </Typography>
        </Box>

        <Box component="section">
          <Typography variant="body1" sx={{ fontSize: '1.2rem', maxWidth: '75ch' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Title;