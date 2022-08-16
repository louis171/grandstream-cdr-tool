import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SystemInfoView from "./views/SystemInfoView";
import LoginView from "./views/LoginView";
import CdrView from "./views/CdrView";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

const App = () => {
  const [colorMode, setColorMode] = useState("light");
  const [userMethod, setUserMethod] = useState("https");
  const [userIpAddress, setUserIpAddress] = useState("");
  const [userPort, setUserPort] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [gsCookie, setGsCookie] = useState("");

  const [saveChecked, setSaveChecked] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("I'm a custom snackbar");
  const [duration, setDuration] = useState(2000);
  const [severity, setSeverity] =
    useState("success"); /** error | warning | info */

  const showMessage = (message, severity = "success", duration = 2000) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveUserLogin = async (e) => {
    setSaveChecked(e.target.checked);
    if (e.target.checked === true) {
      await electron.userDetails.save({
        userMethod,
        userIpAddress,
        userPort,
        userName,
        userPassword,
        saveChecked: e.target.checked,
      });
      // await electron.notificationApi.sendNotification("Details saved");
    } else if (e.target.checked === false) {
      await electron.userDetails.delete({
        saveChecked: e.target.checked,
      });
      // await electron.notificationApi.sendNotification("Details deleted");
    }
  };

  const saveColorMode = async (e) => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    await electron.userPreferences.save({
      colorMode: colorMode === "light" ? "dark" : "light",
    });
  };

  useEffect(() => {
    async function userPref() {
      const data = await electron.userPreferences.load();
      if (data) {
        setColorMode(data.colorMode);
      } else {
        setColorMode("light");
      }
    }
    userPref();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <Layout
          saveColorMode={saveColorMode}
          setColorMode={setColorMode}
          colorMode={colorMode}
        >
          <Routes>
            <Route
              path="/"
              element={
                <LoginView
                  setUserMethod={setUserMethod}
                  userMethod={userMethod}
                  setUserIpAddress={setUserIpAddress}
                  userIpAddress={userIpAddress}
                  setUserPort={setUserPort}
                  userPort={userPort}
                  setUserName={setUserName}
                  userName={userName}
                  setUserPassword={setUserPassword}
                  userPassword={userPassword}
                  setGsCookie={setGsCookie}
                  setSaveChecked={setSaveChecked}
                  saveChecked={saveChecked}
                  saveUserLogin={saveUserLogin}
                  showMessage={showMessage}
                />
              }
            />
            <Route
              path="/system"
              element={
                <SystemInfoView
                  userMethod={userMethod}
                  userIpAddress={userIpAddress}
                  userPort={userPort}
                  userName={userName}
                  userPassword={userPassword}
                  gsCookie={gsCookie}
                  showMessage={showMessage}
                />
              }
            />
            <Route
              path="/cdr"
              element={
                <CdrView
                  userMethod={userMethod}
                  userIpAddress={userIpAddress}
                  userPort={userPort}
                  userName={userName}
                  userPassword={userPassword}
                  gsCookie={gsCookie}
                  showMessage={showMessage}
                />
              }
            />
          </Routes>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            autoHideDuration={duration}
            open={open}
            onClose={handleClose}
            TransitionComponent={Slide}
          >
            <Alert variant="filled" onClose={handleClose} severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        </Layout>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
