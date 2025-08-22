import {
  Close,
  Description,
  Download,
  ExitToApp,
  Public,
  Widgets,
} from "@mui/icons-material";
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
} from "@mui/material";
import MetadataTable from "./MetadataTable"; // Import the new component

const DetailsDrawer = ({ item, open, onClose }) => {
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
      <Box
        sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
            <Typography variant="body1" color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Title: </span>
              {item.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Description: </span>
              {item.description}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Metadata
            </Typography>
            <MetadataTable item={item} />
          </Box>
        </Box>
        <Box
          sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<Download />}
            fullWidth
            disabled={!item.url_download}
            onClick={(e) => {
              e.stopPropagation();
              const link = document.createElement("a");
              link.href = item.url_download;
              const fileName = item.url_download.split("/").pop(); // file name
              link.setAttribute("download", fileName || "download");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download Sample
          </Button>

          <Button
            variant="contained"
            size="large"
            endIcon={<ExitToApp />}
            fullWidth
            disabled={!item.url}
            onClick={(e) => {
              e.stopPropagation();
              window.open(item.url, "_blank");
              const link = document.createElement("a");
              link.href = item.url;
              const fileName = item.url.split("/").pop(); // file name
              link.setAttribute("download", fileName || "download");
              link.setAttribute("target", "_blank");
              link.setAttribute("rel", "noopener noreferrer");
              document.body.appendChild(link);
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
