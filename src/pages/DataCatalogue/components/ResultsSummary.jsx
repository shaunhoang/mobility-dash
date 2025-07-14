import { Box, Typography } from '@mui/material';

const ResultsSummary = ({ count }) => (
  <Box sx={{ my: 2 }}>
    <Typography variant="body2" color="text.secondary">
      Found {count} {count === 1 ? 'dataset' : 'datasets'}.
    </Typography>
  </Box>
);

export default ResultsSummary;