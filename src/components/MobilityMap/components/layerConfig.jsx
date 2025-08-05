export const layerConfig = [
  {
    theme: "Administrative",
    layers: [
      {
        id: "jaipur-boundary",
        name: "Boundary",
        file: "data/mapMain/jaipur_boundary.geojson",
        color: "#292263",
        type: "fill"
      },
      {
        id: "districts",
        name: "Districts",
        file: "data/mapMain/jaipur_districts.geojson",
        // color: "#6A8D92", // Color by district in data
        type: "fill",
        tooltipPrefix: "District: ",
        tooltipProperty: "NAME_3" 
      },
    ],
  },
  {
    theme: "Public Transport",
    layers: [
      {
        id: "bus-routes",
        name: "Bus Routes",
        file: "data/mapMain/bus_routes.geojson",
        // color: "#6A8D92", // Color by route in data
        type: "line",
        tooltipPrefix: "Route: ",
        tooltipProperty: "route"
      },
      {
        id: "bus-stations",
        name: "Bus Stops",
        file: "data/mapMain/bus_stops.geojson",
        color: "#274bef",
        type: "circle",
        tooltipPrefix: "Name: ",
        tooltipProperty: "name" 
      },
    ],
  },
];
