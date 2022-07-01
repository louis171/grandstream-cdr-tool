import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import LuxonAdapter from "../LuxonAdapter";
import TextfieldGs from "../inputs/TextfieldGs";
import SelectGs from "../inputs/SelectGs";

import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import PhoneCallbackRoundedIcon from "@mui/icons-material/PhoneCallbackRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const RequestOptions = ({
  setUserStartDate,
  userStartDate,
  setUserStartTime,
  userStartTime,
  setUserEndDate,
  userEndDate,
  setUserEndTime,
  userEndTime,
  setUserCaller,
  setUserCallee,
  userCallee,
  userCaller,
  setUserExtGroup,
  userExtGroup,
  gsExtGroup,
  isLoadingExtGroups,
  cdrApiRead,
}) => {
  return (
    <Grid
      container
      spacing={3}
      p="1em"
    >
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <LuxonAdapter>
          <DatePicker
            label="Start Date"
            onChange={(e) => setUserStartDate(e)}
            value={userStartDate}
            renderInput={(params) => (
              <TextField {...params} sx={{ mr: "1em" }} size="small" />
            )}
          />
          <TimePicker
            label="Start Time"
            onChange={(e) => setUserStartTime(e)}
            value={userStartTime}
            renderInput={(params) => (
              <TextField {...params} sx={{ mr: "1em" }} size="small" />
            )}
          />
          <DatePicker
            label="End Date"
            onChange={(e) => setUserEndDate(e)}
            value={userEndDate}
            renderInput={(params) => (
              <TextField {...params} sx={{ mr: "1em" }} size="small" />
            )}
          />
          <TimePicker
            label="End Time"
            onChange={(e) => setUserEndTime(e)}
            value={userEndTime}
            renderInput={(params) => (
              <TextField {...params} sx={{ mr: "1em" }} size="small" />
            )}
          />
        </LuxonAdapter>
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <TextfieldGs
          sx={{ marginX: ".5em" }}
          value={userCaller}
          updateFunction={setUserCaller}
          adornmentIcon={
            <PhoneForwardedRoundedIcon color="primary" sx={{ mr: ".5em" }} />
          }
          adornmentPosition="start"
          id="cdrCaller"
          readOnly={false}
          label="Caller"
          size="small"
          tooltipText={
            <span>
              Filters a specific Caller Number or a range of Caller Numbers via
              patterns. Supported characters are:
              <br />
              <ul>
                <li>
                  <b>.</b> - Matches zero or more of any character. Should only
                  be attached to the end of a pattern.
                </li>
                <li>
                  <b>X</b> - Matches any number from 0-9.
                </li>
              </ul>
              <br />
              Caller numbers can also be entered as lists separated with commas
              <br />
              e.g. 200,201,203
            </span>
          }
        />

        <SelectGs
          sx={{ marginX: ".5em" }}
          size="small"
          name="extGroupSelect"
          value={userExtGroup}
          updateFunction={setUserExtGroup}
          adornmentIcon={
            <GroupsRoundedIcon color="primary" sx={{ mr: ".5em" }} />
          }
          adornmentText=""
          label="Extension Group"
          menuItems={gsExtGroup}
          adornmentPosition="start"
          itemValue="members"
          itemLabel="group_name"
          itemKey="tmp"
          loading={isLoadingExtGroups}
          tooltipText="Extension Group"
          canClear={true}
        />

        <TextfieldGs
          sx={{ marginX: ".5em" }}
          value={userCallee}
          updateFunction={setUserCallee}
          adornmentIcon={
            <PhoneCallbackRoundedIcon color="primary" sx={{ mr: ".5em" }} />
          }
          adornmentPosition="start"
          id="cdrCallee"
          readOnly={false}
          label="Callee"
          size="small"
          tooltipText={
            <span>
              Filters a specific Callee Number or a range of Callee Numbers via
              patterns. Supported characters are:
              <br />
              <ul>
                <li>
                  <b>.</b> - Matches zero or more of any character. Should only
                  be attached to the end of a pattern.
                </li>
                <li>
                  <b>X</b> - Matches any number from 0-9.
                </li>
              </ul>
            </span>
          }
        />
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button fullWidth variant="contained" type="button" onClick={cdrApiRead}>
          Read
        </Button>
      </Grid>
    </Grid>
  );
};

export default RequestOptions;
