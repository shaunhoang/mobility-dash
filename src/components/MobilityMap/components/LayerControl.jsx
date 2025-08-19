import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { layerConfig } from "./mapContents/layerConfig";
import { useLayerControl } from "./mapHooks/useLayerControl";

const ParentLayerControl = ({ layer, checkedState, onParentChange }) => {
  const childIds = layer.children.map((c) => c.id);
  const checkedCount = childIds.filter((id) => checkedState[id]).length;
  const isIndeterminate = checkedCount > 0 && checkedCount < childIds.length;
  const isChecked = checkedCount === childIds.length;

  return (
    <FormControlLabel
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
          checked={isChecked}
          indeterminate={isIndeterminate}
          onChange={(e) => onParentChange(layer, e.target.checked)}
        />
      }
    />
  );
};

const GroupLayerControl = ({
  layer,
  checkedState,
  openGroups,
  onGroupChange,
  onGroupToggle,
  onParentChange,
}) => {
  const allChildIds = layer.children.flatMap(
    (c) => c.children?.map((sc) => sc.id) || []
  );
  const checkedCount = allChildIds.filter((id) => checkedState[id]).length;
  const isIndeterminate = checkedCount > 0 && checkedCount < allChildIds.length;
  const isChecked = checkedCount > 0 && checkedCount === allChildIds.length;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            indeterminate={isIndeterminate}
            onChange={(e) => onGroupChange(layer, e.target.checked)}
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
            <Typography variant="body2">{layer.name}</Typography>
            <Box
              component="span"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onGroupToggle(layer.id);
              }}
              sx={{ display: "inline-flex", p: 0.5 }}
            >
              {openGroups[layer.id] ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </Box>
        }
        sx={{ width: "100%", my: -0.5, mr: 0 }}
      />
      <Collapse in={openGroups[layer.id]} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 4 }}>
          {layer.children.map((subLayer) => (
            <ParentLayerControl
              key={subLayer.id}
              layer={subLayer}
              checkedState={checkedState}
              onParentChange={onParentChange}
            />
          ))}
        </Box>
      </Collapse>
    </>
  );
};

const DropdownGroup = ({ theme, selection, onChange }) => {
  const selectedLayer = theme.layers.find((l) => l.id === selection);
  return (
    <>
      <FormControl fullWidth size="small" sx={{ mt: 1 }}>
        <InputLabel>Select layer</InputLabel>
        <Select
          value={selection}
          label="Select layer"
          onChange={(e) => onChange(e, theme)}
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          {theme.layers.map((layer) => (
            <MenuItem key={layer.id} value={layer.id}>
              {layer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedLayer?.infobox && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block", px: "12px" }}
        >
          {selectedLayer.infobox}
        </Typography>
      )}
    </>
  );
};

// --- Main Component ---
const LayerControl = ({ onLayerToggle }) => {
  const {
    checkedState,
    openGroups,
    dropdownSelection,
    handleParentChange,
    handleGroupChange,
    handleGroupToggle,
    handleDropdownChange,
  } = useLayerControl(onLayerToggle);

  return (
    <Box>
      <Typography variant="caption" sx={{ color: "text.secondary", px: 1 }}>
        Map Layers
      </Typography>
      {layerConfig.map((theme) => (
        <Box key={theme.theme} sx={{ mb: 2, mt: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "secondary.main", px: 1 }}
          >
            {theme.theme}
          </Typography>
          {theme.controlType === "dropdown" ? (
            <DropdownGroup
              theme={theme}
              selection={dropdownSelection[theme.theme] || "none"}
              onChange={handleDropdownChange}
            />
          ) : (
            <FormGroup>
              {theme.layers
                .filter((layer) => layer.showInControl !== false)
                .map((layer) => {
                  if (layer.isGroup) {
                    return (
                      <GroupLayerControl
                        key={layer.id}
                        layer={layer}
                        checkedState={checkedState}
                        openGroups={openGroups}
                        onGroupChange={handleGroupChange}
                        onGroupToggle={handleGroupToggle}
                        onParentChange={handleParentChange}
                      />
                    );
                  }
                  if (layer.children) {
                    return (
                      <ParentLayerControl
                        key={layer.id}
                        layer={layer}
                        checkedState={checkedState}
                        onParentChange={handleParentChange}
                      />
                    );
                  }
                  return null;
                })}
            </FormGroup>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default LayerControl;
