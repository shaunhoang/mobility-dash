import { Box, Paper, Typography } from '@mui/material';


const KpiRow = ({ kpis = [], onKpiSelect, selectedKpiCode }) => {

  if (!kpis || kpis.length === 0) {
    return (
      <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            onClick={() => onKpiSelect(kpi)}
            sx={{
              p: 2,
              width: 200,
              height: 75,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: kpi.code === selectedKpiCode ? 'primary.main' : 'transparent',
              backgroundColor: kpi.code === selectedKpiCode ? 'background.selected' : 'background.paper',
              transition: 'border-color 0.3s, transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: kpi.code === selectedKpiCode ? 'primary.dark' : 'grey.300',
              }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {kpi.code}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {kpi.title}
              </Typography>

            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default KpiRow;