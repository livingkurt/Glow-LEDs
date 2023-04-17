// React
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { determine_product_name_display, sale_price_switch } from "../../../utils/react_helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import { useSelector } from "react-redux";

const ProductSimpleItemD = ({ product, size, style }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const history = useHistory();
  return (
    <li key={product.pathname} style={style}>
      <div className="tooltip">
        <div className="tooltipoverlay">
          <div className="product">
            <Link
              to={{
                pathname: "/collections/all/products/" + product.pathname,
                previous_path: history.location.pathname
              }}
              className="m-auto"
            >
              <div className="row mt-15px">
                <div className="column ai-c pos-rel">
                  {/* <Link to={'/collections/all/products/' + item.pathname}> */}
                  <LazyImage
                    className="product-image"
                    alt={product.name}
                    title="Product Image"
                    size={{ height: size, width: size }}
                    effect="blur"
                    src={product?.images_object[0].link}
                  />
                </div>
              </div>
            </Link>

            {/* <label style={{ fontSize: '1.3rem' }} className="title_font">
							{product.brand}
						</label> */}
            <Link
              to={{
                pathname: "/collections/all/products/" + product.pathname,
                previous_path: history.location.pathname
              }}
            >
              <label className="mt-10px" style={{ fontSize: "1.6rem" }}>
                {determine_product_name_display(product, false)}
              </label>
            </Link>
            {product.name === "Custom Infinity Mirror" ? (
              <label className="product-price">
                $549.99 - $<i className="fas fa-arrow-up" />
              </label>
            ) : (
              <label className="product-price">
                {sale_price_switch({
                  product: product,
                  isWholesaler: current_user?.isWholesaler
                })}
              </label>
            )}

            {product.rating ? (
              <Rating rating={product.rating} numReviews={product.numReviews} />
            ) : (
              <span className="rating vis-hid ta-c">No Reviews</span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductSimpleItemD;
