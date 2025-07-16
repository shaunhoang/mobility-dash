

import { Divider, AppBar } from '@mui/material';
import { useState } from 'react';

import NavigationButtons from '../components/common/NavigationButtons';
import Title from '../components/common/Title';
import DataCatalogue from '../components/DataCatalogue/DataCatalogue';
import MobilityKPIs from '../components/MobilityKPIs/MobilityKPIs';
import AboutHighlights from './AboutHighlights';


function Home() {
    const [activeLayer, setActiveLayer] = useState('goals');
    const mapNavigationButtons = [
        { id: 'goals', text: 'Mobility Goals' },
        { id: 'catalogue', text: 'Data Catalogue' },
        // { id: 'highlights', text: 'Highlights' },
        // { id: 'explore', text: 'Explore Map' },
    ];
    const handleLayerChange = (layerId) => {
        console.log('Button clicked, changing active layer to:', layerId);
        setActiveLayer(layerId);
    };


    return (
        <div style={{ padding: '4rem', alignItems: 'center' }}>

            <Title />
            <AppBar position="sticky" sx={{
                backgroundColor: 'background.default',
                boxShadow: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // padding: '1rem',

            }}
            >
                <NavigationButtons
                    buttons={mapNavigationButtons}
                    onButtonClick={handleLayerChange}
                    activeButtonId={activeLayer}
                />
            </AppBar>
            <Divider style={{ margin: '1rem' }} />

            <div>
                {activeLayer === 'goals' && <MobilityKPIs />}
                {activeLayer === 'catalogue' && <DataCatalogue />}
            </div>

            {/* Debugging */}


            <Divider style={{ margin: '1rem' }} />

            <AboutHighlights />

        </div>

    );
}

export default Home;