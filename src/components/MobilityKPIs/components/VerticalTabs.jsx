import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const VerticalTabs = ({ tabs, onTabChange, activeTab }) => {
  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  const handleShowAll = (event) => {
    if (onTabChange) {
      onTabChange(event, null);
    }
  };

  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Filter by topic
        </Typography>
      </Box>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab === null ? false : activeTab}
          onChange={handleChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                alignItems: "flex-end", // Add this line to align text to the left
                flexShrink: 0,
                "&.Mui-selected": {
                  fontWeight: "bold",
                  opacity: 1,
                  color: tab.color,
                },
              }}
            />
          ))}
        </Tabs>
      </Paper>
      <Box>
        <Button
          onClick={handleShowAll}
          variant="text"
          sx={{
            color: "primary.main",
            opacity: activeTab !== null ? 1 : 0.5,
            fontWeight: activeTab !== null ? "bold" : "normal",
          }}
        >
          Show All
        </Button>
      </Box>
    </Box>
  );
};

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string, // Color is now an expected prop
    })
  ).isRequired,
  onTabChange: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
};

export default VerticalTabs;
