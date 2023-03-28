// React
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { determine_product_name_display, sale_price_switch } from "../../../utils/react_helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import { isWholesaler } from "../../../utils/helpers/user_helpers";
import { useSelector } from "react-redux";

const Product = props => {
  const userSlice = useSelector(state => state.userSlice);
  const { current_user } = userSlice;
  const history = useHistory();
  return (
    <li key={props.product.pathname} style={props.style}>
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
                  <LazyImage
                    className="product-image"
                    alt={props.product.name}
                    title="Product Image"
                    size={{ height: props.size, width: props.size }}
                    effect="blur"
                    src={props.product.images && props.product.images[0]}
                  />
                </div>
              </div>
            </Link>

            {/* <label style={{ fontSize: '1.3rem' }} className="title_font">
							{props.product.brand}
						</label> */}
            <Link
              to={{
                pathname: "/collections/all/products/" + props.product.pathname,
                previous_path: history.location.pathname
              }}
            >
              <label className="mt-10px" style={{ fontSize: "1.6rem" }}>
                {determine_product_name_display(props.product, false)}
              </label>
            </Link>
            {props.product.name === "Custom Infinity Mirror" ? (
              <label className="product-price">
                $549.99 - $<i className="fas fa-arrow-up" />
              </label>
            ) : (
              <label className="product-price">
                {sale_price_switch({
                  product: props.product,
                  wholesaler: isWholesaler(current_user)
                })}
              </label>
            )}

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

export default Product;
