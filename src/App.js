import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SystemInfoView from "./views/SystemInfoView";
import LoginView from "./views/LoginView";
import CdrView from "./views/CdrView";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountsView from "./views/AccountsView";
import ExtensionEditView from "./views/ExtensionEditView";

const App = () => {
  const [colorMode, setColorMode] = useState("light");
  const [userMethod, setUserMethod] = useState("https");
  const [userIpAddress, setUserIpAddress] = useState("");
  const [userPort, setUserPort] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [gsCookie, setGsCookie] = useState("");

  const [saveChecked, setSaveChecked] = useState(false);

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
      setColorMode(data.colorMode);
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
                />
              }
            />
            <Route
              path="/accounts"
              element={
                <AccountsView
                  userMethod={userMethod}
                  userIpAddress={userIpAddress}
                  userPort={userPort}
                  userName={userName}
                  userPassword={userPassword}
                  gsCookie={gsCookie}
                />
              }
            />
            <Route
              path="/extension/:extensionId"
              element={
                <ExtensionEditView
                  userMethod={userMethod}
                  userIpAddress={userIpAddress}
                  userPort={userPort}
                  userName={userName}
                  userPassword={userPassword}
                  gsCookie={gsCookie}
                />
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
