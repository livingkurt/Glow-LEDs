import { useDispatch, useSelector } from "react-redux";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { set_product } from "../../ProductsPage/productsPageSlice";
import { months } from "../dashboardHelpers";
import { Divider, Paper, Typography } from "@mui/material";

const YearlyMonthlyProductRevenue = ({
  month,
  year,
  yearly_product_revenue,
  monthly_product_revenue,
  all_product_revenue,
}) => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { product } = productsPage;
  return (
    <>
      <Paper className="mt-10px p-10px">
        <Typography variant="h6" align="center" sx={{ padding: "10px 0" }}>
          {product.name || "Choose Product"}
        </Typography>
        {all_product_revenue.isSuccess && (
          <GLAutocomplete
            margin="normal"
            value={product}
            loading={!all_product_revenue.isLoading}
            options={
              !all_product_revenue.isLoading &&
              all_product_revenue?.data &&
              [...all_product_revenue.data].sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
            }
            getOptionLabel={option => (option ? option.name : "")}
            optionDisplay={option => (option ? option.name : "")}
            getOptionSelected={(option, value) => option._id === value._id}
            name={"product"}
            label={"Choose Product"}
            onChange={(event, value) => dispatch(set_product(value))}
          />
        )}
      </Paper>
      {!month && !year && (
        <div>
          {yearly_product_revenue.isSuccess && (
            <GLDisplayTable
              title={`${product.name} Yearly Revenue`}
              loading={yearly_product_revenue.isLoading && yearly_product_revenue.data}
              rows={
                !yearly_product_revenue.isLoading &&
                yearly_product_revenue.data &&
                [...yearly_product_revenue.data].sort((a, b) => a.year - b.year)
              }
              columnDefs={[
                { title: "Year", display: "year" },
                { title: "Revenue", display: row => `$${row.totalPrice.toFixed(2)}` },
                { title: "Quantity", display: row => row.totalQuantity },
                { title: "Monthly Average", display: row => `$${row.monthlyAverage?.toFixed(2)}` },
              ]}
            />
          )}
        </div>
      )}
      {!month && year && (
        <div>
          {monthly_product_revenue.isSuccess && (
            <GLDisplayTable
              title={`${product.name} Monthly Revenue`}
              loading={monthly_product_revenue.isLoading}
              rows={[...monthly_product_revenue.data].sort((a, b) => a.month - b.month)}
              columnDefs={[
                { title: "Month", display: row => months[row.month - 1] },
                { title: "Revenue", display: row => `$${row.totalPrice?.toFixed(2)}` },
                { title: "Quantity", display: row => row.totalQuantity },
                { title: "Daily Average", display: row => `$${row.dailyAverage?.toFixed(2)}` },
              ]}
            />
          )}
        </div>
      )}
    </>
  );
};

export default YearlyMonthlyProductRevenue;
