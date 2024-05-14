// RenewPlan.js
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
const RenewPlan = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    id: userId,
    renewDate: dayjs(new Date()),
    status: "Active",
  });
  const [userData, setUserData] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchUserById();
  }, []);

  const fetchUserById = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customers/userById/${userId}`
        );

        setUserData(response.data);
        console.log(response.data);
        // Add logic for success message or redirect
      } catch (error) {
        console.error("Error:", error);
        // Add logic for error message
      }
    } else {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
  };

  const handleDate = (field, date) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers/renewPlan",
        formData
      );
      console.log(response.data);

      setResponse(response.data.message);
      window.location.href = '/displayCustomers';
      // history.push("/redirect");
      // Add logic for success message or redirect
    } catch (error) {
      console.error("Error:", error);
      // Add logic for error message
    }
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "55ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <form className="renewPlan" onSubmit={handleSubmit}>
        {userId ? (
          <div>Renewing for User : {userData[0]?.name}</div>
        ) : (
          <>
            <Alert severity="error">
              User not selected for renewing plan, Please select user from below
              list.
            </Alert>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="plan-cost-label">Select customer *</InputLabel>
              <Select
                name="id"
                id="customer-label"
                label="Select Customer *"
                onChange={handleChange}
                required
              >
                {userData.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Controlled picker"
                name="renewDate"
                defaultValue={formData.renewDate}
                onChange={(newValue) => handleDate("renewDate", newValue)}
                required
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-label">Plan Status</InputLabel>
          <Select
            name="status"
            defaultValue={formData.status}
            label="Plan Status"
            onChange={handleChange}
            required
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Update
        </Button>
      </form>
      <h3>{response}</h3>
    </Box>
  );
};

export default RenewPlan;
