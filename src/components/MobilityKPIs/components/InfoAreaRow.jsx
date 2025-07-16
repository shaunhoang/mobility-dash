import { Box, Divider, Paper, Typography } from '@mui/material';


const InfoAreaRow = ({ kpis = [], onKpiSelect, selectedKpiCode }) => {

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
              maxWidth: 270,
              height: 200,
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
            <Box>
              <Typography variant="caption" color="text.secondary">
                {kpi.code}
              </Typography>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {kpi.title}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" component="p" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
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