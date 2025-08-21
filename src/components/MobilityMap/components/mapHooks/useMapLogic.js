import { useCallback, useEffect, useState } from "react";
import { flattenLayers, layerConfig } from "../../../../config/map/mainLayerConfig";

const useMapLogic = (visibleLayers, mapRef) => {
  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch GeoJSON data for all visible layers
  useEffect(() => {
    const fetchDataForVisibleLayers = async () => {
      const newLayersToFetch = visibleLayers.filter(
        (layer) => !geoJsonData[layer.file]
      );
      if (newLayersToFetch.length === 0) return;

      setIsFetching(true);
      setError(null); // Reset error state on new fetch
      try {
        const promises = newLayersToFetch.map((layer) =>
          fetch(layer.file)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch ${layer.file}`);
              }
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
      } catch (err) {
        console.error("Error fetching GeoJSON data:", err);
        setError("Could not load map data. Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchDataForVisibleLayers();
  }, [visibleLayers, geoJsonData]);

  // Load icons for all layers
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
    Promise.all(iconLoadPromises).catch((err) => {
      console.error("An error occurred while loading icons.", err);
      setError("Could not load map icons.");
    });
  }, []);

  // Handle style data event to load icons only when the map style is ready
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

  // Handle map click to show popup and highlight bus routes
  const handleMapClick = useCallback(
    (event) => {
      const map = mapRef.current?.getMap();
      if (!map || !event.features) return;

      const feature = event.features?.[0];

      // Always deselect the previous route first
      if (selectedRouteId !== null && map.getSource("bus-routes")) {
        map.setFeatureState(
          { source: "bus-routes", id: selectedRouteId },
          { selected: false }
        );
        setSelectedRouteId(null);
      }

      if (!feature) {
        setPopupInfo(null);
        return;
      }

      // Handle bus route selection
      if (feature.layer.id === "bus-routes") {
        const newSelectedRouteId = feature.id;
        map.setFeatureState(
          { source: "bus-routes", id: newSelectedRouteId },
          { selected: true }
        );
        setSelectedRouteId(newSelectedRouteId);
      }

      // Handle popup creation
      const allLayers = flattenLayers(layerConfig);
      const clickedLayer = allLayers.find((l) => l.id === feature.layer.id);

      if (clickedLayer?.tooltipProperties) {
        setPopupInfo({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          layer: clickedLayer,
          feature: feature,
        });
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
    error,
  };
};

export default useMapLogic;
