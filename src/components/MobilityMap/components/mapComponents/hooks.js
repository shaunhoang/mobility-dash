import { useCallback, useEffect, useState } from "react";
import { flattenLayers, layerConfig } from "./layerConfig";

/**
 * Custom hook to fetch and manage GeoJSON data for visible layers.
 * @param {Array} visibleLayers - The array of layers currently visible on the map.
 * @returns {{geoJsonData: object, isFetching: boolean}}
 */
export const useGeoJsonData = (visibleLayers) => {
  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [visibleLayers, geoJsonData]);

  return { geoJsonData, isFetching };
};

/**
 * Custom hook to manage loading all necessary icons onto the map.
 * @returns {{loadedIconIds: Set<string>, loadIcons: Function}}
 */
export const useMapIcons = () => {
  const [loadedIconIds, setLoadedIconIds] = useState(new Set());

  const loadIcons = useCallback((map) => {
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

  return { loadedIconIds, loadIcons };
};
