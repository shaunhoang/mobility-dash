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
  MenuItem,
  Select,
  Tooltip,
  Typography,
  InputLabel,
  Input,
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
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
      sx={{ my: -0.75 }} // Reduce vertical spacing near the checkbox
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
              sx={{ display: "flex", alignItems: "center", pl: 1 }}
            >
              {openGroups[layer.id] ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </Box>
        }
        sx={{ width: "100%", my: -0.75 }} // Reduce vertical spacing near the checkbox
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
      <FormControl fullWidth size="small" sx={{ mt: 2 }}>
        <InputLabel>
          Socioeconomic Context
        </InputLabel>
        <Select
          value={selection}
          onChange={(e) => onChange(e, theme)}
          label="Socioeconomic Context"
          sx={{
            "& .MuiSelect-select": {
              py: 0.75,
            },
          }}
        >
          <MenuItem value="none" dense>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              None
            </Typography>
          </MenuItem>
          {theme.layers.map((layer) => (
            <MenuItem key={layer.id} value={layer.id} dense>
              <Typography variant="caption">{layer.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedLayer?.infobox && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1.5, display: "block", px: "8px", lineHeight: 1.2 }}
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
      {layerConfig.map((theme) => (
        <Box key={theme.theme} sx={{ mb: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "secondary.main" }}
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
