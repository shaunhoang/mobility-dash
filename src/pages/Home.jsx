import CstmAccordion from '../components/CstmAccordion';
import ActionAreaCard from '../components/ActionAreaCard';
import Button from '@mui/material/Button';
import { Box, Typography, Grid  } from '@mui/material';


const images = [
  {
    src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2560&q=80",
    alt: "Scenic road",
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80",
    alt: "City street",
  },
  {
    src: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2762&q=80",
    alt: "Bikes parked",
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
];

const Home = () => {
  return (
    <div style={{ padding: '1rem' ,alignItems: 'center' }}>
      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <Box sx={{ height: 15, display: 'flex'}} >
          <img 
            src="src\assets\home-icon-silhouette.svg" 
            style={{maxHeight: '100%'}}
          />
          <Typography
            sx={{ ml: 0.5 }}
            fontSize="0.8rem" 
            >
          {/* / Hello */}
          </Typography>
        </Box>
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
        <Button variant="contained" sx={{ width: '200px' }} href="/smart-mobility-goals">Mobility Goals</Button>
        <Button variant="contained" sx={{ width: '200px' }} href="/data-catalogue">Data Catalogue</Button>
        <Button variant="contained" sx={{ width: '200px' }} href="/webmap">Explore Map</Button>
      </div>

      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <Box component="section">
          <Typography variant="h6" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>  
            What are our Mobility Goals?
          </Typography> 
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Lorem Ipsum
          </Typography>     
          <CstmAccordion items={[
            { title: 'Goal 1', content: 'lorem ipsum', link: '#'},
            { title: 'Goal 2', content: 'lorem ipsum', link: '#'},
            { title: 'Goal 3', content: 'lorem ipsum', link: '#'},
            { title: 'Goal 4', content: 'lorem ipsum', link: '#'},
            { title: 'Goal 5', content: 'lorem ipsum', link: '#'},
            { title: 'Goal 6', content: 'lorem ipsum', link: '#'},
            { title: 'Goal 7', content: 'lorem ipsum', link: '#'}
          ]} />
        </Box>
      </div>

      <div style={{marginBottom : '2rem',display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <Box component="section">
          <Typography variant="h6" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>  
            Highlights
          </Typography> 
          <Box >
            <Grid container spacing={2} justifyContent="center">
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
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