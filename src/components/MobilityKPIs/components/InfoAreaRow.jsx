import { Box, Paper, Typography , Divider } from '@mui/material';


const InfoAreaRow = ({ kpis = [] }) => {

  if (!kpis || kpis.length === 0) {
    return (
      <Paper sx={{ p: 3,  height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">No KPIs to display for this domain.</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
    }}>

      <Box sx={{ display: 'flex', gap: 1 }}>
        {kpis.map((kpi, index) => (
          <Paper 
            key={index} 
            sx={{ 
              p: 2, 
              maxWidth:270,
              height: 200,
              flexShrink: 0, 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                KPI: {kpi.code}
              </Typography>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold',  fontSize: '1rem' }}>
                {kpi.title}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" component="p">
                {kpi.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default InfoAreaRow;