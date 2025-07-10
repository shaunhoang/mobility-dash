import { Box, Typography } from '@mui/material';
import home from '../assets/home-icon-silhouette.svg'; // Adjust the path to your home icon

export default function NavRow({ label, fontSize = '0.8rem', sx = {} }) {
  return (
    <Box sx={{ height: 15, display: 'flex', alignItems: 'center', ...sx }}>
      <img 
        src={home} 
        alt=""
        style={{ maxHeight: '100%' }} 
      />
      <Typography sx={{ ml: 0.5 }} fontSize={fontSize}>
        {label}
      </Typography>
    </Box>
  );
}