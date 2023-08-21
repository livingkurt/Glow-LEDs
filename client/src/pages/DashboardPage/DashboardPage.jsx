import { Helmet } from "react-helmet";

import * as API from "./dashboardApi";
import { determineTabName, run_daily_workers, run_monthly_workers, run_weekly_workers } from "./dashboardHelpers";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { Loading } from "../../shared/SharedComponents";
import { AppBar, Paper, Tab, Tabs } from "@mui/material";
import { setTabIndex } from "./dashboardSlice";
import GLTabPanel from "../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import YearlyMonthlyDailyRevenue from "./components/YearlyMonthlyDailyRevenue";
import AffiliateEarnings from "./components/AffiliateEarnings";
import CategorySales from "./components/CategorySales";
import CurrentStock from "./components/CurrentStock";
import TotalsTable from "./components/TotalsTable";
import AllProductRevenue from "./components/AllProductRevenue";
import YearlyMonthlyProductRevenue from "./components/YearlyMonthlyProductRevenue";
import SponsorCheckins from "./components/SponsorCheckins";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);

  const { year, month, start_date, end_date, start_end_date, loading, tabIndex } = dashboardPage;

  const productPage = useSelector(state => state.products.productPage);
  const { product } = productPage;

  const range_revenue = API.useGetRangeRevenueOrdersQuery({ start_date, end_date });
  const category_range_revenue = API.useGetRangeCategoryRevenueOrdersQuery({ start_date, end_date });
  const tips_range_revenue = API.useGetRangeTipsRevenueOrdersQuery({ start_date, end_date });
  const affiliate_earnings_code_usage = API.useGetRangeAffiliateEarningsCodeUsageQuery({ start_date, end_date });
  const all_product_revenue = API.useGetProductRevenueQuery({ start_date, end_date });
  const daily_revenue = API.useGetDailyRevenueOrdersQuery({ start_date, end_date });
  const monthly_revenue = API.useGetMonthlyRevenueOrdersQuery({ year });
  const yearly_revenue = API.useGetYearlyRevenueOrdersQuery();
  const daily_expenses = API.useGetDailyExpenseOrdersQuery({ start_date, end_date });
  const monthly_expenses = API.useGetMonthlyExpenseOrdersQuery({ year });
  const yearly_expenses = API.useGetYearlyExpenseOrdersQuery();
  const range_payouts = API.useGetRangePayoutsQuery({ start_date, end_date });
  const range_expenses = API.useGetRangeExpensesQuery({ start_date, end_date });
  const sponsorCheckinStatus = API.useGetSponsorCheckinStatusQuery({ start_date, end_date });
  const questionConcerns = API.useGetQuestionConcernsQuery({ start_date, end_date });

  const monthly_product_revenue = API.useGetMonthlyRevenueProductOrdersQuery({ productId: product._id, year });
  const yearly_product_revenue = API.useGetYearlyRevenueProductOrdersQuery({ productId: product._id });
  // const range_product_revenue = API.useGetProductRangeRevenueOrdersQuery({ productId: product._id, start_date, end_date });
  // const range_gloves = API.useGetRangeGlovesQuery({ start_date, end_date });
  const currentStock = API.useGetCurrentStockQuery();

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Dashboard | Glow LEDs</title>
      </Helmet>
      <h2 className="ta-c w-100per jc-c fs-30px">Glow LEDs Dashboard</h2>
      <div className="jc-b w-100per">
        <GLButton variant="primary" onClick={() => run_daily_workers(dispatch)}>
          Run Daily Workers
        </GLButton>
        <GLButton variant="primary" onClick={() => run_weekly_workers(dispatch)}>
          Run Weekly Workers
        </GLButton>
        <GLButton variant="primary" onClick={() => run_monthly_workers(dispatch)}>
          Run Monthly Workers
        </GLButton>
      </div>
      <GLButton variant="primary" onClick={() => API.updateVersion()}>
        Update Version
      </GLButton>
      <Loading
        loading={
          daily_revenue.isLoading &&
          monthly_revenue.isLoading &&
          category_range_revenue.isLoading &&
          yearly_revenue.isLoading
        }
      />
      <Loading loading={loading} />
      <div className="m-auto w-100per max-w-1000px">
        <DatePicker
          year={year}
          month={month}
          start_date={start_date}
          end_date={end_date}
          start_end_date={start_end_date}
        />
        <TotalsTable
          range_revenue={range_revenue}
          tips_range_revenue={tips_range_revenue}
          range_payouts={range_payouts}
          range_expenses={range_expenses}
          month={month}
          year={year}
        />
        <Paper>
          <AppBar position="sticky" color="transparent">
            <Tabs
              value={tabIndex}
              className="jc-b"
              onChange={(e, newValue) => {
                dispatch(setTabIndex(newValue));
              }}
              variant="scrollable"
              scrollButtons="false"
            >
              <Tab label={`${determineTabName(month, year)} Revenue`} value={0} />;
              <Tab label={"Affiliate Earnings"} value={1} />;
              <Tab label={"Product Categories"} value={2} />;
              <Tab label={"All Products"} value={3} />
              <Tab label={"Product Revenue"} value={4} />
              <Tab label={"Sponsor Checkins"} value={5} />
            </Tabs>
          </AppBar>
        </Paper>
        <GLTabPanel value={tabIndex} index={0}>
          <YearlyMonthlyDailyRevenue
            month={month}
            year={year}
            yearly_revenue={yearly_revenue}
            daily_revenue={daily_revenue}
            monthly_revenue={monthly_revenue}
            yearly_expenses={yearly_expenses}
            daily_expenses={daily_expenses}
            monthly_expenses={monthly_expenses}
          />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={1}>
          <AffiliateEarnings month={month} year={year} affiliate_earnings_code_usage={affiliate_earnings_code_usage} />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={2}>
          <CategorySales category_range_revenue={category_range_revenue} />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={3}>
          <AllProductRevenue all_product_revenue={all_product_revenue} />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={4}>
          <YearlyMonthlyProductRevenue
            monthly_product_revenue={monthly_product_revenue}
            yearly_product_revenue={yearly_product_revenue}
            all_product_revenue={all_product_revenue}
            month={month}
            year={year}
          />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={5}>
          <SponsorCheckins
            month={month}
            year={year}
            sponsorCheckinStatus={sponsorCheckinStatus}
            questionConcerns={questionConcerns}
          />
        </GLTabPanel>
        <CurrentStock currentStock={currentStock} />
      </div>
    </div>
  );
};
export default DashboardPage;
