import { Button, Grid } from '@mui/material';

// The component now accepts an 'onButtonClick' function as a prop.
const NavigationButtons = ({ buttons = [], onButtonClick, activeButtonId}) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
        {buttons.map((button) => (
          <Grid item key={button.id}>
            <Button
              variant={button.id === activeButtonId ? 'contained' : 'outlined'}
              sx={{ width: '200px' }}
              onClick={() => onButtonClick(button.id)}
            >
              {button.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NavigationButtons;