import { Box, Paper, Typography } from "@mui/material";
export const LegendPop = () => (
  <Paper elevation={0}>
    <Typography
      variant="subtitle2"
      sx={{ textAlign: "center", fontSize: "0.8rem" }}
    >
      Population
    </Typography>{" "}
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box
        sx={{
          width: 180,
          height: 20,
          background: "linear-gradient(to right, #ffffcc, #b54b00, #ad0104)",
          border: "1px solid #ccc",
        }}
      />
      <Box
        sx={{
          ml: 1,
          height: 20,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">10k</Typography>
        <Typography variant="caption">12.5k</Typography>
        <Typography variant="caption">15k</Typography>
      </Box>
    </Box>
  </Paper>
);
export const LegendEAI = () => (
  <Paper elevation={0}>
    <Typography
      variant="subtitle2"
      sx={{ textAlign: "center", fontSize: "0.8rem" }}
    >
      Economic Activity Index
    </Typography>

    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box
        sx={{
          width: 180,
          height: 20,
          background: "linear-gradient(to right, #2f00ff, #ffffff, #c30003)",
          border: "1px solid #ccc",
        }}
      />
      <Box
        sx={{
          ml: 1,
          height: 20,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">-1 (Low)</Typography>
        <Typography variant="caption">0</Typography>
        <Typography variant="caption">1 (High)</Typography>
      </Box>
    </Box>
  </Paper>
);
