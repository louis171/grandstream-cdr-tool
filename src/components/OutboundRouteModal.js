import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { dummyGetOutbound } from "../DUMMY_DATA";
import TextfieldGs from "./inputs/TextfieldGs";
import SelectGs from "./inputs/SelectGs";
import CheckboxGs from "./inputs/CheckboxGs";
import SelectMultiGs from "./inputs/SelectMultiGs";

const privlegeLevels = [
  { label: "Disable", value: "none" },
  { label: "Internal", value: "internal" },
  { label: "Local", value: "local" },
  { label: "National", value: "national" },
  { label: "International", value: "international" },
];

const pinGroups = [
  { label: "CS_Staff_Hotdesk", value: "1669215246712" },
  { label: "Managers", value: "1669375691916" },
];

const accounts = [
  { label: "200 Reception 1", value: "200" },
  { label: "201 Reception 2", value: "201" },
  { label: "202 Ellis Barker", value: "202" },
  { label: "202 Samantha Smart", value: "203" },
];

const OutboundRouteModal = ({ onClickFunc }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const handleClickOpen = async () => {
    setModalOpen(true);
    setIsLoading(true);
    let res = await onClickFunc();
    //let res = dummyGetOutbound;
    console.log(res);

    setData(res);
    setIsLoading(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const updateStateHandler = (stateData) => {
    console.log(stateData);
    console.log(data);
    if (stateData.type === "int") {
      setData((prevState) => ({
        ...prevState,
        [stateData.obj]: {
          ...prevState[stateData.obj],
          [stateData.key]: Number(stateData.value),
        },
      }));
    } else if (stateData.type === "bool") {
      setData((prevState) => ({
        ...prevState,
        [stateData.obj]: {
          ...prevState[stateData.obj],
          [stateData.key]: stateData.value === true ? "yes" : "no",
        },
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [stateData.obj]: {
          ...prevState[stateData.obj],
          [stateData.key]: String(stateData.value),
        },
      }));
    }
  };

  const callDurationLimit = (data, returnValue) => {
    if (data.outbound_route.limitime !== "") {
      let callDurationLimitArr = data.outbound_route.limitime
        .replace(/([L()])/g, "")
        .split(":");
      let warningTime = callDurationLimitArr[0];
      let maximumCallDuration = callDurationLimitArr[1];
      let warningRepeatInterval = callDurationLimitArr[2];
      if (returnValue === "warningTime") {
        return Number(warningTime) / 1000;
      } else if (returnValue === "maximumCallDuration") {
        return Number(maximumCallDuration) / 1000;
      } else if (returnValue === "warningRepeatInterval") {
        return Number(warningRepeatInterval) / 1000;
      }
    }
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="View Outbound route"
        size="small"
        onClick={handleClickOpen}
      >
        <VisibilityRoundedIcon fontSize="small" />
      </IconButton>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {data ? (
          <>
            <DialogTitle id="alert-dialog-title">
              {`Outbound Route`}
            </DialogTitle>
            <DialogContent>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={4} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography>General</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={8}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={data.outbound_route.outbound_rt_name}
                      dataKey="outbound_rt_name"
                      dataObj="outbound_route"
                      size="small"
                      label="Outbound Rule Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      readOnly={true}
                      checked={
                        data.outbound_route.out_of_service === "yes"
                          ? true
                          : false
                      }
                      label="Disable This Route"
                      dataKey="out_of_service"
                      dataObj="outbound_route"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SelectGs
                      readOnly={true}
                      size="small"
                      menuItems={privlegeLevels}
                      itemKey="value"
                      itemLabel="label"
                      itemValue="value"
                      value={data.outbound_route.permission}
                      dataKey="permission"
                      dataObj="outbound_route"
                      label="Privlege Level"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SelectGs
                      readOnly={true}
                      size="small"
                      menuItems={pinGroups}
                      itemKey="value"
                      itemLabel="label"
                      itemValue="value"
                      value={data.outbound_route.pin_sets_id}
                      dataKey="pin_sets_id"
                      dataObj="outbound_route"
                      label="PIN Groups"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      readOnly={true}
                      checked={
                        data.outbound_route.pinset_with_permission === "yes"
                          ? true
                          : false
                      }
                      label="PIN Groups with Privilege Level"
                      dataKey="pinset_with_permission"
                      dataObj="outbound_route"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={data.outbound_route.password}
                      dataKey="password"
                      dataObj="outbound_route"
                      size="small"
                      label="Password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      readOnly={true}
                      checked={
                        data.outbound_route.auto_recording === "yes"
                          ? true
                          : false
                      }
                      label="Auto Record"
                      dataKey="auto_recording"
                      dataObj="outbound_route"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={data.outbound_route.country_prefix}
                      dataKey="country_prefix"
                      dataObj="outbound_route"
                      size="small"
                      label="Local Country Code"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography>Pattern</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={12}>
                      <TableContainer>
                        <Table
                          size="small"
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Match
                              </TableCell>
                              <TableCell>
                                Allow
                              </TableCell>
                              <TableCell>
                                Strip
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.pattern.map((row) => (
                              <TableRow
                                key={row.match}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>
                                  {row.match === "" ? "-" : row.match}
                                </TableCell>
                                <TableCell>
                                  {row.allow === "" ? "-" : row.allow}
                                </TableCell>
                                <TableCell>
                                  {row.strip_prefix === ""
                                    ? "-"
                                    : row.strip_prefix}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography>Enable Source Caller ID Whitelist</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CheckboxGs
                      readOnly={true}
                      checked={
                        data.outbound_route.enable_wlist === "yes"
                          ? true
                          : false
                      }
                      label="Enable Source Caller ID Whitelist"
                      dataKey="enable_wlist"
                      dataObj="outbound_route"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={data.outbound_route.custom_member}
                      dataKey="custom_member"
                      dataObj="outbound_route"
                      size="small"
                      label="Source Caller ID Pattern"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={data.outbound_route.fullcallid}
                      dataKey="fullcallid"
                      dataObj="outbound_route"
                      size="small"
                      label="Outbound Route CID"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectMultiGs
                      readOnly={true}
                      size="small"
                      menuItems={accounts}
                      itemKey="value"
                      itemLabel="label"
                      itemValue="value"
                      value={data.outbound_route.members.split(",")}
                      dataKey="members"
                      dataObj="outbound_route"
                      label="Whitelisted Extensions/Extension Groups"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography>Call Duration Limit</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={callDurationLimit(data, "warningTime")}
                      dataKey="limitime"
                      dataObj="outbound_route"
                      size="small"
                      label="Warning Time (s)"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={callDurationLimit(data, "maximumCallDuration")}
                      dataKey="limitime"
                      dataObj="outbound_route"
                      size="small"
                      label="Maximum Call Duration (s)"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextfieldGs
                      readOnly={true}
                      tooltipText=""
                      value={callDurationLimit(data, "warningRepeatInterval")}
                      dataKey="limitime"
                      dataObj="outbound_route"
                      size="small"
                      label="Warning Repeat Interval (s)"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={12}>
                    <Typography>Failover Trunk</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={12}>
                      <TableContainer>
                        <Table
                          size="small"
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Outbound Route Index</TableCell>
                              <TableCell>Failover Trunk Index</TableCell>
                              <TableCell>Failover Trunk Sequence</TableCell>
                              <TableCell>Failover Strip</TableCell>
                              <TableCell>Failover Prepend</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.failover_outbound_data.map((row) => (
                              <TableRow
                                key={row.outbound_rt_index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>
                                  {row.outbound_rt_index === ""
                                    ? "-"
                                    : row.outbound_rt_index}
                                </TableCell>
                                <TableCell>
                                  {row.failover_trunk_index === ""
                                    ? "-"
                                    : row.failover_trunk_index}
                                </TableCell>
                                <TableCell>
                                  {row.failover_trunk_sequence === ""
                                    ? "-"
                                    : row.failover_trunk_sequence}
                                </TableCell>
                                <TableCell>
                                  {row.failover_strip === ""
                                    ? "-"
                                    : row.failover_strip}
                                </TableCell>
                                <TableCell>
                                  {row.failover_prepend === ""
                                    ? "-"
                                    : row.failover_prepend}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
          </>
        ) : null}
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OutboundRouteModal;
