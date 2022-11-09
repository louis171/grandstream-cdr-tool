import React from "react";
import LuxonAdapter from "../../LuxonAdapter";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const DateAndTimePickers = ({
  setUserStartDate,
  userStartDate,
  setUserStartTime,
  userStartTime,
  setUserEndDate,
  userEndDate,
  setUserEndTime,
  userEndTime,
}) => {
  return (
    <>
      <Grid item sm={6} md={6} lg={6}>
        <LuxonAdapter>
          <DatePicker
            label="Start Date"
            onChange={(e) => setUserStartDate(e)}
            value={userStartDate}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </LuxonAdapter>
      </Grid>
      <Grid item sm={6} md={6} lg={6}>
        <LuxonAdapter>
          <TimePicker
            label="Start Time"
            onChange={(e) => setUserStartTime(e)}
            value={userStartTime}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </LuxonAdapter>
      </Grid>
      <Grid item sm={6} md={6} lg={6}>
        <LuxonAdapter>
          <DatePicker
            label="End Date"
            onChange={(e) => setUserEndDate(e)}
            value={userEndDate}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </LuxonAdapter>
      </Grid>
      <Grid item sm={6} md={6} lg={6}>
        <LuxonAdapter>
          <TimePicker
            label="End Time"
            onChange={(e) => setUserEndTime(e)}
            value={userEndTime}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </LuxonAdapter>
      </Grid>
    </>
  );
};

export default DateAndTimePickers;
