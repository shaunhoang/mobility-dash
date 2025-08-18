import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { layerConfig } from "./layerConfig"; 
import { legendsContent } from "./legendsContent";

const Legend = ({ title, gradient, labels }) => (
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
      <Box
        sx={{
          width: 200,
          height: 20,
          background: gradient,
          border: "1px solid #ccc",
        }}
      />
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

const LoadingSpinner = ({ isFetching }) => {
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

const MapUI = ({ isFetching, visibleLayers }) => {
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

  return (
    <>
      <LoadingSpinner isFetching={isFetching} />

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
            <Legend
              key={key}
              title={content.title}
              gradient={content.gradient}
              labels={content.labels}
            />
          );
        })}
      </Box>
    </>
  );
};

export default MapUI;
