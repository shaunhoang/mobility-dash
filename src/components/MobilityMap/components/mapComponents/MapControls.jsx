import NavigationIcon from "@mui/icons-material/Navigation";
import {
  Box,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";

const BaseLayerSwitcher = React.memo(
  ({ mapStyle, onStyleChange, baseLayers }) => (
    <Paper elevation={3} sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
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
  )
);

const NorthArrow = React.memo(({ onResetNorth, bearing }) => (
  <Paper
    elevation={3}
    sx={{
      borderRadius: "50%",
    }}
  >
    <IconButton
      onClick={onResetNorth}
      aria-label="reset north"
      sx={{
        transform: `rotate(${bearing}deg)`,
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <NavigationIcon />
    </IconButton>
  </Paper>
));

const MapControls = ({
  mapStyle,
  onStyleChange,
  bearing,
  onResetNorth,
  baseLayers,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 1,
      }}
    >
      <BaseLayerSwitcher
        mapStyle={mapStyle}
        onStyleChange={onStyleChange}
        baseLayers={baseLayers}
      />
      <NorthArrow onResetNorth={onResetNorth} bearing={bearing} />
    </Box>
  );
};

export default React.memo(MapControls);
