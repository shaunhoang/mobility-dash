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
          sx: { width: isMobile ? "90%" : "40%", minWidth: 320, maxWidth: 600 },
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            {item.name}
          </Typography>
          <IconButton onClick={onClose} aria-label="close drawer">
            <Close />
          </IconButton>
        </Box>

        {/* Image */}
        <Box>
          {item.image_url && (
            <Box
              component="img"
              src={item.image_url}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 300,
                objectFit: "cover",
              }}
            />
          )}
        </Box>
        {/* Date and Content */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Box sx={{ p: 2 }}>
            {item.date && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            )}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {item.description} {/* Replace {item.content} when available*/}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default HighlightsDrawer;
