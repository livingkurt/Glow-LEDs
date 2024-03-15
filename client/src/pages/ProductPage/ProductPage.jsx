import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import * as API from "../../api";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isBrowser } from "react-device-detect";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Zoom } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

const ProductPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product, error, isLoading, isFetching, isSuccess } = API.useProductQuery(params.pathname);

  return (
    <Box>
      {isSuccess && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box borderRadius={20}>
              <Swiper
                spaceBetween={50}
                modules={[Navigation, Pagination, Scrollbar, A11y, Zoom]}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={swiper => console.log(swiper)}
                navigation={isBrowser}
                pagination={isBrowser ? { clickable: true } : false}
                scrollbar={{ draggable: true }}
                style={{
                  "--swiper-navigation-color": "#ffffff50",
                  "--swiper-pagination-color": "#ffffff50",
                  "--swiper-scrollbar-color": "#ffffff50",
                  position: "relative",
                  zIndex: 1, // set a lower z-index value
                }}
              >
                {product?.images_object.map((image, index) => (
                  <div key={index}>
                    <SwiperSlide>
                      <img src={image?.link} alt={product?.name} style={{ maxWidth: "100%", borderRadius: 20 }} />
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>

              {/* Rating and Reviews */}
              <Box display="flex" alignItems="center" mb={2}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" ml={1}>
                  ({product.numReviews} reviews)
                </Typography>
              </Box>
              {/* Price */}
              <Typography variant="h5" gutterBottom>
                Price: ${product.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.facts.split("\n").map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </Typography>

              {/* Category and Subcategory */}
              <Box mb={2}>
                <Chip
                  style={{ backgroundColor: "#4c526d", color: "#fff", fontSize: "1.1rem" }}
                  size="medium"
                  onClick={() => navigate(`/collections/all/products/category/${product.category}`)}
                  label={`Category: ${product.category}`}
                  variant="contained"
                />
                {product.subcategory && (
                  <Chip
                    style={{ backgroundColor: "#4c526d", color: "#fff", fontSize: "1.1rem" }}
                    size="medium"
                    onClick={() =>
                      navigate(
                        `/collections/all/products/category/${product.category}/subcategory/${product.subcategory}`
                      )
                    }
                    label={`Subcategory: ${product.subcategory}`}
                    variant="contained"
                    ml={1}
                  />
                )}
                {product.product_collection && (
                  <Chip
                    style={{ backgroundColor: "#4c526d", color: "#fff", fontSize: "1.1rem" }}
                    size="medium"
                    onClick={() =>
                      navigate(
                        `/collections/all/products/category/${product.category}/subcategory/${product.subcategory}/collection/${product.product_collection}`
                      )
                    }
                    label={`Product Collection: ${product.product_collection}`}
                    variant="contained"
                    ml={1}
                  />
                )}
              </Box>

              <Divider />

              {/* Options Section */}
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Options
                </Typography>
                {product.options.map((option, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      {option.name}
                    </Typography>
                    {option.optionType === "dropdown" ? (
                      <FormControl fullWidth>
                        <InputLabel id={`option-${index}-label`}>Select {option.name}</InputLabel>
                        <Select
                          labelId={`option-${index}-label`}
                          id={`option-${index}`}
                          label={`Select ${option.name}`}
                        >
                          {option.values.map((value, valueIndex) => (
                            <MenuItem key={valueIndex} value={value.value}>
                              {value.value}
                              {value.additionalCost > 0 && ` (+ $${value.additionalCost})`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : option.optionType === "buttons" ? (
                      <ToggleButtonGroup
                        aria-label={`${option.name} group`}
                        value={option.values.find(value => value.isDefault)?.value}
                        exclusive
                        color="primary"
                        // onChange={handleChange}
                      >
                        {option.values.map((value, valueIndex) => (
                          <ToggleButton key={valueIndex} value={value.value} aria-label={value.value}>
                            {value.value}
                            {value.additionalCost > 0 && ` (+ $${value.additionalCost})`}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    ) : null}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProductPage;
