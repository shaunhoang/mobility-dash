import { Button, Grid } from '@mui/material';

// The component now accepts an 'onButtonClick' function as a prop.
const NavigationButtons = ({ buttons = [], onButtonClick, activeButtonId }) => {
  return (
    <div >
      <Grid container spacing={1} sx={{ p: 2}}>
        {buttons.map((button) => (
          <Grid item key={button.id}>
            <Button
              variant={button.id === activeButtonId ? 'contained' : 'outlined'}
              sx={{ width: '400px', height: '50px', fontSize: '1.2rem' }}
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