import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CircularProgress // Added for loading state
} from '@mui/material';

const keyMembers = [
  {
    name: 'Dr. John Doe',
    role: 'Project Lead',
    avatar: 'https://placehold.co/100x100/A4B494/31343C?text=JD',
  },
  {
    name: 'Ben Franklin',
    role: 'Deputy Project Lead',
    avatar: 'https://placehold.co/100x100/8E9AAF/31343C?text=BF',
  },
];

const About = () => {
  // State for the fetched highlight cards
  const [highlightCards, setHighlightCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch the highlight cards data when the component mounts
  useEffect(() => {
    fetch('/data/highlightsData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setHighlightCards(data);
        setIsLoading(false);
      })
      .catch(fetchError => {
        console.error("Failed to fetch highlights data:", fetchError);
        setError("Could not load highlights. Please try again later.");
        setIsLoading(false);
      });
  }, []); // The empty array ensures this runs only once

  return (
    <Box>
      <Grid container spacing={4}>

        {/* --- The Highlights Section --- */}
        <Grid item size={9}>
          <Box>
            <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 2 }}>
              Highlights
            </Typography>

            
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography color="error" sx={{ my: 2 }}>{error}</Typography>
            )}
            
            <Grid container spacing={2} sx={{ height: 300 }}>
              {!isLoading && !error && highlightCards.map((card) => (
                <Grid item size={3} key={card.title} sx={{ height: '100%' }}>
                  <Card sx={{
                    height: '100%',
                    borderRadius: '12px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { 
                      transform: 'scale(1.03)',
                      boxShadow: 6,
                    }
                  }}>
                    <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                      <CardMedia
                        component="img"
                        height="160"
                        image={card.image}
                        alt={card.alt}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
          <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 2 }}>
            About the Initiative
          </Typography>
          <Typography variant="body1" color="text.secondary" component="p"  sx={{ mb: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, ex! Et cum ab eius veritatis sint, odio eaque sunt natus.
          </Typography>


          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {keyMembers.map((member) => (
              <Box key={member.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={member.avatar} alt={member.name} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default About;