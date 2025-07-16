import { createTheme } from '@mui/material/styles';

const roseShades = {
  lightest: '#FAD4D4',   // For card backgrounds or subtle highlights
  lighter: '#F8B2B2',      // A light coral, good for hover states
  light: '#E26D5C',       // The main, vibrant coral
  main: '#B9473D',       // A stronger, deeper red tone
  dark: '#A03B32',      // A darker, more muted red
  darker: '#7E2C27',     // A rich crimson, good for nav/footers
  darkest: '#6B2622',    // A very dark, almost brownish red
};

const theme = createTheme({
  palette: {
    primary: {
      light: roseShades.lighter,
      main: roseShades.main,
      dark: roseShades.darker,
      contrastText: '#ffffff', 
    },
    secondary: {
      main: roseShades.darkest, 
      contrastText: '#ffffff',
    },
    background: {
      default: '#FEF6F5', // A very light, warm off-white
      selected: roseShades.lightest, // Lighter shade for selected items
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#5A5A5A',
    },
    roseShades: roseShades,
  },
 typography: {
    fontFamily: `'Inter', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontSize: '2.5rem', fontWeight: 700 },   // Page titles
    h2: { fontSize: '2rem', fontWeight: 700 },    // Major section titles
    h3: { fontSize: '1.75rem', fontWeight: 600 },  // Sub-section titles
    h4: { fontSize: '1.5rem', fontWeight: 600 },   // Smaller sub-sections
    h5: { fontSize: '1.25rem', fontWeight: 600 },  // Card headers, etc.
    h6: { fontSize: '1.1rem', fontWeight: 600 },   // Smaller card headers
    body1: { fontSize: '1rem', lineHeight: 1.6 },   // Main paragraph text
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },// Secondary text, captions
    
    button: { 
      textTransform: 'none', // Keeps button text in its original case
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 22px',
          fontWeight: 600,
          boxShadow: 2,

        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            fontWeight: 700,
            color: roseShades.main,
            backgroundColor: roseShades.lightest,
          }
        }
      }
    }
  },
});

export default theme;