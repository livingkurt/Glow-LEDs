import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { determine_product_name_display, sale_price_switch } from "../../../utils/react_helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import { useSelector } from "react-redux";

const ProductItemM = ({ product, style, size, product_occurrences }) => {
  const navigate = useNavigate();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const location = useLocation();
  return (
    <div key={product.pathname} className=" w-100per" style={style}>
      {product_occurrences && (
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
                  src={product?.images && product?.images[0].link}
                />

                {Array.from({ length: 60 }).map((_, index) => {
                  const productOccurrence = product_occurrences[index];

                  if (productOccurrence?.name === product.name) {
                    return (
                      <div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px" key={product._id}>
                        <img
                          className=" mt-3px ml-2px h-100px w-100px"
                          alt={product.name}
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
            <div className="ph-10px">
              <div className="product_text mt-10px" style={{ fontSize: "1.6rem" }}>
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
      )}
    </div>
  );
};

export default ProductItemM;
