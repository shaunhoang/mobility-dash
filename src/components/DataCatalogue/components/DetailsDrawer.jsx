import { Close, Description, ExitToApp, Public, Widgets } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const DetailsDrawer = ({ item, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!item) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: isMobile ? '90%' : '40%', minWidth: 320, maxWidth: 600 },
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Metadata
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {item.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            <Box>
              <Chip icon={<Widgets />} label={item.theme} variant="filled" />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip icon={<Description />} label={item.format} variant="filled" />
              <Chip icon={<Public />} label={item.geography} variant="filled" />
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Source: {item.provider}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Reference: {item.reference || 'N/A'}, {item.reference_detail || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Last Updated: {item.latest_year}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Update Frequency: {item.update_frequency || 'N/A'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ExitToApp />}
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              const link = document.createElement('a');
              link.href = item.url;
              const fileName = item.url.split('/').pop(); // file name
              link.setAttribute('download', fileName || 'download');
              document.body.appendChild(link);    // Append the link to the body, necessary for Firefox
              link.click();
              document.body.removeChild(link);
            }}
          >
            Go to Source
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailsDrawer;
