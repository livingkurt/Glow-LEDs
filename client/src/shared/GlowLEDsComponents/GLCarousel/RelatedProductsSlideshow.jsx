import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_Products } from "../../../utils";
import { humanize, prnt, shuffle } from "../../../utils/helper_functions";
import {
  determine_option_product_name,
  determine_product_name_display,
  mobile_check,
  sale_price_switch,
} from "../../../utils/react_helper_functions";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import { LazyImage } from "../../SharedComponents";
import { GLButton } from "..";
import Rating from "../GLRating/Rating";
import * as API from "../../../api";
import { determineSoldOut } from "../../../pages/ProductPage/productHelpers";

const RelatedProductsSlideshow = ({
  product_category,
  product_subcategory,
  category,
  random,
  title,
  product_pathname,
  add_to_cart,
  product,
}) => {
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const location = useLocation();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const [products, set_products] = useState([]);
  const [loading, set_loading] = useState(false);
  const [qty, set_qty] = useState(1);
  const [size, set_size] = useState("");

  useEffect(() => {
    let clean = true;
    if (clean) {
      get_products();
    }
    return () => (clean = false);
  }, [product_category]);

  const get_products = async () => {
    set_loading(true);
    let query = {};
    if (category === "chips" && product && product.chips && product.chips[0]) {
      query = { chip: product.chips[0]._id, hidden: false, option: false };
    } else if (category === "batteries") {
      query = { category: "batteries", hidden: false, option: false };
    } else if (category === "all") {
      query = { hidden: false, option: false };
    } else if (category === "related") {
      query = {
        category: product_category,
        hidden: false,
        option: false,
      };
    } else if (category === "opyn") {
      query = {
        subcategory: product_subcategory,
        hidden: false,
        option: false,
      };
    }

    const { data } = await API_Products.findAllGrid_products_a(query);

    set_products(typeof data === "object" && data.filter(product => product.pathname !== product_pathname));
    if (random) {
      set_products(typeof data === "object" && shuffle(data.filter(product => product.pathname !== product_pathname)));
    }
    set_loading(false);
  };

  const [image_number, set_image_number] = useState(0);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 8000, min: 1400 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1100 },
      items: 4,
    },
    desktop_2: {
      breakpoint: { max: 1100, min: 900 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // const update_option = (e) => {
  // 	const option = JSON.parse(e.target.value);
  // 	let button = document.getElementById(e.target.id);
  // 	let buttons = document.querySelectorAll('.packs');
  // 	buttons.forEach((node) => {
  // 		node.classList.remove('active');
  // 		node.classList.remove('off ft-primary');
  // 		node.classList.add('on ft-white');
  // 	});
  // 	button.classList.add('off ft-primary');
  // 	button.classList.add('active');

  // 	set_size(option.size);
  // };

  const add_item_to_cart = cart_item => {
    dispatch(API.addToCart({ cart: my_cart, cart_item, type: "add_to_cart" }));
  };

  const handleAddToCart = (e, product) => {
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
  };

  const determine_option_styles = (option_product_object, option) => {
    const classes = "packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem ";
    if (option_product_object.hasOwnProperty("size")) {
      if (option_product_object.size === size) {
        return `${classes} off ft-primary`;
      } else {
        return `${classes} on ft-white`;
      }
    } else if (option.default_option) {
      return `${classes} off ft-primary`;
    } else {
      return `${classes} on ft-white`;
    }
  };

  const option_buttons = (option, index, option_product_object) => {
    return (
      <div>
        <GLButton
          key={index}
          selected={option.default_option}
          id={option.size}
          value={JSON.stringify(option)}
          onClick={e => update_option(e)}
          className={determine_option_styles(option, option_product_object)}
        >
          {determine_option_product_name(option.size)}
        </GLButton>
      </div>
    );
  };
  const update_option = e => {
    const option = JSON.parse(e.target.value);

    // let button = document.getElementById(e.target.id);
    // let buttons = document.querySelectorAll('.packs');
    // buttons.forEach((node) => {
    // 	node.classList.remove('active');
    // 	node.classList.remove('secondary');
    // 	node.classList.add('primary');
    // });
    // button.classList.add('secondary');
    // button.classList.add('active');

    set_size(option.size);
  };

  const [show_options, set_show_options] = useState(false);

  return (
    <div className="">
      <h2 className="jc-c w-100per ta-c">{title}</h2>

      <Carousel
        swipeable={mobile_check() ? true : false}
        draggable={true}
        // showDots={true}
        // partialVisible={true}
        // centerMode={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={mobile_check() ? false : true}
        // autoPlaySpeed={1000}
        // keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={mobile_check() ? "mobile" : "desktop"}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products &&
          products.map((product, index) => (
            <div key={product.pathname} className="product-thumb pv-2rem">
              <div className="tooltip">
                <span className="tooltiptext">
                  <div className="">
                    {product.quantity > 0 && add_to_cart ? (
                      <div>
                        {product.subcategory !== "batteries" ? (
                          <GLButton onClick={e => handleAddToCart(e, product)} variant="primary">
                            Quick Add to Cart
                          </GLButton>
                        ) : (
                          <div>
                            {!show_options && (
                              <GLButton onClick={() => set_show_options(true)} variant="primary">
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
                                <div className={`ai-c  mv-10px ${width < 1150 ? "jc-b" : ""}`}>
                                  <h3 aria-label="Sort" htmlFor="sort" className="select-label mr-1rem mt-1rem">
                                    {product.option_group_name ? product.option_group_name : "Size"}:
                                  </h3>
                                  <div className="ai-c wrap">
                                    {product.option_products
                                      .filter(option => option.price !== 2.98)
                                      .map((option, index) => (
                                        <div>
                                          {option_buttons(
                                            option,
                                            index,
                                            product.option_products.find(option => option.default_option === true)
                                          )}
                                        </div>
                                      ))}
                                  </div>
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
                                <GLButton
                                  onClick={e => handleAddToCart(e, product)}
                                  variant="primary"
                                  className="w-100per"
                                >
                                  Add to Cart
                                </GLButton>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <GLButton variant="inactive">{determineSoldOut(product)}</GLButton>
                    )}
                  </div>
                </span>

                <div className="product">
                  <div
                    onClick={() =>
                      navigate("/collections/all/products/" + product?.pathname, {
                        state: { prevPath: location.pathname },
                      })
                    }
                    className="m-auto"
                  >
                    <div className="row mt-15px">
                      <div className="column ai-c pos-rel">
                        {/* <Link to={'/collections/all/products/' + item.pathname}> */}

                        {product.images_object.length === 1 && (
                          <LazyImage
                            className="carousel-image"
                            alt={product.name}
                            title="Product Image"
                            // size={{ height: 200, width: 200 }}
                            effect="blur"
                            src={product?.images_object[0].link}
                          />
                        )}
                        {product.images_object.length > 1 && (
                          <div>
                            <div className="jc-b w-100per pos-rel ">
                              {[...Array(1).keys()].map(x => (
                                <LazyImage
                                  key={image_number + x}
                                  className="carousel-image"
                                  alt={"Product"}
                                  title="Product Image"
                                  // size={{ height: 200, width: 200 }}
                                  effect="blur"
                                  // src={images[image_number + x]}
                                  src={product?.images_object[0].link}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      navigate("/collections/all/products/" + product?.pathname, {
                        state: { prevPath: location.pathname },
                      })
                    }
                    className="mt-13px"
                  >
                    <label style={{ fontSize: "1.6rem" }}>{determine_product_name_display(product, false)}</label>
                  </div>

                  <label className="product-price mv-3px">
                    {sale_price_switch({ product, cartItem: false, isWholesaler: current_user?.isWholesaler })}
                  </label>

                  {product.rating ? (
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                  ) : (
                    <span className="rating vis-hid ta-c">No Reviews</span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default RelatedProductsSlideshow;
