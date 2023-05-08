import { Helmet } from "react-helmet";
import { humanize } from "../../utils/helper_functions";
import {
  useGetMonthlyRevenueOrdersQuery,
  useGetRangeAffiliateEarningsCodeUsageQuery,
  useGetRangeCategoryRevenueOrdersQuery,
  useGetRangeRevenueOrdersQuery,
  useGetRangeTipsRevenueOrdersQuery,
  useGetYearlyRevenueOrdersQuery,
  useGetRangePayoutsQuery,
  useGetDailyRevenueOrdersQuery
} from "./dashboardApi";
import { isLoading, months, run_daily_workers, run_monthly_workers, run_weekly_workers } from "./dashboardHelpers";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { Loading } from "../../shared/SharedComponents";
import { humanDate } from "../../helpers/dateHelpers";
import { GLDisplayTable } from "../../shared/GlowLEDsComponents/GLDisplayTable";
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

  const timeLabel = year && month ? `${year} ${month}` : year ? year : month ? month : "All Time";

  const determineTabName = (month, year) => {
    if (year && month) {
      return "Daily";
    } else if (year) {
      return "Monthly";
    } else {
      return "Yearly";
    }
  };

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
            {timeLabel}
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
            </Tabs>
          </AppBar>
        </Paper>
        <GLTabPanel value={tabIndex} index={0}>
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
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={1}>
          <GLDisplayTable
            title={`${year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"} Affiliate Earnings Code Usage`}
            loading={affiliate_earnings_code_usage.isLoading && affiliate_earnings_code_usage.data}
            rows={
              !affiliate_earnings_code_usage.isLoading &&
              [...affiliate_earnings_code_usage.data].sort((a, b) => b.number_of_uses - a.number_of_uses)
            }
            columnDefs={[
              { title: "Ranking", display: (row, index) => `${index + 1}.` },
              { title: "Affiliate", display: row => row?.artist_name },
              { title: "Code Usage", display: row => (row.number_of_uses ? row?.number_of_uses : "0") },
              { title: "Earnings", display: row => `$${row.earnings ? row?.earnings?.toFixed(2) : "0:00"}` },
              { title: "Revenue", display: row => `$${row?.revenue ? row?.revenue?.toFixed(2) : "0:00"}` }
            ]}
          />
        </GLTabPanel>
        <GLTabPanel value={tabIndex} index={2}>
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
        </GLTabPanel>
      </div>
    </div>
  );
};
export default DashboardPage;
