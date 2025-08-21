const BASE_URL = import.meta.env.VITE_BASE_URL;
const GEOJSON_BASE_URL = `${BASE_URL}mapMain/`;

const GEOJSON_FILES = {
  JAIPUR_DISTRICT_BOUND: "jaipur_district_bound.geojson",
  JAIPUR_MUNI_BOUND: "jaipur_muni_bound.geojson",
  BUS_ROUTES: "bus_routes.geojson",
  BUS_STOPS: "bus_stops.geojson",
  TRAIN_ROUTES: "train_routes.geojson",
  TRAIN_STATIONS: "train_stations.geojson",
  METRO_ROUTES: "metro_routes.geojson",
  METRO_STATIONS: "metro_stations.geojson",
  METRO_ROUTES_UC: "metro_routes_uc.geojson",
  WARDS_HERITAGE: "jaipur_wards_heritage.geojson",
  WARDS_GREATER: "jaipur_wards_greater.geojson",
  WARDS_ASSEMBLY: "jaipur_wards.geojson",
  RURAL_TOWNS: "jaipur_town_adm5.geojson",
  EAI_DATA: "jaipur_eai.geojson",
};

// Build paths for GeoJSON files
export const getGeoJsonPath = (fileKey) => {
  const fileName = GEOJSON_FILES[fileKey];
  if (!fileName) {
    console.warn(`GeoJSON file key not found: ${fileKey}`);
    return "";
  }
  return `${GEOJSON_BASE_URL}${fileName}`;
};
