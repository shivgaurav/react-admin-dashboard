import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import TextField from "../../components/formsUI/textField";
import Select from "../../components/formsUI/select";
import RadioBtn from "../../components/formsUI/radioBtn";
import TimePicker from "../../components/formsUI/timePicker";
// import Checkbox from "../../components/formsUI/checkbox";
import {
  executeOptions,
  expiryOptions,
  optionOptions,
  orderType,
} from "../../data/mockData";
import { useEffect, useRef, useState } from "react";

const Form = () => {
  const formRef = useRef();
  const [input, setInput] = useState({});
  const [quantityByLotSize, setQuantityByLotSize] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    getOptionsByLotSize(50);
  }, []);

  const saveInput = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
      console.log(input);
      console.log(formRef.current.values);
    }
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
      <Header title="CREATE STRATEGY" subtitle="Create a New Strategy" />
      <Formik
        onSubmit={(values) => setInput(values)}
        innerRef={formRef}
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
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
              >
                <Box>
                  <RadioBtn
                    controlName="orderType"
                    label="Order Type"
                    options={orderType}
                  />
                </Box>
                <p></p>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"2fr 4fr"}
                  alignItems={"baseline"}
                  gap={"8px"}
                >
                  <Typography>Start Time</Typography>
                  <TimePicker controlName="startTime" label="Start Time" />
                </Box>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"2fr 4fr"}
                  alignItems={"baseline"}
                  gap={"8px"}
                >
                  <Typography>Square Off</Typography>
                  <TimePicker controlName="squareOffTime" label="Square Off" />
                </Box>
                {/* <Box>
                  <Checkbox controlName="tradeRange" />
                </Box> */}
                {/* <Select
                  controlName={"days"}
                  multiple
                  label="days"
                  options={aa}
                /> */}
              </Box>

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
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => remove(i)}
                                >
                                  <DeleteIcon />
                                </IconButton>
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
              <Typography mt="30px" fontSize="18px" fontWeight="600">
                Risk Management
              </Typography>
              <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="12px">
                <TextField
                  controlName="riskManagement['exitOnOverAllProfit']"
                  label="Exit When Over all Profit"
                />
                <TextField
                  controlName="riskManagement['exitOnOverAllLoss']"
                  label="Exit When Over all Loss"
                />
              </Box>
              <Typography sx={{ m: 1 }} fontWeight="600">
                Trail Stop loss
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
                gap="12px"
              >
                <TextField
                  controlName="riskManagement['startTrailPt']"
                  label="Start Trail After"
                />
                <TextField
                  controlName="riskManagement['trailByPts']"
                  label="Trail by"
                />
              </Box>
              <Box
                mt="30px"
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
                gap="12px"
              >
                <TextField
                  sx={{ m: -1 }}
                  controlName="strategyName"
                  label="Strategy Name"
                />
                <p></p>
                <p></p>
                <p></p>
                <Button
                  pt="12px"
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={() => saveInput()}
                  style={{
                    width: "172px",
                    height: "40px",
                    marginTop: "12px",
                    fontWeight: "600",
                  }}
                  endIcon={<SendIcon />}
                >
                  Create Strategy
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const FORM_VALIDATION = yup.object().shape({
  orderType: yup.string().required("Required"),
  startTime: yup.string().required("Required"),
  squareOffTime: yup.string().required("Required"),
  // exitOnOverAllProfit: yup.string().required("Required"),
  // exitOnOverAllLoss: yup.string().required("Required"),
  // startTrailPt: yup.string().required("Required"),
  // trailByPts: yup.string().required("Required"),
  // strategyName: yup.string().required("Required"),
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
  orderType: "",
  startTime: "",
  squareOffTime: "",
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
  riskManagement: {
    exitOnOverAllProfit: "",
    exitOnOverAllLoss: "",
    startTrailPt: "",
    trailByPts: "",
  },
  strategyName: "",
};

export default Form;
