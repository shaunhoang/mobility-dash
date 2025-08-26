// LayerControl.jsx
import { ExpandLess, ExpandMore, InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { layerConfig } from "../../../config/map/mainLayerConfig";
import { useLayerControl } from "./mapHooks/useLayerControl";

// --- Row component ---
const Row = ({
  node,
  computeNodeState,
  toggleNode,
  openGroups,
  onToggleGroup,
  hideChildrenForParents = true,
}) => {
  const { checked, indeterminate } = computeNodeState(node);
  const isGroup = !!node.isGroup;
  const hasChildren = !!node.children?.length;

  const control = (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={(e) => toggleNode(node, e.target.checked)}
    />
  );

  const label = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
      <Typography variant="body2" noWrap title={node.name}>
        {node.name}
      </Typography>
      {node.infobox && (
        <Tooltip title={node.infobox} arrow>
          <InfoOutlined sx={{ fontSize: "1rem", color: "text.secondary" }} />
        </Tooltip>
      )}
      {isGroup && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleGroup(node.id);
          }}
        >
          {openGroups[node.id] ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      )}
    </Box>
  );

  return (
    <>
      <FormControlLabel
        sx={{ width: "100%", my: -0.8 }}
        control={control}
        label={label}
      />

      {/* Render logic:
          - Groups: show sub-parents only within Collapse
          - Parents (non-group) with children: hide children
          - Leaves: Do not render
      */}
      {hasChildren &&
        (isGroup ? (
          <Collapse in={!!openGroups[node.id]} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 4 }}>
              {node.children.map((child) => (
                <Row
                  key={child.id}
                  node={child}
                  computeNodeState={computeNodeState}
                  toggleNode={toggleNode}
                  openGroups={openGroups}
                  onToggleGroup={onToggleGroup}
                  hideChildrenForParents={true}
                />
              ))}
            </Box>
          </Collapse>
        ) : hideChildrenForParents ? null : (
          <Box sx={{ pl: 4 }}>
            {node.children.map((child) => (
              <Row
                key={child.id}
                node={child}
                computeNodeState={computeNodeState}
                toggleNode={toggleNode}
                openGroups={openGroups}
                onToggleGroup={onToggleGroup}
                hideChildrenForParents={hideChildrenForParents}
              />
            ))}
          </Box>
        ))}
    </>
  );
};

// --- MAIN LayerControl component ---
const LayerControl = ({ onLayerToggle }) => {
  const {
    checkedState,
    openGroups,
    dropdownSelection,
    toggleNode,
    computeNodeState,
    handleGroupToggle,
    handleDropdownChange,
  } = useLayerControl(onLayerToggle);
  const checkedCount = Object.values(checkedState).filter(Boolean).length;

  return (
    <Box>
      {/* <Typography variant="caption" sx={{ mb: 1 }}>
        Checked layers: {checkedCount}
      </Typography> */}
      {layerConfig.map((theme) => (
        <Box key={theme.theme} sx={{ mb: 1.5 }}>
          {theme.theme && (
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "secondary.main", mb: 1 }}
            >
              {theme.theme}
            </Typography>
          )}
          {/* If type === dropdown */}
          {theme.controlType === "dropdown" ? (
            <FormControl fullWidth size="small" sx={{ mt: 1.5}}>
              <InputLabel>Select a layer</InputLabel>
              <Select
                label="Select a layer"
                value={dropdownSelection[theme.theme] || "none"}
                onChange={(e) => handleDropdownChange(e, theme)}
                sx={{ "& .MuiSelect-select": { py: 0.75 } }}
              >
                <MenuItem value="none">
                  <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                    None
                  </Typography>
                </MenuItem>
                {theme.layers.map((parent) => (
                  <MenuItem key={parent.id} value={parent.id}>
                    <Typography variant="caption">{parent.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
              {(() => {
                const selectedParent = theme.layers.find(
                  (l) => l.id === dropdownSelection[theme.theme]
                );
                return selectedParent?.infobox ? (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block", px: "8px", lineHeight: 1.1 }}
                  >
                    {selectedParent.infobox}
                  </Typography>
                ) : null;
              })()}
            </FormControl>
          ) : (
            // Else, render as checkbox list
            <FormGroup>
              {theme.layers
                .filter((node) => node.showInControl !== false)
                .map((node) => (
                  <Row
                    key={node.id}
                    node={node}
                    computeNodeState={computeNodeState}
                    toggleNode={toggleNode}
                    openGroups={openGroups}
                    onToggleGroup={handleGroupToggle}
                    hideChildrenForParents={true}
                  />
                ))}
            </FormGroup>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default LayerControl;
