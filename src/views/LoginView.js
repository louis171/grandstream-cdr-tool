import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import md5 from "md5";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { validateIPaddress } from "../functions/functions";

import { ToastContainer, toast } from "react-toastify";

const LoginView = (props) => {
  const {
    setUserMethod,
    userMethod,
    setUserIpAddress,
    userIpAddress,
    setUserPort,
    userPort,
    setUserName,
    userName,
    setUserPassword,
    userPassword,
    setGsCookie,
    saveChecked,
    setSaveChecked,
    saveUserLogin,
  } = props;

  const navigate = useNavigate();

  // useEffect for loading userDetails using ipc
  useEffect(() => {
    // Queries ipcMain for userDetails
    async function userDetails() {
      const data = await electron.userDetails.load({
        saveChecked: true,
      });
      if (data) {
        // if Remember Me wasn't ticked then it returns {saveChecked: false}
        if (data.saveChecked !== false) {
          setUserMethod(data.userMethod);
          setUserIpAddress(data.userIpAddress);
          setUserPort(data.userPort);
          setUserName(data.userName);
          setUserPassword(data.userPassword);
          setSaveChecked(data.saveChecked);
        }
      }
    }
    userDetails();
  }, []);

  const challengeGs = async (e) => {
    e.preventDefault();
    await axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "challenge",
          user: userName,
          version: "1.0",
        },
      })
      .then((res) => {
        loginGs(res.data.response.challenge);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry an error occured. Code: 00");
      });
  };

  const loginGs = async (challenge) => {
    await axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "login",
          token: md5(challenge + userPassword).toString(),
          url: `${userMethod}://${userIpAddress}:${userPort}`,
          user: userName,
        },
      })
      .then((res) => {
        toast.success("Successfully logged in");
        setGsCookie(res.data.response.cookie);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry an error occured. Code: 01");
      })
      .finally(() => {
        setTimeout(() => {
          navigate("/cdr");
        }, 2000);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <ToastContainer autoClose={2000} />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => challengeGs(e)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl fullWidth required>
                <Select
                  fullWidth
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => setUserMethod(e.target.value)}
                  value={userMethod}
                >
                  <MenuItem value="https">https</MenuItem>
                  <MenuItem value="http">http</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                fullWidth
                required
                onChange={(e) => setUserIpAddress(e.target.value)}
                value={userIpAddress}
                error={validateIPaddress(userIpAddress)}
                helperText={
                  validateIPaddress(userIpAddress) ? "Invalid IP Address" : ""
                }
                id="connectIpAddress"
                label="IP Address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                fullWidth
                required
                onChange={(e) => setUserPort(e.target.value)}
                value={userPort}
                error={userPort > 0 && userPort <= 65535 ? false : true}
                helperText={
                  userPort > 0 && userPort <= 65535 ? null : "Invalid port"
                }
                id="connectPort"
                label="Port"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                required
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                error={userName.length > 0 ? false : true}
                helperText={userName.length > 0 ? null : "Invalid username"}
                label="Username"
                id="connectUsername"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                required
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
                error={userPassword.length > 0 ? false : true}
                helperText={userPassword.length > 0 ? null : "Invalid password"}
                id="connectPassword"
                label="Password"
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display="flex"
              justifyContent="center"
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={saveChecked} onChange={saveUserLogin} />
                  }
                  label="Remember me"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginView;
