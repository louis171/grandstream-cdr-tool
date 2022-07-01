import React from "react";
import NavigationBar from "./NavigationBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar></NavigationBar>
      {children}
    </>
  );
};

export default Layout;
