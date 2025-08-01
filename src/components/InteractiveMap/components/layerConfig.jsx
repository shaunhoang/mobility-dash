export const layerConfig = [
  {
    theme: "Administrative",
    layers: [
      {
        id: "city-boundary",
        name: "City Boundary",
        file: "geojson/placeholder1.geojson",
        color: "#D4A25F",
        type: "line",
      },
      {
        id: "districts",
        name: "Districts",
        file: "geojson/placeholder2.geojson",
        type: "fill",
      },
    ],
  },
  {
    theme: "Public Transport",
    layers: [
      {
        id: "bus-routes",
        name: "Bus Routes",
        file: "geojson/placeholder3.geojson",
        color: "#6A8D92",
        type: "line",
      },
      {
        id: "metro-stations",
        name: "Metro Stations",
        file: "geojson/placeholder4.geojson",
        color: "#9CAF88",
        type: "circle",
      },
    ],
  },
];
