import { Button, Grid, Box, Container, Typography } from "@mui/material";

// The component now accepts an 'onButtonClick' function as a prop.
const NavigationButtons = ({ buttons = [], onButtonClick, activeButtonId }) => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ my: 2 }}>

        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Select the tab to learn more about our shared goals towards sustainable mobility, browse our data catalogue, as well as other news and resources
        </Typography>
      </Container>
      <Grid
        container
        spacing={1}
        sx={{ p: 2, display: "flex", justifyContent: "center" }}
      >
        {buttons.map((button) => (
          <Grid item key={button.id}>
            <Button
              variant={button.id === activeButtonId ? "contained" : "outlined"}
              sx={{ width: 350, height: "50px", fontSize: "1.2rem" }}
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
