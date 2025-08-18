import { Box, Button, Grid } from "@mui/material";

const NavigationButtons = ({ buttons = [], onButtonClick, activeButtonId }) => {
  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {buttons.map((button) => (
          <Grid
            size={{ sm: 6, md: 3 }}
            sx={{ height: "40px",width: "100%" }}
            key={button.id}
          >
            <Button
              key={button.id}
              variant={button.id === activeButtonId ? "contained" : "outlined"}
              sx={{
                height: "100%",
                width: "100%",
                fontSize: "1.1rem",
                lineHeight: "1",
              }}
              onClick={() => onButtonClick(button.id)}
            >
              {button.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NavigationButtons;
