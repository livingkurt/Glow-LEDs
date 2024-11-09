import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Typography, Box } from "@mui/material";
import { format_date } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { useProductsQuery } from "../../../api/allRecordsApi";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import { set_product } from "../../ProductsPage/productsPageSlice";

const ProductRevenue = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);
  const productsPage = useSelector(state => state.products.productsPage);
  const { product } = productsPage;
  const { start_date, end_date } = dashboardPage;
  const { data: products, isLoading: productsLoading } = useProductsQuery({ option: false, hidden: false });
  const {
    data: productRevenue,
    isLoading: productRevenueLoading,
    error: revenueError,
  } = API.useGetProductRangeRevenueOrdersQuery({
    productId: product._id,
    start_date,
    end_date,
  });

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
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {"Revenue Statistics"}
                      </Typography>
                      <Typography>
                        {"Total Revenue: $"}
                        {data.totalRevenue?.toFixed(2)}
                      </Typography>
                      <Typography>
                        {"Average Order Value: $"}
                        {data.averageOrderValue?.toFixed(2)}
                      </Typography>
                      <Typography>
                        {"Total Orders: "}
                        {data.numberOfOrders}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {"Product Statistics"}
                      </Typography>
                      <Typography>
                        {"Total Quantity Sold: "}
                        {data.totalQuantity}
                      </Typography>
                      <Typography>
                        {"First Order: "}
                        {format_date(data.firstOrder)}
                      </Typography>
                      <Typography>
                        {"Last Order: "}
                        {format_date(data.lastOrder)}
                      </Typography>
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
