import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { GLAutocomplete, GLCheckboxV2, GLTextField } from "../../../shared/GlowLEDsComponents";
import { months, years } from "../dashboardHelpers";
import PropTypes from "prop-types";
import { set_end_date, set_month, set_start_date, set_start_end_date, set_year } from "../dashboardSlice";

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

const DatePicker = ({ year, month, start_date, end_date, start_end_date }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
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
            onChange={(e, value) => dispatch(set_year(value))}
            classes={classes}
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
    </div>
  );
};
DatePicker.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  start_end_date: PropTypes.bool
};

DatePicker.defaultProps = {
  year: "",
  month: "",
  start_date: "",
  end_date: "",
  start_end_date: false
};

export default DatePicker;
