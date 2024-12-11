import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Typography, Box } from "@mui/material";
import { format_date } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { useProductsQuery } from "../../../api/allRecordsApi";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import { set_product } from "../../ProductsPage/productsPageSlice";

// eslint-disable-next-line react/prop-types
const StatisticItem = ({ label, value, prefix = "", suffix = "" }) => (
  <Typography variant="body1" sx={{ mb: 1 }}>
    {label}
    {": "}
    {prefix}
    {value}
    {suffix}
  </Typography>
);

const ProductRevenue = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);
  const productsPage = useSelector(state => state.products.productsPage);
  const { product } = productsPage;
  const { start_date, end_date } = dashboardPage;
  const { data: products, isLoading: productsLoading } = useProductsQuery({ hidden: false });
  const {
    data: productRevenue,
    isLoading: productRevenueLoading,
    error: revenueError,
  } = API.useGetProductRangeRevenueOrdersQuery(
    {
      productId: product._id,
      start_date,
      end_date,
    },
    { skip: !product._id }
  );

  const data = productRevenue?.[0];

  if (revenueError) {
    return <Typography color="error">{"Error loading product revenue data"}</Typography>;
  }

  return (
    <div>
      <Paper className="mt-10px p-10px">
        <Typography variant="h6" align="center" sx={{ padding: "10px 0" }}>
          {"Choose Product"}
        </Typography>
        <GLAutocomplete
          margin="normal"
          value={product}
          loading={!productsLoading}
          options={!productsLoading ? products : []}
          getOptionLabel={option => (option ? option.name : "")}
          optionDisplay={option => (option ? option.name : "")}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          name="product"
          label="Choose Product"
          onChange={(event, value) => dispatch(set_product(value))}
        />

        <Box width="100%">
          {product._id &&
            (productRevenueLoading ? (
              <Typography textAlign="center" sx={{ padding: "10px 0", width: "100%" }}>
                {"Loading revenue data..."}
              </Typography>
            ) : data ? (
              <>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                      {product.name}
                    </Typography>
                  </Grid>

                  {/* Revenue Metrics */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {"Revenue Metrics"}
                      </Typography>
                      <StatisticItem label="Gross Revenue" value={data.grossRevenue?.toFixed(2)} prefix="$" />
                      <StatisticItem label="Net Revenue" value={data.netRevenue?.toFixed(2)} prefix="$" />
                      <StatisticItem
                        label="Total Shipping Revenue"
                        value={data.totalShippingRevenue?.toFixed(2)}
                        prefix="$"
                      />
                      <StatisticItem label="Total Tax Revenue" value={data.totalTaxRevenue?.toFixed(2)} prefix="$" />
                      <StatisticItem label="Total Tips" value={data.totalTips?.toFixed(2)} prefix="$" />
                      <StatisticItem label="Total Discounts" value={data.totalDiscounts?.toFixed(2)} prefix="$" />
                    </Paper>
                  </Grid>

                  {/* Customer Metrics */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {"Customer Metrics"}
                      </Typography>
                      <StatisticItem label="Unique Customers" value={data.uniqueCustomerCount} />
                      <StatisticItem
                        label="Average Revenue Per Customer"
                        value={data.averageRevenuePerCustomer?.toFixed(2)}
                        prefix="$"
                      />
                      <StatisticItem
                        label="Average Quantity Per Order"
                        value={data.averageQuantityPerOrder?.toFixed(2)}
                      />
                      <StatisticItem label="Max Quantity In Single Order" value={data.maxQuantityInOrder} />
                      <StatisticItem label="Pre-orders" value={data.preOrderCount} />
                    </Paper>
                  </Grid>

                  {/* Existing Product Statistics */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {"Product Statistics"}
                      </Typography>
                      <StatisticItem label="Total Quantity Sold" value={data.totalQuantity} />
                      <StatisticItem label="First Order" value={format_date(data.firstOrder)} />
                      <StatisticItem label="Last Order" value={format_date(data.lastOrder)} />
                      <StatisticItem label="Total Orders" value={data.numberOfOrders} />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {"Order Analytics"}
                      </Typography>
                      <StatisticItem label="Active Months with Orders" value={data.monthlyOrderFrequency} />
                      <StatisticItem
                        label="Average Orders per Month"
                        value={(data.numberOfOrders / data.monthlyOrderFrequency).toFixed(1)}
                      />
                      <StatisticItem label="International Orders" value={data.internationalOrderCount} />
                      <StatisticItem
                        label="Domestic Orders"
                        value={data.numberOfOrders - data.internationalOrderCount}
                      />
                      <StatisticItem
                        label="International Order Rate"
                        value={((data.internationalOrderCount / data.numberOfOrders) * 100).toFixed(1)}
                        suffix="%"
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography>{"No revenue data available for this product"}</Typography>
            ))}
        </Box>
      </Paper>
    </div>
  );
};

export default ProductRevenue;
