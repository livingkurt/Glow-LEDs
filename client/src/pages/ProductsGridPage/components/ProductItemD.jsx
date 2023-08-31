// React
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { determine_product_name_display, sale_price_switch } from "../../../utils/react_helper_functions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { LazyImage } from "../../../shared/SharedComponents";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import { useSelector } from "react-redux";

// import Resizer from 'react-image-file-resizer';

const ProductItemD = ({ product, style, size, product_occurrences }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [image_number, set_image_number] = useState(0);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const move_left = e => {
    e.preventDefault();
    if (image_number !== 0) {
      set_image_number(image_number => {
        return image_number - 1;
      });
    } else {
      set_image_number(product?.images_object?.length - 1);
    }
  };
  const move_right = e => {
    e.preventDefault();
    if (image_number !== product?.images_object?.length - 1) {
      set_image_number(image_number => {
        return image_number + 1;
      });
    } else {
      set_image_number(0);
    }
  };
  return (
    <li key={product?.pathname} className="product-thumb" style={style}>
      <div className="tooltip">
        <div className="tooltipoverlay">
          <div className="product">
            <div
              onClick={() =>
                navigate("/collections/all/products/" + product?.pathname, { state: { prevPath: location.pathname } })
              }
              className="mt-13px"
            >
              <div className="row mt-15px" data-testid={product?.pathname}>
                <div className="column ai-c pos-rel">
                  {/* <Link to={'/collections/all/products/' + item.pathname}> */}
                  {product?.images_object?.length === 1 && (
                    <LazyImage
                      className="product-image"
                      alt={product?.name}
                      title="Product Image"
                      size={{ height: size, width: size }}
                      effect="blur"
                      src={product?.images_object && product?.images_object[0].link}
                    />
                  )}
                  {product?.images_object?.length > 1 && (
                    // <div className="image-btn-container">
                    <div>
                      <div className="jc-b w-100per pos-rel ">
                        {product?.images_object?.length > 1 && (
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
                            // alt={product?.images_object}
                            title="Product Image"
                            size={{ height: size, width: size }}
                            effect="blur"
                            src={product?.images_object[image_number + x].link}
                          />
                        ))}
                        {product?.images_object?.length > 1 && (
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
                  {Array.from({ length: 60 }).map((_, index) => {
                    const productOccurrence = product_occurrences[index];

                    if (productOccurrence?.name === product?.name) {
                      return (
                        <div
                          className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px"
                          key={product?._id}
                        >
                          <img
                            className=" mt-3px ml-2px h-100px w-100px"
                            alt={product?.name}
                            title="Product Image"
                            src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
                          />
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* <label className="mt-5px title_font" style={{ fontSize: '14px' }}>
							{product?.brand}
						</label> */}
            <div
              onClick={() =>
                navigate("/collections/all/products/" + product?.pathname, { state: { prevPath: location.pathname } })
              }
              className="mt-13px"
            >
              <label style={{ fontSize: "1.6rem" }}>{determine_product_name_display(product, false)}</label>
            </div>

            <label className="product-price mv-3px">
              {sale_price_switch({
                product: product,
                cartItem: false,
                isWholesaler: current_user?.isWholesaler,
              })}
            </label>

            {product?.rating ? (
              <Rating rating={product?.rating} numReviews={product?.numReviews} />
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
