import { 
  Box, 
  Typography, 
} from '@mui/material';
import NavRow from '../components/NavRow';


const SmartMobilityGoals = () => {
  return (
    <div style={{ padding: '4rem' ,alignItems: 'center' }}>
      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        
        <NavRow label="/ Smart Mobility KPIs" />      
        
        <Box component="section">
          <Typography
            variant="h4"
            sx={{ color: 'roseShades.dark', fontWeight: 'bold'}}
          >
            Mobility KPIs
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
        [insert content]
      </Typography>
      </div>
    
      


      
    </div>
  );
};

export default SmartMobilityGoals;