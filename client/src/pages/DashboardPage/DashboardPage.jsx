import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GLAutocomplete, GLCheckboxV2, GLTextField } from "../../shared/GlowLEDsComponents";
import { makeStyles } from "@mui/styles";
import { Grid, TextField } from "@mui/material";
import useChangedEffect from "../../shared/Hooks/useChangedEffect";
import { create_query } from "../../utils/helper_functions";
import { useGetAllTimeRevenueOrdersQuery, useGetRangeRevenueOrdersQuery } from "./dashboardApi";
import { getMonthStartEndDates } from "./dashboardHelpers";
import { useDispatch, useSelector } from "react-redux";
import { set_end_date, set_month, set_start_date, set_start_end_date, set_year } from "./dashboardSlice";
import { set_affiliate } from "../../slices/affiliateSlice";

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
  const dispatch = useDispatch();
  const dashboardSlice = useSelector(state => state.dashboardSlice);

  const { year, month, start_date, end_date, start_end_date } = dashboardSlice;
  const history = useHistory();
  const current_year = new Date().getFullYear();
  const current_month = new Date().getMonth();
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const all_time_revenue = useGetAllTimeRevenueOrdersQuery();
  console.log({ all_time_revenue });

  const range_revenue = useGetRangeRevenueOrdersQuery({ start_date, end_date });
  console.log({ range_revenue });

  useChangedEffect(() => {
    const dates = getMonthStartEndDates(month, parseInt(year) || parseInt(current_year));
    console.log({ dates });
    dispatch(set_start_date(dates.start_date));
    dispatch(set_end_date(dates.end_date));
    let query = create_query({ start_date: dates.start_date, end_date: dates.end_date });
    if (!year && !month && start_date && end_date) {
      query = create_query({ start_date: dates.start_date, end_date: dates.end_date });
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
              onChange={(e, value) => dispatch(set_year(value))}
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
              onChange={(e, value) => dispatch(set_month(value))}
              classes={classes}
            />
          </Grid>
        </Grid>
        <GLCheckboxV2 onChecked={e => dispatch(set_start_end_date(e.target.checked))} checked={start_end_date} label="Specific Dates" />
        {start_end_date && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <GLTextField
                size="small"
                value={start_date}
                fullWidth
                type="date"
                margin="normal"
                name="start_date"
                label="Start Date"
                variant="outlined"
                onChange={e => dispatch(set_start_date(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GLTextField
                size="small"
                value={end_date}
                fullWidth
                type="date"
                margin="normal"
                name="end_date"
                label="End Date"
                variant="outlined"
                onChange={e => dispatch(set_end_date(e.target.value))}
              />
            </Grid>
          </Grid>
        )}
        <h3 className="ta-c w-100per jc-c fs-25px">
          {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Sales
        </h3>
        {!month && !year ? (
          <div>
            <h3 className="fs-30px jc-c">${!all_time_revenue.isLoading && all_time_revenue.data[0]?.totalPrice.toFixed(2)}</h3>
          </div>
        ) : (
          <div>
            <h3 className="fs-30px jc-c">${!range_revenue.isLoading && range_revenue.data[0]?.totalPrice.toFixed(2)}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
