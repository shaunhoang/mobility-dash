import { useEffect, useMemo, useState } from "react";
import { layerConfig } from "../mapContents/layerConfig";

const findLayerById = (id) => {
  for (const theme of layerConfig) {
    for (const layer of theme.layers) {
      if (layer.id === id) return layer;
      if (layer.children) {
        if (layer.isGroup) {
          for (const subParent of layer.children) {
            const found = subParent.children?.find((c) => c.id === id);
            if (found) return found;
          }
        } else {
          const found = layer.children.find((c) => c.id === id);
          if (found) return found;
        }
      }
    }
  }
  return null;
};

export const useLayerControl = (onLayerToggle) => {
  const { initialCheckedState, initialDropdownState, initialOpenGroups } =
    useMemo(() => {
      const checked = {};
      const dropdowns = {};
      const open = {};

      const processLayer = (layer) => {
        // Check the layer itself for defaultChecked status.
        if (layer.defaultChecked) {
          checked[layer.id] = true;
        }
        // If the layer is a group, set it to be open by default.
        if (layer.isGroup) {
          open[layer.id] = true;
        }
        // If the layer has children, process them recursively.
        if (layer.children) {
          layer.children.forEach(processLayer);
        }
      };

      layerConfig.forEach((theme) => {
        if (theme.controlType === "dropdown") {
          dropdowns[theme.theme] = "none";
        }
        theme.layers.forEach(processLayer);
      });

      return {
        initialCheckedState: checked,
        initialDropdownState: dropdowns,
        initialOpenGroups: open,
      };
    }, []);

  const [checkedState, setCheckedState] = useState(initialCheckedState);
  const [openGroups, setOpenGroups] = useState(initialOpenGroups);
  const [dropdownSelection, setDropdownSelection] =
    useState(initialDropdownState);

  useEffect(() => {
    Object.keys(initialCheckedState).forEach((layerId) => {
      const layer = findLayerById(layerId);
      if (layer) onLayerToggle(layer, true);
    });
  }, [initialCheckedState]);

  const handleParentChange = (parentLayer, isChecked) => {
    const childUpdates = {};
    parentLayer.children.forEach((child) => {
      childUpdates[child.id] = isChecked;
      onLayerToggle(child, isChecked);
    });
    setCheckedState((prev) => ({ ...prev, ...childUpdates }));
  };

  const handleDropdownChange = (event, theme) => {
    const newSelectedParentId = event.target.value;
    const currentSelection = dropdownSelection[theme.theme];

    if (currentSelection !== "none") {
      const prevParentLayer = theme.layers.find(
        (l) => l.id === currentSelection
      );
      if (prevParentLayer) handleParentChange(prevParentLayer, false);
    }

    setDropdownSelection((prev) => ({
      ...prev,
      [theme.theme]: newSelectedParentId,
    }));

    if (newSelectedParentId !== "none") {
      const newParentLayer = theme.layers.find(
        (l) => l.id === newSelectedParentId
      );
      if (newParentLayer) handleParentChange(newParentLayer, true);
    }
  };

  return {
    checkedState,
    openGroups,
    dropdownSelection,
    handleParentChange,
    handleDropdownChange,
  };
};
