import { Box, Divider, Typography, Container, Grid } from "@mui/material";
import { useState } from "react";
import AboutHighlights from "../components/common/AboutHighlights";
import NavigationButtons from "../components/common/NavigationButtons";
import Title from "../components/common/Title";
import DataCatalogue from "../components/DataCatalogue/DataCatalogue";
import InteractiveMapMain from "../components/InteractiveMap/InteractiveMapMain";
import MobilityKPIs from "../components/MobilityKPIs/MobilityKPIs";

function Home() {
  const [activeLayer, setActiveLayer] = useState("goals");
  const mapNavigationButtons = [
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

      <Box sx={{ mx: 8, my: 4 }}>
        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item size={3}>
            <Container sx={{ my: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "primary.dark",
                  textAlign: "left",
                }}
              >
                I. EXPLORE THE MAP
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                Get started by selecting layers to map
              </Typography>
            </Container>
          </Grid>
          <Grid item size={9}></Grid>
        </Grid>
        <InteractiveMapMain />
      </Box>

      <Box sx={{ mx: 8 }}>
        <Grid container spacing={2}>
          <Grid item size={3}>
            <Container sx={{ my: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "primary.dark",
                  textAlign: "left",
                }}
              >
                II. SMART MOBILITY
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                Select a tab to learn more
              </Typography>
            </Container>
          </Grid>
          <Grid item size={9}>
            <NavigationButtons
              buttons={mapNavigationButtons}
              onButtonClick={handleLayerChange}
              activeButtonId={activeLayer}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mx: 8 }}>
        <Box>
          {activeLayer === "goals" && <MobilityKPIs />}
          {activeLayer === "catalogue" && <DataCatalogue />}
          {activeLayer === "about" && <AboutHighlights />}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
