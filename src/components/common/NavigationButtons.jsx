import {
  Box,
  Fab,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

const NavigationButtons = ({ onButtonClick, activeButtonId , tabContent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttons = Object.values(tabContent);

  const handleTabChange = (event, newActiveButtonId) => {
    onButtonClick(newActiveButtonId);
  };

  // --- Mobile: FABs ---
  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          pt: 2,
        }}
      >
        {buttons.map((button) => (
          <Box
            key={button.id}
            onClick={() => onButtonClick(button.id)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              cursor: "pointer",
              flex: 1,
              textAlign: "center",
            }}
          >
            <Fab
              color={button.id === activeButtonId ? "primary" : "default"}
              aria-label={button.text}
              size="medium"
              sx={{ boxShadow: button.id === activeButtonId ? 5 : 2 }}
            >
              {button.icon}
            </Fab>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 300,
                pt: 1.2,
                px:1.2,
                lineHeight: 1,
                textAlign: "center",
                color:
                  button.id === activeButtonId
                    ? "primary.main"
                    : "text.secondary",
              }}
            >
              {button.text}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }

  // --- Desktop: Tabs ---
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        value={activeButtonId}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="navigation tabs"
        sx={{
          minHeight: 50, 
          "& .MuiTab-root": {
            minHeight: 50,
            paddingX: 2, 
            paddingY: 1, 
            fontSize: "1rem", 
            fontWeight: 500,
            textTransform: "none",
          },
          "& .MuiTab-iconWrapper": {
            marginRight: theme.spacing(1),
            fontSize: 20, 
          },
        }}
      >
        {buttons.map((button) => (
          <Tab
            key={button.id}
            value={button.id}
            label={button.text}
            icon={button.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default NavigationButtons;
