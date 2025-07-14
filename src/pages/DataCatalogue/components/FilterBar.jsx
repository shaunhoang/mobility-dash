import { Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterBar = ({ filters, onFilterChange, filterOptions }) => {
  const { format, coverage, theme } = filters;
  const { fileFormats, coverages, themes } = filterOptions;

  const handleChange = (event) => {
    onFilterChange({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  return (
<Box sx={{ display: 'flex',gap: 1, my: 2, flexWrap: 'nowrap' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="format-select-label">File Format</InputLabel>
          <Select
            labelId="format-select-label"
            id="format-select"
            name="format"
            value={format}
            label="File Format"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>All Formats</em>
            </MenuItem>
            {fileFormats.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
 
        <FormControl fullWidth size="small">
          <InputLabel id="coverage-select-label">Coverage</InputLabel>
          <Select
            labelId="coverage-select-label"
            id="coverage-select"
            name="coverage"
            value={coverage}
            label="Coverage"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>All Coverages</em>
            </MenuItem>
            {coverages.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="theme-select-label">Theme</InputLabel>
          <Select
            labelId="theme-select-label"
            id="theme-select"
            name="theme"
            value={theme}
            label="Theme"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>All Themes</em>
            </MenuItem>
            {themes.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
  );
};

export default FilterBar;