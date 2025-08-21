import { Box, Typography } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useMemo, useRef, useState } from "react";
import Map from "react-map-gl/mapbox";

import MapControls from "../../MobilityMap/components/mapComponents/MapControls";
import MapLayers from "../../MobilityMap/components/mapComponents/MapLayers";
import { layerConfig } from "../../../config/map/kpiLayerConfig";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Light", value: "mapbox://styles/mapbox/light-v11" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

const KpiMap = ({ data: geojsonData, kpicode }) => {
  const mapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const [viewport, setViewport] = useState({
    longitude: 75.7873,
    latitude: 26.9124,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });
  const [bearing, setBearing] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);

  const visibleLayers = useMemo(() => {
    if (!geojsonData || !kpicode) {
      return [];
    }

    const defaultConfig = {
      id: "data-layer",
      type: "fill",
      file: "kpiData",
      paint: {
        "fill-color": "#d16363",
        "fill-opacity": 0.5,
        "fill-outline-color": "#000000",
      },
      tooltipProperties: [
        {
          label: "Value: ",
          property: "kpi_value",
        },
      ],
    };

    const config = layerConfig[kpicode] || defaultConfig;

    if (!layerConfig[kpicode]) {
      console.log(
        `No specific layer configuration for KPI code: ${kpicode}. Using default style.`
      );
    }
    return [config];
  }, [geojsonData, kpicode]);

  const handleStyleChange = useCallback((event, newStyle) => {
    if (newStyle !== null) {
      setMapStyle(newStyle);
    }
  }, []);

  const handleResetNorth = useCallback(() => {
    mapRef.current?.easeTo({ bearing: 0, pitch: 0 });
  }, []);

  const handleMapClick = useCallback(
    (event) => {
      const clickedFeature = event.features && event.features[0];
      if (clickedFeature) {
        const layer = visibleLayers.find(
          (l) => l.id === clickedFeature.layer.id
        );
        setPopupInfo({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          feature: clickedFeature,
          layer: layer,
        });
      }
    },
    [visibleLayers]
  );

  const handleClosePopup = useCallback(() => {
    setPopupInfo(null);
  }, []);

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
        height: 700,
        width: "100%",
        mt: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => {
          setViewport(evt.viewState);
          setBearing(evt.viewState.bearing);
        }}
        onClick={handleMapClick}
        interactiveLayerIds={visibleLayers.map((l) => l.id)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <MapLayers
          visibleLayers={visibleLayers}
          geoJsonData={{ kpiData: geojsonData }}
          popupInfo={popupInfo}
          onClosePopup={handleClosePopup}
        />
      </Map>

      <MapControls
        mapStyle={mapStyle}
        onStyleChange={handleStyleChange}
        bearing={bearing}
        onResetNorth={handleResetNorth}
        baseLayers={baseLayers}
      />
    </Box>
  );
};

export default KpiMap;
