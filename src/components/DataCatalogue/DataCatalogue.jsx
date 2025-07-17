import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

// These components would be in their own files in a real project
import DetailsDrawer from './components/DetailsDrawer';
import CatalogueList from './components/CatalogueList';
import FilterBar from './components/FilterBar';
import ResultsSummary from './components/ResultsSummary';
import SearchBar from './components/SearchBar';
import ToggleFilterButton from './components/ToggleFilterButton';

const DataCatalogue = () => {
  // 1. State for the fetched data, loading, and errors
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for UI controls remains the same
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    format: '',
    coverage: '',
    theme: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 2. useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch('data/datacatalogue/datacatalogue.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Cannot connnect to the server');
        }
        return response.json();
      })
      .then(data => {
        setDatasets(data);
        setIsLoading(false);
      })
      .catch(fetchError => {
        console.error("Failed to fetch data catalogue:", fetchError);
        setError("Could not load the data catalogue. Please try again later.");
        setIsLoading(false);
      });
  }, []); // The empty array means this effect runs only once

  const filterOptions = useMemo(() => {
    if (!datasets || datasets.length === 0) {
      return { fileFormats: [], coverages: [], themes: [] };
    }

    const formats = new Set();
    const coverages = new Set();
    const themes = new Set();

    datasets.forEach(item => {
      if (item.format) formats.add(item.format);
      if (item.coverage) coverages.add(item.coverage);
      if (item.theme) themes.add(item.theme);
    });

    // Convert sets to sorted arrays for the dropdowns
    return {
      fileFormats: [...formats].sort(),
      coverages: [...coverages].sort(),
      themes: [...themes].sort(),
    };
  }, [datasets]); // re-run when the datasets array changes

  const handleItemClick = (item) => {
    setSelectedDataset(item);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page
  };


  const filteredDatasets = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return datasets.filter((item) => {
      // Dropdown filter logic
      const formatMatch = filters.format ? item.format === filters.format : true;
      const coverageMatch = filters.coverage ? item.coverage === filters.coverage : true;
      const themeMatch = filters.theme ? item.theme === filters.theme : true;

      // Search query logic (searches name and description)
      const searchMatch = query ?
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
        : true;

      return formatMatch && coverageMatch && themeMatch && searchMatch;
    });
  }, [searchQuery, filters, datasets]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDatasets.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredDatasets.length / itemsPerPage);

  // 3. Conditional rendering for loading and error states
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4 }}>


      <Box sx={{ p: 2, backgroundColor: 'white', boxShadow: 1 }}>
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            {showFilters && (
              <FilterBar filters={filters} onFilterChange={setFilters} filterOptions={filterOptions} />
            )}
          </Box>
          <ToggleFilterButton showFilters={showFilters} onClick={handleToggleFilters} />
        </Box>

        <Divider sx={{ mb: 2 }} />
        <ResultsSummary count={filteredDatasets.length} />

        {pageCount > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}>
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

        <CatalogueList items={currentItems} onItemClick={handleItemClick} isMobile={isMobile} />
        <DetailsDrawer item={selectedDataset} open={isDrawerOpen} onClose={handleDrawerClose} />
      </Box>

    </Box>
  );
};

export default DataCatalogue;