import {
    Box,
    Typography
} from '@mui/material';

const WebMap = ({ kpi }) => {
    return (
        <Box sx={{
            height: 700,
            backgroundColor: 'grey.200',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            border: '1px dashed',
            borderColor: 'grey.400'
        }}>
            <Typography color="text.secondary">
                Interactive Map for {kpi.code} will be displayed here.
            </Typography>
        </Box>
    );
};

export default WebMap;