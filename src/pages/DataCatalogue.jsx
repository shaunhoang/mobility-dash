import {
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
  Pagination,
} from '@mui/material';
import { useState, useMemo, useEffect } from 'react';

import NavRow from '../components/NavRow';
import SearchBar from '../components/SearchBar';
import CatalogueList from '../components/CatalogueList';
import DetailsDrawer from '../components/DetailsDrawer';
import ResultsSummary from '../components/ResultsSummary';
import FilterBar from '../components/FilterBar'; 
import ToggleFilterButton from '../components/ToggleFilterButton'

import { fileFormats, coverages, themes } from '../data/mockData';

const DataCatalogue = ({ datasets }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    format: '',
    coverage: '',
    theme: '',
  });
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

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
  }, [searchQuery,filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDatasets.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredDatasets.length / itemsPerPage);
  
  const filterOptions = { fileFormats, coverages, themes };
  
  return (
    <div style={{ padding: '4rem' ,alignItems: 'center' }}>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <NavRow label="/ Data Catalogue" />

        <Box component="section">
          <Typography
            variant="h4"
            sx={{ color: 'roseShades.dark', fontWeight: 'bold'}}
          >
            Data Catalogue
          </Typography>
        </Box>
        
        <Box component="section">
          <Typography variant="body1" color="text.secondary">
            What visitors can expect to find here...
          </Typography>
        </Box> 
      </div>

      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem'}}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              {showFilters && (
                <FilterBar filters={filters} onFilterChange={setFilters} filterOptions={filterOptions} />
              )}
            </Box>
            <ToggleFilterButton showFilters={showFilters} onClick={handleToggleFilters} />
          </Box>

          <Divider sx={{ mb: 2 }} />          
          <ResultsSummary count={filteredDatasets.length} />
          <CatalogueList items={currentItems} onItemClick={handleItemClick} isMobile={isMobile} />
          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
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
          <DetailsDrawer item={selectedDataset} open={isDrawerOpen} onClose={handleDrawerClose} />
        </Container>
      </div>
    </div>
  );
};

export default DataCatalogue;