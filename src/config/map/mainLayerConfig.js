import { getGeoJsonPath } from "../path/mapLayerPathConfig";
import metroIconUrl from '../../assets/metro-icon.png';
import railwayIconUrl from '../../assets/railway-icon.png'; 

export const layerConfig = [
  {
    // --- base, not shown ---
    theme: "",
    layers: [
      {
        id: "jaipur-district",
        name: "Jaipur District",
        file: getGeoJsonPath("JAIPUR_DISTRICT_BOUND"),
        defaultChecked: true,
        showInControl: false,
        type: "line",
        paint: {
          "line-color": "#000000",
          "line-width": 2,
          "line-opacity": 0.5,
        },
      },
      {
        id: "jaipur-district-casing",
        name: "Jaipur District Casing",
        file: getGeoJsonPath("JAIPUR_DISTRICT_BOUND"),
        defaultChecked: true,
        showInControl: false,
        type: "line",
        paint: {
          "line-color": "#ffffff",
          "line-width": 2,
          "line-opacity": 0.5,
        },
      },
      {
        id: "jaipur-municipality",
        name: "Jaipur Mun. Corp.",
        file: getGeoJsonPath("JAIPUR_MUNI_BOUND"),
        defaultChecked: true,
        showInControl: false,
        type: "line",
        paint: {
          "line-color": "#900000",
          "line-dasharray": [1, 2],
          "line-opacity": 0.5,
        },
      },
      {
        id: "jaipur-municipality-casing",
        name: "Jaipur Mun. Corp. Casing",
        file: getGeoJsonPath("JAIPUR_MUNI_BOUND"),
        defaultChecked: true,
        showInControl: false,
        type: "line",
        paint: {
          "line-color": "#f6ff00",
          "line-dasharray": [2, 1],
          "line-opacity": 0.5,
        },
      },
    ],
  },
  // --- base, shown as checkboxes ---
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
            file: getGeoJsonPath("BUS_ROUTES"),
            defaultChecked: false,
            tooltipProperties: [{ label: "Route: ", property: "route" }],
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
            file: getGeoJsonPath("BUS_STOPS"),
            defaultChecked: false,
            tooltipProperties: [{ label: "Stop: ", property: "name" }],
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
        id: "parent-rail",
        name: "Railway",
        children: [
          {
            id: "rail-routes",
            name: "Routes",
            file: getGeoJsonPath("TRAIN_ROUTES"),
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
            file: getGeoJsonPath("TRAIN_STATIONS"),
            defaultChecked: false,
            tooltipProperties: [{ label: "Station: ", property: "name" }],
            type: "symbol",
            icon: { id: "railway-icon", url: railwayIconUrl },
            layout: {
              "icon-image": "railway-icon",
              "icon-size": 0.05,
              "icon-allow-overlap": true,
            },
            paint: {},
          },
        ],
      },
      {
        id: "group-metro",
        name: "Metro",
        isGroup: true,
        children: [
          {
            id: "parent-metro",
            name: "In Service",
            children: [
              {
                id: "metro-routes",
                name: "Routes",
                file: getGeoJsonPath("METRO_ROUTES"),
                defaultChecked: false,
                tooltipProperties: [{ label: "Line: ", property: "name" }],
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
                file: getGeoJsonPath("METRO_STATIONS"),
                defaultChecked: false,
                tooltipProperties: [{ label: "Station: ", property: "name" }],
                type: "symbol",
                icon: { id: "metro-icon", url: metroIconUrl },
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
            name: "Proposed",
            children: [
              {
                id: "metro-routes-uc",
                name: "Routes",
                file: getGeoJsonPath("METRO_ROUTES_UC"),
                defaultChecked: false,
                tooltipProperties: [
                  { label: "Line (proposed): ", property: "name" },
                ],
                type: "line",
                paint: {
                  "line-color": ["coalesce", ["get", "color"], "#dd6666"],
                  "line-width": 2,
                  "line-gap-width": 2,
                  "line-dasharray": [2, 2],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  // --- base, shown as checkboxes ---
  {
    theme: "Administrative",
    layers: [
      {
        id: "group-wards",
        name: "Wards (JMC)",
        isGroup: true,
        children: [
          {
            id: "parent-heritage-wards",
            name: "Heritage",
            legend: "population",
            children: [
              {
                id: "jaipur_wards_heritage",
                file: getGeoJsonPath("WARDS_HERITAGE"),
                defaultChecked: false,
                tooltipProperties: [
                  { label: "Ward: ", property: "ward_id" },
                  { label: "Assembly: ", property: "assembly" },
                  { label: "Population: ", property: "pop", prefix: "" },
                  {
                    label: "Density: ",
                    property: "dens_pph",
                    suffix: " per ha",
                  },
                ],
                type: "fill",
                paint: {
                  "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["get", "pop"],
                    10000,
                    "#ffffcc",
                    12500,
                    "#b54b00",
                    15000,
                    "#ad0104",
                  ],
                  "fill-opacity": 0.5,
                },
              },
            ],
          },
          {
            id: "parent-greater-wards",
            name: "Greater",
            legend: "population",
            children: [
              {
                id: "jaipur_wards_greater",
                file: getGeoJsonPath("WARDS_GREATER"),
                defaultChecked: false,
                tooltipProperties: [
                  { label: "Ward: ", property: "ward_id" },
                  { label: "Assembly: ", property: "assembly" },
                  { label: "Population: ", property: "pop", prefix: "" },
                  { label: "Density: ", property: "dens_pph", suffix: " /ha" },
                ],
                type: "fill",
                paint: {
                  "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["get", "pop"],
                    11000,
                    "#ffffcc",
                    12500,
                    "#b54b00",
                    14000,
                    "#ad0104",
                  ],
                  "fill-opacity": 0.5,
                },
              },
            ],
          },
        ],
      },
      {
        id: "parent-assembly",
        name: "Assemblies (JMC)",
        children: [
          {
            id: "jaipur_wards_assembly",
            file: getGeoJsonPath("WARDS_ASSEMBLY"),
            defaultChecked: false,
            tooltipProperties: [
              { label: "Ward: ", property: "ward_id" },
              { label: "Assembly: ", property: "assembly" },
              { label: "Population: ", property: "pop", prefix: "" },
              { label: "Density: ", property: "dens_pph", suffix: " /ha" },
            ],
            type: "fill",
            paint: {
              "fill-color": ["coalesce", ["get", "color_assembly"], "#800000"],
              "fill-opacity": 0.5,
            },
          },
        ],
      },
      {
        id: "parent-rural-towns",
        name: "Villages (ex-JMC)",
        children: [
          {
            id: "jaipur_rural_towns",
            file: getGeoJsonPath("RURAL_TOWNS"),
            defaultChecked: false,
            tooltipProperties: [{ label: "Town: ", property: "adm5_name" }],
            type: "fill",
            paint: { "fill-color": "#ff0000" },
          },
        ],
      },
    ],
  },
  // --- dropdown ---
  {
    theme: "Economic Activity",
    controlType: "dropdown",
    layers: [
      {
        id: "parent-eai",
        name: "Econ Activity Index (EAI)",
        infobox:
          "EAI is derived from various indivators, including population, night light intensity, amenity density, and more. It is a measure of economic activity in the area.",
        legend: "eai",
        children: [
          {
            id: "eai-wards",
            file: getGeoJsonPath("EAI_DATA"),
            defaultChecked: false,
            tooltipProperties: [{ label: "Score: ", property: "EPI_o" }],
            type: "fill",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "EPI_o"],
                -1,
                "#2f00ff",
                0,
                "#ffffff",
                1,
                "#c30003",
              ],
              "fill-opacity": 0.75,
              "fill-outline-color": "transparent",
            },
          },
        ],
      },
      {
        id: "parent-pop-density",
        name: "--Population Density",
        infobox: "",
        legend: "popDensity",
        children: [
          {
            id: "pop-density-km2",
            file: getGeoJsonPath("EAI_DATA"),
            defaultChecked: false,
            tooltipProperties: [{ label: "Pop: ", property: "pop_sum" }],
            type: "fill",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "pop_sum"],
                0,
                "#ffecec",
                20000,
                "#550103",
              ],
              "fill-opacity": 0.75,
              "fill-outline-color": "transparent",
            },
          },
        ],
      },
      {
        id: "parent-eai-amenities",
        name: "--Amenities density index",
        infobox: "",
        legend: "eai_component_01",
        children: [
          {
            id: "eai-amenities",
            file: getGeoJsonPath("EAI_DATA"),
            defaultChecked: false,
            tooltipProperties: [{ property: "amenities_poi" }],
            type: "fill",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "amenities_poi"],
                0,
                "#ffffff",
                0.5,
                "#808080",
              ],
              "fill-opacity": 0.75,
              "fill-outline-color": "transparent",
            },
          },
        ],
      },
      {
        id: "parent-eai-office",
        name: "--Office density index",
        infobox: "",
        legend: "eai_component_01",
        children: [
          {
            id: "eai-amenities",
            file: getGeoJsonPath("EAI_DATA"),
            defaultChecked: false,
            tooltipProperties: [{ property: "office_poi" }],
            type: "fill",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "office_poi"],
                0,
                "#ffffff",
                0.5,
                "#808080",
              ],
              "fill-opacity": 0.75,
              "fill-outline-color": "transparent",
            },
          },
        ],
      },
      {
        id: "parent-eai-shop",
        name: "--Shop density index",
        infobox: "",
        legend: "eai_component_01",
        children: [
          {
            id: "eai-shop",
            file: getGeoJsonPath("EAI_DATA"),
            defaultChecked: false,
            tooltipProperties: [{ property: "shop_poi" }],
            type: "fill",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "shop_poi"],
                0,
                "#ffffff",
                0.5,
                "#808080",
              ],
              "fill-opacity": 0.75,
              "fill-outline-color": "transparent",
            },
          },
        ],
      },
    ],
  },
]
