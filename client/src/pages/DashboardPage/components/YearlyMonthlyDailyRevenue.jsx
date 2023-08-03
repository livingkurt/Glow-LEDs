import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { format_date } from "../../../utils/helper_functions";
import {
  combineDailyRevenueAndExpenses,
  combineData,
  combineMonthlyRevenueAndExpenses,
  combineRevenueAndExpenses,
  combineYearlyRevenueAndExpenses,
  conditionalColor,
  months,
} from "../dashboardHelpers";

const YearlyMonthlyDailyRevenue = ({
  month,
  year,
  yearly_revenue,
  daily_revenue,
  monthly_revenue,
  yearly_expenses,
  daily_expenses,
  monthly_expenses,
}) => {
  let combinedYearlyData = [];

  if (yearly_revenue.isSuccess && yearly_expenses.isSuccess) {
    combinedYearlyData = combineYearlyRevenueAndExpenses(yearly_revenue.data, yearly_expenses.data);
  }
  let combinedMonthlyData = [];

  if (monthly_revenue.isSuccess && monthly_expenses.isSuccess) {
    combinedMonthlyData = combineMonthlyRevenueAndExpenses(monthly_revenue.data, monthly_expenses.data);
  }
  let combinedDailyData = [];

  if (daily_revenue.isSuccess && daily_expenses.isSuccess) {
    combinedDailyData = combineDailyRevenueAndExpenses(daily_revenue.data, daily_expenses.data);
  }

  return (
    <>
      {!month && !year && (
        <div>
          {combinedYearlyData.length > 0 && (
            <GLDisplayTable
              title={"Yearly Revenue and Expenses"}
              rows={combinedYearlyData}
              columnDefs={[
                { title: "Year", display: "year" },
                { title: "Revenue", display: row => `$${row.revenue?.toFixed(2)}` },
                { title: "Expenses", display: row => `-$${row.expense?.toFixed(2)}` },
                {
                  title: "Profit",
                  display: row => `$${(row.revenue - row.expense)?.toFixed(2)}`,
                  conditionalColor: row => conditionalColor(row.revenue, row.expense),
                },
                { title: "Revenue Monthly Average", display: row => `$${row.revenueMonthlyAverage?.toFixed(2)}` },
                { title: "Expense Monthly Average", display: row => `$${row.expenseMonthlyAverage?.toFixed(2)}` },
              ]}
            />
          )}
        </div>
      )}
      {!month && year && (
        <div>
          {combinedMonthlyData.length > 0 && (
            <GLDisplayTable
              title={"Monthly Revenue"}
              rows={combinedMonthlyData}
              columnDefs={[
                { title: "Year", display: row => months[row.month - 1] },
                { title: "Revenue", display: row => `$${row.revenue?.toFixed(2)}` },
                { title: "Expenses", display: row => `-$${row.expense?.toFixed(2)}` },
                {
                  title: "Profit",
                  display: row => `$${(row.revenue - row.expense)?.toFixed(2)}`,
                  conditionalColor: row => conditionalColor(row.revenue, row.expense),
                },
                { title: "Daily Average", display: row => `$${row.revenueDailyAverage?.toFixed(2)}` },
                { title: "Expense Daily Average", display: row => `$${row.expenseDailyAverage?.toFixed(2)}` },
              ]}
            />
          )}
        </div>
      )}
      {month && year && (
        <>
          {combinedDailyData.length > 0 && (
            <GLDisplayTable
              title={"Daily Revenue"}
              rows={combinedDailyData}
              columnDefs={[
                { title: "Day", display: row => format_date(row.date) },
                { title: "Revenue", display: row => `$${row.revenue?.toFixed(2)}` },
                { title: "Expenses", display: row => `-$${row.expense?.toFixed(2)}` },
                {
                  title: "Profit",
                  display: row => `$${(row.revenue - row.expense)?.toFixed(2)}`,
                  conditionalColor: row => conditionalColor(row.revenue, row.expense),
                },
                { title: "Hourly Average", display: row => `$${row.revenueHourlyAverage?.toFixed(2)}` },
                { title: "Expense Hourly Average", display: row => `$${row.expenseHourlyAverage?.toFixed(2)}` },
              ]}
            />
          )}
        </>
      )}
    </>
  );
};

export default YearlyMonthlyDailyRevenue;
