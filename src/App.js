import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SystemInfoView from "./views/SystemInfoView";
import LoginView from "./views/LoginView";
import CdrView from "./views/CdrView";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountsView from "./views/AccountsView";
import ExtensionEditView from "./views/ExtensionEditView";

const App = () => {
  const [userMethod, setUserMethod] = useState("https");
  const [userIpAddress, setUserIpAddress] = useState("");
  const [userPort, setUserPort] = useState(0);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [gsCookie, setGsCookie] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeProvider theme={darkTheme}>
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
                />
              </ThemeProvider>
            }
          />
          <Route
            path="/system"
            element={
              <ThemeProvider theme={darkTheme}>
                <SystemInfoView
                  userMethod={userMethod}
                  userIpAddress={userIpAddress}
                  userPort={userPort}
                  userName={userName}
                  userPassword={userPassword}
                  gsCookie={gsCookie}
                />
              </ThemeProvider>
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
    </HashRouter>
  );
};

export default App;
