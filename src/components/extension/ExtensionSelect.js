import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";

const ExtensionSelect = ({
  name,
  value,
  updateFunction,
  adornmentIcon,
  adornmentText,
  menuItems,
}) => {
  return (
    <TextField
      sx={{ marginY: ".5em" }}
      fullWidth
      name={name}
      select
      variant="outlined"
      value={value}
      onChange={(e) => updateFunction(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ width: "25%" }}>
            {adornmentIcon}
            {adornmentText}
          </InputAdornment>
        ),
      }}
    >
      {menuItems.map((item) => (
        <MenuItem value={item.value}>{item.label}</MenuItem>
      ))}
    </TextField>
  );
};

export default ExtensionSelect;
