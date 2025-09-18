import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const MetadataTable = ({ item }) => {
  if (!item) return null;

  const excludedAttributes = [
    "id",
    "title",
    "description",
    "url",
    "url_download",
    "lastupdate",
    "keywords",
    "linked_to_kpi",
  ];
  const displayAttributes = Object.keys(item).filter(
    (key) => !excludedAttributes.includes(key)
  );

  // Format labels to be more human-readable
  const formatLabel = (key) => {
    const spaced = key.replace(/__/g, ": ").replace(/_/g, " ");
    return spaced
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
      <Table size="small">
        <TableBody>
          {displayAttributes.map((key) => {
            const value = item[key];
            return (
              <TableRow key={key}>
                <TableCell
                  scope="row"
                  sx={{ fontWeight: "bold", width: "40%" }}
                >
                  {formatLabel(key)}
                </TableCell>
                <TableCell sx={{ color: value ? "text.primary" : "grey.300" }}>
                  {value || "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetadataTable;
