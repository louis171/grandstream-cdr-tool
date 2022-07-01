import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const ExtensionTextfield = ({
  value,
  updateFunction,
  adornmentText,
  adornmentIcon,
  id,
  readOnly,
  type
}) => {
  return (
    <TextField
      sx={{ marginY: ".5em" }}
      value={value}
      type={type}
      onChange={(e) => updateFunction(e.target.value)}
      InputProps={{
        readOnly: readOnly,
        startAdornment: (
          <InputAdornment position="start">
            {adornmentIcon}
            {adornmentText}
          </InputAdornment>
        ),
      }}
      fullWidth
      id={id}
      variant="outlined"
    />
  );
};

export default ExtensionTextfield;
