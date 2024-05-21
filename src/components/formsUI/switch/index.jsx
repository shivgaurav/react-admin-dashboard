import { Switch } from "@mui/material";
import { useField } from "formik";

export default function SwitchWrapper({ controlName, ...otherProps }) {
  const [field, mata] = useField(controlName);
  const handleChange = (evt) => {};
  const configSwitch = {
    ...field,
    ...otherProps,
    checked: true,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
  };

  if (mata && mata.touched && mata.error) {
    configSwitch.error = true;
    configSwitch.helperText = mata.error;
  }

  return <Switch {...configSwitch} color="warning" />;
}
