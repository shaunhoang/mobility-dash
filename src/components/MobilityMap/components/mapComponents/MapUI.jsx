import {
  Box,
  CircularProgress,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Popup } from "react-map-gl/mapbox";

const baseLayers = [
  { label: "Light", value: "mapbox://styles/mapbox/light-v11" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

export const LoadingSpinner = ({ isFetching }) => {
  if (!isFetching) return null;
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export const MapPopup = ({ popupInfo, onClose }) => {
  if (!popupInfo) return null;
  return (
    <Popup
      longitude={popupInfo.longitude}
      latitude={popupInfo.latitude}
      onClose={onClose}
      closeOnClick={false}
    >
      <Typography variant="body1" sx={{ p: 0.5 }}>
        {popupInfo.content}
      </Typography>
    </Popup>
  );
};

export const BaseLayerSwitcher = ({ mapStyle, onStyleChange }) => (
  <Paper
    elevation={3}
    sx={{
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    }}
  >
    <ToggleButtonGroup
      value={mapStyle}
      exclusive
      onChange={onStyleChange}
      aria-label="map style"
      size="small"
    >
      {baseLayers.map((layer) => (
        <ToggleButton
          key={layer.value}
          value={layer.value}
          aria-label={layer.label}
          sx={{ width: 80 }}
        >
          {layer.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </Paper>
);
