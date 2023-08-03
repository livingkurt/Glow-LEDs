import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import { getMonthStartEndDates, months, years } from "../dashboardHelpers";
import { resetDateRange, set_end_date, set_month, set_start_date, set_year } from "../dashboardSlice";

const DatePicker = ({ year, month, start_date, end_date }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const startDateFromUrl = searchParams.get("start_date");
  //   const endDateFromUrl = searchParams.get("end_date");

  //   if (startDateFromUrl) {
  //     const startDateObj = new Date(startDateFromUrl);
  //     dispatch(set_start_date(startDateFromUrl));
  //     dispatch(set_year(startDateObj.getFullYear().toString()));
  //     dispatch(set_month(months[startDateObj.getUTCMonth()]));
  //   }

  //   if (endDateFromUrl) {
  //     dispatch(set_end_date(endDateFromUrl));
  //   }
  // }, [dispatch, location.search, year, month]);

  const handleYearChange = selectedYear => {
    const { start_date, end_date } = getMonthStartEndDates({ year: selectedYear, month });
    dispatch(set_year(selectedYear));
    dispatch(set_start_date(start_date));
    dispatch(set_end_date(end_date));
    // updateUrlParams({ start_date, end_date });
  };

  const handleMonthChange = selectedMonth => {
    const { start_date, end_date } = getMonthStartEndDates({ year, month: selectedMonth });
    dispatch(set_month(selectedMonth));
    dispatch(set_start_date(start_date));
    dispatch(set_end_date(end_date));
    // updateUrlParams({ start_date, end_date });
  };

  const handleStartDateChange = date => {
    dispatch(set_start_date(date));
    // updateUrlParams({ start_date: date });
  };

  const handleEndDateChange = date => {
    dispatch(set_end_date(date));
    // updateUrlParams({ end_date: date });
  };

  // const updateUrlParams = ({ start_date, end_date, year, month }) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   if (start_date) {
  //     searchParams.set("start_date", start_date);
  //   }
  //   if (end_date) {
  //     searchParams.set("end_date", end_date);
  //   }
  //   history.push({ search: searchParams.toString() });
  // };

  return (
    <Paper className="p-20px mt-20px">
      <Typography variant="h6" align="center">
        Choose Date Range
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <GLAutocomplete
            margin="normal"
            value={year}
            options={years}
            optionDisplay={option => option}
            getOptionLabel={option => option}
            getOptionSelected={(option, value) => option === value}
            name="year"
            label="Year"
            onChange={(e, value) => handleYearChange(value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GLAutocomplete
            margin="normal"
            value={month}
            options={months}
            optionDisplay={option => option}
            getOptionLabel={option => option}
            getOptionSelected={(option, value) => option === value}
            name="month"
            label="Month"
            onChange={(e, value) => handleMonthChange(value)}
          />
        </Grid>
      </Grid>
      <Divider className="mt-10px mb-10px" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            value={start_date}
            fullWidth
            type="date"
            margin="normal"
            name="start_date"
            label="Start Date"
            variant="outlined"
            onChange={e => handleStartDateChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            value={end_date}
            fullWidth
            type="date"
            margin="normal"
            name="end_date"
            label="End Date"
            variant="outlined"
            onChange={e => handleEndDateChange(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box className="jc-b">
        <Button
          onClick={() => {
            dispatch(resetDateRange());
            history.push({ search: "" });
          }}
          variant="contained"
          className="mt-10px"
        >
          Reset Date Range
        </Button>
        <Button
          onClick={() => {
            dispatch(set_month(""));
            history.push({ search: "" });
          }}
          variant="contained"
          className="mt-10px"
        >
          Remove Month
        </Button>
      </Box>
    </Paper>
  );
};

export default DatePicker;
