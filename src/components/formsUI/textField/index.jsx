import { TextField } from "@mui/material";
import { useField } from "formik";

export default function TextFieldWrapper({ controlName, ...otherProps }) {
  const [field, mata] = useField(controlName);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  return <TextField {...configTextField} />;
}
