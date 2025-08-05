import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Checkbox,
  ListItemText,
} from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const FilterBar = ({ filters, onFilterChange, filterOptions }) => {
  const { format, resolution, theme, latestYear } = filters;
  const { fileFormats, resolutions, themes, latestYears } = filterOptions;

  // Handler for filter changes
  const handleDelete = (filterName, valueToDelete) => () => {
    onFilterChange({
      ...filters,
      [filterName]: filters[filterName].filter(
        (value) => value !== valueToDelete
      ),
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({
      ...filters,
      [name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleClearAll = () => {
    onFilterChange({
      format: [],
      resolution: [],
      theme: [],
      latestYear: [],
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "nowrap" }}>
        <FormControl fullWidth size="small">
          <InputLabel id="format-select-label">Format</InputLabel>
          <Select
            labelId="format-select-label"
            id="format-select"
            name="format"
            value={format}
            label="Format"
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    onDelete={handleDelete("format", value)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {fileFormats.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={format.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
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
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    onDelete={handleDelete("resolution", value)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {resolutions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={resolution.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
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
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    onDelete={handleDelete("theme", value)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {themes.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={theme.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="latestYear-select-label">Last Updated</InputLabel>
          <Select
            labelId="latestYear-select-label"
            id="latestYear-select"
            name="latestYear"
            value={latestYear}
            label="Last Updated"
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    onDelete={handleDelete("latestYear", value)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {latestYears.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={latestYear.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button
          variant="text"
          onClick={handleClearAll}
          startIcon={<ClearAllIcon />}
          disabled={
            filters.format.length === 0 &&
            filters.resolution.length === 0 &&
            filters.theme.length === 0 &&
            filters.latestYear.length === 0
          }
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBar;
