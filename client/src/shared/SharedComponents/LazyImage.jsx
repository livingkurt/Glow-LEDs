import React, { useState, useEffect } from "react";

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const LazyImage = ({ src, alt, size, className, border }) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  const onLoad = event => {
    event.target.classList.add("loaded");
  };

  const onError = event => {
    event.target.classList.add("has-error");
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      let observer;
      let didCancel = false;

      if (imageRef && imageSrc !== src) {
        if (IntersectionObserver) {
          observer = new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                  setImageSrc(src || placeHolder);
                  observer.unobserve(imageRef);
                }
              });
            },
            {
              threshold: 0.01,
              rootMargin: "75%",
            }
          );
          observer.observe(imageRef);
        } else {
          setImageSrc(src || placeHolder);
        }
      }
      return () => {
        didCancel = true;
        if (observer && observer.unobserve) {
          observer.unobserve(imageRef);
        }
      };
    }
    return () => (clean = false);
  }, [src, imageSrc, imageRef]);

  const imageStyle = {
    display: "block",
    ...size,
    border: border ? `3px solid ${border}` : 0,
  };

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      style={imageStyle}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default LazyImage;
