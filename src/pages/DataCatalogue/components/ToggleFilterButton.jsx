import { Button } from '@mui/material';
import { FilterList, FilterListOff } from '@mui/icons-material';

const ToggleFilterButton = ({ showFilters, onClick }) => (
  <Button
    onClick={onClick}
    startIcon={showFilters ? <FilterListOff /> : <FilterList />}
    sx={{textTransform: 'none' }}
    color="primary"
    variant="text"
  >
    {showFilters ? 'Hide Filters' : 'More Filters'}
  </Button>
);

export default ToggleFilterButton;