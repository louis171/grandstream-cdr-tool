import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

import { ToastContainer, toast } from "react-toastify";
import CardSysInfo from "../components/SystemInfo/CardSysInfo";
import CardTrunks from "../components/SystemInfo/CardTrunks";
import CardAccounts from "../components/SystemInfo/CardAccounts";
import CardInbound from "../components/SystemInfo/CardInbound";

const SystemInfoView = (props) => {
  const navigate = useNavigate();
  const { userMethod, userIpAddress, userPort, gsCookie } = props;
  const [systemStatus, setSystemStatus] = useState({});
  const [systemGeneralStatus, setSystemGeneralStatus] = useState({});
  const [listVoipTrunk, setListVoipTrunk] = useState([]);
  const [listAnalogTrunk, setListAnalogTrunk] = useState([]);
  const [listAccounts, setListAccounts] = useState([]);
  const [listInboundRoutes, setListInboundRoutes] = useState([]);

  const [isLoadingSystemStatus, setIsLoadingSystemStatus] = useState(true);
  const [isLoadingGeneralSystemStatus, setIsLoadingGeneralSystemStatus] =
    useState(true);
  const [isLoadingVoipTrunk, setIsLoadingVoipTrunk] = useState(true);
  const [isLoadingAnalogTrunk, setIsLoadingAnalogTrunk] = useState(true);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [isLoadingInboundRoutes, setIsLoadingInboundRoutes] = useState(true);

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
        setIsLoadingSystemStatus(false);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
        toast.error("Sorry an error occured. Code: 02");
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
        setIsLoadingGeneralSystemStatus(false);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
        toast.error("Sorry an error occured. Code: 03");
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
        setIsLoadingVoipTrunk(false);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
        toast.error("Sorry an error occured. Code: 06");
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
        setIsLoadingAnalogTrunk(false);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
        toast.error("Sorry an error occured. Code: 06");
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
        setIsLoadingAccounts(false);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
        toast.error("Sorry an error occured. Code: 05");
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
        setIsLoadingInboundRoutes(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
        toast.error("Sorry an error occured. Code: 06");
      });
  }, [gsCookie, userIpAddress, userMethod, userPort, navigate]);

  if (!gsCookie || gsCookie === "") {
    navigate("/");
  }

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <ToastContainer autoClose={2000} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 3,
          width: "100%"
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CardSysInfo
              systemGeneralStatus={systemGeneralStatus}
              systemStatus={systemStatus}
              isLoadingGeneralSystemStatus={isLoadingGeneralSystemStatus}
              isLoadingSystemStatus={isLoadingSystemStatus}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CardTrunks
              isLoadingAnalogTrunk={isLoadingAnalogTrunk}
              isLoadingVoipTrunk={isLoadingVoipTrunk}
              listAnalogTrunk={listAnalogTrunk}
              listVoipTrunk={listVoipTrunk}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: ".3em" }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CardAccounts
              isLoadingAccounts={isLoadingAccounts}
              listAccounts={listAccounts}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CardInbound
              listInboundRoutes={listInboundRoutes}
              isLoadingInboundRoutes={isLoadingInboundRoutes}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SystemInfoView;
