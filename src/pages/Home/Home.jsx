import { useState } from 'react';
import { Divider, Typography, Grid, Box } from '@mui/material';
import NavigationButtons from './components/NavigationButtons';
import Title from './components/Title';

import DataCatalogue from '../DataCatalogue/DataCatalogue';
import MobilityKPIs from '../KPI/MobilityKPIs';
import About from '../About/About';


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
  }

];

const Home = () => {

  const [activeLayer, setActiveLayer] = useState('goals');
  const mapNavigationButtons = [
    { id: 'goals', text: 'Mobility Goals' },
    { id: 'catalogue', text: 'Data Catalogue' },
    { id: 'highlights', text: 'Highlights' },
    // { id: 'explore', text: 'Explore Map' },
  ];
  const handleLayerChange = (layerId) => {
    console.log('Button clicked, changing active layer to:', layerId);

    setActiveLayer(layerId);
  };

  return (

    <div style={{ padding: '4rem', alignItems: 'center' }}>

      <Title />

      <NavigationButtons
        buttons={mapNavigationButtons}
        onButtonClick={handleLayerChange}
        activeButtonId={activeLayer}
      />

      <Divider style={{ margin: '2rem 0' }} />

      <div style={{ marginTop: '2rem' }}>
        {activeLayer === 'goals' && <MobilityKPIs />}
        {activeLayer === 'catalogue' && <DataCatalogue />}
        {activeLayer === 'highlights' && <About />}
      </div>

    </div>

  );
};

export default Home;