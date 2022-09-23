import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { titleCase } from "../../../functions/functions";

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PhoneMissedRoundedIcon from "@mui/icons-material/PhoneMissedRounded";
import PhoneDisabledRoundedIcon from "@mui/icons-material/PhoneDisabledRounded";

import { darken, lighten } from "@mui/material/styles";

const CustomRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {titleCase(row[0].disposition)}
        </TableCell>
        <TableCell>{row[0].src}</TableCell>
        <TableCell>{row[0].dst}</TableCell>
        <TableCell>{row[0].userfield}</TableCell>
        <TableCell>{row[0].start}</TableCell>
        <TableCell>{row[0].end}</TableCell>
        <TableCell>{row[0].duration}</TableCell>
        <TableCell>{row[0].billsec}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Disposition</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Call Type</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Billable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((subCdr) => (
                  <TableRow
                    key={
                      subCdr.AcctId
                        ? subCdr.AcctId
                        : Math.random() * (100000 - 1) + 1
                    }
                  >
                    <TableCell>
                      {subCdr.disposition === "ANSWERED" ? (
                        <LocalPhoneRoundedIcon color="success" />
                      ) : null}
                      {subCdr.disposition === "NO ANSWER" ? (
                        <PhoneMissedRoundedIcon color="warning" />
                      ) : null}
                      {subCdr.disposition === "FAILED" ? (
                        <PhoneDisabledRoundedIcon color="error" />
                      ) : null}
                      {subCdr.disposition === "BUSY" ? (
                        <PhoneDisabledRoundedIcon color="error" />
                      ) : null}
                    </TableCell>
                    <TableCell>{titleCase(subCdr.disposition)}</TableCell>
                    <TableCell>{subCdr.src}</TableCell>
                    <TableCell>{subCdr.dst}</TableCell>
                    <TableCell>{subCdr.userfield}</TableCell>
                    <TableCell>{subCdr.start}</TableCell>
                    <TableCell>{subCdr.end}</TableCell>
                    <TableCell>{subCdr.duration}</TableCell>
                    <TableCell>{subCdr.billsec}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomRow;
