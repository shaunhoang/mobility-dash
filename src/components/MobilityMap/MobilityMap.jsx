import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, IconButton, Paper } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

import BigMap from "./components/BigMap";
import LayerControl from "./components/LayerControl";

const MobilityMap = () => {
  const [visibleLayers, setVisibleLayers] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleLayerToggle = (layer, isChecked) => {
    setVisibleLayers((prev) =>
      isChecked ? [...prev, layer] : prev.filter((l) => l.id !== layer.id)
    );
  };

  const panelWidth = 225;

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          height: "90vh", // Fills 80% of the viewport height (mobile-friendly)
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>
          <BigMap visibleLayers={visibleLayers} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%", 
            left: 0,
            zIndex: 2,
            height: "80%",
            display: "flex",
            alignItems: "center",
            transform: `translateX(${
              isPanelOpen ? 0 : `-${panelWidth}px`
            }) translateY(-50%)`,
            transition: "transform 300ms ease-in-out",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              width: panelWidth,
              height: "100%",
              p: 2,
              mr: 1,
              overflowY: "auto",
              borderRadius: 1,
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

export default MobilityMap;
