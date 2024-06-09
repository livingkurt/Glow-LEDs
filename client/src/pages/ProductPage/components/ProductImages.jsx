import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import { isBrowser } from "react-device-detect";

const ProductImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      {images && (
        <>
          <div id="main-swiper">
            <Swiper
              spaceBetween={50}
              containerModifierClass="main-swiper"
              modules={[Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]}
              slidesPerView={1}
              thumbs={{ swiper: thumbsSwiper }}
              onSlideChange={() => console.log("slide change")}
              pagination={isBrowser ? { clickable: true } : false}
              scrollbar={{ draggable: true }}
              style={{
                "--swiper-navigation-color": "#ffffff50",
                "--swiper-pagination-color": "#ffffff50",
                "--swiper-scrollbar-color": "#ffffff50",
                position: "relative",
                zIndex: 1,
              }}
            >
              {images?.map((image, index) => (
                <div key={index}>
                  <SwiperSlide>
                    <img src={image?.link} alt={`Thumbnail ${index}`} style={{ maxWidth: "100%", borderRadius: 20 }} />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
          <div id="thumbs-swiper" style={{ maxWidth: images.length < 6 ? "100%" : "400px", margin: "0 auto" }}>
            <Swiper
              containerModifierClass="thumbs-swiper"
              onSwiper={setThumbsSwiper}
              spaceBetween={5}
              slidesPerView={images.length > 6 ? 6.5 : images.length - 1.5}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              className="mySwiper"
            >
              {images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image?.link}
                    alt={`Thumbnail ${index}`}
                    style={{
                      maxWidth: "100%",
                      borderRadius: 5,
                      cursor: "pointer",
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImages;
