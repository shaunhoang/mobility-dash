import {
  Box,
  CircularProgress,
  Grid,
  TablePagination,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import CatalogueList from "./components/CatalogueList";
import DetailsDrawer from "./components/DetailsDrawer";
import DownloadButton from "./components/DownloadButton";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import ToggleFilterButton from "./components/ToggleFilterButton";

import pathConfig from "../../config/path/pathConfig";

const DataCatalogue = () => {
  const [datasets, setDatasets] = useState([]);
  const [kpiDomains, setKpiDomains] = useState([]);
  const [kpiDetails, setKpiDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    format: [],
    granularity: [],
    sector: [],
    lastupdate: [],
    kpi: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Data fetching
  useEffect(() => {
    Promise.all([
      fetch(pathConfig.DATA_CATALOGUE_PATH),
      fetch(pathConfig.KPI_DOMAINS_PATH),
      fetch(pathConfig.KPI_DETAILS_PATH),
    ])
      .then(async ([datasetsResponse, domainsResponse, detailsResponse]) => {
        if (
          !datasetsResponse.ok ||
          !domainsResponse.ok ||
          !detailsResponse.ok
        ) {
          throw new Error("Network response was not ok for one or more files.");
        }
        const datasetsData = await datasetsResponse.json();
        const domainsData = await domainsResponse.json();
        const detailsData = await detailsResponse.json();
        return [datasetsData, domainsData, detailsData];
      })
      .then(([datasetsData, domainsData, detailsData]) => {
        setDatasets(datasetsData);
        setKpiDomains(domainsData);
        setKpiDetails(detailsData);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch KPI data:", fetchError);
        setError("Could not load required KPI data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  // Populate filter options based on fetched data
  const filterOptions = useMemo(() => {
    if (
      !datasets ||
      datasets.length === 0 ||
      Object.keys(kpiDetails).length === 0
    ) {
      return {
        formats: [],
        granularities: [],
        sectors: [],
        lastupdates: [],
        kpis: [],
      };
    }

    const formats = new Set();
    const granularities = new Set();
    const sectors = new Set();
    const lastupdates = new Set();
    const kpis = new Set();

    datasets.forEach((item) => {
      if (item.format) formats.add(item.format);
      if (item.granularity__spatial) granularities.add(item.granularity__spatial);
      if (item.sector) sectors.add(item.sector);
      if (item.lastupdate) lastupdates.add(item.lastupdate);
      if (item.linked_to_kpi) {
        item.linked_to_kpi
          .split(",")
          .map((kpi) => kpi.trim())
          .filter(Boolean)
          .forEach((kpiCode) => {
            if (kpiDetails[kpiCode]) {
              const domain = kpiDomains.find((d) => d.kpis.includes(kpiCode));
              if (domain) {
                kpis.add(
                  JSON.stringify({
                    value: kpiCode,
                    label: `${kpiDetails[kpiCode].title}`,
                    domainId: domain.id,
                  })
                );
              }
            }
          });
      }
    });

    return {
      formats: [...formats].sort(),
      granularities: [...granularities].sort(),
      sectors: [...sectors].sort(),
      kpis: [...kpis]
        .map((item) => JSON.parse(item))
        .sort((a, b) => {
          if (a.domainId < b.domainId) return -1;
          if (a.domainId > b.domainId) return 1;
          return a.label.localeCompare(b.label);
        }),
      lastupdates: [...lastupdates].sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0], 10);
        const numB = parseInt(b.match(/\d+/)[0], 10);
        return numA - numB;
      }),
    };
  }, [datasets, kpiDetails, kpiDomains]);

  // Event handlers
  const handleItemClick = (item) => {
    setSelectedDataset(item);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  // Filtering logic and reset logic
  const filteredDatasets = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return datasets.filter((item) => {
      const formatMatch =
        filters.format.length === 0 || filters.format.includes(item.format);
      const granularityMatch =
        filters.granularity.length === 0 ||
        filters.granularity.includes(item.granularity__spatial);
      const sectorMatch =
        filters.sector.length === 0 || filters.sector.includes(item.sector);
      const lastupdateMatch =
        filters.lastupdate.length === 0 ||
        filters.lastupdate.includes(item.lastupdate);
      const kpiMatch = // Match against the KPI code, not the label texts
        filters.kpi.length === 0 ||
        item.linked_to_kpi
          ?.split(",")
          .map((k) => k.trim())
          .filter(Boolean) 
          .some((kpiCode) => filters.kpi.includes(kpiCode));

      // Search query logic (searches title and description and sector and keywords)
      const searchMatch = query
        ? [item.title, item.description, item.sector, item.keywords]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(query))
        : true;

      return (
        formatMatch &&
        granularityMatch &&
        sectorMatch &&
        lastupdateMatch &&
        kpiMatch &&
        searchMatch
      );
    });
  }, [searchQuery, filters, datasets]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDatasets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const pageCount = Math.ceil(filteredDatasets.length / itemsPerPage);

  // Main Rendering
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          p: 2,
          backgroundColor: "white",
          boxShadow: 1,
          borderRadius: "8px",
        }}
      >
        {/* Search Bar and Filtering */}
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <ToggleFilterButton
              showFilters={showFilters}
              onClick={handleToggleFilters}
            />
          </Box>
          <Grid sx={{ flexGrow: 1 }}>
            {showFilters && (
              <FilterBar
                filters={filters}
                onFilterChange={setFilters}
                filterOptions={filterOptions}
              />
            )}
          </Grid>
        </Box>

        {/* Count results and Pagination Controls */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Found {filteredDatasets.length}{" "}
              {filteredDatasets.length === 1 ? "dataset" : "datasets"}
            </Typography>
          </Box>
          {pageCount > 1 && (
            <TablePagination
              component="div"
              count={filteredDatasets.length}
              page={currentPage - 1} // 0-based index
              onPageChange={handlePageChange}
              rowsPerPage={itemsPerPage}
              onRowsPerPageChange={handleItemsPerPageChange}
              rowsPerPageOptions={[5, 10, 20, 50]}
            />
          )}
        </Box>

        {/* Main Catalogue */}
        <CatalogueList items={currentItems} onItemClick={handleItemClick} />

        {/* Download search results */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <DownloadButton
            data={filteredDatasets}
            filename={`datacatalogue_filtered_(${filteredDatasets.length}it).csv`}
          />
        </Box>
        {/* Details Drawer */}
        <DetailsDrawer
          item={selectedDataset}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          kpiDetails={kpiDetails}
          kpiDomains={kpiDomains}
        />
      </Box>
    </Box>
  );
};

export default DataCatalogue;
