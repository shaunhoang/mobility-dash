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
import Map, { Layer, Popup, Source } from "react-map-gl/mapbox";

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
    longitude: 75.787,
    latitude: 26.912,
    zoom: 11,
  });

  // Local state of the map component.
  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

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
  }, [visibleLayers]); 

  const handleStyleChange = (event, newStyle) => {
    if (newStyle !== null) {
      setMapStyle(newStyle);
    }
  };

  const getLayerPaintStyle = (layer) => {
    const colorProperty = layer.color
      ? layer.color
      : ["coalesce", ["get", "color"], "#808080"]; 

    switch (layer.type) {
      case "fill":
        return {
          "fill-color": colorProperty,
          "fill-opacity": 0.3,
          "fill-outline-color": "#000000",
        };
      case "circle":
        return {
          "circle-color": colorProperty,
          "circle-radius": 5,
          "circle-opacity": 0.8,
          "circle-stroke-color": "#000000",
          "circle-stroke-width": 1.5,
        };
      case "line":
      default:
        return {
          "line-color": colorProperty,
          "line-width": 4,
          "line-opacity": 0.8,
        };
    }
  };

  const handleMapClick = (event) => {
    const feature = event.features && event.features[0];
    if (!feature) {
      return;
    }
    const clickedLayerId = feature.layer.id;
    const layerConfig = visibleLayers.find(
      (l) => `${l.id}-layer` === clickedLayerId
    );

    if (!layerConfig || !layerConfig.tooltipProperty) {
      return;
    }
    const tooltipValue = feature.properties[layerConfig.tooltipProperty];
    const tooltipPrefix = layerConfig.tooltipPrefix;

    if (tooltipValue !== undefined && tooltipValue !== null) {
      setPopupInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        content: `${tooltipPrefix || ""}${tooltipValue}`,
      });
    }
  };

  const interactiveLayerIds = visibleLayers.map((layer) => `${layer.id}-layer`);
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
        onClick={handleMapClick}
        style={{
          width: "100%",
          height: "100%",
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={interactiveLayerIds}
        cursor="pointer"
      >
        {visibleLayers.map((layer) => {
          const data = geoJsonData[layer.file];
          if (!data) return null;
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

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            <Typography variant="body1" sx={{ p: 0.5 }}>
              {popupInfo.content}
            </Typography>
          </Popup>
        )}
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
