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
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

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
  return (
    <Grid container spacing={2} p="1em">
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
              <TextField
                {...params}
                sx={{ marginX: (theme) => theme.spacing(1) }}
                size="small"
                fullWidth
              />
            )}
          />
          <TimePicker
            label="Start Time"
            onChange={(e) => setUserStartTime(e)}
            value={userStartTime}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ marginX: (theme) => theme.spacing(1) }}
                size="small"
                fullWidth
              />
            )}
          />
          <DatePicker
            label="End Date"
            onChange={(e) => setUserEndDate(e)}
            value={userEndDate}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ marginX: (theme) => theme.spacing(1) }}
                size="small"
                fullWidth
              />
            )}
          />
          <TimePicker
            label="End Time"
            onChange={(e) => setUserEndTime(e)}
            value={userEndTime}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ marginX: (theme) => theme.spacing(1) }}
                size="small"
                fullWidth
              />
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
          sx={{ marginX: (theme) => theme.spacing(1) }}
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
          tooltipText={
            <span>
              Filters a specific Caller Number or a range of Caller Numbers via
              Comma separated extensions, ranges of extensions, or regular
              expressions. For example:
              <br />
              <ul>
                <li>
                  <b>02079460000-02079460003,02079460005</b> - Matches
                  02079460000, 02079460001, 02079460002, 02079460003,
                  02079460005.
                </li>
                <li>
                  <b>07@</b> - Matches any UK mobile number.
                </li>
              </ul>
              Patterns containing one or more wildcards ('@' or '_') will match
              as a regular expression, and treat '-' as a literal hyphen rather
              than a range signifier.
              <br />
              <br />
              The '@' wildcard matches any number of characters (including
              zero), while '_' matches any single character. Otherwise, patterns
              containing a single hyphen will be matching a range of numerical
              extensions, with non-numerical characters ignored, while patterns
              containing multiple hyphens will be ignored. (The pattern "0-0"
              will match all non-numerical and empty strings).
            </span>
          }
        />
        <SelectGs
          sx={{ marginX: (theme) => theme.spacing(1) }}
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
          tooltipText="Extension Group"
          canClear={true}
        />
        <TextfieldGs
          sx={{ marginX: (theme) => theme.spacing(1) }}
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
          tooltipText={
            <span>
              Filters a specific Callee Number or a range of Callee Numbers via
              Comma separated extensions, ranges of extensions, or regular
              expressions. For example:
              <br />
              <ul>
                <li>
                  <b>5300,5302-5304</b> - Matches extensions 5300, 5302, 5303,
                  5304.
                </li>
                <li>
                  <b>_4@</b> - Matches any extension containing 4 as the second
                  digit.
                </li>
              </ul>
              Patterns containing one or more wildcards ('@' or '_') will match
              as a regular expression, and treat '-' as a literal hyphen rather
              than a range signifier.
              <br />
              <br />
              The '@' wildcard matches any number of characters (including
              zero), while '_' matches any single character. Otherwise, patterns
              containing a single hyphen will be matching a range of numerical
              extensions, with non-numerical characters ignored, while patterns
              containing multiple hyphens will be ignored. (The pattern "0-0"
              will match all non-numerical and empty strings).
            </span>
          }
        />
        <TextfieldGs
          sx={{ marginX: (theme) => theme.spacing(1) }}
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
          tooltipText={
            <span>
              Filters a specific Callee Number or a range of Callee Numbers via
              Comma separated extensions, ranges of extensions, or regular
              expressions. For example:
              <br />
              <ul>
                <li>
                  <b>5300,5302-5304</b> - Matches extensions 5300, 5302, 5303,
                  5304.
                </li>
                <li>
                  <b>_4@</b> - Matches any extension containing 4 as the second
                  digit.
                </li>
              </ul>
              Patterns containing one or more wildcards ('@' or '_') will match
              as a regular expression, and treat '-' as a literal hyphen rather
              than a range signifier.
              <br />
              <br />
              The '@' wildcard matches any number of characters (including
              zero), while '_' matches any single character. Otherwise, patterns
              containing a single hyphen will be matching a range of numerical
              extensions, with non-numerical characters ignored, while patterns
              containing multiple hyphens will be ignored. (The pattern "0-0"
              will match all non-numerical and empty strings).
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
        <TextfieldGs
          sx={{ marginX: (theme) => theme.spacing(1) }}
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
          tooltipText={
            <span>
              Filters based in a minimum Billable duration in seconds. For
              example:
              <br />
              <ul>
                <li>
                  <b>10</b> - Only returns CDR entries with a Billable Duration
                  of 10 seconds or above.
                </li>
              </ul>
            </span>
          }
        />
        <TextfieldGs
          sx={{ marginX: (theme) => theme.spacing(1) }}
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
          tooltipText={
            <span>
              Filters based in a maximum Billable duration in seconds. For
              example:
              <br />
              <ul>
                <li>
                  <b>10</b> - Only returns CDR entries with a Billable Duration
                  of 10 seconds or less.
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
        <Button
          fullWidth
          variant="contained"
          type="button"
          onClick={cdrApiRead}
        >
          Read
        </Button>
      </Grid>
    </Grid>
  );
};

export default RequestOptions;
