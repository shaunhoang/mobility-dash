import { Box, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { layerConfig } from "../mapContents/layerConfig";
import { legendsContent } from "../mapContents/legendsContent";

const LegendItem = ({ title, gradient, labels }) => (
  <Paper elevation={2} sx={{ p: 1, backgroundColor: "rgba(255,255,255,0.9)" }}>
    <Typography
      variant="subtitle2"
      sx={{ textAlign: "center", fontSize: "0.8rem" }}
    >
      {title}
    </Typography>
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
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
  // Extract active legends based on visible layers...
  const activeLegends = useMemo(() => {
    const legendKeys = new Set();
    const visibleLayerIds = new Set(visibleLayers.map((l) => l.id));

    layerConfig.forEach((theme) => {
      theme.layers.forEach((parentLayer) => {
        const processParent = (parent) => {
          if (
            parent.legend &&
            parent.children?.some((child) => visibleLayerIds.has(child.id))
          ) {
            legendKeys.add(parent.legend);
          }
        };

        if (parentLayer.isGroup) {
          parentLayer.children.forEach(processParent);
        } else {
          processParent(parentLayer);
        }
      });
    });

    return Array.from(legendKeys);
  }, [visibleLayers]);

  // If no active legends, return null
  if (activeLegends.length === 0) {
    return null;
  }

  // Render the legends based on activeLegends
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
        gap: 1,
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
