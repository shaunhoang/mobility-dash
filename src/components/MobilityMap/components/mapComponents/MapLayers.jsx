import { Box } from "@mui/material";
import { Layer, Popup, Source } from "react-map-gl/mapbox";
import { getLayerLayoutStyle, getLayerPaintStyle } from "../mapContents/layerConfig";

const TooltipContent = ({ layer, feature }) => {
  // Guard against missing data
  if (!layer?.tooltipProperties || !feature?.properties) {
    return null;
  }

  return (
    <Box sx={{ p: 0.5, maxWidth: 240 }}>
      {layer.tooltipProperties.map(
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
};

const MapLayers = ({ visibleLayers, geoJsonData, popupInfo, onClosePopup }) => {
  return (
    <>
      {/* Render visible layers */}
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
              id={layer.id}
              type={layer.type}
              paint={getLayerPaintStyle(layer)}
              layout={getLayerLayoutStyle(layer)}
            />
          </Source>
        );
      })}

      {/* Popup rendering children */}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={onClosePopup}
          closeOnClick={false}
          anchor="bottom"
        >
          <TooltipContent layer={popupInfo.layer} feature={popupInfo.feature} />
        </Popup>
      )}
    </>
  );
};

export default MapLayers;
