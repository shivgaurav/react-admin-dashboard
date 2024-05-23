import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useField } from "formik";
import { FormLabel, TextField } from "@mui/material";

export default function TimePickerViewRenderers({
  controlName,
  label,
  ...otherProps
}) {
  const [field, mata] = useField(controlName);
  delete field["value"];
  const configTimePicker = {
    ...field,
    ...otherProps,
  };
  if (mata && mata.touched && mata.error) {
    configTimePicker.error = true;
    configTimePicker.helperText = mata.error;
  }
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <TimePicker
    //     {...configTimePicker}
    //     viewRenderers={{
    //       hours: renderTimeViewClock,
    //       minutes: renderTimeViewClock,
    //       seconds: renderTimeViewClock,
    //     }}
    //   />
    // </LocalizationProvider>
    <>
      {/* <FormLabel>{label}</FormLabel> */}
      <TextField type="time" {...configTimePicker} />
    </>
  );
}
