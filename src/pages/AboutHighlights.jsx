import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';

import { keyMembers, } from '../data/teamData';
import { highlightCards } from '../data/highlightsData';


const About = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Grid container spacing={5} >

        {/* --- About Section --- */}
        <Grid item size={6}>
          <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 2 }}>
            About the Initiative
          </Typography>
          <Typography variant="body1" color="text.secondary" component="p">
            This initiative is dedicated to leveraging open data to create a more efficient, sustainable, and inclusive urban mobility system. We believe that by making data accessible, we can empower citizens, researchers, and policymakers to build a better future for transportation in our city.
          </Typography>

          <Typography variant="h6" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 'medium' }}>
            Key Members
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

        {/* --- The Highlights --- */}
        <Grid item size={6}>
          <Box>
            <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 2 }}>
              Highlights
            </Typography>
            <Typography variant="body1" color="text.secondary" component="p" sx={{ mb: 3 }}>
              Explore some of our most notable content, from interactive tools to in-depth reports and community stories.
            </Typography>
            <Grid container spacing={2}>
              {highlightCards.map((card) => (
                <Grid item xs={12} sm={4} key={card.title}>
                  <Card sx={{
                    maxWidth: 325,
                    minHeight: 250,
                    borderRadius: '8px',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' }
                  }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="160"
                        image={card.image}
                        alt={card.alt}
                      />
                      <CardContent>
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

      </Grid>
    </Box>
  );
};

export default About;
