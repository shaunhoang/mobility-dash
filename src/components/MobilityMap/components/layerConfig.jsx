export const layerConfig = [
  {
    theme: "Administrative",
    layers: [
      {
        id: "jaipur-district",
        name: "Jaipur",
        file: "data/mapMain/jaipur_district_adm2.geojson",
        color: "#292263",
        type: "line",
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
      {
        id: "jaipur_wards",
        name: "Municipal Wards",
        file: "data/mapMain/jaipur_wards.geojson",
        type: "fill",
        color: "#00ff26",
        defaultChecked: true,
      }
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
            tooltipProperty: "operator",
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
