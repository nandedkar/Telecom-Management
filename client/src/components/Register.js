// Register.js
import React, { useState } from "react";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import { Alert, Box, Button, TextField } from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./index.scss";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    adharNumber: "",
    registrationDate: "",
    mobileNumber: "",
    status: "",
  });

  const [response, setResponse] = useState();

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field || e.target.name]: field ? e : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers/register",
        formData
      );
      setResponse({
        message: response.data.message,
        isSuccess: response.data.isSuccess,
      });
      // Add logic for success message or redirect
    } catch (error) {
      console.error("Error:", error);
      setResponse({
        message: error.response.data.message,
        isSuccess: error.response.data.isSuccess,
      });
      // Add logic for error message
    }
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "55ch" },
      }}
    >
      <div>
        <form className="register" onSubmit={handleSubmit}>
          {response && (
            <Alert
              severity={response?.isSuccess ? "success" : "error"}
              closeText="close"
            >
              {response?.message}
            </Alert>
          )}
          <TextField
            required
            id="outlined-required"
            label="Name"
            name="name"
            defaultValue=""
            type="text"
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="DOB"
                name="dob"
                // defaultValue={formData.dob}
                onChange={(newValue) =>
                  handleChange(dayjs(newValue).format("DD/MM/YYYY"), "dob")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
            name="email"
            type="email"
            onChange={handleChange}
          />

          <TextField
            required
            id="outlined-required"
            label="Aadhar"
            defaultValue=""
            type="number"
            name="adharNumber"
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Registration Date"
                name="registrationDate"
                onChange={(newValue) =>
                  handleChange(
                    dayjs(newValue).format("DD/MM/YYYY"),
                    "registrationDate"
                  )
                }
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            required
            id="outlined-required"
            label="Mobile No"
            defaultValue=""
            type="number"
            name="mobileNumber"
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Register;
