
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
const LearnMoreProducts = ({ learn_more_products, learn_more_products_hidden }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const determineAspectRatio = index => {
    if (isMobile) {
      return "9/16";
    }
    return index % 3 === 2 ? "16/9" : "";
  };
  return !learn_more_products_hidden ? (
    <Box>
      <Grid container spacing={2}>
        {learn_more_products?.map((product, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={index % 3 === 2 ? 12 : 6}
            md={index % 3 === 2 ? 12 : 6}
            lg={index % 3 === 2 ? 12 : 6}
            xl={index % 3 === 2 ? 12 : 6}
          >
            <Box sx={{ position: "relative" }}>
              <GLLazyImage
                src={product.image?.link}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  height: "auto",
                  aspectRatio: determineAspectRatio(index),
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: "#fff",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {product.label}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {product.fact}
                </Typography>
                <Link to={product.link}>
                  <Button variant="contained" onClick={() => navigate(product.link)}>
                    {"Shop Now"}
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

LearnMoreProducts.propTypes = {
  learn_more_products: PropTypes.array,
  learn_more_products_hidden: PropTypes.bool,
};

LearnMoreProducts.defaultProps = {
  learn_more_products: [],
  learn_more_products_hidden: false,
};

export default LearnMoreProducts;
