export const layerConfig = [
  {
    theme: "",
    layers: [
      {
        id: "jaipur-district",
        name: "Jaipur District",
        file: "data/mapMain/jaipur_district_bound.geojson",
        defaultChecked: true,
        type: "line",
        paint: { "line-color": "#000000", "line-width": 2 },
      },
      {
        id: "jaipur-municipality",
        name: "Jaipur Mun. Corp.",
        file: "data/mapMain/jaipur_muni_bound.geojson",
        defaultChecked: true,
        type: "line",
        paint: { "line-color": "#833434", "line-dasharray": [1, 1] },
      },
    ],
  },
  {
    theme: "Subdivisions",
    layers: [
      {
        id: "jaipur_wards",
        name: "Municipal",
        file: "data/mapMain/jaipur_wards.geojson",
        defaultChecked: false,
        tooltipProperties: [
          { label: "Ward#", property: "ward_no" },
          { label: "Area#", property: "area_no" },
          { label: "Name", property: "name" },
          { label: "Population", property: "population", prefix: "" },
          { label: "Density", property: "density", suffix: " /sq.km" },
        ],
        type: "fill",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "population"],
            10000,
            "#ffffcc",
            12500,
            "#b54b00",
            15000,
            "#ad0104",
          ],
          "fill-opacity": 0.2,
        },
      },
      {
        id: "jaipur_rural_towns",
        name: "Rural",
        file: "data/mapMain/jaipur_town_adm5.geojson",
        defaultChecked: false,
        tooltipProperties: [{ label: "Town", property: "adm5_name" }],
        type: "fill",
        paint: { "fill-color": "#ff0000" },
      },
    ],
  },

  {
    theme: "Public Transport",
    layers: [
      {
        id: "parent-bus",
        name: "Bus",
        children: [
          {
            id: "bus-routes",
            name: "Routes",
            file: "data/mapMain/bus_routes.geojson",
            defaultChecked: false,
            tooltipProperties: [{ label: "Route", property: "route" }],
            type: "line",
            paint: {
              "line-color": ["coalesce", ["get", "color"], "#0000ff"],
              "line-width": [
                "case",
                ["boolean", ["feature-state", "selected"], false],
                10,
                4,
              ],
              "line-opacity": [
                "case",
                ["boolean", ["feature-state", "selected"], false],
                1,
                0.75,
              ],
            },
          },
          {
            id: "bus-stops",
            name: "Stops",
            file: "data/mapMain/bus_stops.geojson",
            defaultChecked: false,
            tooltipProperties: [{ label: "Stop", property: "name" }],
            type: "circle",
            paint: {
              "circle-color": "#000000",
              "circle-stroke-color": "#ffffff",
              "circle-radius": 3,
            },
          },
        ],
      },
      {
        id: "parent-metro",
        name: "Metro",
        children: [
          {
            id: "metro-routes",
            name: "Routes",
            file: "data/mapMain/metro_routes.geojson",
            defaultChecked: false,
            tooltipProperties: [{ label: "Line", property: "name" }],
            type: "line",
            paint: {
              "line-color": ["coalesce", ["get", "color"], "#dd6666"],
              "line-width": 2,
              "line-gap-width": 2,
            },
          },
          {
            id: "metro-stations",
            name: "Stations",
            file: "data/mapMain/metro_stations.geojson",
            defaultChecked: false,
            tooltipProperties: [{ label: "Station", property: "name" }],
            type: "symbol",
            icon: {
              id: "metro-icon",
              url: "assets/metro-icon.png",
            },
            layout: {
              "icon-image": "metro-icon",
              "icon-size": 0.05,
              "icon-allow-overlap": true,
            },
            paint: {},
          },
        ],
      },
      {
        id: "parent-metro-uc",
        name: "Metro (proposed)",
        children: [
          {
            id: "metro-routes-uc",
            name: "Routes",
            file: "data/mapMain/metro_routes_uc.geojson",
            defaultChecked: false,
            tooltipProperties: [{ label: "Line (proposed)", property: "name" }],
            type: "line",
            paint: {
              "line-color": ["coalesce", ["get", "color"], "#dd6666"],
              "line-width": 2,
              "line-gap-width": 2,
              "line-dasharray": [2, 2],
            },
          },
          // {
          //   id: "metro-stations",
          //   name: "Stations",
          //   file: "data/mapMain/metro_stations.geojson",
          //   defaultChecked: false,
          //   tooltipProperty: "name",
          //   type: "symbol",
          //   icon: {
          //     id: "metro-icon",
          //     url: "assets/metro-icon.png",
          //   },
          //   layout: {
          //     "icon-image": "metro-icon",
          //     "icon-size": 0.05,
          //     "icon-allow-overlap": true,
          //   },
          //   paint: {},
          // },
        ],
      },
      {
        id: "parent-rail",
        name: "Railway",
        children: [
          {
            id: "rail-routes",
            name: "Routes",
            file: "data/mapMain/train_routes.geojson",
            defaultChecked: false,
            type: "line",
            paint: {
              "line-color": ["coalesce", ["get", "color"], "#000000"],
              "line-width": 5,
            },
          },
          {
            id: "rail-stations",
            name: "Stations",
            file: "data/mapMain/train_stations.geojson",
            defaultChecked: false,
            tooltipProperties: [{ label: "Station", property: "name" }],
            type: "symbol",
            icon: {
              id: "railway-icon",
              url: "assets/railway-icon.png",
            },
            layout: {
              "icon-image": "railway-icon",
              "icon-size": 0.05,
              "icon-allow-overlap": true,
            },
            paint: {},
          },
        ],
      },
    ],
  },
];

export const getLayerLayoutStyle = (layer) => {
  return layer.layout || {};
};
export const getLayerPaintStyle = (layer) => {
  const defaultColor = ["coalesce", ["get", "color"], "#808080"];
  const defaultStrokeColor = "#000000";
  const defaultStrokeWidth = 2;
  const defaultOpacity = 1;

  switch (layer.type) {
    case "fill":
      return {
        "fill-color": defaultColor,
        "fill-opacity": 0.3,
        "fill-outline-color": defaultStrokeColor,
        ...layer.paint,
      };
    case "symbol":
      return { ...layer.paint };
    case "circle":
      return {
        "circle-color": defaultColor,
        "circle-radius": 5,
        "circle-opacity": defaultOpacity,
        "circle-stroke-color": defaultStrokeColor,
        "circle-stroke-width": 1,
        ...layer.paint,
      };
    case "line":
    default:
      return {
        "line-color": defaultColor,
        "line-width": defaultStrokeWidth,
        "line-opacity": defaultOpacity,
        ...layer.paint,
      };
  }
};

export const flattenLayers = (config) => {
  let allLayers = [];
  config.forEach((theme) => {
    theme.layers.forEach((layer) => {
      if (layer.children) {
        allLayers = allLayers.concat(layer.children);
      } else {
        allLayers.push(layer);
      }
    });
  });
  return allLayers;
};
