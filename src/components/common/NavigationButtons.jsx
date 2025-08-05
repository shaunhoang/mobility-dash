import { Box, Button, Grid, Stack } from "@mui/material";

const NavigationButtons = ({ buttons = [], onButtonClick, activeButtonId }) => {
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        {buttons.map((button) => (
          <Button
            key={button.id}
            variant={button.id === activeButtonId ? "contained" : "outlined"}
            sx={{
              flexGrow: 1,
              height: "50px",
              fontSize: "1.2rem",
            }}
            onClick={() => onButtonClick(button.id)}
          >
            {button.text}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default NavigationButtons;
