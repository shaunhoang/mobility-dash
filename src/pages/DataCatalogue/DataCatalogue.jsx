import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { generateMockData } from '../../data/mockData';
import Catalogue from './components/Catalogue';

const DataCatalogue = () => {
  const [datasets] = useState(() => generateMockData(300));

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Box component="section">
        <Typography variant="h5" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>
          Open Mobility Data Repository
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Box>

      <Catalogue datasets={datasets} />

    </Box>
  );
};

export default DataCatalogue;