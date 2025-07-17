import {
  Box,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

import KpiDetailBox from './components/KpiDetailBox';
import InfoAreaRow from './components/KpiRow';
import VerticalTabs from './components/VerticalTabs';

const MobilityKPIs = () => {

  // State for the data fetched from JSON files
  const [kpiDomains, setKpiDomains] = useState([]);
  const [kpiDetails, setKpiDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage the UI
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedKpi, setSelectedKpi] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    // Use Promise.all to fetch both files concurrently for better performance
    Promise.all([
      fetch('/data/kpiDomains.json'),
      fetch('/data/kpiDetails.json')
    ])
      .then(async ([domainsResponse, detailsResponse]) => {
        if (!domainsResponse.ok || !detailsResponse.ok) {
          throw new Error('Network response was not ok for one or more files.');
        }
        const domainsData = await domainsResponse.json();
        const detailsData = await detailsResponse.json();
        return [domainsData, detailsData];
      })
      .then(([domainsData, detailsData]) => {
        setKpiDomains(domainsData);
        setKpiDetails(detailsData);
        setIsLoading(false);
      })
      .catch(fetchError => {
        console.error("Failed to fetch initial data:", fetchError);
        setError("Could not load required data. Please try again later.");
        setIsLoading(false);
      });
  }, []); // The empty array [] ensures this effect runs only once when the component mounts

  // --- Derived State & Side Effects ---
  const selectedTab = kpiDomains[activeTabIndex];
  const selectedKpis = selectedTab?.kpis.map(code => kpiDetails[code]).filter(Boolean) || [];

  useEffect(() => {
    if (selectedKpis.length > 0) {
      setSelectedKpi(selectedKpis[0]);
    } else {
      setSelectedKpi(null);
    }
  }, [activeTabIndex, kpiDomains, kpiDetails]); // Rerun when the data or tab index changes

  // --- Event Handlers ---
  const handleTabChange = (event, newIndex) => {
    setActiveTabIndex(newIndex);
  };

  const handleKpiSelect = (kpi) => {
    setSelectedKpi(kpi);
  };



  // --- Conditional Rendering for Loading/Error States ---
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ px: 4 }}>
      <Box component="section" sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="body1">
          Explore smart mobility metrics and progress
        </Typography>
        <Typography variant="body2">
          Select a domain on the left-hand panel
        </Typography>
      </Box>

      <Grid container spacing={2} >

        {/* Left Column for Tabs */}
        <Grid item size={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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