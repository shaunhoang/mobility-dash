import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import pathConfig from "../../../config/path/pathConfig";
import KpiChart from "./KpiChart";
import KpiMap from "./KpiMap";

const KpiDetailBox = ({ kpi }) => {
  const [chartData, setChartData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState(null);
  const [error, setError] = useState(null);

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  useEffect(() => {
    setChartData(null);
    setMapData(null);
    setError(null);
    setViewMode(null);

    if (kpi && kpi.code) {
      setIsLoading(true);
      const chartUrl = `${pathConfig.KPI_CHARTS_FOLDER_PATH}${kpi.code}.json`;
      const mapUrl = `${pathConfig.KPI_MAPS_FOLDER_PATH}${kpi.code}.geojson`;

      const safeFetch = (url, type) =>
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              console.log(
                `No such file for ${type}: ${kpi.code} (Status: ${res.status})`
              );
              return null;
            }
            return res.json();
          })
          .catch(() => {
            return null;
          });

      Promise.all([safeFetch(chartUrl, "chart"), safeFetch(mapUrl, "map")])
        .then(([chartResult, mapResult]) => {
          setChartData(chartResult);
          setMapData(mapResult);

          if (mapResult) {
            setViewMode("map");
          } else if (chartResult) {
            setViewMode("chart");
          } else {
            setError("No chart or map data available for this card");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [kpi]);

  if (!kpi) {
    return (
      <Paper sx={{ p: 2, mt: 4, textAlign: "center", userSelect: "none" }}>
        <Typography color="text.secondary">No card selected</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 4,
        mt: 4,
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          mb: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* KPI Info */}
        <Grid>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            {kpi.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <Box
              component="span"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {"Description: "}
            </Box>
            {kpi.description || "No description available."}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <Box
              component="span"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {"Target: "}
            </Box>
            {kpi.target ? `${kpi.target}` : "No target set"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <Box
              component="span"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {"Progress (a/o '25): "}
            </Box>
            {kpi.stat ? `${kpi.stat} ${kpi.unit}` : "No stats"}
          </Typography>
        </Grid>
      </Grid>

      {/* Toggle Buttons */}
      <Grid>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
        >
          <ToggleButton
            value="chart"
            aria-label="chart view"
            disabled={!chartData}
          >
            <BarChartIcon />
          </ToggleButton>
          <ToggleButton value="map" aria-label="map view" disabled={!mapData}>
            <MapIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      {/* Content Area */}
      <Box
        sx={{
          width: "100%",
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" sx={{ my: 2, textAlign: "center" }}>
            {error}
          </Typography>
        ) : viewMode === "chart" ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <KpiChart data={chartData} />
          </Box>
        ) : viewMode === "map" ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <KpiMap data={mapData} kpicode={kpi.code} />
          </Box>
        ) : (
          <Typography color="text.secondary">Please select a view.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default KpiDetailBox;
