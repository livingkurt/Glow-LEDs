import React, { useState } from "react";
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

const ProductImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {images && (
        <>
          <Box sx={{ flex: 1, width: "100%", mb: 2 }}>
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
              }}
            >
              {images?.map((image, index) => (
                <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img
                    src={image?.link}
                    alt={`Product ${index}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: 20,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          <Box sx={{ width: "100%", maxWidth: images.length < 6 ? "100%" : 400, margin: "0 auto" }}>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={5}
              slidesPerView={images.length > 6 ? 6.5 : images.length}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              style={{ width: "100%" }}
            >
              {images?.map((image, index) => (
                <SwiperSlide key={index} style={{ width: 60, height: 60 }}>
                  <img
                    src={image?.link}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductImages;
