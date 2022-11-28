import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectMultiGs = ({
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
  tooltipText = "",
  canClear,
  updateStateHandler,
  dataKey,
  dataType = "selectMulti",
  dataObj,
  readOnly = false,
}) => {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
    const {
      target: { value },
    } = e;
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    handleInputValueChange(e);
  };

  const handleInputValueChange = (e) => {
    if (updateStateHandler === undefined) {
      updateFunction(e.target.value);
    } else {
      updateStateHandler({
        value: e.target.value,
        key: dataKey,
        type: dataType,
        obj: dataObj,
      });
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedItems(value);
    }
  }, []);

  function getStyles(item, menuItems, theme) {
    return {
      fontWeight:
        selectedItems.indexOf(item) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel shrink id="demo-multiple-chip-label">
        {label}
      </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedItems}
        onChange={handleChange}
        size={size}
        notched
        readOnly={readOnly}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label={label}
            fullWidth
            notched
          />
        }
        renderValue={(selected) =>
          selected[0] !== "" ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((value, index) => (
                <Chip size="small" key={value} label={value} />
              ))}
            </Box>
          ) : null
        }
        MenuProps={MenuProps}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item[itemKey]}
            value={item[itemValue]}
            style={getStyles(item, menuItems, theme)}
          >
            {item[itemLabel]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMultiGs;
