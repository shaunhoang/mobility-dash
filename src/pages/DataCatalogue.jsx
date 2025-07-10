import CstmAccordion from '../components/CstmAccordion';
import Button from '@mui/material/Button';
import React from 'react';
import { Box, Typography, Grid  } from '@mui/material';
import NavRow from '../components/NavRow';


const DataCatalogue = () => {
  return (
    <div style={{ padding: '4rem' ,alignItems: 'center' }}>
      
      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <NavRow label="/ Data Catalogue" />

        <Box component="section">
          <Typography
            variant="h4"
            sx={{ color: 'roseShades.dark', fontWeight: 'bold'}}
          >
            Data Catalogue
          </Typography>
        </Box>
        
        <Box component="section">
          <Typography variant="body1" color="text.secondary">
            What you expect to find here...
          </Typography>
        </Box> 
      </div>

      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem'}}>
      <Typography>
        [insert index list with filter]
      </Typography>
      </div>

      


      
    </div>
  );
};

export default DataCatalogue;