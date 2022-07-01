import React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const ToggleGs = ({ value, checked, updateFunction, label, icon, marginY }) => {
  return (
    <Box
      marginY={marginY}
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: "4px",
        paddingLeft: "14px",
      }}
    >
      {icon}
      <FormControlLabel
        sx={{ padding: "8px 0px", marginLeft: "0px" }}
        value={value}
        checked={checked}
        control={
          <Switch
            color="primary"
            checked={checked}
            onChange={(e) => updateFunction(e.target.checked)}
          />
        }
        label={label}
        labelPlacement="start"
      />
    </Box>
  );
};

export default ToggleGs;
