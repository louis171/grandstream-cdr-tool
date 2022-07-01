import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

import { ToastContainer, toast } from "react-toastify";

import { dummyExtensionGet } from "../DUMMY_DATA";
import { titleCase } from "../functions/functions";

import ExtensionToggle from "../components/extension/ExtensionToggle";
import ExtensionPassword from "../components/extension/ExtensionPassword";
import ExtensionSelect from "../components/extension/ExtensionSelect";
import ExtensionTextfield from "../components/extension/ExtensionTextfield";

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import VoicemailRoundedIcon from "@mui/icons-material/VoicemailRounded";
import PolylineRoundedIcon from "@mui/icons-material/PolylineRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import TextfieldGs from "../components/inputs/TextfieldGs";
import PasswordGs from "../components/inputs/PasswordGs";
import SelectGs from "../components/inputs/SelectGs";
import ToggleGs from "../components/inputs/ToggleGs";

const ExtensionEditView = ({
  userMethod,
  userIpAddress,
  userPort,
  gsCookie,
}) => {
  let { extensionId } = useParams();

  const [extData, setExtData] = useState(dummyExtensionGet);

  const [extSecret, setExtSecret] = useState(
    dummyExtensionGet.extension.secret
  );
  const [extPermission, setExtPermission] = useState(
    dummyExtensionGet.extension.permission
  );
  const [extAuthId, setExtAuthId] = useState(
    dummyExtensionGet.extension.authid
  );
  const [extAutoRecord, setExtAutoRecord] = useState(
    dummyExtensionGet.extension.auto_record
  );
  const [extIpAcl, setExtIpAcl] = useState(
    dummyExtensionGet.extension.strategy_ipacl
  );
  const [extAclPolicies, setExtAclPolicies] = useState([]);

  const [vmEnabled, setVmEnabled] = useState(
    dummyExtensionGet.extension.hasvoicemail === "no" ? false : true
  );
  const [vmSecret, setVmSecret] = useState(
    dummyExtensionGet.extension.vmsecret
  );
  const [vmSkipAuth, setVmSkipAuth] = useState(
    dummyExtensionGet.extension.skip_vmsecret === "no" ? false : true
  );

  /*   useEffect(() => {
    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "getSIPAccount",
          cookie: gsCookie,
          extension: extensionId,
        },
      })
      .then((res) => {
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry an error occured. Code: 00");
      });
  }, []); */

  useEffect(() => {
    getCdrAclPolicies(dummyExtensionGet.extension);
  }, []);

  const getCdrAclPolicies = (obj) => {
    // Object.keys returns array of a given object's own enumerable property names
    // e.g. ["local_network1", "local_network2"]
    // .filter searches each string in the array for results containing "local_network"
    // .reduce performs a function on each of the filtered array elements
    // in this case creating a new object with the required property names and their associated values
    // e.g. { "local_network1", "192.168.1.0", "local_network2", "192.168.2.0" }
    let data = Object.keys(obj)
      .filter((key) => key.includes("local_network"))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: obj[key] });
      }, {});

    // Transform the object above in an array or key value pairs
    // e.g. [ {"local_network1": "192.168.1.0"}, {"local_network2": "192.168.2.0"} ]
    data = Object.keys(data).map((key) => ({
      label: key,
      value: data[key],
    }));

    // Add an id to each object in the array created above
    data.forEach((item, i) => {
      item.id = i + 1;
    });
    // Returns the array of objects showing the ACL policiy values
    setExtAclPolicies(data);
  };

  return (
    <Container component="main" maxWidth="xl">
      <ToastContainer autoClose={2000} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextfieldGs
              sx={{ marginY: ".7em" }}
              value={extensionId}
              adornmentIcon={<LocalPhoneRoundedIcon color="primary" />}
              adornmentPosition="start"
              id="extensionExtension"
              readOnly={true}
              label="Extension"
              type="text"
              tooltipText="Extension"
            />

            <PasswordGs
              sx={{ marginY: ".7em" }}
              value={extSecret}
              updateFunction={setExtSecret}
              adornmentIcon={
                <PasswordRoundedIcon color="primary" sx={{ mr: ".5em" }} />
              }
              id="extensionSecret"
              readOnly={false}
              tooltipText="SIP/IAX Password"
              label="SIP/IAX"
            />

            <SelectGs
              sx={{ marginY: ".7em" }}
              size="medium"
              name="permissionSelect"
              value={extPermission}
              updateFunction={setExtPermission}
              adornmentIcon={<PublicRoundedIcon color="primary" />}
              label="Permission"
              menuItems={[
                { key: 0, value: "internal", label: "Internal" },
                { key: 1, value: "internal-local", label: "Local" },
                { key: 2, value: "internal-local-national", label: "National" },
                {
                  key: 3,
                  value: "internal-local-national-international",
                  label: "International",
                },
              ]}
              adornmentPosition="start"
              itemValue="value"
              itemLabel="label"
              itemKey="key"
              loading={false}
              tooltipText="Extension Permissions"
              canClear={false}
            />

            <TextfieldGs
              sx={{ marginY: ".7em" }}
              value={extAuthId}
              updateFunction={setExtAuthId}
              adornmentIcon={<ShieldRoundedIcon color="primary" />}
              adornmentPosition="start"
              id="extensionAuthId"
              readOnly={false}
              label="Auth ID"
              type="text"
              tooltipText="Auth ID"
            />

            <SelectGs
              sx={{ marginY: ".7em" }}
              size="medium"
              name="autoRecordSelect"
              value={extAutoRecord}
              updateFunction={setExtAutoRecord}
              adornmentIcon={<RadioButtonCheckedRoundedIcon color="primary" />}
              label="Auto Record"
              menuItems={[
                { key: 0, value: "all", label: "All" },
                { key: 1, value: "external", label: "External" },
                { key: 2, value: "internal", label: "Internal" },
                {
                  key: 3,
                  value: "off",
                  label: "Off",
                },
              ]}
              adornmentPosition="start"
              itemValue="value"
              itemLabel="label"
              itemKey="key"
              loading={false}
              tooltipText={
                <span>
                  <b>All Calls</b>: All incoming calls to this extension will be
                  recorded.
                  <br />
                  <b>OFF</b>: This extension's calls will not be recorded.
                  <br />
                  <b>Only External Calls</b>: All external calls of the
                  extension will be recorded.
                  <br />
                  <b>Only Internal Calls</b>: All internal calls of the
                  extension will be recorded.
                </span>
              }
              canClear={false}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <ToggleGs
              marginY=".7em"
              value={vmEnabled}
              checked={vmEnabled}
              updateFunction={setVmEnabled}
              label="Voicemail"
              icon={
                <VoicemailRoundedIcon color="primary" sx={{ mr: ".5em" }} />
              }
            />
            {vmEnabled ? (
              <>
                <PasswordGs
                  sx={{ marginY: ".7em" }}
                  value={vmSecret}
                  updateFunction={setVmSecret}
                  adornmentIcon={
                    <PasswordRoundedIcon color="primary" sx={{ mr: ".5em" }} />
                  }
                  id="extensionVmPassword"
                  readOnly={false}
                  tooltipText="Voicemail Password"
                  label="VM Password"
                />

                <ToggleGs
                  marginY=".7em"
                  value={vmSkipAuth}
                  checked={vmSkipAuth}
                  updateFunction={setVmSkipAuth}
                  label="VM Auth"
                  icon={
                    <ShieldRoundedIcon color="primary" sx={{ mr: ".5em" }} />
                  }
                />
              </>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <SelectGs
              sx={{ marginY: ".7em" }}
              size="medium"
              name="ipaclSelect"
              value={extIpAcl}
              updateFunction={setExtIpAcl}
              adornmentIcon={<PolylineRoundedIcon color="primary" />}
              label="ACL Policy"
              menuItems={[
                { key: 0, value: 0, label: "Allow All" },
                { key: 1, value: 1, label: "Local Network" },
              ]}
              adornmentPosition="start"
              itemValue="value"
              itemLabel="label"
              itemKey="key"
              loading={false}
              tooltipText={
                <span>
                  Access Control List manages the IP addresses that can register
                  to this extension. <br />
                  <b>Allow All</b>: Any IP adddress can register to this
                  extension.
                  <br />
                  <b>Local Network</b>: Only IP addresses in the configured
                  network segments can register to this extension.
                </span>
              }
              canClear={false}
            />
            {extIpAcl === 0 ? null : (
              <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: ".8rem" }}>IP</TableCell>
                      <TableCell>Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {extAclPolicies.map((acl) =>
                      acl.value === "" ? null : (
                        <TableRow key={acl.id}>
                          <TableCell>
                            <TextField
                              size="small"
                              value={acl.value}
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <Button size="small">
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: "error.main",
                                }}
                                variant="rounded"
                              >
                                <DeleteRoundedIcon />
                              </Avatar>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ExtensionEditView;
