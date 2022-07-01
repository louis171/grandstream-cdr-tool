import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const SelectGs = ({
  sx,
  size,
  name,
  value,
  label,
  updateFunction,
  adornmentIcon,
  adornmentText,
  adornmentPosition,
  menuItems,
  itemValue,
  itemLabel,
  itemKey,
  loading,
  tooltipText,
  canClear,
}) => {
  return (
    <TextField
      sx={sx}
      size={size}
      fullWidth
      name={name}
      label={label}
      select
      variant="outlined"
      value={value}
      onChange={(e) => updateFunction(e.target.value)}
      InputProps={{
        // Adornment at the start of the select
        // Configured as:
        //  <Tooltip>
        //    <InputAdornment>
        //      <Icon />
        //      Text
        //    </InputAdornment>
        //  </Tooltip>
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
        endAdornment: canClear ? (
          value.length > 0 ? (
            <IconButton sx={{ mr: "1em" }} onClick={() => updateFunction("")}>
              <CancelRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          ) : null
        ) : null,
      }}
    >
      {loading ? (
        <MenuItem value={0}>
          <Skeleton variant="text" width={"100%"} />
        </MenuItem>
      ) : menuItems ? (
        menuItems.map((item) => (
          <MenuItem key={item[itemKey]} value={item[itemValue]}>
            {item[itemLabel]}
          </MenuItem>
        ))
      ) : (
        <MenuItem>None</MenuItem>
      )}
    </TextField>
  );
};

export default SelectGs;
