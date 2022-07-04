import React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CallTypeOptions = (props) => {
  const { setCallOptionsFilters, callOptionsFilters } = props;

  const handleChange = (value) => {
    const index = callOptionsFilters.indexOf(value);
    if (index === -1) {
      // If passed value isn't present in array then add it
      setCallOptionsFilters((prev) => [...prev, value]);
    } else {
      // else if the value is already present then find its index and remove it
      const data = [...callOptionsFilters];
      const index = data.indexOf(value);
      data.splice(index, 1);
      setCallOptionsFilters(data);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("Internal")} />}
        label="Internal"
      />
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("External")} />}
        label="External"
      />
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("Inbound")} />}
        label="Inbound"
      />
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("Outbound")} />}
        label="Outbound"
      />
    </Box>
  );
};

export default CallTypeOptions;
