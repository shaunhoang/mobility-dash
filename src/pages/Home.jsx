import { 
  Box, 
  Typography, 
  Grid,
  Button  
} from '@mui/material';

import NavRow from '../components/NavRow';
import VerticalTabs from '../components/VerticalTabs';
import ActionAreaCard from '../components/ActionAreaCard';

// const images = [
//   {
//     src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2560&q=80",
//     alt: "Scenic road",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80",
//     alt: "City street",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2762&q=80",
//     alt: "Bikes parked",
//   },
// ];

  const tabData = [
    {
      label: 'Public Transport Supply',
      contentText: 'This is about making sure there are enough buses and trains, and that they run frequently. When supply is good, you have more travel options and spend less time waiting.',
      backgroundImage: 'https://placehold.co/600x400/8E9AAF/31343C?text=Supply',
      learnMoreLink: '#',
    },
    {
      label: 'Safety & Comfort',
      contentText: 'Your journey should feel safe and be a pleasant experience. We focus on things like good lighting in stations, clean vehicles, and clear information so you can travel without worry.',
      backgroundImage: 'https://placehold.co/600x400/A4B494/31343C?text=Comfort',
      learnMoreLink: '#',
    },
    {
      label: 'Sustainable Funding',
      contentText: 'This means planning ahead by investing in clean transport. By securing funding, we can introduce things like electric buses and better cycling paths, which helps keep our air clean for everyone.',
      backgroundImage: 'https://placehold.co/600x400/C4A29E/31343C?text=Funding',
      learnMoreLink: '#',
    },
    {
      label: 'Effective Enforcement',
      contentText: 'To keep the system running smoothly for everyone, it helps when rules are followed. Proper enforcement ensures services are on time and that things like bus lanes are kept clear for the buses.',
      backgroundImage: 'https://placehold.co/600x400/9DB5B2/31343C?text=Enforcement',
      learnMoreLink: '#',
    },
    {
      label: 'Sustainable Mobility',
      contentText: 'This is about creating a transport system that is good for both people and the environment. It involves making it easier to walk, cycle, or take the bus, which leads to less traffic and healthier communities.',
      backgroundImage: 'https://placehold.co/600x400/D8C3A5/31343C?text=Mobility',
      learnMoreLink: '#',
    },
    {
      label: 'Health & Safety',
      contentText: 'We are committed to keeping you safe on every trip. This involves everything from regular vehicle maintenance to clear safety procedures, all designed to prevent accidents and protect passengers.',
      backgroundImage: 'https://placehold.co/600x400/E8D1C5/31343C?text=Health',
      learnMoreLink: '#',
    },
    {
        label: 'Inclusive Mobility',
        contentText: 'Everyone should be able to get around easily. This means making sure our transport system is affordable and physically accessible for all, including seniors, families, and people with disabilities.',
        backgroundImage: 'https://placehold.co/600x400/BFA89E/31343C?text=Inclusion',
        learnMoreLink: '#',
    },
  ];

const cardData = [
  {
    image: '#',
    title: 'Highlight 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',    
    altText: 'highlight-1',
  },
  {
    image: '#',
    title: 'Highlight 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    altText: 'highlight-2',
  },
  {
    image: '#',
    title: 'Highlight 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    altText: 'highlight-3',
  },
  {
    image: '#',
    title: 'Highlight 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    altText: 'highlight-4',
  },
  {
    image: '#',
    title: 'Highlight 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    altText: 'highlight-5',
  },
  {
    image: '#',
    title: 'Highlight 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    altText: 'highlight-6',
  },
];

const Home = () => {
  return (
    <div style={{ padding: '4rem' ,alignItems: 'center' }}>
      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        
        <NavRow
          label="" />

        <Box component="section">
          <Typography
            variant="h4"
            sx={{ color: 'roseShades.dark', fontWeight: 'bold'}}
          >
            Welcome to Jaipur Open Mobility Data Hub
          </Typography>
        </Box>
        
        <Box component="section">
          <Typography variant="body1" color="text.secondary">
            Introduction to the website and what you expect to find here
          </Typography>
        </Box> 
      </div>

      {/* <div>
        <ImageCarousel images={images} transitionDuration={2} />
      </div> */}

      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem'}}>
        
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Button variant="contained" sx={{ width: '200px' }} href="/smart-mobility-goals">Mobility Goals</Button>
          <Button variant="contained" sx={{ width: '200px' }} href="/data-catalogue">Data Catalogue</Button>
        </Grid>
        <Grid>
          <Button variant="contained" sx={{ width: '200px' }} href="/webmap">Explore Map</Button>
        </Grid>
      </div>

      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <Box component="section">
          <Typography variant="h6" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>  
            What makes the city move?
          </Typography> 
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Lorem Ipsum
          </Typography>     
          <VerticalTabs tabs={tabData} />
        </Box>
      </div>

      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <Box component="section" sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>  
            Highlights
          </Typography> 
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Lorem Ipsum
          </Typography> 
          
          <Box>
            <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <ActionAreaCard
                            image={card.image}
                            title={card.title}
                            description={card.description}
                            altText={card.altText}
                            onClick={() => alert(`${card.title} card clicked!`)}
                        />
                    </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </div>
    
  
      
      
    </div>
  );
};

export default Home;