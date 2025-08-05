import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";

import NavigationButtons from "../components/common/NavigationButtons";
import Title from "../components/common/Title";

import DataCatalogue from "../components/DataCatalogue/DataCatalogue";
import AboutHighlights from "../components/Highlights/AboutHighlights";
import MobilityKPIs from "../components/MobilityKPIs/MobilityKPIs";
import MobilityMap from "../components/MobilityMap/MobilityMap";

function Home() {
  const [activeLayer, setActiveLayer] = useState("map");
  const mapNavigationButtons = [
    { id: "map", text: "Mobility Map" },
    { id: "goals", text: "Goals & Progress" },
    { id: "catalogue", text: "Data Catalogue" },
    { id: "about", text: "News & Highlights" },
  ];
  const handleLayerChange = (layerId) => {
    console.log("Button clicked, changing active layer to:", layerId);
    setActiveLayer(layerId);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Title />
      </Box>

      <Box sx={{ mx: 10 }}>
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
          <Grid item>
            <NavigationButtons
              buttons={mapNavigationButtons}
              onButtonClick={handleLayerChange}
              activeButtonId={activeLayer}
            />
          </Grid>
          <Grid item sx={{ textAlign: "left" }}>
            <Container maxWidth="xl">
              {activeLayer === "map" && (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "primary.dark" }}
                  >
                    Explore public transport in the Jaipur region
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    With this interactive map, you can view bus route
                    information, including stop locations. Layer different
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
            </Container>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mx: 8, my: 4 }}>
        <Box>
          {activeLayer === "map" && <MobilityMap />}
          {activeLayer === "goals" && <MobilityKPIs />}
          {activeLayer === "catalogue" && <DataCatalogue />}
          {activeLayer === "about" && <AboutHighlights />}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
