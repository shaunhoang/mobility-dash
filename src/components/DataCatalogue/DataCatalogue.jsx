import {
  Box, Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select, Typography, useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { coverages, fileFormats, generateMockData, themes } from '../../data/mockData';

import CatalogueList from './components/CatalogueList';
import DetailsDrawer from '../common/DetailsDrawer';
import FilterBar from './components/FilterBar';
import ResultsSummary from './components/ResultsSummary';
import SearchBar from './components/SearchBar';
import ToggleFilterButton from './components/ToggleFilterButton';

const DataCatalogue = () => {
  const [datasets] = useState(() => generateMockData(300));
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

  const filterOptions = { fileFormats, coverages, themes };


  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Box component="section">
        <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 2 }}>
          Open Mobility Data Repository
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Box>

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