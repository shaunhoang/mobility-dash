

import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import AboutHighlights from '../components/common/AboutHighlights';
import NavigationButtons from '../components/common/NavigationButtons';
import Title from '../components/common/Title';
import DataCatalogue from '../components/DataCatalogue/DataCatalogue';
import MobilityKPIs from '../components/MobilityKPIs/MobilityKPIs';


function Home() {
    const [activeLayer, setActiveLayer] = useState('goals');
    const mapNavigationButtons = [
        { id: 'goals', text: 'Mobility Goals' },
        { id: 'catalogue', text: 'Data Catalogue' },

    ];
    const handleLayerChange = (layerId) => {
        console.log('Button clicked, changing active layer to:', layerId);
        setActiveLayer(layerId);
    };


    return (
        <div>
            <Box sx={{mb:2}}>
                <Title />
            </Box>

            <NavigationButtons
                buttons={mapNavigationButtons}
                onButtonClick={handleLayerChange}
                activeButtonId={activeLayer}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', mx: 10, mb:5 }}>

                <Box >
                    {activeLayer === 'goals' && <MobilityKPIs />}
                    {activeLayer === 'catalogue' && <DataCatalogue />}
                </Box>

                <Divider style={{ margin: '1.5rem' }} />

                <AboutHighlights />
            </Box>

        </div>
    );
}

export default Home;