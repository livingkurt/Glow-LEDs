// React
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { determine_product_name_display, sale_price_switch } from "../../../utils/react_helper_functions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { LazyImage } from "../../../shared/SharedComponents";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";

// import Resizer from 'react-image-file-resizer';

const ProductItemD = props => {
  const history = useHistory();
  const [image_number, set_image_number] = useState(0);
  const [number_of_items, set_number_of_items] = useState(5);
  const [image, set_image] = useState(props.product.name);
  const [images, set_images] = useState(props.product.images);

  const move_left = e => {
    e.preventDefault();
    if (image_number !== 0) {
      set_image_number(image_number => {
        return image_number - 1;
      });
    } else {
      set_image_number(images.length - 1);
    }
  };
  const move_right = e => {
    e.preventDefault();
    if (image_number !== props.product.images.length - 1) {
      set_image_number(image_number => {
        return image_number + 1;
      });
    } else {
      set_image_number(0);
    }
  };
  return (
    <li key={props.product.pathname} className="product-thumb" style={props.style}>
      <div className="tooltip">
        <div className="tooltipoverlay">
          <div className="product">
            <Link
              to={{
                pathname: "/collections/all/products/" + props.product.pathname,
                previous_path: history.location.pathname
              }}
              className="m-auto"
            >
              <div className="row mt-15px">
                <div className="column ai-c pos-rel">
                  {/* <Link to={'/collections/all/products/' + item.pathname}> */}
                  {images.length === 1 && (
                    <LazyImage
                      className="product-image"
                      alt={props.product.name}
                      title="Product Image"
                      size={{ height: props.size, width: props.size }}
                      effect="blur"
                      src={props.product.images && props.product.images[0]}
                    />
                  )}
                  {images.length > 1 && (
                    // <div className="image-btn-container">
                    <div>
                      <div className="jc-b w-100per pos-rel ">
                        {images.length > 1 && (
                          <div className="ai-c pos-abs left-0px top-125px image-btn">
                            <GLButton
                              style={{ backgroundColor: "transparent" }}
                              variant="icon"
                              onClick={e => move_left(e)}
                              aria-label="Previous"
                            >
                              <i className="fas fa-chevron-left fs-40px" />
                            </GLButton>
                          </div>
                        )}
                        {[...Array(1).keys()].map(x => (
                          <LazyImage
                            key={image_number + x}
                            className="product-image"
                            alt={image}
                            title="Product Image"
                            size={{ height: props.size, width: props.size }}
                            effect="blur"
                            src={images[image_number + x]}
                          />
                        ))}
                        {images.length > 1 && (
                          <div className="ai-c pos-abs right-0px top-125px image-btn">
                            <GLButton
                              style={{ backgroundColor: "transparent" }}
                              variant="icon"
                              onClick={e => move_right(e)}
                              aria-label="Next"
                            >
                              <i className="fas fa-chevron-right fs-40px" />
                            </GLButton>
                          </div>
                        )}
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                  {[...Array(30).keys()].map(
                    (x, index) =>
                      props.product_occurrences &&
                      props.product_occurrences[index] &&
                      props.product_occurrences[index].name === props.product.name && (
                        <div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px" key={props.product.name}>
                          <img
                            className=" mt-3px ml-2px h-100px w-100px"
                            alt={props.product.name}
                            title="Product Image"
                            src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
                          />
                        </div>
                      )
                  )}
                </div>
              </div>
            </Link>

            {/* <label className="mt-5px title_font" style={{ fontSize: '14px' }}>
							{props.product.brand}
						</label> */}
            <Link
              to={{
                pathname: "/collections/all/products/" + props.product.pathname,
                previous_path: history.location.pathname
              }}
              className="mt-13px"
            >
              <label style={{ fontSize: "1.6rem" }}>{determine_product_name_display(props.product, false)}</label>
            </Link>

            <label className="product-price mv-3px">{sale_price_switch(props.product, false)}</label>

            {props.product.rating ? (
              <Rating rating={props.product.rating} numReviews={props.product.numReviews} />
            ) : (
              <span className="rating vis-hid ta-c">No Reviews</span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductItemD;
