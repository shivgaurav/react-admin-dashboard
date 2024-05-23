import { Checkbox, FormControl } from "@mui/material";
import { useField } from "formik";

export default function CheckboxWrapper({ controlName, ...otherProps }) {
  const [field, mata] = useField(controlName);
  const configCheckbox = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  if (mata && mata.touched && mata.error) {
    configCheckbox.error = true;
    configCheckbox.helperText = mata.error;
  }

  return (
    <>
      <FormControl sx={{ m: 1 }}>
        <Checkbox {...configCheckbox} />
      </FormControl>
    </>
  );
}
