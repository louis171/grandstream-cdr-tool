import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
/* import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"; */

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";

/* const drawerWidth = 550;
const transitionDuration = 1000; //can also use theme.transitions.duration */

const NavigationBar = ({ setColorMode, colorMode, saveColorMode }) => {
  //const theme = useTheme();
  //const greaterThan375 = useMediaQuery("(min-width:376px)");
  //theme.drawerWidth = greaterThan375 ? drawerWidth : "100%";
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
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
            Grandstream UCM63XX CDR Tool
          </Typography>
          {/* Light/Dark mode toggle button. Handles text change and icon change */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                mr: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              color="inherit"
              onClick={() => saveColorMode()}
            >
              <Typography
                fontSize="inherit"
                fontWeight="inherit"
                lineHeight="inherit"
                letterSpacing="inherit"
                sx={{ m: 0, mr: 1, p: 0 }}
              >
                {colorMode} mode
              </Typography>
              {colorMode === "dark" ? (
                <Brightness7Icon sx={{ m: 0, p: 0, width: "16px" }} />
              ) : (
                <Brightness4Icon sx={{ m: 0, p: 0, width: "16px" }} />
              )}
            </Button>
          </Box>

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
            variant="display1"
            component="div"
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
            noWrap
          >
            Grandstream UCM63XX CDR Tool
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
                <Typography sx={{ color: "primary.main" }} variant="body1">
                  Login
                </Typography>
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
                <Typography sx={{ color: "primary.main" }} variant="body1">
                  System Info
                </Typography>
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
                <Typography sx={{ color: "primary.main" }} variant="body1">
                  CDR API
                </Typography>
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default NavigationBar;
