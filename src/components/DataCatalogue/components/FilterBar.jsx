import ClearAllIcon from "@mui/icons-material/ClearAll";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

const FilterBar = ({ filters, onFilterChange, filterOptions }) => {
  // Handler for individual chip deletion
  const handleDelete = (filterName, valueToDelete) => () => {
    onFilterChange({
      ...filters,
      [filterName]: filters[filterName].filter(
        (value) => value !== valueToDelete
      ),
    });
  };

  // Handler for the main select input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({
      ...filters,
      // The value from MUI's multiple select is an array
      [name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  // Handler for clearing all filters
  const handleClearAll = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    onFilterChange(clearedFilters);
  };
  
  const filterConfigs = [
    { name: 'sector', label: 'Sector', options: filterOptions.sectors },
    { name: 'granularity', label: 'Granularity', options: filterOptions.granularities },
    { name: 'lastupdate', label: 'Last Updated', options: filterOptions.lastupdates },
    { name: 'format', label: 'Format', options: filterOptions.formats },
  ];

  const isClearAllDisabled = Object.values(filters).every(arr => arr.length === 0);

  return (
    <Box>
      <Grid container sx={{ display: "flex", mt: 2 }} spacing={2}>
        {filterConfigs.map((config) => (
          <Grid item size={{xs:12,sm:6,md:3}} key={config.name}>
            <FormControl fullWidth size="small">
              <InputLabel id={`${config.name}-select-label`}>{config.label}</InputLabel>
              <Select
                labelId={`${config.name}-select-label`}
                id={`${config.name}-select`}
                name={config.name}
                value={filters[config.name]} 
                label={config.label}
                multiple
                onChange={handleChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        onDelete={handleDelete(config.name, value)}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    ))}
                  </Box>
                )}
              >
                {/* Map over the options for the current filter */}
                {config.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={filters[config.name].includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <Box sx={{mt: 2}}>
        <Button
          variant="text"
          onClick={handleClearAll}
          startIcon={<ClearAllIcon />}
          disabled={isClearAllDisabled}
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBar;
