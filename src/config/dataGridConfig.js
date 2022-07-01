import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PhoneMissedRoundedIcon from "@mui/icons-material/PhoneMissedRounded";
import PhoneDisabledRoundedIcon from "@mui/icons-material/PhoneDisabledRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import { titleCase } from "../functions/functions";

export const columns = [
  {
    field: "disposition",
    headerName: "Disposition",
    flex: 1,
    renderCell: (params) => {
      return params.row.disposition === undefined ||
        params.row.disposition === "" ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <ErrorRoundedIcon sx={{ pr: ".5em" }} />
          <Typography variant="body2" sx={{ border: "none" }}>
            {titleCase("unknown")}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          {params.row.disposition === "ANSWERED" ? (
            <LocalPhoneRoundedIcon sx={{ pr: ".5em" }} />
          ) : null}
          {params.row.disposition === "NO ANSWER" ? (
            <PhoneMissedRoundedIcon sx={{ pr: ".5em" }} />
          ) : null}
          {params.row.disposition === "FAILED" ? (
            <PhoneDisabledRoundedIcon sx={{ pr: ".5em" }} />
          ) : null}
          <Typography variant="body2" sx={{ border: "none" }}>
            {titleCase(params.row.disposition)}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "src",
    headerName: "Source",
    flex: 1,
  },
  {
    field: "dst",
    headerName: "Destination",
    flex: 1,
  },

  {
    field: "userfield",
    headerName: "Call Type",
    flex: 1,
  },
  {
    field: "start",
    headerName: "Start",
    flex: 1,
  },
  {
    field: "end",
    headerName: "End",
    flex: 1,
  },
  {
    field: "duration",
    headerName: "Duration",
    flex: 1,
  },
  {
    field: "billsec",
    headerName: "Billable",
    flex: 1,
  },
];
