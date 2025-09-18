# Technical Handover Guide 
- **Project name:** Jaipur Mobility Observatory (UCL, MNIT)
- **GitHub repo:** https://github.com/shaunhoang/mobility-dash/

## Table of Contents
1. Project Overview
2. Local development
3. Deployment with GitHub Pages
4. Data Paths
5. Data Schema

## 1. Project Overview
*Jaipur Mobility Observatory* is a **React** web application built with **Vite**. It uses **Material UI** for the UI components and **Mapbox** for interactive maps. It also uses **Web3Forms** as a temporary solution to gather feedback form submissions. 

```
mobility-dash
├── public/
│   ├── assets/              # Favicon for webpage
│   └── data/                # Data for local testing
├── src/
│   ├── config/              
│   │    ├── path/           # Data path config
│   │    └── map/            # Map layer config
│   ├── assets/              # Logos, markers, and images
│   ├── components/          
│   │    ├── common/         # shared components
│   │    ├── MobilityMap/    # Sub-page
│   │    ├── MobilityKPIs/   # Sub-page
│   │    ├── DataCatalogue/  # Sub-page
│   │    └── TeamAbout/      # Sub-page
│   ├── pages/               
│   │    └── Home.jsx        # Home Page component
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── theme.js             # Custom Theme (Jaipur pink)
├── .env.local               # Env keys (local only)
├── .gitignore               
├── index.html               
├── package.json 
├── vite.config.js           
└── HOWTO.md                # This document 
```

## 2. Local Development

#### Step 1: Clone the Repository
The current repo owner will share access to the repo. To set up the project on your local machine for development, clone the repository.

#### Step 2: Install Dependencies
Change directory to the project root, and run `npm install` to download all the required libraries listed in `package.json`.
```bash
cd [repository_folder_name]
```
```bash
npm install
```

#### Step 3: Set Up Environment Variables
The project requires secret keys for Mapbox and Web3Forms to function.

1. Create a new file in the root of the project named `.env.local`
2. Copy the templated contents of `.env.example` below into `.env.local`. 

```js
VITE_MAPBOX_TOKEN="..."
VITE_WEB3FORMS_ACCESS_KEY="..."
VITE_BASE_URL="data/"
```
3. Create a [MapBox account](https://www.mapbox.com/) to obtain the API token.
4. Visit [Web3Forms](https://web3forms.com/#start) to obtain an access key by indicating the receiving email address.

Note that the `.env.local` file is in `.gitignore` so your secret keys will not be committed and will stay on your local computer.

#### Step 4: Run the Development Server
```bash
npm run dev
```
Open in your browser at: http://localhost:5173/mobility-dash/.

## 3. Deployment to GitHub Pages

Deployment uses the `gh-pages` package. 

1. In `package.json`, check the following:

```json
// Make sure this is the new GitHub account
"homepage": "https://<github-username>.github.io/mobility-dash"
// Make sure these lines are present
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Essentially, we are instructing the following to occur when we deploy: Build the app into `dist/` (predeploy), then publish `dist/` to the `gh-pages` branch.

2. Deploy:
```bash
npm run deploy
```
3. Configure **GitHub Pages**:
   - Go to *Settings* → *Pages*.
   - Source = *Deploy from a branch.*
   - Branch = `gh-pages`
   - Folder =  `/`


## 4. Data Paths and Schemas

Note: This is a temporary setup for front-end development until a back-end solution has been put in place. 

All data used for development is stored in the `public/data` folder as the interim solution, as configured in the `.env.local` file
```json
VITE_BASE_URL="data/"
```
All file paths are then built using the configurations in the `src/config/path/` folder

- `pathConfig.js`: Paths to `.json` files with various site contents such as details on KPIs, Data Catalogue, etc.
- `mapLayerPathConfig.js`: Paths to `.geojson` files containing geospatial data for mapping


## 5. Data Schemas

This outlines the structure and purpose of the core JSON data files used in this project. 

#### `aboutData.json`
Stores information about project team members for display on the "Contributors" section, fetched in `TeamAbout.jsx`.

| Field Name | Data Type | Description | Example | Constraints / Notes |
|------------|-----------|-------------|---------|-------------------|
| name | String | The full name of the team member | "Jens Kandt" | Required |
| role | String | The team member's official role | "Project Lead & Principal Investigator" | Required |
| affiliation | String | The team member's  affiliation | "CASA, University College London" | Required |
| avatarUrl | String (URL) | A URL to the team member's profile image | "https://placehold.co/.../text=J" | Required |
| type | String | Whether the team member belongs to the core or extended project team | "core" or "extended" | Required |

---
#### `highlightsData.json`  
Contains content for the "News and Highlights" section, fetched in `TeamAbout.jsx`. 

| Field Name | Data Type | Description | Example | Constraints / Notes |
|------------|-----------|-------------|---------|-------------------|
| id | Integer | A unique identifier for the highlight entry | 1 | Required, Unique |
| title | String | The headline of the highlight | "2024 Mobility Report" | Required |
| description | String | A short summary of the highlight | "Our comprehensive annual report..." | Required |
| date | String | The publication date of the highlight | "2024-01-15" | Format YYYY-MM-DD |
| image | String (URL) | A URL to the highlight's banner | "https://placehold.co/.../Report" | Required |

---

#### `kpiDomains.json`
Defines the high-level categories or "domains" for the Key Performance Indicators (KPIs). It groups individual KPIs from `kpiDetails.json` into thematic sections for the UI. Fetched in `MobilityKPIs.jsx`

| Field Name | Data Type | Description | Example | Constraints / Notes |
|------------|-----------|-------------|---------|-------------------|
| id | Integer | A unique identifier for the domain | 1 | Required, Unique |
| label | String | The display name for the domain category | "Stronger Foundations" | Required |
| kpis | Array<String> | A list of KPI codes that belong to this domain | ["A01", "A02", "A03"] | Required. Codes must match keys in `kpiDetails.json`


#### `kpiDetails.json`
Provides detailed information for each individual Key Performance Indicator (KPI). The top-level keys are the KPI codes (e.g., "A01"), which link the data to `kpiDomains.json`. Fetched in `MobilityKPIs.jsx`

| Field Name | Data Type | Description | Example | Constraints / Notes |
|------------|-----------|-------------|---------|-------------------|
| code | String | The unique identifier for the KPI | "A01" | Required, must match the parent key |
| title | String | The full, human-readable title of the KPI | "Public transport fleet supply" | Required |
| description | String | A detailed explanation of what the KPI measures | "The supply of public buses..." | Required |
| stat | String | The current value or statistic for the KPI | "3.5" | Required |
| unit | String | The unit of measurement for the stat | "buses/100k" | Can be `null` |
| target | String | The goal or target value for this KPI | "60 buses per 100k people" | Can be `null` |

---
#### `dataCatalogue.json`
Contains a comprehensive catalogue of all datasets related to mobility, planning, and demographics for the Jaipur region. This is fetched in `DataCatalogue.jsx`. The `.json` file can be processed from the original `.csv` file using the Jupyter notebook`bin/data-analysis/clean_datacatalogue.ipynb`

| Field Name | Data Type | Description | Example | Constraints / Notes |
|------------|-----------|-------------|---------|-------------------|
| id | Integer | The unique identifier for the dataset entry | 17 | Required, Unique |
| title | String | The human-readable name of the dataset | "Administrative Boundary Database" | Required |
| description | String | A summary of the dataset's contents and scope | "Contains georeferenced..." | Required |
| sector | String | The primary thematic category for the dataset | "Administrative Context" | Required |
| group | String | A sub-category or specific source collection | "Census Handbook" |  |
| jurisdiction | String | The geographical or administrative area the data covers | "Jaipur District" |  |
| frequency | String | The interval at which the data is updated | "Every year" |  |
| granularity__spatial | String | The smallest spatial unit the data describes | "CD Block / Town" |  Required |
| granularity__temporal | String | The temporal resolution of the data points | "One-time" |  |
| date__earliest | Integer | The earliest year the data is available for | 1989 | |
| date__latest | Integer | The most recent year the data is available for | 2023 | Required |
| access_type | String | The access level for the data. | "Open", "Private", "Paid" |  |
| format | String | The file format of the source data. | "ESRI Shapefile", "CSV" | Required  |
| provider | String | The organization that created or published the data. | "Survey of India" |  |
| reference | String | The citation or source document for the data. | "Survey of India (2024)..." |  |
| access_method | String | Instructions on how to access the data. | "Go to source URL" | |
| url | String (URL) | A link to the source webpage or data portal. | "https://onlinemaps.surveyofindia.gov.in/..." |Required |
| url_download | String (URL) | A direct download link for the data file, if available. | "https://orca.casa.ucl.ac.uk/..." | if available |
| lastupdate | String | A human-readable description of the data's freshness | "Last 2 yrs" | This variable is calculated in the notebook from date__latest |
| keywords | String | A list of relevant search terms for filtering | "administrative; boundaries" | Keywords are separated by semicolons |

---

#### `kpiCharts/` and `kpiMaps/`
The `.json` and `.geojson` files in these two folders power the `KpiDetailBox.jsx` component (under `MobilityKPIs.jsx`), used to show further insights on the selected KPI, be it a time-series (charts) or geographical distribution (maps), whichever is available.

- These files must follow the naming convention `<kpi-code>.json` and/or `<kpi-code>.geojson` to be rendered, for example, "A01.json" and "A02.geojson".
- The subcomponents `KpiChart.jsx` and `KpiMap.jsx` to specify styling are placeholders, therefore specific schemas are not yet determined.

#### `mapMain/`
This folder contains all `.geojson` files needed to populate the main interactive map in `MobilityMap.jsx`, manually configured in `src/config/map/mainLayerConfig.js`.

# Questions?
Any question during handover, please contact **Shaun Hoang** at shaun.hoang@gmail.com.