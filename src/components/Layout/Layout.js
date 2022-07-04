import React from "react";
import NavigationBar from "./NavigationBar";

const Layout = ({ children, setColorMode, colorMode, saveColorMode }) => {
  return (
    <>
      <NavigationBar
        setColorMode={setColorMode}
        colorMode={colorMode}
        saveColorMode={saveColorMode}
      ></NavigationBar>
      {children}
    </>
  );
};

export default Layout;
