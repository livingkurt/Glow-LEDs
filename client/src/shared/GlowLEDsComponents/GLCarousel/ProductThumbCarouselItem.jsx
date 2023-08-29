// React
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import { LazyImage } from "../../SharedComponents";
import { useSelector } from "react-redux";

const ProductThumbCarouselItem = props => {
  const [product, set_product] = useState(props.product);
  const [loading, set_loading] = useState(true);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const navigate = useNavigate();

  useEffect(() => {
    let clean = true;
    if (clean) {
      set_loading(false);
    }
    return () => (clean = false);
  }, [props.product]);

  return (
    <div>
      {!loading && (
        <li key={props.product && product.pathname} style={props.style}>
          <Link
            to={{
              pathname: product && "/collections/all/products/" + product.pathname,
              previous_path: navigate.location.pathname,
            }}
          >
            <div className="product">
              <LazyImage
                className="product-image"
                alt={product.name}
                title="Product Image"
                size={{ height: props.size, width: props.size }}
                effect="blur"
                src={product?.images_object[0].link}
              />
              {/* <LazyLoadImage
								className="product-image"
								alt={product.name}
								title="Product Image"
								style={{ height: props.size, width: props.size }}
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
                  product: props.product,
                  cartItem: props.product.product_options,
                  isWholesaler: current_user?.isWholesaler,
                })}
              </label>

              {product.rating ? (
                <Rating rating={product.rating} numReviews={product.numReviews} />
              ) : (
                <span className="rating vis-hid ta-c">No Reviews</span>
              )}
            </div>
          </Link>
        </li>
      )}
    </div>
  );
};

export default ProductThumbCarouselItem;
