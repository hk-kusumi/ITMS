import {
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
  Stack,
  Box,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Tile } from "../../../card/Tile";
import { Formik } from "formik";
import * as yup from "yup";
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar";
import axios from "axios";

const User = {
  companyName: "",
  companyEmail: "",
  companyContactNo: "",
  companyAddress: "",
  companyIntenSeats: "",
  companyDescription: "",
  companyConnectedForInterns: "",
};

export const CompanyCreateForm = () => {
  const [message, setMessage] = useState(null);

  //statusSnackBar state
  const [trigger, setTrigger] = useState({
    success: false,
    error: false,
  });
  //End of statusSnackBar state
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/company/create",
        {
          name: values.companyName,
          email: values.companyEmail,
          contactNo: values.companyContactNo,
          address: values.companyAddress,
          internSeats: values.companyInternSeats,
          description: values.companyDescription,
          connectedForIntern: values.companyConnectedForInterns,
        },
        { withCredentials: true }
      );
      if (res.status === 201) {
        setMessage("Company created successfullly");
        handleSnackBar("success");
      } else {
        setMessage("Company not created");
        handleSnackBar("error");
      }
    } catch (error) {
      setMessage("Company already created");
      handleSnackBar("error");
    }
  };

  const validation = yup.object().shape({
    companyName: yup.string().required("required Field"),
    companyEmail: yup
      .string()
      .email("Invalid Email")
      .required("required Field"),
    companyContactNo: yup
      .string()
      .length(10, "must contain 10 digits")
      .required("Required Field"),
    companyAddress: yup.string().required("required Field"),
    companyIntenSeats: yup.number(),
    companyDescription: yup.string(),
    companyConnectedForInterns: yup.boolean(),
  });

  return (
    <Tile>
      <Stack direction={"column"} spacing={2} height={"75vh"}>
        <Stack>
          <Typography variant="head6">Creation Form</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Grid container>
            <Grid item md={12}>
              <Stack alignItems={"center"}>
                <Paper variant="outlined" sx={{ bgcolor: "#fff", padding: 5 }}>
                  <Stack alignItems={"center"}>
                    <Box>
                      <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={User}
                        validationSchema={validation}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          handleReset,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            {/* <Stack direction={"row"} spacing={2}> */}
                            <Stack direction={"column"} spacing={1}>
                              <Stack direction={"row"}>
                                <Stack minWidth={"220px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Company Name
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyName}
                                    name="companyName"
                                    error={
                                      !!touched.companyName &&
                                      !!errors.companyName
                                    }
                                    helperText={
                                      touched.companyName && errors.companyName
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"220px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Email Address
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyEmail}
                                    name="companyEmail"
                                    error={
                                      !!touched.companyEmail &&
                                      !!errors.companyEmail
                                    }
                                    helperText={
                                      touched.companyEmail &&
                                      errors.companyEmail
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"220px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Contact Number
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyContactNo}
                                    name="companyContactNo"
                                    error={
                                      !!touched.companyContactNo &&
                                      !!errors.companyContactNo
                                    }
                                    helperText={
                                      touched.companyContactNo &&
                                      errors.companyContactNo
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"220px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Company Address
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyAddress}
                                    name="companyAddress"
                                    error={
                                      !!touched.companyAddress &&
                                      !!errors.companyAddress
                                    }
                                    helperText={
                                      touched.companyAddress &&
                                      errors.companyAddress
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"220px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Inten Seats
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    InputProps={{ inputProps: { min: 0, step: 1 } }}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyIntenSeats}
                                    name="companyIntenSeats"
                                    error={
                                      !!touched.companyIntenSeats &&
                                      !!errors.companyIntenSeats
                                    }
                                    helperText={
                                      touched.companyIntenSeats &&
                                      errors.companyIntenSeats
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"220px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Connected for Intern Seats
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>

                                  <Select
                                    variant="outlined"
                                    labelId="companyConnectedForInternsId"
                                    id="companyConnectedForInterns"
                                    name="companyConnectedForInterns"
                                    value={values.companyConnectedForInterns}
                                    onChange={handleChange}
                                  >
                                    <MenuItem value="true">Yes</MenuItem>
                                    <MenuItem value="false">No</MenuItem>
                                  </Select>
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"220px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Company Description
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    multiline
                                    maxRows={5}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyDescription}
                                    name="companyDescription"
                                    error={
                                      !!touched.companyDescription &&
                                      !!errors.companyDescription
                                    }
                                    helperText={
                                      touched.companyDescription &&
                                      errors.companyDescription
                                    }
                                  />
                                </Stack>
                              </Stack>
                              <Stack alignItems={"flex-end"}>
                                <Stack direction={"row"}>
                                  <Button
                                    variant="itms"
                                    size="itms-small"
                                    onClick={handleReset}
                                  >
                                    clear
                                  </Button>
                                  <Button
                                    variant="itms"
                                    size="itms-small"
                                    type="submit"
                                  >
                                    ADD
                                  </Button>
                                </Stack>
                              </Stack>
                            </Stack>
                          </form>
                        )}
                      </Formik>
                      <StatusSnackBar
                        severity="success"
                        trigger={trigger.success}
                        setTrigger={() => {
                          handleSnackBar("success");
                        }}
                        alertMessage={message}
                      />

                      <StatusSnackBar
                        severity="error"
                        trigger={trigger.error}
                        setTrigger={() => {
                          handleSnackBar("error");
                        }}
                        alertMessage={message}
                      />
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Tile>
  );
};
