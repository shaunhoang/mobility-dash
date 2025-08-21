export const layerConfig = {

  "A02": {
    id: "data-layer",
    type: "fill",
    file: "kpiData", 
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "kpi_value"],
        100, "#feebe2",
        300, "#f768a1",
        500, "#7a0177",
      ],
      "fill-opacity": 0.8,
      "fill-outline-color": "#333333",
    },
    tooltipProperties: [
      {
        label: "Density: ",
        property: "kpi_value",
        suffix: " /ha"
      },
    ],
  },
  
};