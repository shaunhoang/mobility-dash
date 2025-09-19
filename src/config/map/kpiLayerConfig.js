export const layerConfig = {
  A02: {
    id: "data-layer",
    type: "fill",
    file: "kpiData",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "pct_accessible"],
        25,
        "#deebf7",
        50,
        "#6baed6",
        75,
        "#08519c",
      ],
      "fill-opacity": 0.8,
      "fill-outline-color": "#333333",
    },
    tooltipProperties: [
      { label: "Ward: ", property: "ward_id" },
      { label: "Assembly: ", property: "assembly" },
      { label: "Population: ", property: "pop"},
      {
        label: "Pop% within 500m of transit: ",
        property: "pct_accessible",
        suffix: "%",
      },
    ],
  },
};
