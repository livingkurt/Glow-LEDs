// React
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import { LazyImage } from "../../SharedComponents";
import { useSelector } from "react-redux";

const ProductThumbCarouselItem = ({ product, size, style }) => {
  const [product, set_product] = useState(product);
  const [loading, set_loading] = useState(true);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const location = useLocation();

  useEffect(() => {
    let clean = true;
    if (clean) {
      set_loading(false);
    }
    return () => (clean = false);
  }, [product]);

  return (
    <div>
      {!loading && (
        <li key={product && product.pathname} style={style}>
          <div
            onClick={() =>
              navigate("/collections/all/products/" + product?.pathname, {
                state: { prevPath: location.pathname },
              })
            }
          >
            <div className="product">
              <LazyImage
                className="product-image"
                alt={product.name}
                title="Product Image"
                size={{ height: size, width: size }}
                effect="blur"
                src={product?.images_object[0].link}
              />
              {/* <LazyLoadImage
								className="product-image"
								alt={product.name}
								title="Product Image"
								style={{ height: size, width: size }}
								effect="blur"
								src={product?.images_object[0].link}
							/> */}

              {/* <label className="title_font" style={{ fontSize: '1.3rem' }}>
								{product.brand}
							</label> */}
              <label style={{ fontSize: "1.6rem" }} className="mt-10px">
                {product.name}
              </label>
              <label className="product-price">
                {sale_price_switch({
                  product: product,
                  cartItem: product.product_options,
                  isWholesaler: current_user?.isWholesaler,
                })}
              </label>

              {product.rating ? (
                <Rating rating={product.rating} numReviews={product.numReviews} />
              ) : (
                <span className="rating vis-hid ta-c">No Reviews</span>
              )}
            </div>
          </div>
        </li>
      )}
    </div>
  );
};

export default ProductThumbCarouselItem;
