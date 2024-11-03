import React, { useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import { isBrowser } from "react-device-detect";
import { Box } from "@mui/material";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { restoreOriginalImages } from "../productPageSlice";
import { useDispatch } from "react-redux";

const ProductImages = ({ images, originalImages }) => {
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {images && (
        <>
          <Box
            sx={{
              flex: 1,
              width: "100%",
              mb: 2,
              aspectRatio: "1/1",
              position: "relative",
              overflow: "hidden", // Added to ensure content is cropped
            }}
          >
            <Swiper
              spaceBetween={0}
              modules={[Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]}
              slidesPerView={1}
              thumbs={{ swiper: thumbsSwiper }}
              pagination={isBrowser ? { clickable: true } : false}
              scrollbar={{ draggable: true }}
              style={{
                "--swiper-navigation-color": "#ffffff50",
                "--swiper-pagination-color": "#ffffff50",
                "--swiper-scrollbar-color": "#ffffff50",
                height: "100%",
                width: "100%",
                aspectRatio: "1/1", // Added to enforce 1:1 ratio
              }}
            >
              {images?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: "1/1", // Added to enforce 1:1 ratio
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      paddingTop: "100%", // This creates a perfect square
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 5,
                    }}
                  >
                    <GLLazyImage
                      src={image?.link}
                      alt={`Product ${index}`}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", // Center the image
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          {JSON.stringify(originalImages) !== JSON.stringify(images) && (
            <GLButtonV2 variant="contained" color="secondary" onClick={() => dispatch(restoreOriginalImages())}>
              {"View Original Images"}
            </GLButtonV2>
          )}
          <Box
            sx={{
              width: "100%",
              maxWidth: images.length < 6 ? images.length * 65 : 400, // 60px width + 5px gap
              margin: "0 auto",
            }}
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={5}
              slidesPerView="auto"
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              style={{ width: "100%" }}
            >
              {images?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    width: 60,
                    height: 60, // Keeping thumbnails square
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      paddingTop: "100%", // This creates a perfect square
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 2,
                    }}
                  >
                    <GLLazyImage
                      src={image?.link}
                      alt={`Thumbnail ${index}`}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", // Center the image
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </>
      )}
    </Box>
  );
};

ProductImages.propTypes = {
  images: PropTypes.array.isRequired,
  originalImages: PropTypes.array.isRequired,
};

export default ProductImages;
