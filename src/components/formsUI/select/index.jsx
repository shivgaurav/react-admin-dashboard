import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function SelectWrapper({ controlName, options, ...otherProps }) {
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(controlName);
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(controlName, value);
  };
  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (mata && mata.touched && mata.error) {
    configSelect.error = true;
    configSelect.helperText = mata.error;
  }
  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
