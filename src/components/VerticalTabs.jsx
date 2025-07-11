import * as React from 'react';
import PropTypes from 'prop-types';
import { useRef, useState, useLayoutEffect } from 'react';
import { Box, Typography, Grid , Tab, Tabs  } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      // This style makes the panel grow to fill available space and scroll internally
      style={{ flexGrow: 1, overflow: 'auto' }}
    >
      {value === index && (
        <Box sx={{ p: 2 , height : '100%'}}>
          {/* Use component="div" to allow complex children */}
          <Typography component="div" sx={{ p: 2 , height : '100%'}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ tabs }) {
  const [value, setValue] = React.useState(0);
  const [containerHeight, setContainerHeight] = useState('auto');
  const tabsRef = useRef(null);
  useLayoutEffect(() => {
    if (tabsRef.current) {
      setContainerHeight(tabsRef.current.clientHeight);
    }
  }, [tabs]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
        sx={{ 
            flexGrow: 1, 
            bgcolor: 'background.paper', 
            display: 'flex', 
            height: containerHeight, 
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden' 
            }}>
    <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        textColor="inherit"
        indicatorColor="none"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          flexShrink: 0,    // Prevent the tab list from shrinking
          minWidth: 160, // Give the tab list a consistent width
        }}
      >
        {tabs.map((tab, index) => (
            <Tab
                key={index}
                label={tab.label}
                {...a11yProps(index)}
                sx={{
                    bgcolor: value === index ? 'primary.main' : 'transparent',
                    color: value === index ? '#fff' : 'text.primary',
                    '&:hover': {bgcolor: value === index ? 'primary.dark' : 'action.hover'},
                    '& .MuiTab-wrapper': {color: value === index ? '#fff' : 'inherit',},
                }}
            />
        ))}
    </Tabs>


    {tabs.map((tab, index) => (
    <TabPanel key={index} value={value} index={index}>
        <Grid container direction="column" justifyContent="space-between" sx={{ flexGrow: 1, height: '100%' }}>

            <Grid item>
                <Typography variant="body2" gutterBottom>
                    {tab.contentText}
                </Typography>
            </Grid>

            <Grid item textAlign={'right'} >
                <Box
                    component="a"
                    href={tab.learnMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                    display: 'inline-block',
                    mt: 2,
                    px: 3,
                    py: 1,
                    backgroundColor: 'primary.dark',
                    borderRadius: 2,
                    boxShadow: 2,
                    color: '#fff',
                    textDecoration: 'none',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                    }}
                >
                    See progress
                </Box>
            </Grid>
        </Grid>
    </TabPanel>
    ))}
    </Box>
  );
}

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      contentText: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      learnMoreLink: PropTypes.string.isRequired,
    })
  ).isRequired,
};
