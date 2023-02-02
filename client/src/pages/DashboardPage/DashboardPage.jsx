import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { hslToHex } from "../../utils/helper_functions";
import { API_Orders } from "../../utils";
import { Helmet } from "react-helmet";
import { Loading } from "../../shared/SharedComponents";
import Overflow from "react-overflow-indicator";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { GLAutocomplete, GLButton } from "../../shared/GlowLEDsComponents";
import { makeStyles } from "@mui/styles";
import { Autocomplete, Grid, TextField } from "@mui/material";
import useChangedEffect from "../../shared/Hooks/useChangedEffect";
import { create_query } from "../../utils/helper_functions";

const useStyles = makeStyles(() => ({
  textField: {
    marginTop: 15,
    marginBottom: 15
  },
  skeleton: {
    marginTop: -10,
    marginBottom: -10
  }
}));

const DashboardPage = props => {
  const classes = useStyles();
  const history = useHistory();
  const current_year = new Date().getFullYear();
  const current_month = new Date().getMonth();
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [year, set_year] = useState();
  const [month, set_month] = useState();

  useChangedEffect(() => {
    let query = create_query({ year, month });
    if (year && month) {
      query = create_query({ year, month });
    } else if (year) {
      query = create_query({ year });
    } else if (month) {
      query = create_query({ month });
    } else {
      query = "";
    }
    history.push(`/secure/glow/dashboard?${query}`);
    return () => {};
  }, [year, month]);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Dashboard | Glow LEDs</title>
      </Helmet>
      <h2 className="ta-c w-100per jc-c fs-30px">Glow LEDs Dashboard</h2>
      <div className="m-auto w-100per max-w-800px">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <GLAutocomplete
              margin="normal"
              value={year}
              options={years}
              option_name={option => option}
              getOptionLabel={option => option}
              getOptionSelected={(option, value) => option === value}
              name="year"
              label="Year"
              onChange={(e, value) => set_year(value)}
              classes={classes}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <GLAutocomplete
              margin="normal"
              value={month}
              options={months}
              option_name={option => option}
              getOptionLabel={option => option}
              getOptionSelected={(option, value) => option === value}
              name="month"
              label="Month"
              onChange={(e, value) => set_month(value)}
              classes={classes}
            />
          </Grid>
        </Grid>
        <h3 className="ta-c w-100per jc-c fs-25px">All Time Sales</h3>
      </div>
    </div>
  );
};
export default DashboardPage;
