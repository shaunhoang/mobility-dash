import {
  Box,
  CircularProgress,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, { Layer, Source } from "react-map-gl/mapbox";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
  { label: "Satellite", value: "mapbox://styles/mapbox/satellite-streets-v12" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

const BigMap = ({ visibleLayers }) => {
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: 75.7873,
    latitude: 26.9124,
    zoom: 8,
  });

  // This state is now local to the WebMap component.
  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  // This effect runs whenever the list of visible layers changes.
  useEffect(() => {
    const fetchDataForVisibleLayers = async () => {
      setIsFetching(true);
      const newLayersToFetch = visibleLayers.filter(
        (layer) => !geoJsonData[layer.file]
      );

      if (newLayersToFetch.length > 0) {
        try {
          const promises = newLayersToFetch.map((layer) =>
            fetch(layer.file)
              .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch ${layer.file}`);
                return res.json();
              })
              .then((data) => ({ file: layer.file, data }))
          );
          const results = await Promise.all(promises);
          const newDataMap = results.reduce((acc, { file, data }) => {
            acc[file] = data;
            return acc;
          }, {});

          setGeoJsonData((prevData) => ({ ...prevData, ...newDataMap }));
        } catch (error) {
          console.error("Error fetching GeoJSON data:", error);
        }
      }
      setIsFetching(false);
    };

    fetchDataForVisibleLayers();
  }, [visibleLayers]); // Dependency array ensures this runs when visibleLayers changes.

  const handleStyleChange = (event, newStyle) => {
    if (newStyle !== null) {
      setMapStyle(newStyle);
    }
  };

  const getLayerPaintStyle = (layer) => {
    // Use the layer's color property or default to grey if not specified
    const colorProperty = layer.color
      ? layer.color
      : ["coalesce", ["get", "color"], "#808080"];
    switch (layer.type) {
      case "fill":
        return {
          "fill-color": colorProperty,
          "fill-opacity": 0.4,
        };
      case "circle":
        return {
          "circle-color": colorProperty,
          "circle-radius": 5,
        };
      case "line":
      default:
        return {
          "line-color": colorProperty,
          "line-width": 2,
          "line-opacity": 0.7,
        };
    }
  };

  if (!MAPBOX_TOKEN) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
        }}
      >
        <Typography color="error">Mapbox token is missing.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        onLoad={() => mapRef.current.resize()}
        style={{
          width: "100%",
          height: "100%",
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {visibleLayers.map((layer) => {
          const data = geoJsonData[layer.file];
          if (!data) return null; // Don't render if data hasn't been fetched yet.

          return (
            <Source key={layer.id} id={layer.id} type="geojson" data={data}>
              <Layer
                id={`${layer.id}-layer`}
                type={layer.type}
                paint={getLayerPaintStyle(layer)}
              />
            </Source>
          );
        })}
      </Map>

      {isFetching && (
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
      )}

      {/* Base Layer Switcher */}
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <ToggleButtonGroup
          value={mapStyle}
          exclusive
          onChange={handleStyleChange}
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

      {/* <Paper
        elevation={4}
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          maxWidth: "300px",
          maxHeight: "300px",
          overflowY: "auto",
          fontFamily: "monospace",
          fontSize: "0.75rem",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Debug Info
        </Typography>
        <Box>
          <strong>Visible Layers Count:</strong> {visibleLayers.length}
        </Box>
        <Box mt={1}>
          <strong>Visible Layers Array:</strong>
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {JSON.stringify(visibleLayers, null, 2)}
          </pre>
        </Box>
      </Paper> */}
    </Box>
  );
};

export default BigMap;
