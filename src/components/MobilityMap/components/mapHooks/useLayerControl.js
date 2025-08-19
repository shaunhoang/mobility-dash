import { useEffect, useMemo, useState } from "react";
import { layerConfig } from "../mapContents/layerConfig";

// Helper function to find a layer by ID
const findLayerById = (id) => {
  for (const theme of layerConfig) {
    for (const layer of theme.layers) {
      if (layer.id === id) return layer;
      const children = layer.isGroup
        ? layer.children.flatMap((c) => c.children || [c])
        : layer.children;
      const found = children?.find((c) => c.id === id);
      if (found) return found;
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
      layerConfig.forEach((theme) => {
        if (theme.controlType === "dropdown") {
          dropdowns[theme.theme] = "none";
        }
        theme.layers.forEach((layer) => {
          if (layer.isGroup) open[layer.id] = true;
          const children = layer.isGroup
            ? layer.children.flatMap((c) => c.children || [])
            : layer.children || [];
          children.forEach((child) => {
            if (child.defaultChecked) {
              checked[child.id] = true;
            }
          });
        });
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

  const handleGroupChange = (groupLayer, isChecked) => {
    const childUpdates = {};
    groupLayer.children.forEach((subParent) => {
      if (subParent.children) {
        subParent.children.forEach((child) => {
          childUpdates[child.id] = isChecked;
          onLayerToggle(child, isChecked);
        });
      }
    });
    setCheckedState((prev) => ({ ...prev, ...childUpdates }));
  };

  const handleGroupToggle = (groupId) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
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
    handleGroupChange,
    handleGroupToggle,
    handleDropdownChange,
  };
};
