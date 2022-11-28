import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxGs = ({
  checked,
  updateFunction,
  label,
  updateStateHandler,
  dataKey,
  dataType = "bool",
  dataObj,
  readOnly = false,
}) => {
  const handleInputValueChange = (e) => {
    if (updateStateHandler === undefined) {
      updateFunction(e.target.checked);
    } else {
      updateStateHandler({
        value: e.target.checked,
        key: dataKey,
        type: dataType,
        obj: dataObj,
      });
    }
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          readOnly={readOnly}
          checked={checked}
          onChange={(e) => handleInputValueChange(e)}
        />
      }
      label={label}
    />
  );
};

export default CheckboxGs;
