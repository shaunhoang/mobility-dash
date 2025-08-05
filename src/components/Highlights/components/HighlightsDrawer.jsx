import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const HighlightsDrawer = ({ item, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!item) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          // Responsive width for the drawer
          sx: { width: isMobile ? "90%" : "40%", minWidth: 320, maxWidth: 600 },
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            {item.name}
          </Typography>
          <IconButton onClick={onClose} aria-label="close drawer">
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>

          {/* 1. Image on top */}
          {item.image_url && (
            <Box
              component="img"
              src={item.image_url}
              alt={`Image for ${item.name}`}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 300,
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
              }}
            />
          )}

          {/* 2. Date */}
          {item.date && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              {new Date(item.date).toLocaleDateString("en-GB", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Typography>
          )}

          {/* 3. Description */}
          <Typography variant="body1" color="text.secondary" paragraph>
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default HighlightsDrawer;