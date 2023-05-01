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
  useGetRangePayoutsQuery,
  useGetDailyRevenueOrdersQuery
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
import { humanDate } from "../../helpers/dateHelpers";
import { GLDisplayTable } from "../../shared/GlowLEDsComponents/GLDisplayTable";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);

  const { year, month, start_date, end_date, start_end_date, loading } = dashboardPage;

  const [earnings, set_earnings] = useState([]);
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates } = affiliatePage;

  const range_revenue = useGetRangeRevenueOrdersQuery({ start_date, end_date });
  const category_range_revenue = useGetRangeCategoryRevenueOrdersQuery({ start_date, end_date });
  const tips_range_revenue = useGetRangeTipsRevenueOrdersQuery({ start_date, end_date });
  const affiliate_earnings_code_usage = useGetRangeAffiliateEarningsCodeUsageQuery({ start_date, end_date });
  const daily_revenue = useGetDailyRevenueOrdersQuery({ start_date, end_date });
  const monthy_revenue = useGetMonthlyRevenueOrdersQuery({ year });
  const yearly_revenue = useGetYearlyRevenueOrdersQuery();
  const range_payouts = useGetRangePayoutsQuery({ start_date, end_date });

  useEffect(() => {
    dispatch(listAffiliates({ active: true }));
  }, []);

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
  }, [affiliates, year, month]);
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
      affiliates
        .filter(affiliate => {
          return affiliate.sponsor === true || affiliate.promoter === true;
        })
        .map(async affiliate => {
          const { data: promo_code_usage } = await axios.get(
            `/api/orders/code_usage/${affiliate?.public_code?.promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${affiliate.sponsor}`
          );
          return { ...promo_code_usage, artist_name: affiliate.artist_name };
        })
    );
    set_earnings(affiliate_earnings);
  };

  const timeLabel = year && month ? `${year} ${month}` : year ? year : month ? month : "All Time";

  const isLoading = data => {
    return !data.isLoading && data.data[0];
  };

  console.log({ month, year, yearly_revenue, earnings });
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
      <Loading
        loading={
          loading && daily_revenue.isLoading && monthy_revenue.isLoading && category_range_revenue.isLoading && yearly_revenue.isLoading
        }
      />
      <div className="m-auto w-100per max-w-800px">
        <DatePicker year={year} month={month} start_date={start_date} end_date={end_date} start_end_date={start_end_date} />
        <h3 className="ta-c w-100per jc-c fs-25px">{timeLabel} Sales</h3>
        <h3 className="fs-30px jc-c">${isLoading(range_revenue) ? range_revenue.data[0]?.totalPrice.toFixed(2) : "0.00"}</h3>
        <h3 className="ta-c w-100per jc-c fs-25px">{timeLabel} Tips</h3>
        <h3 className="fs-30px jc-c">${isLoading(tips_range_revenue) ? tips_range_revenue.data[0]?.total_tips.toFixed(2) : "0.00"}</h3>
        <h3 className="ta-c w-100per jc-c fs-25px">{timeLabel} Payouts</h3>
        <h3 className="fs-30px jc-c">${isLoading(range_payouts) ? range_payouts.data[0]?.totalAmount?.toFixed(2) : "0.00"}</h3>
        {!month && !year && (
          <div>
            {yearly_revenue.isSuccess && (
              <GLDisplayTable
                title={"Yearly Revenue"}
                loading={yearly_revenue.isLoading && yearly_revenue.data}
                rows={!yearly_revenue.isLoading && yearly_revenue.data && [...yearly_revenue.data].sort((a, b) => a.year - b.year)}
                columnDefs={[
                  { title: "Year", display: "year" },
                  { title: "Revenue", display: row => `$${row.totalPrice.toFixed(2)}` }
                ]}
              />
            )}
          </div>
        )}

        {month && year && (
          <>
            {daily_revenue.isSuccess && (
              <GLDisplayTable
                title={"Daily Revenue"}
                loading={daily_revenue.isLoading && daily_revenue.data}
                rows={!daily_revenue.isLoading && daily_revenue.data}
                columnDefs={[
                  { title: "Day", display: row => humanDate(row.date) },
                  { title: "Revenue", display: row => `$${row.totalPrice.toFixed(2)}` }
                ]}
              />
            )}
          </>
        )}

        {!month && year && (
          <GLDisplayTable
            title={"Monthly Revenue"}
            loading={monthy_revenue.isLoading}
            rows={[...monthy_revenue.data].sort((a, b) => a.month - b.month)}
            columnDefs={[
              { title: "Year", display: row => months[row.month - 1] },
              { title: "Revenue", display: row => `$${row.totalPrice.toFixed(2)}` }
            ]}
          />
        )}
        {earnings?.length > 0 && (
          <GLDisplayTable
            title={`${year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Affiliate Earnings Code Usage`}
            loading={!earnings}
            rows={earnings.sort((a, b) => b.number_of_uses - a.number_of_uses)}
            columnDefs={[
              { title: "Ranking", display: (row, index) => `${index + 1}.` },
              { title: "Affiliate", display: row => row?.artist_name },
              { title: "Code Usage", display: row => (row.number_of_uses ? row?.number_of_uses : "0") },
              { title: "Earnings", display: row => `$${row.earnings ? row?.earnings?.toFixed(2) : "0:00"}` },
              { title: "Revenue", display: row => `$${row?.revenue ? row?.revenue?.toFixed(2) : "0:00"}` }
            ]}
          />
        )}

        {category_range_revenue.isSuccess && (
          <GLDisplayTable
            title="Category Sales"
            loading={category_range_revenue.isLoading && category_range_revenue?.data}
            rows={
              !category_range_revenue.isLoading &&
              category_range_revenue?.data &&
              [...category_range_revenue.data]
                // .sort((a, b) => a._id.localeCompare(b._id))
                .sort((a, b) => b.revenue - a.revenue)
            }
            columnDefs={[
              { title: "Category", display: row => humanize(row._id) },
              { title: "Revenue", display: row => `$${row.revenue.toFixed(2)}` },
              { title: "Quantity Sold", display: "quantity" }
            ]}
          />
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
