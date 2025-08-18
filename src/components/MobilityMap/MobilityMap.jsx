import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, IconButton, Paper } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

import BigMap from "./components/BigMap";
import LayerControl from "./components/LayerControl";

const InteractiveMapMain = () => {
  const [visibleLayers, setVisibleLayers] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleLayerToggle = (layer, isChecked) => {
    setVisibleLayers((prev) =>
      isChecked ? [...prev, layer] : prev.filter((l) => l.id !== layer.id)
    );
  };

  const panelWidth = 250;

  return (
    <Box>
      <Paper
        elevation={2}
        sx={{ height: 800, position: "relative", overflow: "hidden" }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>
          <BigMap visibleLayers={visibleLayers} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            transform: isPanelOpen
              ? "translateX(0)"
              : `translateX(-${panelWidth}px)`,
            transition: "transform 300ms ease-in-out",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: panelWidth,
              height: "100%",
              p: 2,
              mr: 1,
              overflowY: "auto",
              borderRadius: 0,
            }}
          >
            <LayerControl onLayerToggle={handleLayerToggle} />
          </Paper>

          <IconButton
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            sx={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              transform: isPanelOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 300ms ease-in-out",
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default InteractiveMapMain;
