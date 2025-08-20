const BASE_URL = import.meta.env.VITE_BASE_URL;

const pathConfig = {
  // Scorecard
  KPI_DOMAINS_PATH: `${BASE_URL}kpiDef/kpiDomains.json`,
  KPI_DETAILS_PATH: `${BASE_URL}kpiDef/kpiDetails.json`,
  KPI_CHARTS_FOLDER_PATH: `${BASE_URL}kpiCharts/`,
  KPI_MAPS_FOLDER_PATH: `${BASE_URL}kpiMaps/`,
  // Data Catalogue
  DATA_CATALOGUE_PATH: `${BASE_URL}datacatalogue.json`,
  // Highlights
  HIGHLIGHTS_PATH: `${BASE_URL}highlightsData.json`,
  ABOUT_PATH: `${BASE_URL}aboutData.json`,
};

export default pathConfig;