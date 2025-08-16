import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Layer, Popup, Source, default as MapGL } from "react-map-gl/mapbox";
import {
  flattenLayers,
  getLayerLayoutStyle,
  getLayerPaintStyle,
  layerConfig,
} from "./mapComponents/layerConfig";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Light", value: "mapbox://styles/mapbox/light-v11" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

const NorthArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" fill="#333" />
  </svg>
);

const Legend = () => (
  <Paper
    elevation={3}
    sx={{
      position: "absolute",
      bottom: 30,
      left: 10,
      padding: "10px",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      zIndex: 1,
    }}
  >
    <Typography variant="subtitle2" sx={{ mb: 1 }}>
      Econ Activity Index
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: 20,
          height: 120,
          background: "linear-gradient(to top, #2f00ff, #ffffff, #c30003)",
          border: "1px solid #ccc",
        }}
      />
      <Box
        sx={{
          ml: 1,
          height: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        <Typography variant="caption">1 (High)</Typography>
        <Typography variant="caption">0</Typography>
        <Typography variant="caption">-1 (Low)</Typography>
      </Box>
    </Box>
  </Paper>
);

const BigMap = ({ visibleLayers }) => {
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: 75.787,
    latitude: 26.912,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const [bearing, setBearing] = useState(0);
  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [loadedIconIds, setLoadedIconIds] = useState(new Set());
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const loadMapIcons = useCallback((map) => {
    if (!map) return;
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
          if (map.hasImage(id)) return resolve(id);
          map.loadImage(url, (error, image) => {
            if (error) return reject(error);
            if (!map.hasImage(id)) map.addImage(id, image);
            resolve(id);
          });
        })
    );
    Promise.all(iconLoadPromises).catch((error) =>
      console.error("An error occurred while loading icons.", error)
    );
  }, []);

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
            .then((res) => res.json())
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

  const handleMapLoad = useCallback(
    (event) => {
      const map = event.target;
      if (!map) return;
      map.resize();
      loadMapIcons(map);
    },
    [loadMapIcons]
  );

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const handleStyleData = () => {
      const currentMap = mapRef.current?.getMap();
      if (currentMap && currentMap.isStyleLoaded()) {
        loadMapIcons(currentMap);
      }
    };
    map.on("styledata", handleStyleData);
    return () => map.off("styledata", handleStyleData);
  }, [loadMapIcons]);

  // --- FIX: Restored the bus route selection logic ---
  const handleMapClick = useCallback(
    (event) => {
      const map = mapRef.current?.getMap();
      if (!map) return;
      const feature = event.features?.[0];

      // Always clear the previously selected route first
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
        // If it's not a bus route, clear the selection
        setSelectedRouteId(null);
      }

      // Handle popups for any layer
      if (feature) {
        const allLayers = flattenLayers(layerConfig);
        const clickedLayer = allLayers.find(
          (l) => `${l.id}-layer` === feature.layer.id
        );

        if (clickedLayer?.tooltipProperties) {
          const content = (
            <Box sx={{ p: 0.5 }}>
              {clickedLayer.tooltipProperties.map(
                ({ label, property, prefix = "", suffix = "" }) => (
                  <div key={property}>
                    <strong>{label}</strong>
                    {prefix}
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
        } else {
          setPopupInfo(null);
        }
      } else {
        setPopupInfo(null);
      }
    },
    [selectedRouteId] // Add selectedRouteId as a dependency
  );

  const handleResetNorth = useCallback(() => {
    mapRef.current?.easeTo({ bearing: 0, pitch: 0 });
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        onMove={(evt) => {
          setViewport(evt.viewState);
          setBearing(evt.viewState.bearing);
        }}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={flattenLayers(layerConfig).map(
          (l) => `${l.id}-layer`
        )}
        cursor="pointer"
      >
        {visibleLayers.map((layer) => {
          const data = geoJsonData[layer.file];
          if (!data) return null;
          return (
            <Source
              key={layer.id}
              id={layer.id}
              type="geojson"
              data={data}
              // Bus routes need generateId for feature state to work
              generateId={layer.id === "bus-routes"}
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
            anchor="bottom"
          >
            {popupInfo.content}
          </Popup>
        )}
      </MapGL>

      {/* UI Overlays */}
      {isFetching && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
          <CircularProgress />
        </Box>
      )}

      {visibleLayers.some((layer) => layer.id === "econ_activity_index") && (
        <Legend />
      )}

      <Paper elevation={3} sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <ToggleButtonGroup
          value={mapStyle}
          exclusive
          onChange={(e, newStyle) => newStyle && setMapStyle(newStyle)}
          size="small"
        >
          {baseLayers.map((layer) => (
            <ToggleButton key={layer.value} value={layer.value} sx={{ width: 80 }}>
              {layer.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      <Paper elevation={3} sx={{ position: "absolute", top: 60, right: 10, borderRadius: "50%" }}>
        <IconButton
          onClick={handleResetNorth}
          sx={{ transform: `rotate(${bearing}deg)`, transition: "transform 0.2s ease-in-out" }}
        >
          <NorthArrow />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default BigMap;
