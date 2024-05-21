import { Box, Button } from "@mui/material";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import TextField from "../../components/formsUI/textField";
import Select from "../../components/formsUI/select";
import RadioBtn from "../../components/formsUI/radioBtn";
// import TimePicker from "../../components/formsUI/timePicker";
import {
  executeOptions,
  expiryOptions,
  optionOptions,
  tradeRange,
} from "../../data/mockData";
import { useEffect, useState } from "react";

const Form = () => {
  const [quantityByLotSize, setQuantityByLotSize] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    getOptionsByLotSize(50);
  }, []);
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  function getOptionsByLotSize(lotSize) {
    const options = {};
    for (let i = 1; i < 11; i++) {
      options[i * lotSize] = i * lotSize;
    }
    setQuantityByLotSize(options);
  }
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={FORM_VALIDATION}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <RadioBtn
                controlName="tradeRange"
                label="Order Type"
                options={tradeRange}
              />
              {/* <TimePicker /> */}

              <FieldArray name="legs">
                {(fieldArraProps) => {
                  const { push, remove, form } = fieldArraProps;
                  const { legs } = form.values;
                  return (
                    <Box mt="30px">
                      {legs.map((leg, i) => {
                        return (
                          <div key={i}>
                            <Box
                              display="grid"
                              gap="8px"
                              mb="12px"
                              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                              sx={{
                                "& > div": {
                                  gridColumn: isNonMobile
                                    ? undefined
                                    : "span 4",
                                },
                              }}
                            >
                              <Select
                                controlName={`legs[${i}]['execute']`}
                                label="Execute"
                                options={executeOptions}
                              />
                              <Select
                                controlName={`legs[${i}]['quantity']`}
                                label="Quantity"
                                options={quantityByLotSize}
                              />
                              <Select
                                controlName="option"
                                label="Option"
                                options={optionOptions}
                              />
                              <Select
                                controlName={`legs[${i}]['expiryTerm']`}
                                label="Expiry"
                                options={expiryOptions}
                              />
                              <Select
                                controlName={`legs[${i}]['atmPt']`}
                                label="ATM PT"
                                options={quantityByLotSize}
                              />
                              <TextField
                                controlName={`legs[${i}]['stopLoss']`}
                                label="SL %"
                              />
                              <TextField
                                controlName={`legs[${i}]['targetPoint']`}
                                label="TP %"
                              />
                              {i > 0 && (
                                <Button
                                  variant="text"
                                  onClick={() => remove(i)}
                                >
                                  X
                                </Button>
                              )}
                            </Box>
                          </div>
                        );
                      })}
                      <Button
                        variant="outlined"
                        onClick={() => push(initialValues.legs[0])}
                      >
                        Add Leg
                      </Button>
                    </Box>
                  );
                }}
              </FieldArray>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const FORM_VALIDATION = yup.object().shape({
  tradeRange: yup.string().required("Required"),
  legs: yup
    .array()
    .ensure()
    .of(
      yup.object().shape({
        execute: yup.string().required("Required"),
        quantity: yup.string().required("Required"),
        option: yup.string().required("Required"),
        expiryTerm: yup.string().required("Required"),
        atmPt: yup.string().required("Required"),
      }),
    ),
});
const initialValues = {
  tradeRange: "",
  legs: [
    {
      execute: "",
      quantity: "",
      option: "",
      expiryTerm: "",
      atmPt: "",
      stopLoss: "",
      targetPoint: "",
    },
  ],
};

export default Form;
