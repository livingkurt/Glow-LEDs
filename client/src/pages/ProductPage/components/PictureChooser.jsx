import React from "react";

const PictureChooser = ({ product, className, show_hide }) => {
  const classes = "details-image " + show_hide;

  const change_image = (e, index) => {
    if (index >= product.images.length) {
      const expandedSecondaryImg = document.getElementById("expandedSecondaryImg");
      expandedSecondaryImg.src = e.target.currentSrc;
      expandedSecondaryImg.parentElement.style.display = "block";
    } else if (index < product.images.length) {
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = e.target.src;
      expandImg.parentElement.style.display = "block";
    }
  };
  console.log({ product });

  return (
    <div className={`details-image ${className}`}>
      {product.images_object &&
        [...product.images_object, ...product.secondary_images_object].map((image, index) => {
          return (
            <div className="picture-chooser-container" key={index}>
              <img
                src={image.link}
                alt="PictureChooser"
                title="PictureChooser"
                style={{ width: "100%" }}
                onClick={e => change_image(e, index)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default PictureChooser;
