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
  ];
  const displayAttributes = Object.keys(item).filter(
    (key) => !excludedAttributes.includes(key)
  );

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
                  sx={{ fontWeight: "bold", width: "30%" }}
                >
                  {key}
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
