import { humanDate } from "../../../helpers/dateHelpers";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { months } from "../dashboardHelpers";

const YearlyMonthlyDailyRevenue = ({ month, year, yearly_revenue, daily_revenue, monthy_revenue }) => {
  return (
    <>
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
    </>
  );
};

export default YearlyMonthlyDailyRevenue;
