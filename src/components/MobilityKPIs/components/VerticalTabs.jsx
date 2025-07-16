import {
  Paper,
  Tab,
  Tabs,

} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';


const VerticalTabs = ({ tabs, onTabChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  return (
    <Paper
      sx={{
        width: '100%'
      }}
    >
      <Tabs
        orientation='vertical'
        variant="scrollable"
        value={value} //
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          width: '100%'
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              alignItems: 'flex-start',
              p: 2,
              opacity: 0.8,
              '&.Mui-selected': {
                fontWeight: 'bold',
                opacity: 1
              }
            }} />
        ))}
      </Tabs>
    </Paper>
  );
};

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default VerticalTabs;
