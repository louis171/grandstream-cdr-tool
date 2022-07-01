import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";

const TextfieldGs = ({
  value,
  sx,
  updateFunction,
  adornmentText,
  adornmentIcon,
  adornmentPosition,
  id,
  readOnly,
  size,
  type,
  label,
  tooltipText,
}) => {
  return (
    <TextField
      sx={sx}
      value={value}
      type={type === "" ? "text" : type}
      size={size === "" ? "medium" : size}
      onChange={(e) => updateFunction(e.target.value)}
      InputProps={{
        readOnly: readOnly,
        startAdornment: (
          <Tooltip title={tooltipText} arrow>
            <InputAdornment
              position={
                adornmentPosition === null ? "start" : adornmentPosition
              }
            >
              {adornmentIcon}
              {adornmentText === "" ? null : adornmentText}
            </InputAdornment>
          </Tooltip>
        ),
      }}
      fullWidth
      label={label}
      id={id}
      variant="outlined"
    />
  );
};

export default TextfieldGs;
