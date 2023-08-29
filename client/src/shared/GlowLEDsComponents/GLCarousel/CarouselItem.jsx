// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import { LazyImage } from "../../SharedComponents";
import { GLButton } from "..";
import * as API from "../../../api";

const CarouselItem = ({ product, size, style, add_to_cart }) => {
  const [product, set_product] = useState(product);
  const [loading, set_loading] = useState(true);
  const [qty, set_qty] = useState(1);
  const [size, set_size] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  useEffect(() => {
    let clean = true;
    if (clean) {
      set_loading(false);
    }
    return () => (clean = false);
  }, [product]);

  const add_item_to_cart = cart_item => {
    dispatch(API.addToCart({ cart: my_cart, cart_item, type: "add_to_cart" }));
  };

  const handleAddToCart = e => {
    e.preventDefault();
    const color = product.color_products && product.color_products.find(color => color.default_option === true);
    const secondary_color =
      product.secondary_color_products &&
      product.secondary_color_products.find(secondary_color => secondary_color.default_option === true);
    const option = product.option_products && product.option_products.find(option => option.default_option === true);

    const cart_item = {
      product: product._id,
      color_product: color && color,
      color_code: color && color.color_code,
      secondary_color_code: secondary_color && secondary_color.color_code,
      secondary_color_product: secondary_color && secondary_color,
      color_group_name: product.color_group_name,
      secondary_color_group_name: product.secondary_color_group_name,
      option_group_name: product.option_group_name,
      secondary_group_name: product.secondary_group_name,
      option_product: option && option,
      // option_product_name:,
      // secondary_product,
      // secondary_product_name,
      name: product.name,
      size: size ? size : option.size,
      color: color && color.color,
      secondary_color: secondary_color && secondary_color.secondary_color,
      display_image: product?.images_object[0].link,
      price: product.price,
      sale_price: product.sale_price,
      sale_start_date: product.sale_start_date,
      sale_end_date: product.sale_end_date,
      quantity: product.quantity,
      weight_pounds: product.weight_pounds,
      weight_ounces: product.weight_ounces,
      package_length: product.package_length,
      package_width: product.package_width,
      package_height: product.package_height,
      package_volume: product.package_volume,
      pathname: product.pathname,
      category: product.category,
      subcategory: product.subcategory,
      qty,
      finite_stock: product.category,
      // // determine_default_color(color),
      // diffuser_cap: diffuser_cap,
    };
    add_item_to_cart(cart_item);
    // open_cart();
    // set_product_option({});
  };

  const [show_options, set_show_options] = useState(false);

  const update_option = e => {
    const option = JSON.parse(e.target.value);
    let button = document.getElementById(e.target.id);
    let buttons = document.querySelectorAll(".packs");
    buttons.forEach(node => {
      node.classList.remove("active");
      node.classList.remove("secondary");
      node.classList.add("primary");
    });
    button.classList.add("secondary");
    button.classList.add("active");

    set_size(option.size);
  };

  return (
    <div>
      {product && !loading && (
        <li key={product && product.pathname} style={style}>
          <div className="tooltip">
            <span className="tooltiptext">
              <li>
                {product.quantity > 0 && add_to_cart ? (
                  <div>
                    {product.subcategory !== "coin" ? (
                      <GLButton variant="primary" onClick={handleAddToCart}>
                        Quick Add to Cart
                      </GLButton>
                    ) : (
                      <li>
                        {!show_options && (
                          <GLButton variant="primary" onClick={() => set_show_options(true)}>
                            Quick Add to Cart
                          </GLButton>
                        )}
                        {show_options && (
                          <div
                            className="w-250px br-20px m-auto br-20px p-10px"
                            style={{
                              backgroundColor: "#27272780",
                              color: "white",
                            }}
                          >
                            <label aria-label="Sort" htmlFor="sort" className="select-label mr-1rem mt-1rem">
                              {product.option_group_name ? product.option_group_name : "Size"}:
                            </label>
                            <div className="ai-c wrap jc-c">
                              {product.option_products &&
                                product.option_products.map((option, index) => (
                                  <GLButton
                                    key={index}
                                    id={option.size}
                                    value={JSON.stringify(option)}
                                    onClick={e => update_option(e)}
                                    className={`packs fs-13px flex-s-0 min-w-40px mr-2px mb-1rem btn ${
                                      option.default_option ? "secondary" : "primary"
                                    }`}
                                  >
                                    {option.size}
                                  </GLButton>
                                ))}
                            </div>

                            <div className="ai-c h-25px max-w-500px w-100per jc-b mb-10px">
                              <label aria-label="Sort" htmlFor="sort" className="select-label mr-1rem">
                                Qty:
                              </label>
                              <div className="custom-select">
                                <select
                                  defaultValue={qty}
                                  className="qty_select_dropdown"
                                  onChange={e => {
                                    set_qty(e.target.value);
                                  }}
                                >
                                  {[...Array(10).keys()].map((x, index) => (
                                    <option key={index} defaultValue={parseInt(x + 1)}>
                                      {parseInt(x + 1)}
                                    </option>
                                  ))}
                                </select>
                                <span className="custom-arrow" />
                              </div>
                            </div>

                            <GLButton variant="primary" className="w-100per" onClick={handleAddToCart}>
                              {" "}
                              Add to Cart
                            </GLButton>
                          </div>
                        )}
                      </li>
                    )}
                  </div>
                ) : (
                  <GLButton variant="inactive">Out of Stock</GLButton>
                )}
              </li>
            </span>
            <Link
              to={{
                pathname: product && "/collections/all/products/" + product.pathname,
                previous_path: navigate.location.pathname,
              }}
              onClick={() => dispatch(API.detailsProduct(product.pathname))}
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

                {/* <label style={{ fontSize: '1.3rem' }} className="title_font mt-5px ">
									{product.brand}
								</label> */}
                <label style={{ fontSize: "1.6rem" }} className="mv-5px">
                  {product.name}
                </label>
                <label className="product-price">
                  {sale_price_switch({
                    product,
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
          </div>
        </li>
      )}
    </div>
  );
};

export default CarouselItem;
