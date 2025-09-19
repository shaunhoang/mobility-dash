import { Box } from "@mui/material";
import { Layer, Popup, Source } from "react-map-gl/mapbox";

// Tooltip content for the popup
const TooltipContent = ({ layer, feature }) => {
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
            {feature.properties[property] ?? "N/A"}
            {suffix}
          </div>
        )
      )}
    </Box>
  );
};

// Default Layout styles for layers
const getLayerLayoutStyle = (layer) => {
  switch (layer.type) {
    case 'line':
      return {
        'line-join': 'round',
        'line-cap': 'round',
        ...(layer.layout || {}) 
      };
    default:
      return layer.layout || {};
  }
};


// Default paint styles for layers
const getLayerPaintStyle = (layer) => {
  const defaultColor = ["coalesce", ["get", "color"], "#808080"];
  const defaultStrokeColor = "#000000";
  const defaultStrokeWidth = 2;
  const defaultOpacity = 1;

  switch (layer.type) {
    case "fill":
      return {
        "fill-color": defaultColor,
        "fill-opacity": 0.3,
        "fill-outline-color": defaultStrokeColor,
        ...layer.paint,
      };
    case "symbol":
      return { ...layer.paint };
    case "circle":
      return {
        "circle-color": defaultColor,
        "circle-radius": 5,
        "circle-opacity": defaultOpacity,
        "circle-stroke-color": defaultStrokeColor,
        "circle-stroke-width": 1,
        ...layer.paint,
      };
    case "line":
    default:
      return {
        "line-color": defaultColor,
        "line-width": defaultStrokeWidth,
        "line-opacity": defaultOpacity,
        ...layer.paint,
      };
  }
};

// Main component
const MapLayers = ({ visibleLayers, geoJsonData, popupInfo, onClosePopup }) => {
  return (
    <>
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
