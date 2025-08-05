import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HighlightsDrawer from "./components/HighlightsDrawer"; // Import the drawer component

const Highlights = () => {
  // --- State Management ---
  const [highlightCards, setHighlightCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    fetch("data/highlightsData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Map the API data to match the drawer's expected props
        const formattedData = data.map((item) => ({
          ...item,
          name: item.title,
          image_url: item.image,
        }));
        setHighlightCards(formattedData);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch highlights data:", fetchError);
        setError("Could not load highlights. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  // --- Event Handlers for the Drawer ---
  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      <Grid container spacing={5}>
        {/* --- The Highlights Section --- */}
        <Grid item size={9}>
          <Box>
            {isLoading && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography color="error" sx={{ my: 2 }}>
                {error}
              </Typography>
            )}

            <Grid container spacing={2}>
              {!isLoading &&
                !error &&
                highlightCards.map((card) => (
                  <Grid item size={3} key={card.name}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: "12px",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      {/* Add onClick handler here */}
                      <CardActionArea
                        onClick={() => handleCardClick(card)}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="160"
                          image={card.image_url}
                          alt={card.alt}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: "bold" }}
                          >
                            {card.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="p"
                            sx={{
                              textOverflow: "ellipsis",
                              mb: 1,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {card.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Grid>

        {/* --- About Section --- */}
        <Grid item size={3}>
          <Typography variant="h5" gutterBottom sx={{ color: "primary.dark" }}>
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
            at MNIT, Jaipur. Our project aims to facilitate data sharing to
            shape accountable progress towards smart and inclusive mobility in
            Jaipur.
          </Typography>
        </Grid>
      </Grid>

      {/* --- Render the Drawer Component --- */}
      <HighlightsDrawer
        item={selectedCard}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </Box>
  );
};

export default Highlights;
