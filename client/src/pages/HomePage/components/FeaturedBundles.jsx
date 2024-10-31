import { Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CartItemCard from "../../SponsorPage/components/CartItemCard";

const FeaturedBundles = ({ featured_product_bundles, featured_product_bundles_hidden }) => {
  const navigate = useNavigate();

  if (featured_product_bundles_hidden || !featured_product_bundles?.length) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h2">
          {"Featured Bundles"}
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => navigate("/bundles")}>
          {"View All Bundles"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {featured_product_bundles.map((featuredBundle, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ height: "100%" }}>
              {featuredBundle.bundle.image && (
                <Box
                  component="img"
                  src={featuredBundle.bundle.image.url}
                  alt={featuredBundle.bundle.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "8px",
                    mb: 2,
                  }}
                />
              )}
              <Typography variant="h6" gutterBottom>
                {featuredBundle.bundle.title}
              </Typography>
              {featuredBundle.bundle.subtitle && (
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {featuredBundle.bundle.subtitle}
                </Typography>
              )}
              <Typography variant="body2" gutterBottom>
                {"By "}
                {featuredBundle.affiliate.artist_name}
              </Typography>
              {featuredBundle.bundle.short_description && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  {featuredBundle.bundle.short_description}
                </Typography>
              )}
              {featuredBundle.bundle?.cart?.cartItems?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    pb: 2,
                    "&::-webkit-scrollbar": {
                      height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {featuredBundle.bundle.cart.cartItems.map((item, idx) => (
                    <Box
                      key={item._id || idx}
                      sx={{
                        minWidth: 200,
                        mr: 2,
                        "&:last-child": {
                          mr: 0,
                        },
                      }}
                    >
                      <CartItemCard item={item} />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

FeaturedBundles.propTypes = {
  featured_product_bundles: PropTypes.arrayOf(
    PropTypes.shape({
      bundle: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        short_description: PropTypes.string,
        image: PropTypes.shape({
          url: PropTypes.string,
        }),
        cart: PropTypes.shape({
          cartItems: PropTypes.array,
        }),
      }),
      affiliate: PropTypes.shape({
        artist_name: PropTypes.string,
      }),
    })
  ),
  featured_product_bundles_hidden: PropTypes.bool,
};

FeaturedBundles.defaultProps = {
  featured_product_bundles: [],
  featured_product_bundles_hidden: false,
};

export default FeaturedBundles;
