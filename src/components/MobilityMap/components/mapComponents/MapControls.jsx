import {
  Box,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const NorthArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" fill="#333" />
  </svg>
);

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
      }}
    >
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
      <Paper
        elevation={3}
        sx={{
          mt: 1,
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
          <NorthArrow />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default MapControls;
