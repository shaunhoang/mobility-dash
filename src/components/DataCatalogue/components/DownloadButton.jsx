import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { useMemo } from "react";


const DownloadButton = ({ data = [], filename = "results.csv" }) => {

  const headers = useMemo(() => {
    if (data.length === 0) {
      return [];
    }
    const keys = Object.keys(data[0]);     // Get the keys from the first object to create the headers.
    return keys.map((key) => ({
      label: key,
      key: key,
    })); 
  }, [data]);

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={filename}
      style={{ textDecoration: "none" }}
      target="_blank"
    >
      <Button variant="outlined" startIcon={<DownloadIcon />}>
        Export results (CSV)
      </Button>
    </CSVLink>
  );
};

export default DownloadButton;
