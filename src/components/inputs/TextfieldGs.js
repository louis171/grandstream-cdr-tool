import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import { bgcolor, color } from "@mui/system";

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
  error,
  helperText,
  disabled,
}) => {
  return (
    <TextField
      sx={[
        { ...sx },
        disabled && {
          cursor: "not-allowed",
        },
      ]}
      value={value}
      error={error}
      helperText={helperText}
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
              sx={{ cursor: "default" }}
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
      disabled={disabled}
    />
  );
};

export default TextfieldGs;
