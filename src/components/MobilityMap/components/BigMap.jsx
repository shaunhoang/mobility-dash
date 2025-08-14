import {
  Box,
  CircularProgress,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { default as MapGL, Layer, Popup, Source } from "react-map-gl/mapbox";
import {
  layerConfig,
  flattenLayers,
  getLayerLayoutStyle,
  getLayerPaintStyle,
} from "./mapComponents/layerConfig";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Light", value: "mapbox://styles/mapbox/light-v11" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

const BigMap = ({ visibleLayers }) => {
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: 75.787,
    latitude: 26.912,
    zoom: 10,
  });

  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [loadedIconIds, setLoadedIconIds] = useState(new Set());
  // --- NEW STATE --- to track the selected bus route feature ID
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  useEffect(() => {
    const fetchDataForVisibleLayers = async () => {
      const newLayersToFetch = visibleLayers.filter(
        (layer) => !geoJsonData[layer.file]
      );
      if (newLayersToFetch.length === 0) return;

      setIsFetching(true);
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
        setGeoJsonData((prev) => ({ ...prev, ...newDataMap }));
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchDataForVisibleLayers();
  }, [visibleLayers, geoJsonData]);

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    map.resize();

    const allLayers = flattenLayers(layerConfig);
    const iconsToLoad = allLayers
      .filter((layer) => layer.type === "symbol" && layer.icon)
      .reduce((uniqueIcons, layer) => {
        if (!uniqueIcons.has(layer.icon.id)) {
          uniqueIcons.set(layer.icon.id, layer.icon.url);
        }
        return uniqueIcons;
      }, new Map());

    const iconLoadPromises = Array.from(iconsToLoad.entries()).map(
      ([id, url]) =>
        new Promise((resolve, reject) => {
          map.loadImage(url, (error, image) => {
            if (error) {
              console.error(`Failed to load icon: ${id} from ${url}`, error);
              return reject(error);
            }
            if (!map.hasImage(id)) {
              map.addImage(id, image);
            }
            resolve(id);
          });
        })
    );

    Promise.all(iconLoadPromises)
      .then((loadedIds) => {
        setLoadedIconIds((prevIds) => new Set([...prevIds, ...loadedIds]));
        console.log("All custom icons loaded successfully:", loadedIds);
      })
      .catch((error) => {
        console.error("An error occurred while loading icons.", error);
      });
  }, []);

  const handleMapClick = useCallback(
    (event) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      const feature = event.features?.[0];

      // If a route was previously selected, unselect it
      if (selectedRouteId !== null) {
        map.setFeatureState(
          { source: "bus-routes", id: selectedRouteId },
          { selected: false }
        );
      }

      // Check if the clicked feature is a bus route
      if (feature && feature.layer.id === "bus-routes-layer") {
        const newSelectedRouteId = feature.id;
        map.setFeatureState(
          { source: "bus-routes", id: newSelectedRouteId },
          { selected: true }
        );
        setSelectedRouteId(newSelectedRouteId);
      } else {
        setSelectedRouteId(null);
      }

      // If a feature was clicked, show its tooltip
      if (feature) {

        const allLayers = flattenLayers(layerConfig);
        const clickedLayer = allLayers.find(
          (l) => `${l.id}-layer` === feature.layer.id
        );

        // Check for the new 'tooltipProperties' array
        if (clickedLayer?.tooltipProperties) {
          const content = (
            <Box sx={{ p: 0.5, fontFamily: "sans-serif" }}>
              {clickedLayer.tooltipProperties.map(
                ({ label, property, prefix = "", suffix = "" }) => (
                  <div key={property}>
                    <strong>{label}:</strong> {prefix}
                    {feature.properties[property] || "N/A"}
                    {suffix}
                  </div>
                )
              )}
            </Box>
          );

          setPopupInfo({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
            content,
          });
        }
      } else {
        setPopupInfo(null);
      }
    },
    [visibleLayers, selectedRouteId]
  );

  if (!MAPBOX_TOKEN) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography color="error">Mapbox token is missing.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={visibleLayers.map((l) => `${l.id}-layer`)}
        cursor="pointer"
      >
        {visibleLayers.map((layer) => {
          const data = geoJsonData[layer.file];
          if (!data) return null;
          if (
            layer.type === "symbol" &&
            layer.icon &&
            !loadedIconIds.has(layer.icon.id)
          ) {
            return null;
          }
          return (
            <Source
              key={layer.id}
              id={layer.id}
              type="geojson"
              data={data}
              generateId={true}
            >
              <Layer
                id={`${layer.id}-layer`}
                type={layer.type}
                paint={getLayerPaintStyle(layer)}
                layout={getLayerLayoutStyle(layer)}
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
            anchor="bottom" // A good anchor for tooltips
          >
            {popupInfo.content}
          </Popup>
        )}
      </MapGL>

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
          onChange={(e, newStyle) => newStyle && setMapStyle(newStyle)}
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
    </Box>
  );
};

export default BigMap;
