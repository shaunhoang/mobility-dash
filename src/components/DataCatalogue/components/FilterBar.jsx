import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FilterBar = ({ filters, onFilterChange, filterOptions }) => {
  const { format, resolution, theme } = filters;
  const { fileFormats, resolutions, themes } = filterOptions;

  const handleChange = (event) => {
    onFilterChange({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  return (
<Box sx={{ display: 'flex',gap: 1, my: 2, flexWrap: 'nowrap' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="format-select-label">Format</InputLabel>
          <Select
            labelId="format-select-label"
            id="format-select"
            name="format"
            value={format}
            label="Format"
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
          <InputLabel id="resolution-select-label">Resolution</InputLabel>
          <Select
            labelId="resolution-select-label"
            id="resolution-select"
            name="resolution"
            value={resolution}
            label="resolution"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>All Resolutions</em>
            </MenuItem>
            {resolutions.map((option) => (
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