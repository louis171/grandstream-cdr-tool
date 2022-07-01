import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
/* import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"; */

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

/* const drawerWidth = 550;
const transitionDuration = 1000; //can also use theme.transitions.duration */

const NavigationBar = () => {
  //const theme = useTheme();
  //const greaterThan375 = useMediaQuery("(min-width:376px)");
  //theme.drawerWidth = greaterThan375 ? drawerWidth : "100%";
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton //hide on desktop
            size="large"
            color="inherit"
            onClick={handleMenuClick}
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} noWrap>
            Grandstream UCM63XX API
          </Typography>
          <Link
            sx={{ color: "inherit", textDecoration: "none" }}
            component={RouterLink}
            to="/"
          >
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        onClose={handleMenuClick}
        open={open}
        PaperProps={{ elevation: 9, sx: { width: "25%" } }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
            noWrap
          >
            Grandstream API
          </Typography>
        </Toolbar>
        <div>
          <List>
            <Link
              sx={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
              onClick={handleMenuClick}
              component={RouterLink}
              to="/"
            >
              <ListItem button>
                <ListItemIcon>
                  <VpnKeyRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
            <Link
              sx={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
              onClick={handleMenuClick}
              component={RouterLink}
              to="/system"
            >
              <ListItem button>
                <ListItemIcon>
                  <InfoRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="System Info" />
              </ListItem>
            </Link>
            <Link
              sx={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
              onClick={handleMenuClick}
              component={RouterLink}
              to="/cdr"
            >
              <ListItem button>
                <ListItemIcon>
                  <ApiRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="CDR API" />
              </ListItem>
            </Link>
            {/* <Link
              sx={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
              onClick={handleMenuClick}
              component={RouterLink}
              to="/accounts"
            >
              <ListItem button>
                <ListItemIcon>
                  <LocalPhoneRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
              </ListItem>
            </Link> */}
          </List>
        </div>
      </Drawer>
      <div style={{ height: "80px" }}></div>
    </>
  );
};

export default NavigationBar;
