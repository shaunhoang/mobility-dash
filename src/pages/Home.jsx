import { Box, Divider } from "@mui/material";
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
    { id: "goals", text: "Mobility Progress" },
    { id: "catalogue", text: "Data Catalogue" },
    { id: "about", text: "Highlights" },
  ];
  const handleLayerChange = (layerId) => {
    console.log("Button clicked, changing active layer to:", layerId);
    setActiveLayer(layerId);
  };

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Title />
      </Box>
      <Box sx={{ mx: 8, my: 4 }}>
        <InteractiveMapMain />
      </Box>
      <Divider sx={{ my: 4}} />
      
      {/* Navigation buttons for different sections */}
      <NavigationButtons
        buttons={mapNavigationButtons}
        onButtonClick={handleLayerChange}
        activeButtonId={activeLayer}
      />

      <Box sx={{ display: "flex", flexDirection: "column", mx: 8, my: 4 }}>
        <Box>
          {activeLayer === "goals" && <MobilityKPIs />}
          {activeLayer === "catalogue" && <DataCatalogue />}
          {activeLayer === "about" && <AboutHighlights />}
        </Box>
      </Box>
    </div>
  );
}

export default Home;
