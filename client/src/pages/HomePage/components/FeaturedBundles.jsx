import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ProductBundleCard from "../../ProductBundlesGridPage/components/ProductBundleCard";

const FeaturedBundles = ({ featured_product_bundles }) => {
  return (
    <Box>
      <Typography variant="h4" component="h2" align="left" gutterBottom>
        {"Featured Bundles"}
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
        {featured_product_bundles?.map(bundle => (
          <Box
            key={bundle._id}
            sx={{
              minWidth: "250px",
              width: "100%",
              marginRight: "20px",
              "&:last-child": {
                marginRight: 0,
              },
            }}
          >
            <ProductBundleCard bundle={bundle} affiliate={bundle.affiliate} goHorizontal={false} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

FeaturedBundles.propTypes = {
  featured_product_bundles: PropTypes.array,
};

FeaturedBundles.defaultProps = {
  featured_product_bundles: [],
};

export default FeaturedBundles;
