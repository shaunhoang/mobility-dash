import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import Map from "react-map-gl/mapbox";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
  { label: "Satellite", value: "mapbox://styles/mapbox/satellite-streets-v12" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

const WebMap = ({ kpi }) => {
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: 75.7873,
    latitude: 26.9124,
    zoom: 11,
  });

  const handleStyleChange = (event, newStyle) => {
    if (newStyle !== null) {
      setMapStyle(newStyle);
    }
  };

  if (!MAPBOX_TOKEN) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
        }}
      >
        <Typography color="error">Mapbox token is missing.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 700,
        width: "100%",
        mt: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{
          width: "100%",
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
      ></Map>
      
      {/* Base Layer Switcher */}
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
          onChange={handleStyleChange}
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

      {kpi && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: 1,
            backgroundColor: "yellow",
            opacity: 0.5,
            fontFamily: "monospace",
          }}
        >
          <Typography variant="caption">Active KPI: {kpi.code}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WebMap;
