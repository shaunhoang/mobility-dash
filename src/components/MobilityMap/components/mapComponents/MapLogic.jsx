import { useCallback, useEffect, useState } from "react";
import { flattenLayers, layerConfig } from "./layerConfig";

export const useMapLogic = (visibleLayers, mapRef) => {
  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
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
  }, [loadMapIcons, mapRef]);

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
    [selectedRouteId, mapRef]
  );

  return {
    geoJsonData,
    isFetching,
    popupInfo,
    setPopupInfo,
    loadMapIcons,
    handleMapClick,
  };
};
