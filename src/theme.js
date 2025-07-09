import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    roseShades: {
      lightest: '#FAD4D4',      // card background
      light: '#F8B2B2',        // light coral (accordion header)
      main: '#E26D5C',         // muted coral (primary)
      dark: '#B9473D',         // strong red tone
      darkest: '#7E2C27',      // rich crimson (nav/footer)
    },
    primary: {
      main: '#E26D5C',         // use coral as primary
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#B9473D',         // complementary rich red
      contrastText: '#ffffff',
    },
    background: {
      default: '#FDF2F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#5A5A5A',
    },
  },
  typography: {
    fontFamily: `'Titillium Web','Noto Sans','Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: '10px 22px',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
