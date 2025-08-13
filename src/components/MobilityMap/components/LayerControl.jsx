import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { layerConfig } from "./mapComponents/layerConfig";

const LayerControl = ({ onLayerToggle }) => {
  // Default layers to be checked initially
  const defaultLayers = useMemo(() => {
    const defaults = [];
    layerConfig.forEach((themeGroup) => {
      themeGroup.layers.forEach((layer) => {
        if (layer.children) {
          layer.children.forEach((child) => {
            if (child.defaultChecked) {
              defaults.push(child);
            }
          });
        } else if (layer.defaultChecked) {
          defaults.push(layer);
        }
      });
    });
    return defaults;
  }, []);

  const [checkedState, setCheckedState] = useState(() =>
    defaultLayers.reduce((acc, layer) => {
      acc[layer.id] = true;
      return acc;
    }, {})
  );

  useEffect(() => {
    // On initial load, toggle the default layers to be visible.
    defaultLayers.forEach((layer) => {
      onLayerToggle(layer, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChildChange = (layer, isChecked) => {
    setCheckedState((prev) => ({ ...prev, [layer.id]: isChecked }));
    onLayerToggle(layer, isChecked);
  };

  const handleParentChange = (parentLayer, isChecked) => {
    const childUpdates = {};
    parentLayer.children.forEach((child) => {
      childUpdates[child.id] = isChecked;
      // Toggle all child layers on the map
      onLayerToggle(child, isChecked);
    });
    setCheckedState((prev) => ({ ...prev, ...childUpdates }));
  };

  return (
    <Box>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Choose a layer
      </Typography>

      {layerConfig.map((themeGroup) => (
        <Box key={themeGroup.theme} sx={{ mb: 2, mt: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            {themeGroup.theme}
          </Typography>
          <FormGroup>
            {themeGroup.layers.map((layer) => {
              // This is a parent layer with children. It gets one checkbox.
              if (layer.children) {
                const childIds = layer.children.map((c) => c.id);
                const checkedChildrenCount = childIds.filter(
                  (id) => checkedState[id]
                ).length;
                const isIndeterminate =
                  checkedChildrenCount > 0 &&
                  checkedChildrenCount < childIds.length;
                const areAllChecked = checkedChildrenCount === childIds.length;

                return (
                  <FormControlLabel
                    key={layer.id}
                    label={layer.name}
                    sx={{ my: -0.25 }}
                    control={
                      <Checkbox
                        checked={areAllChecked}
                        indeterminate={isIndeterminate}
                        onChange={(e) =>
                          handleParentChange(layer, e.target.checked)
                        }
                      />
                    }
                  />
                );
              }
              // This is a standalone layer with no children.
              return (
                <FormControlLabel
                  key={layer.id}
                  label={layer.name}
                  sx={{ my: -0.25 }}
                  control={
                    <Checkbox
                      checked={!!checkedState[layer.id]}
                      onChange={(e) =>
                        handleChildChange(layer, e.target.checked)
                      }
                    />
                  }
                />
              );
            })}
          </FormGroup>
        </Box>
      ))}
    </Box>
  );
};

export default LayerControl;