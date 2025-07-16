import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close, Download, Description, Public , Widgets } from '@mui/icons-material';

const DetailsDrawer = ({ item, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!item) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: isMobile ? '90%' : '40%', minWidth: 320, maxWidth: 600 },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Dataset Metadata
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {item.description}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection:'column', gap: 1, my: 2 }}>
            <Box> 
              <Chip icon={<Widgets />} label={item.theme} variant="filled" />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}> 
              <Chip icon={<Description />} label={item.format} variant="filled" />
              <Chip icon={<Public />} label={item.coverage} variant="filled" />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            fullWidth
            onClick={() => alert(`Downloading ${item.name}`)}
          >
            Download {item.format}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailsDrawer;
