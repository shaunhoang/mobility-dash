import { useState, useEffect, useMemo } from "react";
import { Close, Download, ExitToApp } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MetadataTable from "./MetadataTable";
import pathConfig from "../../../config/path/pathConfig";

const DetailsDrawer = ({ item, open, onClose }) => {
  const theme = useTheme();
  const domainColorMap = theme.kpiColorMap;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [kpiDomains, setKpiDomains] = useState([]);
  const [kpiDetails, setKpiDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(pathConfig.KPI_DOMAINS_PATH),
      fetch(pathConfig.KPI_DETAILS_PATH),
    ])
      .then(async ([domainsResponse, detailsResponse]) => {
        if (!domainsResponse.ok || !detailsResponse.ok) {
          throw new Error("Network response was not ok for one or more files.");
        }
        const domainsData = await domainsResponse.json();
        const detailsData = await detailsResponse.json();
        return [domainsData, detailsData];
      })
      .then(([domainsData, detailsData]) => {
        setKpiDomains(domainsData);
        setKpiDetails(detailsData);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch initial data:", fetchError);
        setError("Could not load required data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  if (!item) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: isMobile ? "90%" : "40%", minWidth: 320, maxWidth: 600 },
        },
      }}
    >
      <Box
        sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Box>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />

          {/* Content */}
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {/* Title */}
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Title: </strong> {item.title}
            </Typography>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Description: </strong> {item.description}
            </Typography>
            {/* KPI Chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                <strong>KPI:</strong>
              </Typography>
              {isLoading && (
                <Typography variant="body2">Loading KPIs...</Typography>
              )}
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              {!item.linked_to_kpi && (
                <Typography
                  variant="body2"
                  sx={{ color: "grey", display: "flex", alignItems: "center" }}
                >
                  N/A
                </Typography>
              )}
              {!isLoading &&
                !error &&
                item.linked_to_kpi &&
                (typeof item.linked_to_kpi === "string"
                  ? item.linked_to_kpi.split(",")
                  : item.linked_to_kpi
                ).map((kpiId) => {
                  const trimmedId = String(kpiId).trim();
                  if (!trimmedId) return null;

                  const domain = kpiDomains.find(
                    (d) => Array.isArray(d.kpis) && d.kpis.includes(trimmedId)
                  );
                  const domainId = domain ? domain.id : null;
                  const chipColor = domainId
                    ? domainColorMap[domainId]
                    : theme.palette.grey[400];

                  const kpiInfo = kpiDetails[trimmedId];
                  const chipLabel = kpiInfo ? kpiInfo.title : trimmedId;
                  return (
                    <Chip
                      key={trimmedId}
                      label={chipLabel}
                      size="small"
                      sx={{
                        backgroundColor: chipColor,
                        color: theme.palette.getContrastText(chipColor),
                        mr: 0.5,
                        mb: 0.5,
                      }}
                    />
                  );
                })}
            </Box>
            {/* Tags */}
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                <strong>Tags:</strong>
              </Typography>
              {item.keywords &&
                (typeof item.keywords === "string"
                  ? item.keywords.split(";")
                  : item.keywords
                ).map((tag) => {
                  const trimmedTag = tag.trim();
                  return trimmedTag ? (
                    <Chip
                      key={trimmedTag}
                      label={trimmedTag}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ) : null;
                })}
            </Box>
          </Box>

          {/* Metadata table */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Metadata
            </Typography>
            <MetadataTable item={item} />
          </Box>
        </Box>

        {/* Download buttons */}
        <Box
          sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<Download />}
            fullWidth
            disabled={!item.url_download}
            onClick={(e) => {
              e.stopPropagation();
              const link = document.createElement("a");
              link.href = item.url_download;
              const fileName = item.url_download.split("/").pop();
              link.setAttribute("download", fileName || "download");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download Sample
          </Button>

          <Button
            variant="contained"
            size="large"
            endIcon={<ExitToApp />}
            fullWidth
            disabled={!item.url}
            onClick={(e) => {
              e.stopPropagation();
              window.open(item.url, "_blank");
              const link = document.createElement("a");
              link.href = item.url;
              const fileName = item.url.split("/").pop(); // file name
              link.setAttribute("download", fileName || "download");
              link.setAttribute("target", "_blank");
              link.setAttribute("rel", "noopener noreferrer");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Go to Source
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailsDrawer;
