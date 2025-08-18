import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { eaiLegend, popLegend } from "./legendsContent";

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
          width: 250,
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
  return (
    <>
      <LoadingSpinner isFetching={isFetching} />

      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%", 
          transform: "translateX(-50%)", // Center the legends
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {visibleLayers.some((layer) => layer.id === "eai-wards") && (
          <Legend
            title={eaiLegend.title}
            gradient={eaiLegend.gradient}
            labels={eaiLegend.labels}
          />
        )}
        {visibleLayers.some(
          (layer) =>
            layer.id === "jaipur_wards_heritage" ||
            layer.id === "jaipur_wards_greater"
        ) && (
          <Legend
            title={popLegend.title}
            gradient={popLegend.gradient}
            labels={popLegend.labels}
          />
        )}
      </Box>
    </>
  );
};

export default MapUI;
