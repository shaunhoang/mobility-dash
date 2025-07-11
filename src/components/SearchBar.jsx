import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ query, onQueryChange }) => (
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search by keyword..."
    value={query}
    onChange={(e) => onQueryChange(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}

  />
);

export default SearchBar;