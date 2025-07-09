import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Typography, useTheme, Button} from '@mui/material';

// --- Styled MUI Components using theme ---
const ThemedAccordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1.5px solid ${theme.palette.roseShades.lightest}`,
  backgroundColor: theme.palette.roseShades.lightest,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const ThemedAccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: theme => theme.palette.roseShades.dark }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.roseShades.light,
  flexDirection: 'row-reverse',
  color: theme.palette.roseShades.dark,
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const ThemedAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.roseShades.light}`,
  backgroundColor: theme.palette.roseShades.lightest,
}));

const ThemedAccordionActions = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.roseShades.lightest,
}));

// --- Reusable Component ---
const CstmAccordion = ({ items }) => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {items.map((item, index) => {
        const panelId = `panel${index + 1}`;
        return (
          <ThemedAccordion
            key={panelId}
            expanded={expanded === panelId}
            onChange={handleChange(panelId)}
          >
            <ThemedAccordionSummary
              aria-controls={`${panelId}-content`}
              id={`${panelId}-header`}
            >
              <Typography component="span" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
            </ThemedAccordionSummary>
            <ThemedAccordionDetails>
              <Typography>{item.content}</Typography>
            </ThemedAccordionDetails>
            <ThemedAccordionActions>
              {item.link && (
                <Button href={item.link} variant="outlined" size="medium" sx={{ color: theme.palette.roseShades.dark }} > 
                Learn more 
                </Button>
              )}
            </ThemedAccordionActions>

          </ThemedAccordion>
        );
      })}
    </div>
  );
};

export default CstmAccordion;