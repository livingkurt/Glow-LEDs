import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import useChangedEffect from "../../shared/Hooks/useChangedEffect";
import { create_query, humanize } from "../../utils/helper_functions";
import {
  useGetAllTimeCategoryRevenueOrdersQuery,
  useGetAllTimeRevenueOrdersQuery,
  useGetMonthlyRevenueOrdersQuery,
  useGetRangeCategoryRevenueOrdersQuery,
  useGetRangeRevenueOrdersQuery,
  useGetYearlyRevenueOrdersQuery
} from "./dashboardApi";
import { getMonthStartEndDates, months, years } from "./dashboardHelpers";
import { useDispatch, useSelector } from "react-redux";
import { set_end_date, set_start_date } from "./dashboardSlice";
import { DatePicker } from "./components";

const DashboardPage = props => {
  const dispatch = useDispatch();
  const dashboardSlice = useSelector(state => state.dashboardSlice);

  const { year, month, start_date, end_date, start_end_date } = dashboardSlice;
  const history = useHistory();
  const current_year = new Date().getFullYear();

  const all_time_revenue = useGetAllTimeRevenueOrdersQuery();
  const range_revenue = useGetRangeRevenueOrdersQuery({ start_date, end_date });
  const category_range_revenue = useGetRangeCategoryRevenueOrdersQuery({ start_date, end_date });
  const category_all_time_revenue = useGetAllTimeCategoryRevenueOrdersQuery();
  const monthy_revenue = useGetMonthlyRevenueOrdersQuery({ year });
  const yearly_revenue = useGetYearlyRevenueOrdersQuery();

  useChangedEffect(() => {
    const dates = getMonthStartEndDates(month, parseInt(year) || parseInt(current_year));
    dispatch(set_start_date(dates.start_date));
    dispatch(set_end_date(dates.end_date));
    let query = "";
    if (!year && !month && start_date && end_date) {
      query = create_query({ start_date: dates.start_date, end_date: dates.end_date });
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
        <DatePicker year={year} month={month} start_date={start_date} end_date={end_date} start_end_date={start_end_date} />
        <h3 className="ta-c w-100per jc-c fs-25px">
          {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Sales
        </h3>
        {!month && !year && (
          <div>
            <h3 className="fs-30px jc-c">
              ${!all_time_revenue.isLoading && all_time_revenue.data[0] ? all_time_revenue.data[0]?.totalPrice.toFixed(2) : "0.00"}
            </h3>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <span className="title_font">Year</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className="title_font">Revenue</span>
              </Grid>
            </Grid>
            <hr />
            <div>
              {!yearly_revenue.isLoading &&
                yearly_revenue?.data[0]?.data &&
                [...yearly_revenue.data[0].data]
                  .sort((a, b) => a.year - b.year)
                  .map((revenue, index) => {
                    return (
                      <div key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <span className="">{revenue.year}</span>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <span>${revenue.totalPrice.toFixed(2)}</span>
                          </Grid>
                        </Grid>
                        <hr />
                      </div>
                    );
                  })}
            </div>
            <h3 className="fs-25px jc-c">Category Sales</h3>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <span className="title_font">Category</span>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <span className="title_font">Revenue</span>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <span className="title_font">Quantity Sold</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <hr />
            <div>
              {!category_all_time_revenue.isLoading &&
                category_all_time_revenue?.data &&
                [...category_all_time_revenue.data]
                  // .sort((a, b) => a._id.localeCompare(b._id))
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((category, index) => {
                    return (
                      <div key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={4}>
                                <span className="">{humanize(category._id)}</span>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <span>${category.revenue.toFixed(2)}</span>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <span>${category.quantity}</span>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <hr />
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
        {month && year && (
          <div>
            <h3 className="fs-30px jc-c">
              ${!range_revenue.isLoading && range_revenue.data[0] ? range_revenue.data[0]?.totalPrice.toFixed(2) : "0.00"}
            </h3>
          </div>
        )}
        {!month && year && (
          <div>
            <h3 className="fs-30px jc-c">
              ${!range_revenue.isLoading && range_revenue.data[0] ? range_revenue.data[0]?.totalPrice.toFixed(2) : "0.00"}
            </h3>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <span className="title_font">Year</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className="title_font">Revenue</span>
              </Grid>
            </Grid>
            <hr />
            <div>
              {!monthy_revenue.isLoading &&
                monthy_revenue?.data[0]?.data &&
                [...monthy_revenue.data[0].data]
                  .sort((a, b) => a.month - b.month)
                  .map((revenue, index) => {
                    return (
                      <div key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <span className="">{months[revenue.month - 1]}</span>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <span>${revenue.totalPrice.toFixed(2)}</span>
                          </Grid>
                        </Grid>
                        <hr />
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
        {year && (
          <>
            <h3 className="fs-25px jc-c">Category Sales</h3>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <span className="title_font">Category</span>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <span className="title_font">Revenue</span>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <span className="title_font">Quantity Sold</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <hr />
            <div>
              {!category_range_revenue.isLoading &&
                category_range_revenue?.data &&
                [...category_range_revenue.data]
                  // .sort((a, b) => a._id.localeCompare(b._id))
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((category, index) => {
                    return (
                      <div key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={4}>
                                <span className="">{humanize(category._id)}</span>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <span>${category.revenue.toFixed(2)}</span>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <span>{category.quantity}</span>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <hr />
                      </div>
                    );
                  })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
