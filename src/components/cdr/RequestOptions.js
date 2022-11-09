import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

import LuxonAdapter from "../LuxonAdapter";
import TextfieldGs from "../inputs/TextfieldGs";
import SelectGs from "../inputs/SelectGs";
import DateAndTimePickers from "./request/DateAndTimePickers";

import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import PhoneCallbackRoundedIcon from "@mui/icons-material/PhoneCallbackRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

import Tooltips from "../../util/tooltips/Tooltips";

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
  userAnsweredBy,
  setUserAnsweredBy,
  userMinDuration,
  setUserMinDuration,
  userMaxDuration,
  setUserMaxDuration,
  setUserExtGroup,
  userExtGroup,
  gsExtGroup,
  isLoadingExtGroups,
  cdrApiRead,
}) => {
  // Fix for margin over request options panel
  // only applies 42px top margin on lg and above screens
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  const mtLg = {
    mt: "42px",
  };

  const mtMd = {
    mt: "0px",
  };

  return (
    <Grid container spacing={2} sx={matches ? mtLg : mtMd}>
      <DateAndTimePickers
        setUserStartDate={setUserStartDate}
        userStartDate={userStartDate}
        setUserStartTime={setUserStartTime}
        userStartTime={userStartTime}
        setUserEndDate={setUserEndDate}
        userEndDate={userEndDate}
        setUserEndTime={setUserEndTime}
        userEndTime={userEndTime}
      />

      <Grid item sm={6} md={6} lg={12}>
        <TextfieldGs
          value={userCaller}
          updateFunction={setUserCaller}
          adornmentIcon={
            <PhoneForwardedRoundedIcon
              color="primary"
              sx={{ mr: (theme) => theme.spacing(1) }}
            />
          }
          adornmentPosition="start"
          id="cdrCaller"
          readOnly={false}
          label="Caller"
          size="small"
          tooltipText={Tooltips.userCallerTooltip()}
        />
      </Grid>
      <Grid item sm={6} md={6} lg={12}>
        <SelectGs
          size="small"
          name="extGroupSelect"
          value={userExtGroup}
          updateFunction={setUserExtGroup}
          adornmentIcon={
            <GroupsRoundedIcon
              color="primary"
              sx={{ mr: (theme) => theme.spacing(1) }}
            />
          }
          adornmentText=""
          label="Extension Group"
          menuItems={gsExtGroup}
          adornmentPosition="start"
          itemValue="members"
          itemLabel="group_name"
          itemKey="tmp"
          loading={isLoadingExtGroups}
          tooltipText={Tooltips.extensionGroupTooltip()}
          canClear={true}
        />
      </Grid>
      <Grid item sm={6} md={6} lg={12}>
        <TextfieldGs
          value={userCallee}
          updateFunction={setUserCallee}
          adornmentIcon={
            <PhoneCallbackRoundedIcon
              color="primary"
              sx={{ mr: (theme) => theme.spacing(1) }}
            />
          }
          adornmentPosition="start"
          id="cdrCallee"
          readOnly={false}
          label="Callee"
          size="small"
          disabled={userAnsweredBy.length > 0 ? true : false}
          tooltipText={Tooltips.userCalleeTooltip()}
        />
      </Grid>
      <Grid item sm={6} md={6} lg={12}>
        <TextfieldGs
          value={userAnsweredBy}
          updateFunction={setUserAnsweredBy}
          adornmentIcon={
            <PhoneRoundedIcon
              color="primary"
              sx={{ mr: (theme) => theme.spacing(1) }}
            />
          }
          adornmentPosition="start"
          id="cdrAnsweredby"
          readOnly={false}
          label="Answered by"
          size="small"
          disabled={userCallee.length > 0 ? true : false}
          tooltipText={Tooltips.userAnsweredByTooltip()}
        />
      </Grid>
      <Grid item sm={6} md={6} lg={6}>
        <TextfieldGs
          value={userMinDuration}
          updateFunction={setUserMinDuration}
          adornmentIcon={
            <PhoneCallbackRoundedIcon
              color="primary"
              sx={{ mr: (theme) => theme.spacing(1) }}
            />
          }
          adornmentPosition="start"
          id="cdrMinDuration"
          readOnly={false}
          label="Min Duration"
          size="small"
          type="number"
          tooltipText={Tooltips.userMinDurationTooltip()}
        />
      </Grid>
      <Grid item sm={6} md={6} lg={6}>
        <TextfieldGs
          value={userMaxDuration}
          updateFunction={setUserMaxDuration}
          adornmentIcon={
            <PhoneCallbackRoundedIcon
              color="primary"
              sx={{ mr: (theme) => theme.spacing(1) }}
            />
          }
          adornmentPosition="start"
          id="cdrMaxDuration"
          readOnly={false}
          label="Max Duration"
          size="small"
          type="number"
          tooltipText={Tooltips.userMaxDurationTooltip()}
        />
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button variant="contained" type="button" onClick={cdrApiRead}>
          Read
        </Button>
      </Grid>
    </Grid>
  );
};

export default RequestOptions;
