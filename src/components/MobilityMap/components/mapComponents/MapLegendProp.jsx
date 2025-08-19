import { Box, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { layerConfig } from "../mapContents/layerConfig";
import { legendsContent } from "../mapContents/legendsContent";

const LegendItem = ({ title, gradient, labels }) => (
  <Paper elevation={2} sx={{ p: 1, backgroundColor: "rgba(255,255,255,0.9)" }}>
    <Typography variant="subtitle2" sx={{ textAlign: "center", fontSize: "0.8rem" }}>
      {title}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      {/* Gradient */}
      <Box
        sx={{
          width: 200,
          height: 20,
          background: gradient,
        }}
      />
      {/* Labels */}
      <Box
        sx={{
          ml: 1,
          height: 20,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {labels.map((label) => (
          <Typography key={label} variant="caption">
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  </Paper>
);

const MapLegendProp = ({ visibleLayers }) => {
  const activeLegends = useMemo(() => {
    const legendKeys = new Set();
    const allParentLayers = layerConfig.flatMap((theme) => theme.layers);

    visibleLayers.forEach((visibleLayer) => {
      const parent = allParentLayers.find((p) =>
        p.children?.some((c) => c.id === visibleLayer.id)
      );
      if (parent?.legend) {
        legendKeys.add(parent.legend);
      }
    });

    return Array.from(legendKeys);
  }, [visibleLayers]);
  
  if (activeLegends.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 1, // space multiple legends.
      }}
    >
      {activeLegends.map((key) => {
        const content = legendsContent[key];
        if (!content) return null;
        return (
          <LegendItem
            key={key}
            title={content.title}
            gradient={content.gradient}
            labels={content.labels}
          />
        );
      })}
    </Box>
  );
};

export default MapLegendProp;
