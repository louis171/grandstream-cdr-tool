import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

import CardSysInfo from "../components/SystemInfo/CardSysInfo";
import CardTrunks from "../components/SystemInfo/CardTrunks";
import CardAccounts from "../components/SystemInfo/CardAccounts";
import CardInbound from "../components/SystemInfo/CardInbound";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Button from "@mui/material/Button";

import {
  dummySysInfo,
  dummyGeneralStatus,
  dummyInbound,
  dummyVIOPTrunks,
  dummyAnalogueTrunks,
  dummyAccounts,
  dummyOutbound,
} from "../DUMMY_DATA";

import { gsReturnCodeHandler } from "../functions/gsReturnCodeHandler";
import GetRequestModal from "../components/GetRequestModal";
import OutboundRouteModal from "../components/OutboundRouteModal";
import PlaceholderTable from "../components/SystemInfo/PlaceholderTable";
import SysInfoCard from "../components/SystemInfo/SysInfoCard";
import InboundRouteModal from "../components/InboundRouteModal";

const SystemInfoView = ({
  userMethod,
  userIpAddress,
  userPort,
  gsCookie,
  showMessage,
}) => {
  const navigate = useNavigate();

  const [systemStatus, setSystemStatus] = useState({});
  const [systemGeneralStatus, setSystemGeneralStatus] = useState({});
  const [listVoipTrunk, setListVoipTrunk] = useState([]);
  const [listAnalogTrunk, setListAnalogTrunk] = useState([]);
  const [listAccounts, setListAccounts] = useState([]);
  const [listInboundRoutes, setListInboundRoutes] = useState([]);
  const [listOutboundRoutes, setListOutboundRoutes] = useState([]);

  const [isLoadingSystemStatus, setIsLoadingSystemStatus] = useState(true);
  const [isLoadingGeneralSystemStatus, setIsLoadingGeneralSystemStatus] =
    useState(true);
  const [isLoadingVoipTrunk, setIsLoadingVoipTrunk] = useState(true);
  const [isLoadingAnalogTrunk, setIsLoadingAnalogTrunk] = useState(true);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [isLoadingInboundRoutes, setIsLoadingInboundRoutes] = useState(true);
  const [isLoadingOutboundRoutes, setIsLoadingOutboundRoutes] = useState(true);

  // useEffect(() => {
  //   setSystemStatus(dummySysInfo);
  //   setIsLoadingSystemStatus(false);
  //   setSystemGeneralStatus(dummyGeneralStatus);
  //   setIsLoadingGeneralSystemStatus(false);
  //   setListVoipTrunk(dummyVIOPTrunks);
  //   setIsLoadingVoipTrunk(false);
  //   setListAnalogTrunk(dummyAnalogueTrunks);
  //   setIsLoadingAnalogTrunk(false);
  //   setListAccounts(dummyAccounts);
  //   setIsLoadingAccounts(false);
  //   setListInboundRoutes(dummyInbound);
  //   setIsLoadingInboundRoutes(false);
  //   setListOutboundRoutes(dummyOutbound);
  //   setIsLoadingOutboundRoutes(false);
  // }, []);

  useEffect(() => {
    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "getSystemStatus",
          cookie: gsCookie,
        },
      })
      .then((res) => {
        setSystemStatus(res.data.response);
        //console.log(res.data.response);
        //setSystemStatus(dummySysInfo);
        setIsLoadingSystemStatus(false);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
      });

    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "getSystemGeneralStatus",
          cookie: gsCookie,
        },
      })
      .then((res) => {
        setSystemGeneralStatus(res.data.response);
        //console.log(res.data.response);
        //setSystemGeneralStatus(dummyGeneralStatus);
        setIsLoadingGeneralSystemStatus(false);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
      });

    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "listVoIPTrunk",
          cookie: gsCookie,
        },
      })
      .then((res) => {
        setListVoipTrunk(res.data.response);
        //console.log(res.data.response);
        //setListVoipTrunk(dummyVIOPTrunks);
        setIsLoadingVoipTrunk(false);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
      });

    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "listAnalogTrunk",
          cookie: gsCookie,
        },
      })
      .then((res) => {
        setListAnalogTrunk(res.data.response);
        //console.log(res.data.response);
        //setListAnalogTrunk(dummyAnalogueTrunks);
        setIsLoadingAnalogTrunk(false);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
      });

    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "listAccount",
          cookie: gsCookie,
          sidx: "extension",
          sord: "asc",
        },
      })
      .then((res) => {
        setListAccounts(res.data.response.account);
        //console.log(res.data.response.account);
        //setListAccounts(dummyAccounts);
        setIsLoadingAccounts(false);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
      });

    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "listInboundRoute",
          cookie: gsCookie,
        },
      })
      .then((res) => {
        setListInboundRoutes(res.data.response.inbound_route);
        //console.log(res.data.response.inbound_route);
        //setListInboundRoutes(dummyInbound);
        setIsLoadingInboundRoutes(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
      });

    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "listOutboundRoute",
          cookie: gsCookie,
        },
      })
      .then((res) => {
        setListOutboundRoutes(res.data.response.outbound_route);
        //console.log(res.data.response.outbound_route);
        //setListOutboundRoutes(dummyOutbound);
        setIsLoadingOutboundRoutes(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
      });
  }, [gsCookie, userIpAddress, userMethod, userPort, navigate]);

  if (!gsCookie || gsCookie === "") {
    navigate("/");
  }

  const getSpecificData = async (index, action) => {
    let res;
    try {
      res = await axios.post(
        `${userMethod}://${userIpAddress}:${userPort}/api`,
        action === "getInboundRoute"
          ? {
              request: {
                action: action,
                cookie: gsCookie,
                inbound_route: index,
              },
            }
          : {
              request: {
                action: action,
                cookie: gsCookie,
                outbound_route: index,
              },
            }
      );
    } catch (err) {
      navigate("/");
      console.log(err);
      showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
    }
    if (res.data.status === 0) {
      showMessage(
        `Successfully read ${
          action === "getInboundRoute" ? "inbound" : "outbound"
        } route`,
        "success",
        2000
      );
      return res.data.response;
    } else {
      showMessage(`${gsReturnCodeHandler(res.data.status)}`, "error", 2000);
    }
  };

  const outboundTableHeadings = [
    { label: "Name", key: "headingName" },
    { label: "Pattern", key: "headingPattern" },
    { label: "Permission", key: "headingPermission" },
    { label: "Options", key: "headingOptions" },
  ];
  const outBoundTableRows = [
    { value: "outbound_rt_name" },
    { value: "pattern" },
    { value: "permission" },
  ];

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 3,
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <CardSysInfo
              systemGeneralStatus={systemGeneralStatus}
              systemStatus={systemStatus}
              isLoadingGeneralSystemStatus={isLoadingGeneralSystemStatus}
              isLoadingSystemStatus={isLoadingSystemStatus}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <CardTrunks
              isLoadingAnalogTrunk={isLoadingAnalogTrunk}
              isLoadingVoipTrunk={isLoadingVoipTrunk}
              listAnalogTrunk={listAnalogTrunk}
              listVoipTrunk={listVoipTrunk}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <SysInfoCard
              data={listOutboundRoutes}
              isLoading={isLoadingOutboundRoutes}
              title="Outbound Routes"
              tableHeadings={outboundTableHeadings}
              tableRows={outBoundTableRows}
              getSpecificData={getSpecificData}
              indexKey="outbound_rt_index"
              searchQuery="getOutboundRoute"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Card>
              <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: "center" }}>
                  <Grid item>
                    <Typography color="primary.main" gutterBottom variant="h4">
                      Inbound Routes
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: ".5em", mb: ".5em" }} />
                {isLoadingInboundRoutes ? (
                  <PlaceholderTable />
                ) : (
                  <TableContainer>
                    <Table size="small" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: ".8rem" }}>
                            Inbound Route Name
                          </TableCell>
                          <TableCell sx={{ fontSize: ".8rem" }}>
                            Pattern
                          </TableCell>
                          <TableCell sx={{ fontSize: ".8rem" }}>
                            CallerID Pattern
                          </TableCell>
                          <TableCell sx={{ fontSize: ".8rem" }}>
                            Inbound Mode
                          </TableCell>
                          <TableCell sx={{ fontSize: ".8rem" }}>
                            Options
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listInboundRoutes.map((inbound) => (
                          <TableRow
                            key={inbound.inbound_rt_name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell sx={{ fontSize: ".7rem" }}>
                              {inbound.inbound_rt_name === ""
                                ? "-"
                                : inbound.inbound_rt_name}
                            </TableCell>
                            <TableCell sx={{ fontSize: ".7rem" }}>
                              {inbound.did_pattern_match_list === ""
                                ? "-"
                                : inbound.did_pattern_match_list}
                            </TableCell>
                            <TableCell sx={{ fontSize: ".7rem" }}>
                              {inbound.did_pattern_allow === ""
                                ? "-"
                                : inbound.did_pattern_allow}
                            </TableCell>
                            <TableCell sx={{ fontSize: ".7rem" }}>
                              {inbound.inbound_muti_mode === ""
                                ? "-"
                                : inbound.inbound_muti_mode}
                            </TableCell>
                            <TableCell>
                              <InboundRouteModal
                                onClickFunc={() =>
                                  getSpecificData(
                                    inbound.inbound_rt_index,
                                    "getInboundRoute"
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardAccounts
              isLoadingAccounts={isLoadingAccounts}
              listAccounts={listAccounts}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SystemInfoView;
