import React from "react";
import { useState, createContext } from "react";

export const GsContext = createContext({
  cookie: "",
  userMethod: "https",
  userIpAddress: "192.168.80.199",
  userPort: 8089,
  userName: "cdroakapi",
  userPassword: "MagicMan21#",
});

const GsContextProvider = (props) => {
  const [gsLogin, setGsLogin] = useState({
    cookie: "",
    userMethod: "",
    userIpAddress: "",
    userPort: 0,
    userName: "",
    userPassword: "",
  });

  return (
    <GsContext.Provider value={{ setGsLogin, gsLogin }}>
      {props.children}
    </GsContext.Provider>
  );
};

export default GsContextProvider;
