import {
    Box,
    CircularProgress,
    Grid,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Container,
    Tab,
    Tabs,
    Button,
    IconButton
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map'
import { useEffect, useState } from 'react';
import WebMap from '../../WebMap/WebMap';
import KpiChart from './KpiChart';

const KpiDetailBox = ({ kpi }) => {
    // 1. Add state for loading, data, and errors
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState('chart');
    const [error, setError] = useState(null);

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewMode(newView);
        }
    };
    // 2. Use useEffect to fetch data when the kpi prop changes
    useEffect(() => {
        if (kpi) {
            setIsLoading(true);
            setError(null);
            setChartData(null);

            // Fetch the JSON file
            fetch(`/data/kpiviz/${kpi.code}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Cannot connect to the server');
                    }
                    return response.json();
                })
                .then(data => {
                    setChartData(data);
                    setIsLoading(false);
                })
                .catch(fetchError => {
                    console.error("Failed to fetch chart data:", fetchError);
                    setError("Failed to load chart data or no chart data available");
                    setIsLoading(false);
                });
        } else {
            // Reset state if the new KPI has no chart
            setChartData(null);
            setError(null);
            setIsLoading(false);
        }
    }, [kpi]); // re-runs every time the selected KPI changes

    // Placeholder message.
    if (!kpi) {
        return (
            <Paper sx={{ p: 3, mt: 1, textAlign: 'center' }}>
                <Typography color="text.secondary">Select a KPI card above to see more details.</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={5} sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Grid item>
                    {/* ToToggle */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="view mode"
                        >
                            <ToggleButton value="chart" aria-label="chart view">
                                <BarChartIcon />
                            </ToggleButton>
                            <ToggleButton value="map" aria-label="map view">
                                <MapIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid item size={10}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        <Box component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                            {'Description: '}
                        </Box>
                        {kpi.description || 'No description available.'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <Box component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                            {'Target: '}
                        </Box>
                        {kpi.target ? `${kpi.target.metric} ${kpi.target.timeline}` : 'No target set.'}

                    </Typography>
                </Grid>
            </Grid>

            {/* Conditional rendering based on view mode */}

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {viewMode === 'chart' ? (
                    <>
                        {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
                        {error && <Typography color="error" sx={{ my: 2, textAlign: 'center' }}>{error}</Typography>}
                        {chartData && <KpiChart data={chartData} />}
                        {!isLoading && !error && !chartData && <Typography sx={{ mt: 2 }} color="text.secondary">No chart data available for this KPI.</Typography>}
                    </>
                ) : (
                    <WebMap kpi={kpi} />
                )}
            </Box>
        </Paper>
    );
};


export default KpiDetailBox;