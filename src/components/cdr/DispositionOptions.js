import React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const DispositionOptions = (props) => {
  const { setDispositionFilters, dispositionFilters } = props;

  /*   const handleChange = (text, e) => {
    setDispositionFilters((prev) => ({
      ...prev,
      [text]: e.target.checked,
    }));
  }; */

  const handleChange = (value) => {
    const index = dispositionFilters.indexOf(value);
    if (index === -1) {
      // If passed value isn't present in array then add it
      setDispositionFilters((prev) => [...prev, value]);
    } else {
      // else if the value is already present then find its index and remove it
      const data = [...dispositionFilters];
      const index = data.indexOf(value);
      data.splice(index, 1);
      setDispositionFilters(data);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("ANSWERED")} />}
        label="Answered"
      />
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("NO ANSWER")} />}
        label="No Answer"
      />
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("BUSY")} />}
        label="Busy"
      />
      <FormControlLabel
        control={<Checkbox onChange={() => handleChange("FAILED")} />}
        label="Failed"
      />
    </Box>
  );
};

export default DispositionOptions;
