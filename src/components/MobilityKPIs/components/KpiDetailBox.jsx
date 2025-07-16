import { Box, Paper, Typography } from '@mui/material';
import KpiChart from './KpiChart';


const KpiDetailBox = ({ kpi }) => {
    // If no KPI is selected, show a placeholder message.
    if (!kpi) {
        return (
            <Paper sx={{ p: 3, mt: 1, textAlign: 'center' }}>
                <Typography color="text.secondary">Select a KPI card above to see more details.</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: 2, textAlign: 'center' }}>
                {kpi.title}
            </Typography>
            <Box sx={{
                width:'100%',
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                }}
                >

                {/* Display the image if it exists */}
                {kpi.image && (
                    <Box
                        component="img"
                        src={kpi.image}
                        alt={kpi.title}
                        sx={{
                            width: 'auto',
                            height: '100%',
                        }}
                    />
                )}

                {/* Conditionally render the chart if data exists */}
                {kpi.graphData && (
                    <KpiChart data={kpi.graphData} />
                )}

                {/* Description of the KPI */}
                {/* <Typography sx={{ textAlign: 'center' }}>
                {kpi.description}
            </Typography> */}
            </Box>

        </Paper>
    );
};


export default KpiDetailBox;