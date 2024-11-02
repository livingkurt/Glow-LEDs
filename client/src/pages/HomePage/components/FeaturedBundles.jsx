import { Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FeaturedBundles = ({ bundles }) => {
  const navigate = useNavigate();

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
        {bundles.map((featuredBundle, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ height: "100%" }}>
              {featuredBundle?.image && (
                <Box
                  component="img"
                  src={featuredBundle.image.link}
                  alt={featuredBundle.title}
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
                {featuredBundle.title}
              </Typography>
              {featuredBundle.subtitle && (
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {featuredBundle.subtitle}
                </Typography>
              )}
              <Typography variant="body2" gutterBottom>
                {"By "}
                {featuredBundle.affiliate.artist_name}
              </Typography>
              {featuredBundle.short_description && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  {featuredBundle.short_description}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

FeaturedBundles.propTypes = {
  bundles: PropTypes.arrayOf(
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
};

FeaturedBundles.defaultProps = {
  bundles: [],
  featured_product_bundles_hidden: false,
};

export default FeaturedBundles;
