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
  // This state is still useful for tracking, even if not used for rendering
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
          if (map.hasImage(id)) {
            return resolve(id);
          }
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
        console.log("Custom icons loaded/verified:", loadedIds);
      })
      .catch((error) => {
        console.error("An error occurred while loading icons.", error);
      });
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

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const handleLoad = () => {
      map.resize();
      loadMapIcons(map);
    };

    const handleStyleData = () => {
      if (map.isStyleLoaded()) {
        loadMapIcons(map);
      }
    };

    map.on("style.load", handleLoad);
    map.on("styledata", handleStyleData);

    return () => {
      map.off("style.load", handleLoad);
      map.off("styledata", handleStyleData);
    };
  }, [loadMapIcons]);

  const handleMapClick = useCallback(
    (event) => {
      const map = mapRef.current?.getMap();
      if (!map) return;
      const feature = event.features?.[0];

      if (selectedRouteId !== null) {
        map.setFeatureState(
          { source: "bus-routes", id: selectedRouteId },
          { selected: false }
        );
      }

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

      if (feature) {
        const allLayers = flattenLayers(layerConfig);
        const clickedLayer = allLayers.find(
          (l) => `${l.id}-layer` === feature.layer.id
        );

        let popupContent = null;

        if (
          clickedLayer?.tooltipProperties &&
          Array.isArray(clickedLayer.tooltipProperties)
        ) {
          popupContent = (
            <Box sx={{ p: 0.5, fontFamily: "sans-serif" }}>
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
        } else if (
          clickedLayer?.tooltipProperty &&
          typeof clickedLayer.tooltipProperty === "string"
        ) {
          const { tooltipProperty, tooltipPrefix = "" } = clickedLayer;
          const value = feature.properties[tooltipProperty] || "N/A";
          popupContent = (
            <Box sx={{ p: 0.5, fontFamily: "sans-serif" }}>
              {tooltipPrefix}
              {value}
            </Box>
          );
        }

        if (popupContent) {
          setPopupInfo({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
            content: popupContent,
          });
        }
      } else {
        setPopupInfo(null);
      }
    },
    [selectedRouteId]
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
        onClick={handleMapClick}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={flattenLayers(layerConfig).map((l) => `${l.id}-layer`)}
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
            anchor="bottom"
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
