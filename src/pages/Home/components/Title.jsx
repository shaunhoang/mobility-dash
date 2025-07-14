import { Box, Typography } from '@mui/material';

// The component now accepts an 'onButtonClick' function as a prop.
const Title = () => {
  return (
    <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            <Box component="section">
            <Typography
                variant="h4"
                sx={{ color: 'roseShades.dark', fontWeight: 'bold' }}
            >
                Jaipur Open Mobility Data Hub
            </Typography>
            </Box>

            <Box component="section">
            <Typography variant="body1" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            </Box>

        </div>
  );
};

export default Title;