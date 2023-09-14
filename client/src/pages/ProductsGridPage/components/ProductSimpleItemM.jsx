import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { determine_product_name_display, sale_price_switch } from "../../../utils/react_helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import { useSelector } from "react-redux";

const ProductSimpleItemM = ({ product, size, style }) => {
  const navigate = useNavigate();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const location = useLocation();
  return (
    <li key={product.pathname} className=" w-100per" style={style}>
      <div
        onClick={() =>
          navigate("/collections/all/products/" + product?.pathname, { state: { prevPath: location.pathname } })
        }
      >
        <div className="small_screen_product row">
          <div className="row">
            <div className="column ai-c pos-rel">
              <LazyImage
                className="product-image w-200px h-200px "
                alt={product.name}
                title="Product Image"
                size={{ height: size, width: size }}
                effect="blur"
                src={product?.images_object[0].link}
              />
            </div>
          </div>
          <div className="p-10px">
            <div className="product_text" style={{ fontSize: "1.6rem" }}>
              {determine_product_name_display(product, false)}
            </div>
            <div className="product_text mt-10px">
              <div className="">
                {sale_price_switch({
                  product: product,
                  isWholesaler: current_user?.isWholesaler,
                })}
              </div>
            </div>
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

export default ProductSimpleItemM;
