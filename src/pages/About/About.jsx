import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

// --- Mock Data ---
// Data for the key members section
const keyMembers = [
  {
    name: 'Dr. Anya Sharma',
    role: 'Project Lead',
    avatar: 'https://placehold.co/100x100/A4B494/31343C?text=AS',
  },
  {
    name: 'Ben Carter',
    role: 'Lead Data Scientist',
    avatar: 'https://placehold.co/100x100/8E9AAF/31343C?text=BC',
  },
  {
    name: 'Chloe Davis',
    role: 'Community Outreach',
    avatar: 'https://placehold.co/100x100/C4A29E/31343C?text=CD',
  },
];

// Data for the highlight cards
const highlightCards = [
  {
    title: 'Interactive Data Map',
    description: 'Explore real-time mobility data across the city with our interactive mapping tool.',
    image: 'https://placehold.co/600x300/9DB5B2/FFFFFF?text=Interactive+Map',
    alt: 'Map of a city with data points',
  },
  {
    title: '2024 Mobility Report',
    description: 'Our comprehensive annual report on the state of urban mobility and future trends.',
    image: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=2024+Report',
    alt: 'Cover of a report document',
  },
  {
    title: 'Open Data API Launch',
    description: 'Access our datasets directly through our newly launched, free-to-use public API.',
    image: 'https://placehold.co/600x300/BFA89E/FFFFFF?text=API+Launch',
    alt: 'Computer code on a screen',
  },
  {
    title: 'Community Workshop Success',
    description: 'Read about the outcomes and key findings from our recent community engagement workshop.',
    image: 'https://placehold.co/600x300/E8D1C5/FFFFFF?text=Workshop',
    alt: 'People collaborating in a workshop',
  },
  {
    title: 'Open Data API Launch',
    description: 'Access our datasets directly through our newly launched, free-to-use public API.',
    image: 'https://placehold.co/600x300/BFA89E/FFFFFF?text=API+Launch',
    alt: 'Computer code on a screen',
  },
  {
    title: 'Interactive Data Map',
    description: 'Explore real-time mobility data across the city with our interactive mapping tool.',
    image: 'https://placehold.co/600x300/9DB5B2/FFFFFF?text=Interactive+Map',
    alt: 'Map of a city with data points',
  },
];


// --- The Main Component ---
const About = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Grid container spacing={5}>

        {/* --- About Section --- */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h5" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>
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

        {/* --- Highlights Section --- */}
        <Grid item xs={12} lg={6}>
          <Box>
            <Typography variant="h5" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>
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
                    maxHeight: 400,
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
