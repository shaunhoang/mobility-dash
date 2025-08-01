import { Grid, Paper } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

import LayerControl from "./components/LayerControl";
import BigMap from "./components/BigMap";

const InteractiveMapMain = () => {
  const [visibleLayers, setVisibleLayers] = useState([]);

  const handleLayerToggle = (layer, isChecked) => {
    setVisibleLayers((prev) =>
      isChecked ? [...prev, layer] : prev.filter((l) => l.id !== layer.id)
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: 800 }}>
      <Grid
        container
        spacing={2}
        sx={{
          height: "100%",
        }}
      >
        <Grid item size={1.5}>
          <LayerControl onLayerToggle={handleLayerToggle} />
        </Grid>
        <Grid item size={10.5} sx={{ height: "100%" }}>
          <BigMap visibleLayers={visibleLayers} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InteractiveMapMain;
