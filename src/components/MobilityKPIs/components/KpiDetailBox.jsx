import { Box, Divider, Paper, Typography } from '@mui/material';


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
        <Paper sx={{ p: 2, mt: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: 2, textAlign: 'center' }}>
                {kpi.title}
            </Typography>
            {/* <Divider sx={{ my: 2 }} /> */}

            {/* Display the image if it exists */}
            {kpi.image && (
                <Box
                    component="img"
                    src={kpi.image}
                    alt={kpi.title}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '16/9',
                        mb:2,
                    }}
                />
            )}

            {/* <Typography sx={{ textAlign: 'center' }}>
                {kpi.description}
            </Typography> */}
            
        </Paper>
    );
};


export default KpiDetailBox;