import {
  Grid,
  Box,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import CatalogueList from "./components/CatalogueList";
import DetailsDrawer from "./components/DetailsDrawer";
import DownloadButton from "./components/DownloadButton";
import FilterBar from "./components/FilterBar";
import ResultsSummary from "./components/ResultsSummary";
import SearchBar from "./components/SearchBar";
import ToggleFilterButton from "./components/ToggleFilterButton";

const DataCatalogue = () => {
  // useState for the fetched data, loading, and errors
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    format: [],
    resolution: [],
    theme: [],
    latestYear: [],
  });
  const [showFilters, setShowFilters] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch("data/datacatalogue/datacatalogue.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Cannot connnect to the server");
        }
        return response.json();
      })
      .then((data) => {
        setDatasets(data);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch data catalogue:", fetchError);
        setError("Could not load the data catalogue. Please try again later.");
        setIsLoading(false);
      });
  }, []); // The empty array means this effect runs only once

  // useMemo to compute filter options based on the fetched datasets
  const filterOptions = useMemo(() => {
    if (!datasets || datasets.length === 0) {
      return { fileFormats: [], resolutions: [], themes: [], latestYears: [] };
    }

    const formats = new Set();
    const resolutions = new Set();
    const themes = new Set();
    const latestYears = new Set();

    datasets.forEach((item) => {
      if (item.format) formats.add(item.format);
      if (item.resolution) resolutions.add(item.resolution);
      if (item.theme) themes.add(item.theme);
      if (item.latest_year) latestYears.add(item.latest_year);
    });

    return {
      fileFormats: [...formats].sort(),
      resolutions: [...resolutions].sort(),
      themes: [...themes].sort(),
      latestYears: [...latestYears].sort(),
    };
  }, [datasets]);

  // Handlers for interactions
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
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const filteredDatasets = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return datasets.filter((item) => {
      // Dropdown filter logic
      const formatMatch =
        filters.format.length === 0 || filters.format.includes(item.format);
      const resolutionMatch =
        filters.resolution.length === 0 ||
        filters.resolution.includes(item.resolution);
      const themeMatch =
        filters.theme.length === 0 || filters.theme.includes(item.theme);
      const latestYearMatch =
        filters.latestYear.length === 0 || filters.latestYear.includes(item.latest_year);

      // Search query logic (searches name and description and theme)
      const searchMatch = query
        ? item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.theme.toLowerCase().includes(query)
        : true;

      return formatMatch && resolutionMatch && themeMatch && latestYearMatch && searchMatch;
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

  // Conditional rendering for loading and error states
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
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4 }}>

      <Box
        sx={{
          p: 2,
          backgroundColor: "white",
          boxShadow: 1,
          borderRadius: "8px",
        }}
      >
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ToggleFilterButton
            showFilters={showFilters}
            onClick={handleToggleFilters}
          />
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Box sx={{ flexGrow: 1 }}>
            {showFilters && (
              <FilterBar
                filters={filters}
                onFilterChange={setFilters}
                filterOptions={filterOptions}
              />
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <ResultsSummary count={filteredDatasets.length} />
          <DownloadButton
            data={filteredDatasets}
            filename={`datacatalogue_filtered_(${filteredDatasets.length}it).csv`}
          />
        </Box>

        {pageCount > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Items per page</InputLabel>
              <Select
                value={itemsPerPage}
                label="Items per page"
                onChange={handleItemsPerPageChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}

        <CatalogueList
          items={currentItems}
          onItemClick={handleItemClick}
          isMobile={isMobile}
        />
        <DetailsDrawer
          item={selectedDataset}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
        />
      </Box>
    </Box>
  );
};

export default DataCatalogue;
