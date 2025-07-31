import { Box, Paper, Typography } from "@mui/material";

const KpiRow = ({ kpis = [], onKpiSelect, selectedKpiCode }) => {
  if (!kpis || kpis.length === 0) {
    return (
      <Paper
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          No KPIs to display for this topic
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 1, textAlign: "center" }}>
        <Typography variant="subtitle2" color="text.secondary">
          Select a card to learn more
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {kpis.map((kpi) => {
          const isSelected = kpi.code === selectedKpiCode;
          const color = kpi.domainColor;

          return (
            <Paper
              key={kpi.code}
              onClick={() => onKpiSelect(kpi)}
              sx={{
                pt: 1,
                pl: 1,
                width: 275,
                height: 60,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
                border: "1px solid",
                borderColor: isSelected ? color : "transparent",
                backgroundColor: isSelected
                  ? "background.selected"
                  : "background.paper",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                sx={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <Box sx={{ width: "55%", textAlign: "right", pr: 1 }}>
                  <Typography
                    sx={{
                      lineHeight: 1,
                      mb: -1,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: color,
                    }}
                  >
                    {kpi.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1 }}
                  >
                    {"\u00A0"}
                  </Typography>
                </Box>

                <Box sx={{ width: "45%", textAlign: "center" }}>
                  <Typography
                    color="text.primary"
                    sx={{
                      fontWeight: "bold",
                      lineHeight: 1,
                      mb: -1,
                      fontSize: "2rem",
                    }}
                  >
                    {kpi.stat}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1 }}
                  >
                    {kpi.unit ? kpi.unit : "\u00A0"}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default KpiRow;
