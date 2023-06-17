import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductSlideshow = ({ product, className, set_image, interval, transitionTime }) => {
  return (
    <Carousel
      infiniteLoop={true}
      useKeyboardArrows={false}
      autoPlay={false}
      showArrows={false}
      showIndicators={true}
      showStatus={false}
      showThumbs={true}
      interval={interval}
      swipeable={true}
      thumbWidth={50}
      transitionTime={transitionTime}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={1}
      // selectedItem={start}
      emulateTouch={true}
      // animationHandler="fade"
      // selectedItem={Math.floor(Math.random() * products.length)}
      // className="w-100per h-auto"
    >
      {product.images_object &&
        product.images_object.map((image, index) => (
          <div className={className}>
            <img key={index} src={image.link} alt="carousel" title="carousel item" className="carousel-item br-10px" />
          </div>
        ))}
    </Carousel>
  );
};

export default ProductSlideshow;
