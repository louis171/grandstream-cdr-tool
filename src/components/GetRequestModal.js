import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import InputRenderSwitch from "./inputs/InputRenderSwitch";

import { dummyGetOutbound } from "../DUMMY_DATA";

const GetRequestModal = ({ onClickFunc }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const dataMappings = [
    {
      key: "outbound_rt_name",
      data: [
        {
          title: "General",
          visible: true,
          data: [
            {
              key: "outbound_rt_name",
              label: "Outbound Route Name",
              type: "str",
              size: 8,
              visible: true,
            },
            {
              key: "out_of_service",
              label: "Disable This Route",
              type: "bool",
              size: 4,
              visible: true,
            },
            {
              key: "permission",
              label: "Privlege Level",
              type: "select",
              selectOptions: [
                { label: "Disable", value: "none" },
                { label: "Internal", value: "internal" },
                { label: "Local", value: "local" },
                { label: "National", value: "national" },
                { label: "International", value: "international" },
              ],
              size: 4,
              visible: true,
            },
            {
              key: "pin_sets_id",
              label: "PIN Groups",
              type: "str",
              size: 4,
              visible: true,
            },
            {
              key: "pinset_with_permission",
              label: "PIN Groups with Privilege Level",
              type: "bool",
              size: 4,
              visible: true,
            },
            {
              key: "password",
              label: "Password",
              type: "str",
              size: 4,
              visible: true,
            },
            {
              key: "auto_recording",
              label: "Auto Record",
              type: "bool",
              size: 4,
              visible: true,
            },
            {
              key: "country_prefix",
              label: "Local Country Code",
              type: "str",
              size: 4,
              visible: true,
            },
          ],
        },
        {
          title: "Enable Source Caller ID Whitelist",
          visible: true,
          data: [
            {
              key: "enable_wlist",
              label: "Enable Source Caller ID Whitelist",
              type: "bool",
              size: 4,
              visible: true,
            },
            {
              key: "custom_member",
              label: "Source Caller ID Pattern",
              type: "str",
              size: 4,
              visible: true,
            },
            {
              key: "fullcallid",
              label: "Outbound Route CID",
              type: "str",
              size: 4,
              visible: true,
            },
            {
              key: "members",
              label: "Whitelisted Extensions/Extension Groups",
              type: "str",
              size: 4,
              visible: true,
            },
          ],
        },
        {
          title: "Call Duration Limit",
          visible: true,
          data: [
            {
              key: "limitime",
              label: "Call Duration Limit",
              type: "bool",
              size: 4,
              visible: true,
            },
          ],
        },
        {
          title: "Main Trunk",
          visible: true,
          data: [
            {
              key: "default_trunk_index",
              label: "Default Trunk Index",
              type: "int",
              size: 4,
              visible: true,
            },
            {
              key: "strip",
              label: "Strip",
              type: "int",
              size: 4,
              visible: true,
            },
            {
              key: "prepend",
              label: "Prepend",
              type: "str",
              size: 4,
              visible: true,
            },
          ],
        },
        {
          title: "Failover Trunk",
          visible: true,
          data: [
            {
              key: "time_mode",
              label: "Time Condition Mode",
              type: "select",
              selectOptions: [
                { label: "Use Main Trunk or Failover Trunk", value: 0 },
                { label: "Use Specific Trunks", value: 1 },
              ],
              size: 4,
              visible: true,
            },
          ],
        },
        {
          title: "Other",
          visible: false,
          data: [
            {
              key: "outbound_rt_index",
              label: "Outbound Route Index",
              type: "int",
              size: 4,
              visible: false,
            },
          ],
        },
      ],
    },
  ];

  const handleClickOpen = async () => {
    setModalOpen(true);
    setIsLoading(true);
    let res = await onClickFunc();
    console.log(res);
    //let res = dummyGetOutbound;
    //console.log(res);

    if (res) {
      let objAsArray = Object.keys(res.outbound_route).map((key) => ({
        name: key,
        value: res.outbound_route[key],
      }));

      const correctOrder = [
        "outbound_rt_name",
        "out_of_service",
        "permission",
        "pin_sets_id",
        "pinset_with_permission",
        "password",
        "auto_recording",
        "country_prefix",
        "enable_wlist",
        "custom_member",
        "fullcallid",
        "members",
        "limitime",
        "default_trunk_index",
        "strip",
        "prepend",
        "time_mode",
        "outbound_rt_index",
      ];

      let sorted = objAsArray.sort((a, b) => {
        let indexA = correctOrder.findIndex((type) => a.name === type);
        let indexB = correctOrder.findIndex((type) => b.name === type);
        return indexA - indexB;
      });

      const result = {};
      sorted.forEach((element) => {
        result[element.name] = element.value;
      });

      res.outbound_route = result;
      setData(res);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <IconButton
        color="primary"
        aria-label="View Outbound route"
        size="small"
        onClick={handleClickOpen}
      >
        <VisibilityRoundedIcon fontSize="small" />
      </IconButton>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {data
          ? dataMappings.map((mapping) => (
              <React.Fragment key={`mapping${mapping.key}`}>
                <DialogTitle
                  key={`dialogtitle${mapping.key}`}
                  id="alert-dialog-title"
                >
                  {`Outbound Route`}
                </DialogTitle>
                <DialogContent key={`dialogmenu${mapping.key}`}>
                  {isLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Grid container spacing={4} sx={{ mt: 1 }}>
                      {mapping.data.map((section) =>
                        section.visible ? (
                          <React.Fragment key={`section${section.title}`}>
                            <Grid
                              key={`title${section.title}`}
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                            >
                              <Typography>{section.title}</Typography>
                            </Grid>
                            {Object.entries(data.outbound_route).map(
                              ([key, value]) =>
                                section.data.map((row) =>
                                  key === row.key ? (
                                    <Grid
                                      key={`Grid${key}`}
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      lg={row.size}
                                    >
                                      {row.visible ? (
                                        <InputRenderSwitch
                                          data={data}
                                          field={row}
                                          value={value}
                                          dataKey={key}
                                        />
                                      ) : null}
                                    </Grid>
                                  ) : null
                                )
                            )}
                          </React.Fragment>
                        ) : null
                      )}
                    </Grid>
                  )}
                </DialogContent>
              </React.Fragment>
            ))
          : null}
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GetRequestModal;
