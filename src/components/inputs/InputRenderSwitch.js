import React from "react";
import TextfieldGs from "./TextfieldGs";

import LuxonAdapter from "../LuxonAdapter";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const InputRenderSwitch = ({ field, dataKey, value, data }) => {
  switch (field.type) {
    case "str":
      return (
        <TextfieldGs
          key={`str${Object.keys(data).indexOf(field.key)}`}
          tooltipText=""
          value={value}
          size="small"
          label={field.label}
        />
      );
      break;
    case "multiline":
      return (
        <TextfieldGs
          key={`multiline${Object.keys(data).indexOf(field.key)}`}
          tooltipText=""
          value={value}
          size="small"
          label={field.label}
        />
      );
      break;
    case "date":
      return (
        <LuxonAdapter key={`date${Object.keys(data).indexOf(field.key)}`}>
          <DatePicker
            label="Start Date"
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
          <TimePicker
            label="Start Time"
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </LuxonAdapter>
      );
      break;
    case "bool":
      return (
        <FormControlLabel
          key={`bool${Object.keys(data).indexOf(field.key)}`}
          control={<Checkbox checked={value === "yes" ? true : false} />}
          label={field.label}
        />
      );
      break;
    case "int":
      return (
        <TextfieldGs
          key={`int${Object.keys(data).indexOf(field.key)}`}
          tooltipText=""
          value={value}
          size="small"
          type="number"
          label={field.label}
        />
      );
      break;
    case "select":
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={field.label}
            size="small"
          >
            {field.selectOptions.map((select) => (
              <MenuItem key={select.value} value={select.value}>{select.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    default:
      return null;
      break;
  }
};

export default InputRenderSwitch;
