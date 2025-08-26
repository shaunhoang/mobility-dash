import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Typography } from "@mui/material";

const TabDescription = ({ activeLayer , tabContent }
) => {
  const activeContent = tabContent[activeLayer];
  if (!activeContent) return null;

  return (
    <Box sx={{ position: "relative", mb: 3, pl: 2 }}>
      <Box
        sx={{
          borderLeft: 4,
          borderColor: "primary.main",
          pl: 4,
          py: 1,
          position: "relative",
        }}
      >
        <InfoOutlinedIcon
          sx={{
            position: "absolute",
            left: -14, 
            top: 14,
            color: "primary.main",
            backgroundColor: "background.default", 
            borderRadius: "50%",
          }}
        />
        <Typography variant="h5" fontWeight="bold" color="primary.main" mb={1}>
          {activeContent.title}
        </Typography>
        {typeof activeContent.description === "string" ? (
          <Typography variant="body2" color="text.secondary">
            {activeContent.description}
          </Typography>
        ) : (
          activeContent.description
        )}
      </Box>
    </Box>
  );
};

export default TabDescription;
