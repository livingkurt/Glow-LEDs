import { Helmet } from "react-helmet";
import {
  useGetMonthlyRevenueOrdersQuery,
  useGetRangeAffiliateEarningsCodeUsageQuery,
  useGetRangeCategoryRevenueOrdersQuery,
  useGetRangeRevenueOrdersQuery,
  useGetRangeTipsRevenueOrdersQuery,
  useGetYearlyRevenueOrdersQuery,
  useGetRangePayoutsQuery,
  useGetDailyRevenueOrdersQuery,
  useGetRangeGlovesQuery,
  useGetCurrentStockQuery
} from "./dashboardApi";
import { determineTabName, isLoading, run_daily_workers, run_monthly_workers, run_weekly_workers, timeLabel } from "./dashboardHelpers";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { Loading } from "../../shared/SharedComponents";
import {
  AppBar,
  Divider,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from "@mui/material";
import { setTabIndex } from "./dashboardSlice";
import GLTabPanel from "../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import YearlyMonthlyDailyRevenue from "./components/YearlyMonthlyDailyRevenue";
import AffiliateEarnings from "./components/AffiliateEarnings";
import CategorySales from "./components/CategorySales";
import CurrentStock from "./components/CurrentStock";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);

  const { year, month, start_date, end_date, start_end_date, loading, tabIndex } = dashboardPage;

  const range_revenue = useGetRangeRevenueOrdersQuery({ start_date, end_date });
  const category_range_revenue = useGetRangeCategoryRevenueOrdersQuery({ start_date, end_date });
  const tips_range_revenue = useGetRangeTipsRevenueOrdersQuery({ start_date, end_date });
  const affiliate_earnings_code_usage = useGetRangeAffiliateEarningsCodeUsageQuery({ start_date, end_date });
  const daily_revenue = useGetDailyRevenueOrdersQuery({ start_date, end_date });
  const monthy_revenue = useGetMonthlyRevenueOrdersQuery({ year });
  const yearly_revenue = useGetYearlyRevenueOrdersQuery();
  const range_payouts = useGetRangePayoutsQuery({ start_date, end_date });
  // const range_gloves = useGetRangeGlovesQuery({ start_date, end_date });
  const currentStock = useGetCurrentStockQuery();
  console.log({ currentStock });

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
      <Loading
        loading={
          loading && daily_revenue.isLoading && monthy_revenue.isLoading && category_range_revenue.isLoading && yearly_revenue.isLoading
        }
      />
      <div className="m-auto w-100per max-w-800px">
        <DatePicker year={year} month={month} start_date={start_date} end_date={end_date} start_end_date={start_end_date} />
        <Paper sx={{ margin: "20px 0" }}>
          <Typography variant="h6" align="center" sx={{ padding: "10px 0" }}>
            {timeLabel(month, year)}
          </Typography>
          <Divider />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell className="title_font">Sales</TableCell>
                  <TableCell className="title_font">Tips</TableCell>
                  <TableCell className="title_font">Payouts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>${isLoading(range_revenue) ? range_revenue.data[0]?.totalPrice.toFixed(2) : "0.00"}</TableCell>
                  <TableCell>${isLoading(tips_range_revenue) ? tips_range_revenue.data[0]?.total_tips.toFixed(2) : "0.00"}</TableCell>
                  <TableCell>${isLoading(range_payouts) ? range_payouts.data[0]?.totalAmount?.toFixed(2) : "0.00"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper>
          <AppBar position="sticky" color="transparent">
            <Tabs
              value={tabIndex}
              className="jc-b"
              onChange={(e, newValue) => {
                dispatch(setTabIndex(newValue));
              }}
            >
              <Tab label={`${determineTabName(month, year)} Revenue`} value={0} />;
              <Tab label={"Affiliate Earnings"} value={1} />;
              <Tab label={"Product Categories"} value={2} />;
              <Tab label={"Current Stock"} value={3} />;
            </Tabs>
          </AppBar>
        </Paper>
        <GLTabPanel value={tabIndex} index={0}>
          <YearlyMonthlyDailyRevenue
            month={month}
            year={year}
            yearly_revenue={yearly_revenue}
            daily_revenue={daily_revenue}
            monthy_revenue={monthy_revenue}
          />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={1}>
          <AffiliateEarnings month={month} year={year} affiliate_earnings_code_usage={affiliate_earnings_code_usage} />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={2}>
          <CategorySales category_range_revenue={category_range_revenue} />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={3}>
          <CurrentStock currentStock={currentStock} />
        </GLTabPanel>
      </div>
    </div>
  );
};
export default DashboardPage;
