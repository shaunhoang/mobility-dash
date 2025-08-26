import { Box, Container } from "@mui/material";
import { useState } from "react";

// Home Page Components
import ContactFormPopup from "../components/common/ContactFormPopup";
import TabDescription from "../components/common/TabDescription";
import NavigationButtons from "../components/common/NavigationButtons";
import TitleBanner from "../components/common/TitleBanner";

// Sub Pages
import TeamAbout from "../components/TeamAbout/TeamAbout";
import DataCatalogue from "../components/DataCatalogue/DataCatalogue";
import MobilityKPIs from "../components/MobilityKPIs/MobilityKPIs";
import MobilityMap from "../components/MobilityMap/MobilityMap";

// Shared tab content
import tabContent from "../components/common/TabContent";

function Home() {
  const [activeLayer, setActiveLayer] = useState("map");

  const handleLayerChange = (layerId) => {
    setActiveLayer(layerId);
  };

  return (
    <Box>
      {/* Title banner */}
      <TitleBanner />

      {/* Navigation */}
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
        <NavigationButtons
          onButtonClick={handleLayerChange}
          activeButtonId={activeLayer}
          tabContent={tabContent}
        />
      </Box>

      <Container maxWidth="lg">
        {/* Description */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <TabDescription activeLayer={activeLayer} tabContent={tabContent} />
        </Box>

        {/* Main Content / Pages */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          {activeLayer === "map" && <MobilityMap />}
          {activeLayer === "goals" && <MobilityKPIs />}
          {activeLayer === "catalogue" && <DataCatalogue />}
          {activeLayer === "about" && <TeamAbout />}
        </Box>
      </Container>

      <ContactFormPopup />
    </Box>
  );
}

export default Home;
