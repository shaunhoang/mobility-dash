import { Paper, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const KpiChart = ({ data }) => {
    return (
        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                KPI Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: -10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Actual Value" />
                    <Bar dataKey="target" fill="#82ca9d" name="Target Value" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default KpiChart;
