import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import KpiDetailBox from "./components/KpiDetailBox";
import InfoAreaRow from "./components/KpiRow";
import VerticalTabs from "./components/VerticalTabs";

const MobilityKPIs = () => {
  const theme = useTheme();

  // State for data and UI
  const [kpiDomains, setKpiDomains] = useState([]);
  const [kpiDetails, setKpiDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [selectedKpi, setSelectedKpi] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    Promise.all([
      fetch("data/kpiDef/kpiDomains.json"),
      fetch("data/kpiDef/kpiDetails.json"),
    ])
      .then(async ([domainsResponse, detailsResponse]) => {
        if (!domainsResponse.ok || !detailsResponse.ok) {
          throw new Error("Network response was not ok for one or more files.");
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
      .catch((fetchError) => {
        console.error("Failed to fetch initial data:", fetchError);
        setError("Could not load required data. Please try again later.");
        setIsLoading(false);
      });
  }, []); // Run once

  // --- Color and Data Augmentation ---
  const domainColorMap = useMemo(
    () => ({
      1: theme.palette.kpi.terracotta,
      2: theme.palette.kpi.slate,
      3: theme.palette.kpi.sage,
      4: theme.palette.kpi.ochre,
    }),
    [theme]
  );

  const tabsWithColor = useMemo(
    () =>
      kpiDomains.map((domain) => ({
        ...domain,
        color: domainColorMap[domain.id] || theme.palette.grey[500],
      })),
    [kpiDomains, domainColorMap, theme]
  );

  const allKpisWithColor = useMemo(() => {
    const kpiColorMap = {};
    kpiDomains.forEach((domain) => {
      domain.kpis.forEach((kpiCode) => {
        kpiColorMap[kpiCode] = domainColorMap[domain.id];
      });
    });
    return Object.values(kpiDetails).map((kpi) => ({
      ...kpi,
      domainColor: kpiColorMap[kpi.code] || theme.palette.grey[500],
    }));
  }, [kpiDomains, kpiDetails, domainColorMap, theme]);

  // Conditionally Calculate selectedKpis, If no tab is selected, return all KPIs from the details object. Augment with colour.
  const selectedKpis = useMemo(() => {
    if (activeTabIndex === null) {
      return allKpisWithColor;
    }
    const selectedDomain = kpiDomains[activeTabIndex];
    if (!selectedDomain) return [];

    const kpiCodesForDomain = new Set(selectedDomain.kpis);
    return allKpisWithColor.filter((kpi) => kpiCodesForDomain.has(kpi.code));
  }, [activeTabIndex, kpiDomains, allKpisWithColor]);

  // --- Event Handlers ---
  const handleTabChange = (event, newIndex) => {
    setActiveTabIndex(newIndex);
  };

  const handleKpiSelect = (kpi) => {
    if (selectedKpi && selectedKpi.code === kpi.code) {
      setSelectedKpi(null); // same KPI clicked so deselect
    } else {
      setSelectedKpi(kpi); // select new kpi
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ px: 4 }}>
      <Grid container spacing={2}>
        {/* Left Column for Tabs */}
        <Grid item size={{xs:12,sm:2 }} sx={{ display: "flex", flexDirection: "column",flexShrink: 0}}>
          <VerticalTabs
            tabs={tabsWithColor}
            activeTab={activeTabIndex}
            onTabChange={handleTabChange}
          />
        </Grid>

        {/* Right Column */}
        <Grid item size={{xs:12,sm:10 }} sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <InfoAreaRow
              kpis={selectedKpis} // This list now contains the correct color for each KPI
              onKpiSelect={handleKpiSelect}
              selectedKpiCode={selectedKpi?.code}
            />
          </Box>
          <KpiDetailBox kpi={selectedKpi} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MobilityKPIs;
