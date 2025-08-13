import { Box, Container, Divider, Grid, Typography, Link } from "@mui/material";
import { useState } from "react";

import NavigationButtons from "../components/common/NavigationButtons";
import Title from "../components/common/Title";

import DataCatalogue from "../components/DataCatalogue/DataCatalogue";
import Highlights from "../components/Highlights/Highlights";
import MobilityKPIs from "../components/MobilityKPIs/MobilityKPIs";
import MobilityMap from "../components/MobilityMap/MobilityMap";

function Home() {
  const [activeLayer, setActiveLayer] = useState("map");
  const mapNavigationButtons = [
    { id: "map", text: "Mobility Map" },
    { id: "goals", text: "Goals & Progress" },
    { id: "catalogue", text: "Data Catalogue" },
    { id: "highlights", text: "News & Highlights" },
  ];
  const handleLayerChange = (layerId) => {
    console.log("Button clicked, changing active layer to:", layerId);
    setActiveLayer(layerId);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Title />
      </Box>

      <Box sx={{ mx: 2 }}>
        <Grid
          container
          spacing={4}
          sx={{
            mb: 2,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid>
            <NavigationButtons
              buttons={mapNavigationButtons}
              onButtonClick={handleLayerChange}
              activeButtonId={activeLayer}
            />
          </Grid>
          <Grid sx={{ textAlign: "left" }}>
            <Container maxWidth="xl">
              {activeLayer === "map" && (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "primary.dark" }}
                  >
                    Explore public transport in the Jaipur District
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    With this interactive map, you can view train, metro and bus
                    route information, including stop locations. Layer different
                    networks, such as cycling paths and walkways, to find the
                    best way to travel and plan your journey with confidence.
                  </Typography>
                </Box>
              )}
              {activeLayer === "goals" && (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "primary.dark" }}
                  >
                    Tracking Progress
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    This dashboard aims to provide a platform to track progress
                    against mobility goals that were deemed pressing in Jaipur.
                    Progress on goals can only be tracked with data. Comparing
                    goals that matter with available data, we identify areas
                    where more evidence is needed.
                  </Typography>
                </Box>
              )}
              {activeLayer === "catalogue" && (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "primary.dark" }}
                  >
                    Screening for Open Data
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    This data catalogue provides a directory of data related to
                    transport and mobility in Jaipur. Whether you are a
                    researcher, a developer, or a member of the public seeking
                    to stay informed, we invite you to explore which datasets
                    are available and where to access them, to help shape
                    mobility futures in the city.
                  </Typography>
                </Box>
              )}
              {activeLayer === "highlights" && (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "primary.dark" }}
                  >
                    About the Initiative
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    The Smart Mobility Hub is a collaboration between the{" "}
                    <Link
                      href="https://www.ucl.ac.uk/bartlett/casa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Centre for Advanced Spatial Analysis
                    </Link>{" "}
                    (CASA) at the University College London (UCL) and the{" "}
                    <Link
                      href="https://mnit.ac.in/dept_arch/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Department of Architecture and Planning
                    </Link>{" "}
                    at MNIT, Jaipur. Our project aims to facilitate data sharing
                    to shape accountable progress towards smart and inclusive
                    mobility in Jaipur.
                  </Typography>
                </Box>
              )}
            </Container>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4, mx: 4 }} />

      <Box sx={{ mx: 2 }}>
        <Box>
          {activeLayer === "map" && <MobilityMap />}
          {activeLayer === "goals" && <MobilityKPIs />}
          {activeLayer === "catalogue" && <DataCatalogue />}
          {activeLayer === "highlights" && <Highlights />}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
