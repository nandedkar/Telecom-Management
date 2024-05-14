import React, { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import Register from "./components/Register";
import DisplayCustomer from "./components/DisplayCustomer";
import { Button, Grid } from "@mui/material";
import ChoosePlan from "./components/ChoosePlan";
import RenewPlan from "./components/RenewPlan";
import UpgradeDowngrade from "./components/UpgradeDowngrade";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/displayCustomers" element={<DisplayCustomer />} />
          <Route path="/plan" element={<ChoosePlan />} />
          <Route path="/renewPlan/:userId" element={<RenewPlan />} />
          <Route path="/upgradeDowngrade/:userId" element={<UpgradeDowngrade />} />
          <Route path="/upgradeDowngrade" element={<UpgradeDowngrade />} />
          <Route path="/renewPlan" element={<RenewPlan />} />
          {/* 
            <Route path="upgradeDowngradePlan" element={<UpgradeDowngradePlan />} />
            <Route path="*" element={<NoMatch />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

function Home() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Button href="/register" variant="contained">
          New User
        </Button>
        <Button href="/displayCustomers" variant="outlined">
          Existing User
        </Button>
      </Grid>
    </Grid>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
