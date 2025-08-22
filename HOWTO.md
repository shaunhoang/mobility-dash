# Technical Handover Guide 

Table of Contents
1. Project Overview
2. Local development
3. Deployment with GitHub Pages
4. Managing and updating Data
5. Data structure and schemas (TBD)

## 1. Project Overview
*Jaipur Smart Mobility Hub* is a **React** web application built with **Vite**. It uses **Material UI** for the UI components and **Mapbox** for interactive maps. It also uses **Web3Forms** as a temporary solution to gather feedback form submissions. 

```
mobility-dash
├── public/
│   ├── assets/              # Favicon for webpage
│   └── data/                # Data for local testing
├── src/
│   ├── config/              
│   │    ├── path            # Data path config
│   │    └── map             # Map layer config
│   ├── assets/              # Logos, markers, and images
│   ├── components/          
│   │    ├── common/         # shared components
│   │    ├── MobilityMap/    # Sub-page
│   │    ├── MobilityKPIs/   # Sub-page
│   │    ├── DataCatalogue/  # Sub-page
│   │    └── Highlights/      # Sub-page
│   ├── pages/               
│   │    └── Home.jsx        # Home Page component
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── theme.js             # Theme
├── .env.local               # Secret keys (local only)
├── .env.development         # Env vars when in dev
├── .env.production          # Env vars when deploying
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
```
3. Create a [MapBox account](https://www.mapbox.com/) to obtain the API token.
4. Visit [Web3Forms](https://web3forms.com/#start) to obtain an access key by indicating the receiving email address.

Note that the `.env.local` file is in `.gitignore` so your secret keys will not be committed and will stay on your local computer.

#### Step 4: Run the Development Server
```bash
npm run dev
```
Open in your browser at: http://localhost:5173.

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


## 4. Managing and Updating Data

Note: This is the current data infrastructure sued mainly for development of the site. Further experimentations welcome to ensure a more robust and secure solution.

There are two mirroring data sources:
- [UCL ORCA Server](https://orca.casa.ucl.ac.uk/~jens/sparc-dash/data/): The live data source.
- Local `public/data` folder: Secondary, lives in the repo and is used for local development and testing.

This is configured via these two `.env` files
```json
//.env.production
VITE_BASE_URL="https://orca.casa.ucl.ac.uk/~jens/sparc-dash/data/"
```
```json
//.env.development
VITE_BASE_URL="data/"
```

Since the data handling is critical to avoid breaking functionality, here is the recommended workflow for data updates:

1. Create a new test `git` branch
2. Validate and test locally
   - Replace/add file in `public/data`.
   - Ensure schema is unchanged.
   - Run `npm run dev` and test thoroughly.

3. Submit Pull Request
   - Push branch, and merge PR.
   - This syncs repo data `public/data` as fallback and any other code changes.

4. Go Live
   - Update live UCL server data filed to mirror `public/data` folder (This is a separate process)
   - Run `npm run deploy` as above. 

Reminder:  `npm run deploy` will fetch data from the UCL server to build the website with GitHub Pages, not `public/data`. If encountering issues working with the UCL server, edit `.env.production` to temporarily use the fallback data to build the website.

```json
//.env.production
VITE_BASE_URL="data/"
```

## 5. Data Structures and schemas

TBD

# Questions?
Any question during handover, please contact **Shaun Hoang** at shaun.hoang@gmail.com.