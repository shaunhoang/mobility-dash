import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { layerConfig } from "./layerConfig";

const LayerControl = ({ onLayerToggle }) => {
  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        THEME
      </Typography>
      {layerConfig.map((themeGroup) => (
        <Box key={themeGroup.theme} mb={2}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            {themeGroup.theme}
          </Typography>
          <FormGroup>
            {themeGroup.layers.map((layer) => (
              <FormControlLabel
                key={layer.id}
                control={
                  <Checkbox
                    onChange={(e) => onLayerToggle(layer, e.target.checked)}
                  />
                }
                label={layer.name}
              />
            ))}
          </FormGroup>
        </Box>
      ))}
    </Box>
  );
};

export default LayerControl;
