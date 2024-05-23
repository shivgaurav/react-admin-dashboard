import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function SelectWrapper({ controlName, options, ...otherProps }) {
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(controlName);
  if (Array.isArray(options)) {
    field.value = [];
  }
  const handleChange = (evt) => {
    const {
      target: { value },
    } = evt;
    if (Array.isArray(options)) {
      setFieldValue(typeof value === "string" ? value.split(",") : value);
    } else {
      setFieldValue(controlName, value);
    }
  };
  const configSelect = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    defaultValue: "",
  };

  if (mata && mata.touched && mata.error) {
    configSelect.error = true;
    configSelect.helperText = mata.error;
  }
  return (
    <>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-name-label">
          {configSelect.label}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          {...configSelect}
        >
          {!Array.isArray(options) &&
            Object.keys(options).map((item, pos) => {
              return (
                <MenuItem key={pos} value={item}>
                  {options[item]}
                </MenuItem>
              );
            })}
          {Array.isArray(options) &&
            options.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
