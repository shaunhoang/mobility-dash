import { Description, Download, Public, Widgets } from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

const CatalogueListItem = ({ item, onClick, isMobile }) => (
  <ListItem disablePadding divider>
    <ListItemButton onClick={() => onClick(item)} sx={{ p: 2, alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', height: 150, width: '100%', alignItems: 'flex-start', gap: 10 }}>
        <Box sx={{ height: '100%', flexGrow: 1, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Typography
              variant="body"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Last Updated: {new Date(item.latest_year).getFullYear()}

            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, display: isMobile ? 'none' : 'block' }}
            >
              Source: {item.provider}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 200, flexShrink: 0 }}>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Widgets fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                Theme: {item.theme}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Description fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                File Format: {item.format}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Public fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                Coverage: {item.coverage}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<Download />}
            onClick={(e) => {
              e.stopPropagation();
              alert(`Downloading ${item.name}`);
            }}
            sx={{ flexShrink: 0, mt: 0.5 }}
          >
            Download
          </Button>

        </Box>
      </Box>
    </ListItemButton>
  </ListItem>
);

const CatalogueList = ({ items, onItemClick, isMobile }) => (
  <Box sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden', minHeight: 400 }}>
    <List disablePadding>
      {items.length > 0 ? (
        items.map((item) => (
          <CatalogueListItem
            key={item.id}
            item={item}
            onClick={onItemClick}
            isMobile={isMobile}
          />
        ))
      ) : (
        <ListItem sx={{ p: 4, textAlign: 'center' }}>
          <ListItemText primary="No datasets found" secondary="Try adjusting your search query." />
        </ListItem>
      )}
    </List>
  </Box>
);

export default CatalogueList;
