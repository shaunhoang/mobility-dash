import { Box } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useRef, useState } from "react";
import { Layer, Source, default as MapGL } from "react-map-gl/mapbox";
import {
  flattenLayers,
  getLayerLayoutStyle,
  getLayerPaintStyle,
  layerConfig,
} from "./mapComponents/layerConfig";
import MapControls from "./mapComponents/MapControls";
import MapUI from "./mapComponents/MapUI";
import { useMapLogic } from "./mapComponents/MapLogic";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Light", value: "mapbox://styles/mapbox/light-v11" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

const BigMap = ({ visibleLayers }) => {
  const mapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const [viewport, setViewport] = useState({
    longitude: 75.787,
    latitude: 26.912,
    zoom: 10,
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
        {/* Map Layers */}
        {visibleLayers.map((layer) => {
          const data = geoJsonData[layer.file];
          if (!data) return null;
          return (
            <Source
              key={layer.id}
              id={layer.id}
              type="geojson"
              data={data}
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
      <MapControls
        mapStyle={mapStyle}
        onStyleChange={(e, newStyle) => newStyle && setMapStyle(newStyle)}
        bearing={bearing}
        onResetNorth={handleResetNorth}
        baseLayers={baseLayers}
      />
      <MapUI isFetching={isFetching} visibleLayers={visibleLayers} />
    </Box>
  );
};

export default BigMap;
