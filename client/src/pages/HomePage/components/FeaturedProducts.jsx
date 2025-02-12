import PropTypes from "prop-types";
import ProductCard from "../../ProductsGridPage/components/ProductCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FeaturedProducts = ({ featured_products, featured_products_hidden }) => {
  return !featured_products_hidden ? (
    <Box>
      <Typography variant="h4" component="h2" align="left" gutterBottom>
        {"Featured Products"}
      </Typography>
      <Box
        sx={{
          pb: 6,
          px: 2,
          display: "flex",
          overflowX: "auto",
          minWidth: "100%",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {featured_products?.map(product => (
          <Box
            key={product.id}
            sx={{
              minWidth: "250px",
              maxWidth: "300px", // Add maxWidth
              width: "100%", // Add width: 100% to make the item fill the available space
              marginRight: "20px",
              "&:last-child": {
                marginRight: 0,
              },
            }}
          >
            <ProductCard product={product} goHorizontal={false} />
          </Box>
        ))}
      </Box>
    </Box>
  ) : (
    <></>
  );
};

FeaturedProducts.propTypes = {
  featured_products: PropTypes.array,
  featured_products_hidden: PropTypes.bool,
};

FeaturedProducts.defaultProps = {
  featured_products: [],
  featured_products_hidden: false,
};

export default FeaturedProducts;
