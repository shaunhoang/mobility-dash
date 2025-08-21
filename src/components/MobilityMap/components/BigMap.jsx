import { Box, CircularProgress } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useRef, useState } from "react";
import { default as MapGL } from "react-map-gl/mapbox";

import MapControls from "./mapComponents/MapControls";
import MapLayers from "./mapComponents/MapLayers";
import MapLegendProp from "./mapComponents/MapLegendProp";
import { flattenLayers, layerConfig } from "../../../config/map/mainLayerConfig";
import useMapLogic from "./mapHooks/useMapLogic";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Light", value: "mapbox://styles/mapbox/light-v11" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

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

const BigMap = ({ visibleLayers }) => {
  const mapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const [viewport, setViewport] = useState({
    longitude: 75.787,
    latitude: 26.912,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });
  const [bearing, setBearing] = useState(0);

  const {
    geoJsonData,
    isFetching,
    popupInfo,
    setPopupInfo,
    loadMapIcons,
    handleMapClick,
  } = useMapLogic(visibleLayers, mapRef);

  const handleMapLoad = useCallback(
    (event) => {
      const map = event.target;
      if (!map) return;
      map.resize();
      loadMapIcons(map);
    },
    [loadMapIcons]
  );

  const handleResetNorth = useCallback(() => {
    mapRef.current?.easeTo({ bearing: 0, pitch: 0 });
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      {/* Load map */}
      <LoadingSpinner isFetching={isFetching} />
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
        interactiveLayerIds={flattenLayers(layerConfig).map((l) => l.id)}
        cursor="pointer"
      >
        {/* Draw layers + popup */}
        <MapLayers
          visibleLayers={visibleLayers}
          geoJsonData={geoJsonData}
          popupInfo={popupInfo}
          onClosePopup={() => setPopupInfo(null)}
        />
      </MapGL>

      {/* Map controls and UI */}
      <MapControls
        mapStyle={mapStyle}
        onStyleChange={(e, newStyle) => newStyle && setMapStyle(newStyle)}
        bearing={bearing}
        onResetNorth={handleResetNorth}
        baseLayers={baseLayers}
      />
      {/* <MapLegendProp visibleLayers={visibleLayers} /> */}
    </Box>
  );
};

export default BigMap;
