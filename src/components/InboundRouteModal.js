import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { dummyGetInbound } from "../DUMMY_DATA";
import TextfieldGs from "./inputs/TextfieldGs";
import SelectGs from "./inputs/SelectGs";
import CheckboxGs from "./inputs/CheckboxGs";
import SelectMultiGs from "./inputs/SelectMultiGs";

const accounts = [
  { label: "200 Reception 1", value: "200" },
  { label: "201 Reception 2", value: "201" },
  { label: "202 Ellis Barker", value: "202" },
  { label: "202 Samantha Smart", value: "203" },
];

const alertLevels = [
  { label: "None", value: "" },
  { label: "Ring 1", value: "ring1" },
  { label: "Ring 2", value: "ring2" },
  { label: "Ring 3", value: "ring3" },
  { label: "Ring 4", value: "ring4" },
  { label: "Ring 5", value: "ring5" },
  { label: "Ring 6", value: "ring6" },
  { label: "Ring 7", value: "ring7" },
  { label: "Ring 8", value: "ring8" },
  { label: "Ring 9", value: "ring9" },
  { label: "Ring 10", value: "ring10" },
  { label: "Bellcore-dr1", value: "Bellcore-dr1" },
  { label: "Bellcore-dr2", value: "Bellcore-dr2" },
  { label: "Bellcore-dr3", value: "Bellcore-dr3" },
  { label: "Bellcore-dr4", value: "Bellcore-dr4" },
  { label: "Bellcore-dr5", value: "Bellcore-dr5" },
];

const ringBackTone = [
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
    console.log(res);
    //let res = dummyGetInbound;
    console.log(res);

    setData(res);
    setIsLoading(false);
  };

  const handleClose = () => {
    setModalOpen(false);
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
                  <Grid item xs={12} sm={12} md={6} lg={8}>
                    <TextfieldGs
                      tooltipText=""
                      value={data.inbound_routes.inbound_rt_name}
                      dataKey="inbound_rt_name"
                      dataObj="inbound_routes"
                      size="small"
                      label="Inbound Route Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      checked={
                        data.inbound_routes.out_of_service === "yes"
                          ? true
                          : false
                      }
                      label="Disable This Route"
                      dataKey="out_of_service"
                      dataObj="inbound_routes"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TableContainer>
                      <Table size="small" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Pattern
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.did_pattern_match.map((row) => (
                            <TableRow
                              key={row.match}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                {row.did_pattern_match === "" ? "-" : row.did_pattern_match}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectMultiGs
                      readOnly={true}
                      size="small"
                      menuItems={accounts}
                      itemKey="value"
                      itemLabel="label"
                      itemValue="value"
                      value={data.inbound_routes.seamless_transfer_did_whitelist.split(
                        ","
                      )}
                      dataKey="seamless_transfer_did_whitelist"
                      dataObj="inbound_routes"
                      label="Seamless Transfer Whitelist"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectGs
                      readOnly={true}
                      size="small"
                      menuItems={alertLevels}
                      itemKey="value"
                      itemLabel="label"
                      itemValue="value"
                      value={data.inbound_routes.alertinfo}
                      dataKey="alertinfo"
                      dataObj="inbound_routes"
                      label="Alert-info"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextfieldGs
                      tooltipText=""
                      value={data.inbound_routes.special_tone}
                      dataKey="special_tone"
                      dataObj="inbound_routes"
                      size="small"
                      label="Ringback Tone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      checked={
                        data.inbound_routes.enable_fax_detect === "yes"
                          ? true
                          : false
                      }
                      label="Fax Detection"
                      dataKey="enable_fax_detect"
                      dataObj="inbound_routes"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextfieldGs
                      tooltipText=""
                      value={
                        data.inbound_routes.fax_intelligent_route_destination
                      }
                      dataKey="fax_intelligent_route_destination"
                      dataObj="inbound_routes"
                      size="small"
                      label="Fax Destination"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextfieldGs
                      tooltipText=""
                      value={data.inbound_routes.fax_intelligent_route}
                      dataKey="fax_intelligent_route"
                      dataObj="inbound_routes"
                      size="small"
                      label="Fax Route Method"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      checked={
                        data.inbound_routes.auto_recording === "yes"
                          ? true
                          : false
                      }
                      label="Auto Record"
                      dataKey="auto_recording"
                      dataObj="inbound_routes"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      checked={
                        data.inbound_routes.blocking_did_collect_calls === "yes"
                          ? true
                          : false
                      }
                      label="Block Collect Calls"
                      dataKey="blocking_did_collect_calls"
                      dataObj="inbound_routes"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      checked={
                        data.inbound_routes.prepend_trunk_name === "yes"
                          ? true
                          : false
                      }
                      label="Prepend Trunk Name"
                      dataKey="prepend_trunk_name"
                      dataObj="inbound_routes"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      checked={
                        data.inbound_routes.set_callerid_enable === "yes"
                          ? true
                          : false
                      }
                      label="Set CallerID Info"
                      dataKey="set_callerid_enable"
                      dataObj="inbound_routes"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextfieldGs
                      tooltipText=""
                      value={data.inbound_routes.set_callerid_name}
                      dataKey="set_callerid_name"
                      dataObj="inbound_routes"
                      size="small"
                      label="CallerID Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextfieldGs
                      tooltipText=""
                      value={data.inbound_routes.set_callerid_number}
                      dataKey="set_callerid_number"
                      dataObj="inbound_routes"
                      size="small"
                      label="CallerID Number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CheckboxGs
                      checked={
                        data.inbound_routes.inbound_muti_mode === 1
                          ? true
                          : false
                      }
                      label="Inbound Multiple Mode"
                      dataKey="inbound_muti_mode"
                      dataObj="inbound_routes"
                    />
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
