import { Box, Typography } from '@mui/material';
import VerticalTabs from './components/VerticalTabs';

const tabData = [
  {
    label: 'Public Transport Supply',
    contentText: 'This is about making sure there are enough buses and trains, and that they run frequently. When supply is good, you have more travel options and spend less time waiting.',
    backgroundImage: 'https://placehold.co/600x400/8E9AAF/31343C?text=Supply',
    exploreLink: '#',
  },
  {
    label: 'Safety & Comfort',
    contentText: 'Your journey should feel safe and be a pleasant experience. We focus on things like good lighting in stations, clean vehicles, and clear information so you can travel without worry.',
    backgroundImage: 'https://placehold.co/600x400/A4B494/31343C?text=Comfort',
    exploreLink: '#',
  },
  {
    label: 'Sustainable Funding',
    contentText: 'This means planning ahead by investing in clean transport. By securing funding, we can introduce things like electric buses and better cycling paths, which helps keep our air clean for everyone.',
    backgroundImage: 'https://placehold.co/600x400/C4A29E/31343C?text=Funding',
    exploreLink: '#',
  },
  {
    label: 'Effective Enforcement',
    contentText: 'To keep the system running smoothly for everyone, it helps when rules are followed. Proper enforcement ensures services are on time and that things like bus lanes are kept clear for the buses.',
    backgroundImage: 'https://placehold.co/600x400/9DB5B2/31343C?text=Enforcement',
    exploreLink: '#',
  },
  {
    label: 'Sustainable Mobility',
    contentText: 'This is about creating a transport system that is good for both people and the environment. It involves making it easier to walk, cycle, or take the bus, which leads to less traffic and healthier communities.',
    backgroundImage: 'https://placehold.co/600x400/D8C3A5/31343C?text=Mobility',
    exploreLink: '#',
  },
  {
    label: 'Health & Safety',
    contentText: 'We are committed to keeping you safe on every trip. This involves everything from regular vehicle maintenance to clear safety procedures, all designed to prevent accidents and protect passengers.',
    backgroundImage: 'https://placehold.co/600x400/E8D1C5/31343C?text=Health',
    exploreLink: '#',
  },
  {
    label: 'Inclusive Mobility',
    contentText: 'Everyone should be able to get around easily. This means making sure our transport system is affordable and physically accessible for all, including seniors, families, and people with disabilities.',
    backgroundImage: 'https://placehold.co/600x400/BFA89E/31343C?text=Inclusion',
    exploreLink: '#',
  },
];

const MobilityKPIs = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>      <Box component="section">
      <Typography variant="h5" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>
        What makes the city move?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </Box>
      <Box>
        <VerticalTabs tabs={tabData} />
      </Box>
    </Box>
  );
};

export default MobilityKPIs;