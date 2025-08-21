import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import HighlightsDrawer from "./components/HighlightsDrawer";

import pathConfig from "../../config/path/pathConfig";

const Highlights = () => {
  const [highlightCards, setHighlightCards] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(pathConfig.HIGHLIGHTS_PATH),
      fetch(pathConfig.ABOUT_PATH),
    ])
      .then(async ([highlightsResponse, aboutResponse]) => {
        if (!highlightsResponse.ok || !aboutResponse.ok) {
          throw new Error("Network response was not ok for one or more files.");
        }
        const highlightsData = await highlightsResponse.json();
        const aboutData = await aboutResponse.json();
        return [highlightsData, aboutData];
      })
      .then(([highlightsData, aboutData]) => {
        const formattedHighlights = highlightsData.map((item) => ({
          ...item,
          name: item.title,
          image_url: item.image,
        }));
        setHighlightCards(formattedHighlights);
        setAboutData(aboutData);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch page data:", fetchError);
        setError("Could not load page content. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      <Grid container spacing={4} sx={{ my: 4, px: 4 }}>
        {/* Highlights */}
        <Grid size={{ xs: 12, sm: 9 }} sx={{ pr: 4 }}>
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
                <Grid item size={{ sm: 12, md: 4 }} key={card.name}>
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
        </Grid>

        {/* Team */}
        <Grid size={{ xs: 12, sm: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: "primary.dark" }}>
            Project Team
          </Typography>
          {aboutData.map((member, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", my: 2 }}
            >
              <Avatar
                alt={member.name}
                src={member.avatarUrl}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography
                  variant="body1"
                  color="primary."
                  sx={{ fontWeight: "bold" }}
                >
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.affiliation}
                </Typography>
              </Box>
            </Box>
          ))}
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
