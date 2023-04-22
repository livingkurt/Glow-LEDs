import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import useChangedEffect from "../../shared/Hooks/useChangedEffect";
import { create_query, humanize } from "../../utils/helper_functions";
import { payout_employees } from "./background/weekly_workers/payout_employees";
import { payout_affiliates } from "./background/monthly_workers/payout_affiliates";
import { payout_teams } from "./background/monthly_workers/payout_teams";
import { payout_tips } from "./background/monthly_workers/payout_tips";
import { refresh_sponsor_codes } from "./background/monthly_workers/refresh_sponsor_codes";
import { facebook_catalog_upload } from "./background/daily_workers/facebook_catalog_upload";
import { google_catalog_upload } from "./background/daily_workers/google_catalog_upload";
import {
  // get_airtable_expenses,
  useGetAllTimeCategoryRevenueOrdersQuery,
  useGetAllTimeRevenueOrdersQuery,
  useGetAllTimeTipsRevenueOrdersQuery,
  useGetMonthlyRevenueOrdersQuery,
  useGetRangeAffiliateEarningsCodeUsageQuery,
  useGetRangeCategoryRevenueOrdersQuery,
  useGetRangeRevenueOrdersQuery,
  useGetRangeTipsRevenueOrdersQuery,
  useGetYearlyRevenueOrdersQuery,
  useGetAllTimePayoutsQuery,
  useGetRangePayoutsQuery
} from "./dashboardApi";
import { getMonthStartEndDates, months, years } from "./dashboardHelpers";
import { useDispatch, useSelector } from "react-redux";
import { set_end_date, set_loading, set_start_date } from "./dashboardSlice";
import { DatePicker } from "./components";
import { useEffect, useState } from "react";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { Loading } from "../../shared/SharedComponents";
import { listAffiliates } from "../../api";
import axios from "axios";

const DashboardPage = props => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);

  const { year, month, start_date, end_date, start_end_date, loading } = dashboardPage;

  const [earnings, set_earnings] = useState([]);
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates } = affiliatePage;
  const history = useHistory();
  const current_year = new Date().getFullYear();
  // const business_start_date = new Date("2020-08-01");

  const all_time_revenue = useGetAllTimeRevenueOrdersQuery();
  const range_revenue = useGetRangeRevenueOrdersQuery({ start_date, end_date });
  const category_all_time_revenue = useGetAllTimeCategoryRevenueOrdersQuery();
  const category_range_revenue = useGetRangeCategoryRevenueOrdersQuery({ start_date, end_date });
  const tips_all_time_revenue = useGetAllTimeTipsRevenueOrdersQuery();
  const tips_range_revenue = useGetRangeTipsRevenueOrdersQuery({ start_date, end_date });
  const affiliate_earnings_code_usage = useGetRangeAffiliateEarningsCodeUsageQuery({ start_date, end_date });
  // const daily_revenue = useGetMonthlyRevenueOrdersQuery({ start_date, end_date });
  const monthy_revenue = useGetMonthlyRevenueOrdersQuery({ year });
  const yearly_revenue = useGetYearlyRevenueOrdersQuery();
  const all_time_payouts = useGetAllTimePayoutsQuery();
  const range_payouts = useGetRangePayoutsQuery({ start_date, end_date });

  console.log({ all_time_payouts, range_payouts });

  useChangedEffect(() => {
    dispatch(listAffiliates({ active: true }));
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

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (affiliates) {
        affiliate_earnings();
      }
    }
    return () => {
      clean = false;
    };
  }, [affiliates]);

  // useEffect(() => {
  // get_airtable_expenses(2023);
  //   return () => {};
  // }, []);
  const run_daily_workers = () => {
    const confirm = window.confirm("Are you sure you want to run the daily worker?");
    if (confirm) {
      dispatch(set_loading(true));
      facebook_catalog_upload();
      google_catalog_upload();
      dispatch(set_loading(false));
    }
  };

  const run_weekly_workers = () => {
    const confirm = window.confirm("Are you sure you want to run the weekly worker?");
    if (confirm) {
      dispatch(set_loading(true));
      payout_employees();
      dispatch(set_loading(false));
    }
  };
  const run_monthly_workers = () => {
    const confirm = window.confirm("Are you sure you want to run the monthly worker?");
    if (confirm) {
      dispatch(set_loading(true));
      payout_affiliates();
      payout_teams();
      payout_tips();
      refresh_sponsor_codes();
      dispatch(set_loading(false));
    }
  };

  const affiliate_earnings = async () => {
    const affiliate_earnings = await Promise.all(
      affiliates.map(async affiliate => {
        const { data: promo_code_usage } = await axios.get(
          `/api/orders/code_usage/${affiliate?.public_code?.promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${affiliate.sponsor}`
        );
        return { ...promo_code_usage, artist_name: affiliate.artist_name };
      })
    );
    set_earnings(affiliate_earnings);
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Dashboard | Glow LEDs</title>
      </Helmet>
      <h2 className="ta-c w-100per jc-c fs-30px">Glow LEDs Dashboard</h2>
      <div className="jc-b w-100per">
        <GLButton variant="primary" onClick={() => run_daily_workers()}>
          Run Daily Workers
        </GLButton>
        <GLButton variant="primary" onClick={() => run_weekly_workers()}>
          Run Weekly Workers
        </GLButton>
        <GLButton variant="primary" onClick={() => run_monthly_workers()}>
          Run Monthly Workers
        </GLButton>
      </div>
      <Loading loading={loading} />
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
            <h3 className="ta-c w-100per jc-c fs-25px">
              {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Tips
            </h3>
            <h3 className="fs-30px jc-c">
              $
              {!tips_all_time_revenue.isLoading && tips_all_time_revenue.data[0]
                ? tips_all_time_revenue.data[0]?.total_tips.toFixed(2)
                : "0.00"}
            </h3>
            <h3 className="ta-c w-100per jc-c fs-25px">
              {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Payouts
            </h3>
            <h3 className="fs-30px jc-c">
              ${!all_time_payouts.isLoading && all_time_payouts.data[0] ? all_time_payouts.data[0]?.totalAmount.toFixed(2) : "0.00"}
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
            <h3 className="ta-c w-100per jc-c fs-25px">
              {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Tips
            </h3>
            <h3 className="fs-30px jc-c">
              ${!tips_range_revenue.isLoading && tips_range_revenue.data[0] ? tips_range_revenue.data[0]?.total_tips.toFixed(2) : "0.00"}
            </h3>
            <h3 className="ta-c w-100per jc-c fs-25px">
              {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Payouts
            </h3>
            <h3 className="fs-30px jc-c">
              ${!range_payouts.isLoading && range_payouts.data[0] ? range_payouts.data[0]?.totalAmounts.toFixed(2) : "0.00"}
            </h3>
            <h3 className="fs-25px jc-c">Affiliate Earnings Code Usage</h3>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <span className="title_font">Affiliate</span>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <span className="title_font">Earnings</span>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <span className="title_font">Code Usage</span>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <span className="title_font">Revenue</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <hr />
            <div>
              {earnings
                .sort((a, b) => b.earnings - a.earnings)
                .map((affiliate, index) => {
                  return (
                    <div key={index}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                          <span className="">{affiliate?.artist_name}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <span>{affiliate.number_of_uses ? affiliate?.number_of_uses : "0"}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <span>${affiliate.earnings ? affiliate?.earnings?.toFixed(2) : "0:00"}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <span className="">${affiliate?.revenue ? affiliate?.revenue?.toFixed(2) : "0:00"}</span>
                        </Grid>
                      </Grid>
                      <hr />
                    </div>
                  );
                })}
            </div>
            {/* <div>
              {!affiliate_earnings_code_usage.isLoading &&
                affiliate_earnings_code_usage?.data &&
                [...affiliate_earnings_code_usage.data]
                  .sort((a, b) => b.earnings - a.earnings)
                  .map((affiliate, index) => {
                    return (
                      <div key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={3}>
                            <span className="">{affiliate?.artist_name}</span>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <span className="">${affiliate?.revenue ? affiliate?.revenue?.toFixed(2) : "0:00"}</span>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <span>${affiliate.earnings ? affiliate?.earnings?.toFixed(2) : "0:00"}</span>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <span>{affiliate.number_of_uses ? affiliate?.number_of_uses : "0"}</span>
                          </Grid>
                        </Grid>
                        <hr />
                      </div>
                    );
                  })}
            </div> */}
          </div>
        )}
        {!month && year && (
          <div>
            <h3 className="fs-30px jc-c">
              ${!range_revenue.isLoading && range_revenue.data[0] ? range_revenue.data[0]?.totalPrice.toFixed(2) : "0.00"}
            </h3>
            <h3 className="ta-c w-100per jc-c fs-25px">
              {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Tips
            </h3>
            <h3 className="fs-30px jc-c">
              ${!tips_range_revenue.isLoading && tips_range_revenue.data[0] ? tips_range_revenue.data[0]?.total_tips.toFixed(2) : "0.00"}
            </h3>
            <h3 className="ta-c w-100per jc-c fs-25px">
              {year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Payouts
            </h3>
            <h3 className="fs-30px jc-c">
              ${!range_payouts.isLoading && range_payouts.data[0] ? range_payouts.data[0]?.totalAmount.toFixed(2) : "0.00"}
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
