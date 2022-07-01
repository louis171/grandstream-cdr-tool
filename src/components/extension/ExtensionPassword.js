import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const ExtensionPassword = ({
  value,
  updateFunction,
  adornmentText,
  adornmentIcon,
  id,
  readOnly,
}) => {
    
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      sx={{ marginY: ".5em" }}
      value={value}
      type={showPassword ? "text" : "password"}
      onChange={(e) => updateFunction(e.target.value)}
      InputProps={{
        readOnly: readOnly,
        startAdornment: (
          <InputAdornment position="start">
            {adornmentIcon}
            {adornmentText}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <VisibilityRoundedIcon />
              ) : (
                <VisibilityOffRoundedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      id={id}
      variant="outlined"
    />
  );
};

export default ExtensionPassword;
