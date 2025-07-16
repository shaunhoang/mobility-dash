import { Box, Button, Grid, Typography } from '@mui/material';
import { useState , useEffect} from 'react';
import { kpiDetails } from '../../data/kpiDetails';
import { kpiDomains } from '../../data/kpiDomains';
import InfoAreaRow from './components/InfoAreaRow';
import VerticalTabs from './components/VerticalTabs';
import KpiDetailBox from './components/KpiDetailBox';

const MobilityKPIs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleKpiSelect = (kpi) => {
    console.log('Selected KPI:', kpi);
    setSelectedKpi(kpi);
  };

  const selectedTab = kpiDomains[activeTabIndex];
  const selectedKpis = selectedTab?.kpis.map(code => kpiDetails[code]).filter(Boolean);

  const [selectedKpi, setSelectedKpi] = useState(null);
  const handleTabChange = (event, newIndex) => {
    console.log('Parent knows the new tab index is:', newIndex);
    setActiveTabIndex(newIndex);
  };

  useEffect(() => {
    if (selectedKpis.length > 0) {
      setSelectedKpi(selectedKpis[0]);
    } else {
      setSelectedKpi(null);
    }
  }, [activeTabIndex]);

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
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
            tabs={kpiDomains}
            onTabChange={handleTabChange}
          />
        </Grid>

        {/* Right Column */}
        <Grid item size={9.75}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <InfoAreaRow
              kpis={selectedKpis}
              onKpiSelect={handleKpiSelect}
              selectedKpiCode={selectedKpi?.code}
            />

            <KpiDetailBox kpi={selectedKpi} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MobilityKPIs;