// React
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  determine_product_name_display,
  sale_price_switch,
} from "../../utils/react_helper_functions";
import { Rating } from "../SpecialtyComponents";
import { LazyImage } from "../UtilityComponents";

const ProductItemM = props => {
  const history = useHistory();
  return (
    <li key={props.product.pathname} className=" w-100per" style={props.style}>
      {props.product_occurrences && (
        <Link
          to={{
            pathname: "/collections/all/products/" + props.product.pathname,
            state: { prevPath: history.location.pathname },
          }}
        >
          <div className="small_screen_product row">
            <div className="row">
              <div className="column ai-c pos-rel">
                {/* <LazyLoadImage
									className="product-image w-200px h-200px "
									alt={props.product.name}
									title="Product Image"
									effect="blur"
									src={props.product.images && props.product.images[0]} 
								/> */}
                <LazyImage
                  className="product-image w-200px h-200px "
                  alt={props.product.name}
                  title="Product Image"
                  size={{ height: props.size, width: props.size }}
                  effect="blur"
                  src={props.product.images && props.product.images[0]}
                />

                {[ ...Array(12).keys() ].map(
                  (x, index) =>
                    props.product_occurrences &&
                    props.product_occurrences[index] &&
                    props.product_occurrences[index].name ===
                      props.product.name && (
                      <div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
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
            <div className="ph-10px">
              <div
                className="product_text mt-10px"
                style={{ fontSize: "1.6rem" }}
              >
                {determine_product_name_display(props.product, false)}
              </div>
              <div className="product_text mt-10px">
                {props.product.name === "Custom Infinity Mirror" ? (
                  <div className="">
                    $549.99 - $<i className="fas fa-arrow-up" />
                  </div>
                ) : (
                  <div className="">{sale_price_switch(props.product)}</div>
                )}
              </div>
              {props.product.rating ? (
                <Rating
                  rating={props.product.rating}
                  numReviews={props.product.numReviews}
                />
              ) : (
                <span className="rating vis-hid ta-c">No Reviews</span>
              )}
            </div>
          </div>
        </Link>
      )}
    </li>
  );
};

export default ProductItemM;
