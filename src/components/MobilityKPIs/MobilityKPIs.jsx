import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { kpiDomainData } from '../../data/kpiData';
import InfoAreaRow from './components/InfoAreaRow';
import InfoAreaCarousel from './components/InfoAreaCarousel';
import VerticalTabs from './components/VerticalTabs';

const MobilityKPIs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    console.log('Parent knows the new tab index is:', newIndex);
    setActiveTabIndex(newIndex);
  };

  const selectedTab = kpiDomainData[activeTabIndex];

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }}}>
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 2 }}>
          What makes the city move?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore the Key Performance Indicators that measure the health and efficiency of our urban mobility systems. Select a domain on the left to see the relevant KPIs.
        </Typography>
      </Box>

      <Grid container spacing={2} >

        {/* Left Column for Tabs */}
        <Grid item size={2.25}>
          <VerticalTabs
            tabs={kpiDomainData}
            onTabChange={handleTabChange}
          />
        </Grid>

        {/* Right Column for Additional Content */}
        <Grid item size={9.75}>
          <Box sx={{ height: '100%' }}>
            <InfoAreaRow kpis={selectedTab?.kpis} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MobilityKPIs;