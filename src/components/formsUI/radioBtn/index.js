import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useField } from "formik";

export default function RadioBtnWrapper({
  controlName,
  options,
  ...otherProps
}) {
  const [field, mata] = useField(controlName);
  const configRadioBtn = {
    ...field,
    ...otherProps,
  };
  if (mata && mata.touched && mata.error) {
    configRadioBtn.error = true;
    configRadioBtn.helperText = mata.error;
  }

  return (
    <>
      <FormLabel id="demo-radio-buttons-group-label">
        {configRadioBtn.label}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        {...configRadioBtn}
      >
        <Box
          display="grid"
          gap="8px"
          mb="12px"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        >
          {Object.keys(options).map((option, i) => {
            return (
              <div key={i}>
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={options[option]}
                />
              </div>
            );
          })}
        </Box>
      </RadioGroup>
    </>
  );
}
