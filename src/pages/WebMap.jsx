import CstmAccordion from '../components/CstmAccordion';
import Button from '@mui/material/Button';
import React from 'react';
import { Box, Typography, Grid  } from '@mui/material';

const WebMap = () => {
  return (
    <div style={{ padding: '1rem' ,alignItems: 'center' }}>
      
      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <Box sx={{ height: 15, display: 'flex'}} >
          <img 
            src="src\assets\home-icon-silhouette.svg" 
            style={{maxHeight: '100%'}}
          />
          <Typography
            sx={{ ml: 0.5 }}
            fontSize="0.8rem" 
            >
          / Interactive Map
          </Typography>
        </Box>
              <Box component="section">
                <Typography
                  variant="h4"
                  sx={{ color: 'roseShades.dark', fontWeight: 'bold'}}
                >
                  Interactive Map
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
              [insert webmap]
            </Typography>
            </div>
    
      


      
    </div>
  );
};

export default WebMap;