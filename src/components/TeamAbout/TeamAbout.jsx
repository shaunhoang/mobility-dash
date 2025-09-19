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
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

import HighlightsDrawer from "./components/HighlightsDrawer";
import pathConfig from "../../config/path/pathConfig";

const TeamAbout = () => {
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
          throw new Error("No network response for one or more files.");
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
      {/* Team */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
          Contributors
        </Typography>
      </Box>
      <Box sx={{ ml: 4 }}>
        {/* Core Team*/}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.dark" }}>
            Core Development Team
          </Typography>
          <Grid container spacing={2}>
            {aboutData
              .filter((member) => member.type === "core")
              .map((member, index) => (
                <Grid
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    my: 2,
                  }}
                  size={{ xs: 12, sm: 6, md: 4 }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.avatarUrl}
                    sx={{ width: 80, height: 80, mr: 2, boxShadow: 2 }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.affiliation}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
        {/* Support Team*/}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.dark" }}>
            Research and Technical Support Team
          </Typography>
          <Grid container spacing={2}>
            {aboutData
              .filter((member) => member.type === "support")
              .map((member, index) => (
                <Grid
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    my: 2,
                  }}
                  size={{ xs: 12, sm: 6, md: 4 }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.avatarUrl}
                    sx={{ width: 80, height: 80, mr: 2, boxShadow: 2 }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.affiliation}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
        {/* Extended Team*/}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.dark" }}>
            Extended Project Team
          </Typography>
          <Grid container spacing={2}>
            {aboutData
              .filter((member) => member.type === "extended")
              .map((member, index) => (
                <Grid
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    my: 2,
                  }}
                  size={{ xs: 12, sm: 6, md: 4 }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.avatarUrl}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.affiliation}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>

      {/* Highlights */}
      <Box>
        <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
          News & Highlights
        </Typography>
        <Grid>
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
                <Grid size={{ sm: 12, md: 4 }} key={card.name}>
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
      </Box>

      {/* --- Render the Drawer Component --- */}
      <HighlightsDrawer
        item={selectedCard}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </Box>
  );
};

export default TeamAbout;
