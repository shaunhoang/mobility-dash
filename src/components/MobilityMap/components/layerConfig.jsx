export const layerConfig = [
  {
    theme: "Administrative",
    layers: [
      {
        id: "jaipur-municipality",
        name: "Municipal Boundary",
        file: "data/mapMain/jaipur_muni_bounds.geojson",
        color: "#d12525",
        type: "line",
        defaultChecked: true,
      },
      {
        id: "jaipur_wards",
        name: "Municipal Wards",
        file: "data/mapMain/jaipur_wards.geojson",
        type: "fill",
        color: "#00ff26",
        defaultChecked: true,
      },
      {
        id: "jaipur_tehsils",
        name: "Tehsils",
        file: "data/mapMain/jaipur_tehsil_adm3.geojson",
        type: "fill",
        color: "#0fffff",
        tooltipPrefix: "District: ",
        tooltipProperty: "adm3_name",
      },
      {
        id: "jaipur_rural_towns",
        name: "Rural Towns",
        file: "data/mapMain/jaipur_town_adm5.geojson",
        type: "fill",
        color: "#ff0000",
        tooltipPrefix: "Town: ",
        tooltipProperty: "adm5_name",
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
          },
          {
            id: "rail-stations",
            name: "Stations",
            file: "data/mapMain/train_stations.geojson",
            color: "#ffffff",
            type: "circle",
            tooltipPrefix: "Station: ",
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
            type: "line"
          },
          {
            id: "metro-stations",
            name: "Stations",
            file: "data/mapMain/metro_stations.geojson",
            color: "#000000",
            type: "circle",
            tooltipPrefix: "Station: ",
            tooltipProperty: "name",
          },
        ],
      },
    ],
  },
];
