export const layerConfig = [
  {
    theme: "Administrative",
    layers: [
      {
        id: "jaipur-boundary",
        name: "Boundary",
        file: "data/mapMain/jaipur_boundary.geojson",
        color: "#292263",
        type: "line",
      },
      {
        id: "districts",
        name: "Districts",
        file: "data/mapMain/jaipur_districts.geojson",
        type: "fill",
        tooltipPrefix: "District: ",
        tooltipProperty: "NAME_3",
      },
    ],
  },
  {
    theme: "Public Transport",
    layers: [
      // --- Bus Parent Layer ---
      {
        id: "parent-bus",
        name: "Bus",
        children: [
          {
            id: "bus-routes",
            name: "Routes",
            file: "data/mapMain/bus_routes.geojson",
            type: "line",
            tooltipPrefix: "Route: ",
            tooltipProperty: "route",
          },
          {
            id: "bus-stops",
            name: "Stops",
            file: "data/mapMain/bus_stops.geojson",
            color: "#7e92ed",
            type: "circle",
            tooltipPrefix: "",
            tooltipProperty: "name",
          },
        ],
      },
      // --- Rail Parent Layer ---
      {
        id: "parent-rail",
        name: "Rail",
        children: [
          {
            id: "rail-routes",
            name: "Routes",
            file: "data/mapMain/train_routes.geojson",
            type: "line",
            tooltipPrefix: "Route: ",
            tooltipProperty: "route",
          },
          {
            id: "rail-stations",
            name: "Stations",
            file: "data/mapMain/train_stations.geojson",
            color: "#ffffff",
            type: "circle",
            tooltipPrefix: "RS: ",
            tooltipProperty: "name",
          },
        ],
      },
      // --- Metro Parent Layer ---
      {
        id: "parent-metro",
        name: "Metro",
        children: [
          {
            id: "metro-routes",
            name: "Routes",
            file: "data/mapMain/metro_routes.geojson",
            type: "line",
            tooltipPrefix: "Route: ",
            tooltipProperty: "route",
          },
          {
            id: "metro-stations",
            name: "Stations",
            file: "data/mapMain/metro_stations.geojson",
            color: "#000000",
            type: "circle",
            tooltipPrefix: "Metro: ",
            tooltipProperty: "name",
          },
        ],
      },
    ],
  },
];