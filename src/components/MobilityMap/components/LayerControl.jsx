import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Tooltip,
  Typography
} from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import { layerConfig } from "./mapComponents/layerConfig";

const LayerControl = ({ onLayerToggle }) => {
  const defaultLayers = useMemo(() => {
    const defaults = [];
    layerConfig.forEach((themeGroup) => {
      themeGroup.layers.forEach((layer) => {
        if (layer.children) {
          const children = layer.isGroup
            ? layer.children.flatMap((c) => c.children || [])
            : layer.children;
          children.forEach((child) => {
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

  const [openGroups, setOpenGroups] = useState(() =>
    layerConfig.reduce((acc, themeGroup) => {
      themeGroup.layers.forEach((layer) => {
        if (layer.isGroup) {
          acc[layer.id] = true;
        }
      });
      return acc;
    }, {})
  );

  useEffect(() => {
    defaultLayers.forEach((layer) => {
      onLayerToggle(layer, true);
    });
  }, []);

  const handleChildChange = (layer, isChecked) => {
    setCheckedState((prev) => ({ ...prev, [layer.id]: isChecked }));
    onLayerToggle(layer, isChecked);
  };

  const handleParentChange = (parentLayer, isChecked) => {
    const childUpdates = {};
    parentLayer.children.forEach((child) => {
      childUpdates[child.id] = isChecked;
      onLayerToggle(child, isChecked);
    });
    setCheckedState((prev) => ({ ...prev, ...childUpdates }));
  };

  const handleGroupChange = (groupLayer, isChecked) => {
    const childUpdates = {};
    groupLayer.children.forEach((subParent) => {
      subParent.children.forEach((child) => {
        childUpdates[child.id] = isChecked;
        onLayerToggle(child, isChecked);
      });
    });
    setCheckedState((prev) => ({ ...prev, ...childUpdates }));
  };

  const handleGroupToggle = (groupId) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const ParentLayerControl = ({ layer }) => {
    const childIds = layer.children.map((c) => c.id);
    const checkedChildrenCount = childIds.filter(
      (id) => checkedState[id]
    ).length;
    const isIndeterminate =
      checkedChildrenCount > 0 && checkedChildrenCount < childIds.length;
    const areAllChecked = checkedChildrenCount === childIds.length;

    return (
      <FormControlLabel
        key={layer.id}
        label={
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="body2">{layer.name}</Typography>
            {layer.infobox && (
              <Tooltip title={layer.infobox} arrow>
                <InfoOutlinedIcon
                  sx={{ fontSize: "1rem", color: "text.secondary" }}
                />
              </Tooltip>
            )}
          </Box>
        }
        sx={{ my: -0.5 }}
        control={
          <Checkbox
            checked={areAllChecked}
            indeterminate={isIndeterminate}
            onChange={(e) => handleParentChange(layer, e.target.checked)}
          />
        }
      />
    );
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
            {themeGroup.layers
              .filter((layer) => layer.showInControl !== false)
              .map((layer) => {
                if (layer.isGroup) {
                  const allChildIds = layer.children.flatMap((c) =>
                    c.children.map((sc) => sc.id)
                  );
                  const checkedCount = allChildIds.filter(
                    (id) => checkedState[id]
                  ).length;
                  const isGroupIndeterminate =
                    checkedCount > 0 && checkedCount < allChildIds.length;
                  const isGroupAllChecked =
                    checkedCount > 0 && checkedCount === allChildIds.length;

                  return (
                    <Fragment key={layer.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isGroupAllChecked}
                            indeterminate={isGroupIndeterminate}
                            onChange={(e) =>
                              handleGroupChange(layer, e.target.checked)
                            }
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography variant="body2">
                              {layer.name}
                            </Typography>
                            {layer.infobox && (
                              <Tooltip title={layer.infobox} arrow>
                                <InfoOutlinedIcon
                                  sx={{
                                    fontSize: "1rem",
                                    color: "text.secondary",
                                  }}
                                />
                              </Tooltip>
                            )}
                            <Box
                              component="span"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleGroupToggle(layer.id);
                              }}
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                p: 0.5,
                                borderRadius: "50%",
                              }}
                            >
                              {openGroups[layer.id] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </Box>
                          </Box>
                        }
                        sx={{
                          width: "100%",
                          my: -0.5,
                          mr: 0,
                          "& .MuiFormControlLabel-label": { width: "100%" },
                        }}
                      />
                      <Collapse
                        in={openGroups[layer.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ pl: 4 }}>
                          {layer.children.map((subLayer) => (
                            <ParentLayerControl
                              key={subLayer.id}
                              layer={subLayer}
                            />
                          ))}
                        </Box>
                      </Collapse>
                    </Fragment>
                  );
                }

                return <ParentLayerControl key={layer.id} layer={layer} />;
              })}
          </FormGroup>
        </Box>
      ))}
    </Box>
  );
};

export default LayerControl;
