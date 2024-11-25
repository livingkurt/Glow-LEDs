import React from "react";
import PropTypes from "prop-types";
import Remove from "@mui/icons-material/Remove";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  determineDataDateRange,
  getThisMonthRange,
  getThisWeekRange,
  getTodayRange,
  isDateRangeValid,
} from "./glDateRangePickerHelpers";
import dayjs from "dayjs";
import { Box, Grid } from "@mui/material";
import GLTextField from "../GLTextField/GLTextField";

// eslint-disable-next-line max-lines-per-function
const CODateRangePicker = ({ onChange, startDate, endDate, dateRange, data }) => {
  const handleStartDateChange = event => {
    const newStartDate = event.target.value;
    onChange({ date: [newStartDate, endDate], range: null });
  };

  const handleEndDateChange = event => {
    const newEndDate = event.target.value;
    onChange({ date: [startDate, newEndDate], range: null });
  };

  const handleRangeChange = (_, newRange) => {
    if (newRange === null) {
      onChange({ date: [], range: null });
      return;
    }

    let start;
    let end;
    let message;

    switch (newRange) {
      case "today":
        [start, end] = getTodayRange();
        message = "No data available for today";
        break;
      case "thisWeek":
        [start, end] = getThisWeekRange();
        message = "No data available for this week";
        break;
      case "thisMonth":
        [start, end] = getThisMonthRange();
        message = "No data available for this month";
        break;
      default:
        return;
    }

    if (isDateRangeValid(data, start, end)) {
      onChange({ date: [start, end], range: newRange });
    } else {
      window.Covy.showSnackbar({
        message,
        severity: "warning",
      });
    }
  };

  const [minDate, maxDate] = determineDataDateRange(data);

  return (
    <Box m={2} width="400px">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={dateRange}
            exclusive
            onChange={handleRangeChange}
            aria-label="date range"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <ToggleButton color="primary" value="today" style={{ flex: 1 }}>
              {"Today"}
            </ToggleButton>
            <ToggleButton color="primary" value="thisWeek" style={{ flex: 1 }}>
              {"This Week"}
            </ToggleButton>
            <ToggleButton color="primary" value="thisMonth" style={{ flex: 1 }}>
              {"This Month"}
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={5} alignItems="center" justifyContent="space-between">
            <GLTextField
              label="Start Date"
              type="date"
              fullWidth
              dataTest="start-date"
              variant="outlined"
              value={startDate || ""}
              onChange={handleStartDateChange}
              InputLabelProps={{ shrink: true }}
              helperText={minDate && `Earliest date: ${dayjs.utc(minDate).format("MM/DD/YYYY")}`}
              inputProps={{
                max: endDate || "",
              }}
            />
            <Remove />
            <GLTextField
              label="End Date"
              type="date"
              fullWidth
              dataTest="end-date"
              variant="outlined"
              value={endDate || ""}
              onChange={handleEndDateChange}
              InputLabelProps={{ shrink: true }}
              helperText={maxDate && `Latest date: ${dayjs.utc(maxDate).format("MM/DD/YYYY")}`}
              inputProps={{
                min: startDate || "",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

CODateRangePicker.propTypes = {
  onChange: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  dateRange: PropTypes.string,
  data: PropTypes.array,
};

CODateRangePicker.defaultProps = {
  onChange: () => {},
  startDate: "",
  endDate: "",
  dateRange: "",
  data: [],
};

export default CODateRangePicker;
