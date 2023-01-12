import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";
import { mobile_check } from "../../utils/react_helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";

const HomeSlideshow = ({ slideshow }) => {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        }
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 8000, min: 1400 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1400, min: 1100 },
      items: 1
    },
    desktop_2: {
      breakpoint: { max: 1100, min: 900 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Carousel
      swipeable={mobile_check() ? true : false}
      draggable={mobile_check() ? true : false}
      showDots={false}
      // beforeChange={() => disableScroll()}
      // afterChange={() => enableScroll()}
      // partialVisible={true}
      // centerMode={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={8000}
      // keyBoardControl={true}
      // transitionDuration={5000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={mobile_check() ? "mobile" : "desktop"}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {slideshow.map((slide, index) => (
        <div className="slideshow-img-container">
          <Link to={slide.link}>
            <GLButton variant="primary" className={"title_font"}>
              {slide.label}
            </GLButton>
          </Link>
          <img key={index} src={slide.image} draggable={false} alt="carousel" title="carousel item" />
        </div>
      ))}
    </Carousel>
  );
};

export default HomeSlideshow;
