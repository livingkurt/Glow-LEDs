import { Typography, Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import CartItemCard from "../SponsorPage/components/CartItemCard";
import { detailsProductBundle } from "../../api";
import { useDispatch, useSelector } from "react-redux";

const ProductBundlePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useParams();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { bundle } = cartPage;

  useEffect(() => {
    dispatch(detailsProductBundle({ pathname: pathname }));
  }, [dispatch, pathname]);

  if (!bundle) {
    return <Box>{"Loading..."}</Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        {bundle?.image && (
          <Box
            component="img"
            src={bundle.image.link}
            alt={bundle.title}
            sx={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: "12px",
              mb: 3,
            }}
          />
        )}
        <Typography variant="h3" gutterBottom>
          {bundle.title}
        </Typography>
        {bundle.subtitle && (
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {bundle.subtitle}
          </Typography>
        )}
        {bundle.affiliate && (
          <Typography variant="h6" gutterBottom>
            {"By "}
            {bundle.affiliate.artist_name}
          </Typography>
        )}
        {bundle.short_description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {bundle.short_description}
          </Typography>
        )}
      </Box>

      {bundle?.cartItems?.length > 0 && (
        <Box>
          <Typography variant="h4" gutterBottom>
            {"Bundle Items"}
          </Typography>
          <Grid container spacing={3}>
            {bundle.cartItems.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
                <CartItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

ProductBundlePage.propTypes = {
  bundle: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    short_description: PropTypes.string,
    image: PropTypes.shape({
      link: PropTypes.string,
    }),
    cartItems: PropTypes.array,
    affiliate: PropTypes.shape({
      artist_name: PropTypes.string,
    }),
  }),
};

ProductBundlePage.defaultProps = {
  bundle: null,
};

export default ProductBundlePage;
