import React, { useState, useEffect } from "react";
import { Rating } from "..";
import { sizes_conversion, sizes_short } from "../../../utils/helper_functions";
import { Link } from "react-router-dom";
import {
  determine_option_product_name,
  determine_secondary_product_name,
  product_page_sale_price_switch,
} from "../../../utils/react_helper_functions";
import useWindowDimensions from "../../Hooks/windowDimensions";

const ProductOptions = ({
  product,
  price,
  sale_price,

  previous_price,
  update_secondary,
  secondary_product_object,
  size,
  color_products,
  color_code,
  update_color,
  color_product_object,
  secondary_color_products,
  secondary_color_code,
  update_secondary_color,
  secondary_color_product_object,
  option_products,
  update_option,
  option_product_object,
  qty,
  setQty,
  quantity,
  secondary_product,
  count_in_stock,
  handleAddToCart,
  out_of_stock,
  set_out_of_stock,
  preorder,
  set_preorder,
  show_add_on,
  set_show_add_on,
  set_price,
  set_add_on_price,
  set_secondary_color_product_object,
  set_secondary_color_product,
  set_secondary_color_products,
  set_secondary_color,
  set_secondary_color_code,
  set_secondary_image,
  has_add_on,
  set_sale_price,
}) => {
  const { width } = useWindowDimensions();
  console.log({ ProductOptions: option_products });

  const determine_option_styles = (option_product_object, option) => {
    const classes = "packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem ";
    if (option_product_object.hasOwnProperty("size")) {
      if (option_product_object.size === option.size) {
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

  const option_buttons = (option, index) => {
    console.log({ option_buttons: option });
    return (
      <div>
        <button
          key={index}
          selected={option.default_option}
          id={option.size}
          value={JSON.stringify(option)}
          onClick={e => update_option(e)}
          className={determine_option_styles(option, option_product_object)}
        >
          {determine_option_product_name(option.size)}
        </button>
      </div>
    );
  };
  const names_hide_add_to_cart = [
    "Diffuser Caps + Adapters Starter Kit V4",
    "Refresh Pack (6 Supreme Pairs + 120 Batteries)",
    "CLOZD Batman Decals",
    "CLOZD Outline + Slim Batman Decals",
    "OPYN Batman Decals",
    "OPYN Outline + Slim Batman Decals",
    "CLOZD Nanoskinz V2",
    "CLOZD Alt Novaskinz",
    "OPYN Nanoskinz V2",
    "CLOZD Novaskinz",
    "Supreme Sizing Sampler Pack",
    "Capez",
    "CLOZD Omniskinz",
    "CLOZD Omniskinz Sleds",
  ];
  const categories_hide_add_to_cart = [ "exo_diffusers" ];

  const determine_add_to_cart = (
    product,
    secondary_product,
    count_in_stock,
    option_product_object
  ) => {
    if (names_hide_add_to_cart.includes(product.name) && !secondary_product) {
      return <div />;
    }
    if (
      categories_hide_add_to_cart.includes(product.category) &&
      !secondary_product
    ) {
      return <div />;
    }
    return (
      <button className="btn primary bob mt-10px" onClick={handleAddToCart}>
        {determine_preorder(
          option_product_object,
          count_in_stock,
          "Add To Cart"
        )}
      </button>
    );
  };

  // useEffect(() => {
  //   if (
  //     product.name === "CLOZD Nanoskinz V2" ||
  //     product.name === "CLOZD Coinskinz V2" ||
  //     product.name === "CLOZD Coffinskinz V2" ||
  //     product.name === "CLOZD Apolloskinz V2"
  //   ) {
  //     set_show_add_on(false);
  //     set_add_on_price(0);
  //   } else {
  //     set_show_add_on(true);
  //   }
  //   return () => {};
  // }, []);

  const determine_show_options = (
    product,
    secondary_product,
    count_in_stock,
    option_product_object
  ) => {
    if (names_hide_add_to_cart.includes(product.name) && !secondary_product) {
      return <div />;
    }
    if (
      categories_hide_add_to_cart.includes(product.category) &&
      !secondary_product
    ) {
      return <div />;
    }
    return (
      <div>
        {" "}
        {size !== "1 Sled" &&
        product.color_product_group &&
        color_products &&
        color_products.length > 0 && (
          <li>
            <div
              className={`ai-c h-25px mb-25px ${width < 1150 ? "jc-b" : ""}`}
            >
              <label className="mv-0px mr-10px title_font">
                {product.color_group_name ? product.color_group_name : "Color"}:{" "}
              </label>
              <div className="ai-c">
                {color_code && (
                  <canvas
                    className=" mh-1rem w-60px h-20px br-7px"
                    style={{ backgroundColor: color_code }}
                  />
                )}
                <div className="custom-select">
                  <select
                    className="qty_select_dropdown w-100per"
                    onChange={e => update_color(e)}
                    value={JSON.stringify(color_product_object)}
                    defaultValue={JSON.stringify(color_product_object)}
                  >
                    {color_products
                      .filter(item => item.filament && item.filament.active)
                      .map((color, index) => (
                        <option key={index} value={JSON.stringify(color)}>
                          {color.name.split(" ")[0]}
                        </option>
                      ))}
                  </select>
                  <span className="custom-arrow" />
                </div>
              </div>
            </div>
          </li>
        )}
        {has_add_on && (
          <li>
            <div className="mv-2rem">
              <input
                type="checkbox"
                name="show_add_on"
                defaultChecked={show_add_on}
                style={{
                  transform: "scale(1.5)",
                }}
                className="mr-1rem"
                id="show_add_on"
                onChange={e => {
                  set_show_add_on(show => {
                    if (show) {
                      set_secondary_color("");
                      set_secondary_color_code("");
                      set_secondary_image("");
                      set_price(product.price);
                      set_sale_price(product.sale_price);
                    } else {
                      set_price(
                        secondary_color_product_object.price + product.price
                      );
                      set_sale_price(
                        secondary_color_product_object.sale_price +
                          product.sale_price
                      );
                      if (secondary_color_product_object.sale_price > 0) {
                        set_add_on_price(
                          secondary_color_product_object.sale_price
                        );
                      } else {
                        set_add_on_price(secondary_color_product_object.price);
                      }
                    }

                    // set_secondary_color_product_object({});
                    // set_secondary_color_product(product.secondary_color_product);
                    // set_secondary_color_products([]);

                    return show ? false : true;
                  });
                }}
              />
              <label htmlFor="show_add_on mb-20px">
                + Add Capes (For Centering)
              </label>
            </div>
          </li>
        )}
        {show_add_on &&
        size !== "1 Skin" &&
        product.secondary_color_product_group &&
        secondary_color_products &&
        secondary_color_products.length > 0 && (
          <li>
            <div
              className={`ai-c h-25px mb-25px ${width < 1150 ? "jc-b" : ""}`}
            >
              <label className="mv-0px mr-10px title_font">
                {product.secondary_color_group_name ? (
                  product.secondary_color_group_name
                ) : (
                  "Secondary Color"
                )}:{" "}
              </label>
              <div className="ai-c">
                {secondary_color_code && (
                  <canvas
                    className=" mh-1rem w-60px h-20px br-7px"
                    style={{ backgroundColor: secondary_color_code }}
                  />
                )}
                <div className="custom-select">
                  <select
                    className="qty_select_dropdown w-100per"
                    onChange={e => update_secondary_color(e)}
                    value={JSON.stringify(secondary_color_product_object)}
                    defaultValue={JSON.stringify(
                      secondary_color_product_object
                    )}
                  >
                    {secondary_color_products
                      .filter(item => item.filament && item.filament.active)
                      .map((secondary_color, index) => (
                        <option
                          key={index}
                          value={JSON.stringify(secondary_color)}
                        >
                          {secondary_color.name.split(" ")[0]}
                        </option>
                      ))}
                  </select>
                  <span className="custom-arrow" />
                </div>
              </div>
            </div>
          </li>
        )}
        {product.option_product_group &&
        option_products &&
        option_products.length > 0 && (
          <li>
            <div className={`ai-c  mv-10px ${width < 1150 ? "jc-b" : ""}`}>
              <h3
                aria-label="Sort"
                htmlFor="sort"
                className="select-label mr-1rem mt-1rem"
              >
                {product.option_group_name ? (
                  product.option_group_name
                ) : (
                  "Size"
                )}:
              </h3>
              <div className="ai-c wrap">
                {option_products
                  .filter(option => option.price !== 2.98)
                  .map((option, index) => (
                    <div>{option_buttons(option, index)}</div>
                  ))}
              </div>
            </div>
          </li>
        )}
        {(product.subcategory === "novaskinz" ||
          product.subcategory === "alt_novaskinz") &&
        product.option_product_group &&
        option_products &&
        option_products.length > 0 && (
          <li>
            <div className={`ai-c  mv-10px ${width < 1150 ? "jc-b" : ""}`}>
              <h3 className="mr-5px w-7rem">Parts: </h3>
              <div className="ai-c wrap">
                {option_products
                  .filter(option => option.price === 2.98)
                  .map((option, index) => (
                    <div>{option_buttons(option, index)}</div>
                  ))}
              </div>
            </div>
          </li>
        )}
        {(product.name === "Supremes" ||
          product.name ===
            "Refresh Pack (6 Supreme Pairs + 120 Batteries)") && (
          <ul className="mb-10px">
            <hr />
            <h3 className="title_font jc-c fs-20px">
              {" "}
              {sizes_conversion(size)}
            </h3>{" "}
            <li className="jc-c ta-c w-100oer lh-30px">
              We recommend to get a size up from your usual sizing
            </li>
            <li className="mb-10px jc-b w-100per">
              <div className="title_font"> Hand Length:</div>{" "}
              <div className="title_font">
                {size && sizes_short(width)[size].hand_length} inches
              </div>
            </li>
            <li className="jc-b w-100per mb-10px">
              <div className="title_font"> Hand Width:</div>{" "}
              <div className="title_font">
                {size && sizes_short(width)[size].hand_width} inches
              </div>
            </li>
            {/* <hr className="w-50per jc-c " /> */}
            <li className="jc-c ta-c w-100oer mt-20px lh-30px">
              Worried about the fit? We've got your back with our:
            </li>
            <li>
              <Link
                to={`/collections/all/products/supremes_sizing_sampler_pack`}
                className="jc-c"
              >
                <button className="btn primary">
                  Supremes Sizing Sampler Pack
                </button>
              </Link>
            </li>
            <hr />
          </ul>
        )}
        <li>
          <div className={`ai-c h-25px mv-10px ${width < 1150 ? "jc-b" : ""}`}>
            <label className="mv-0px mr-10px title_font">Qty:</label>
            <div className="custom-select">
              <select
                defaultValue={qty}
                className="qty_select_dropdown w-100per"
                onChange={e => {
                  setQty(e.target.value);
                }}
              >
                {[ ...Array(quantity).keys() ].map((x, index) => (
                  <option key={index} defaultValue={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <span className="custom-arrow" />
            </div>
          </div>
        </li>{" "}
      </div>
    );
  };

  const determine_preorder = (option_product_object, count_in_stock, text) => {
    const choice = num => {
      if (
        option_product_object &&
        option_product_object.hasOwnProperty("count_in_stock")
      ) {
        if (option_product_object.count_in_stock > num) {
          return text;
        } else {
          return "Preorder";
        }
      } else if (count_in_stock > 0) {
        return text;
      } else {
        return "Preorder";
      }
    };
    if (product.name === "Refresh Pack (6 Supreme Pairs + 120 Batteries)") {
      return choice(5);
    } else {
      return choice(0);
    }
  };

  return (
    <ul>
      <li className="jc-b ai-c">
        <div className="ai-c mb-1rem">
          <h3 className="mv-0px mr-5px">Price: </h3>
          {product_page_sale_price_switch(
            price,
            sale_price,
            previous_price,
            product.sale_start_date,
            product.sale_end_date,
            false,
            "dark"
          )}
        </div>
        {width < 1150 &&
        width > 482 && (
          <div className="mb-20px">
            <a href="#reviews">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </a>
          </div>
        )}
      </li>
      <li className="mv-1rem ai-c">
        <label className="mv-0px mr-10px title_font">Status:</label>{" "}
        <label>
          {determine_preorder(
            option_product_object,
            count_in_stock,
            "In Stock"
          )}
        </label>
        {/* <label>{count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}</label> */}
      </li>
      {product.secondary_product_group &&
      product.secondary_products &&
      product.secondary_products.length > 0 && (
        <li>
          <div className={`ai-c h-25px mv-20px ${width < 1150 ? "jc-b" : ""}`}>
            <label className="mv-0px mr-10px title_font">
              {product.secondary_group_name ? (
                product.secondary_group_name
              ) : (
                "Design"
              )}: {" "}
            </label>
            <div className="custom-select">
              <select
                className="qty_select_dropdown w-100per"
                onChange={e => update_secondary(e)}
                value={JSON.stringify(secondary_product_object)}
                defaultValue={JSON.stringify(secondary_product_object)}
              >
                <option key={1} defaultValue="">
                  Choose{" "}
                  {product.secondary_group_name && product.secondary_group_name}
                </option>
                {product.secondary_products.map((secondary, index) => (
                  <option key={index} value={JSON.stringify(secondary)}>
                    {determine_secondary_product_name(secondary.name, product)}
                  </option>
                ))}
              </select>
              <span className="custom-arrow" />
            </div>
          </div>
        </li>
      )}
      {/* {product.name === "CLOZD Omniskinz" && (
        <li>
          <div className={`ai-c h-25px mv-20px ${width < 1150 ? "jc-b" : ""}`}>
            <label className="mv-0px mr-10px title_font">
              {product.secondary_group_name ? (
                product.secondary_group_name
              ) : (
                "Design"
              )}: {" "}
            </label>
            <div className="custom-select">
              <select
                className="qty_select_dropdown w-100per"
                onChange={e => update_secondary(e)}
                value={JSON.stringify(secondary_product_object)}
                defaultValue={JSON.stringify(secondary_product_object)}
              >
                <option key={1} defaultValue="">
                  Choose{" "}
                  {product.secondary_group_name && product.secondary_group_name}
                </option>
                {product.secondary_products.map((secondary, index) => (
                  <option key={index} value={JSON.stringify(secondary)}>
                    {determine_secondary_product_name(secondary.name, product)}
                  </option>
                ))}
              </select>
              <span className="custom-arrow" />
            </div>
          </div>
          <div className="mv-2rem">
            <input
              type="checkbox"
              name="show_add_on"
              defaultChecked={show_add_on}
              style={{
                transform: "scale(1.5)",
              }}
              className="mr-1rem"
              id="show_add_on"
              onChange={e => {
                set_show_add_on(show => {
                  console.log({
                    secondary_color_product_object:
                      secondary_color_product_object.price,
                  });
                  !show
                    ? set_price(
                        secondary_color_product_object.price + product.price
                      )
                    : set_price(product.price);

                  return show ? false : true;
                });
              }}
            />
            <label htmlFor="show_add_on mb-20px">Add more sleds</label>
          </div>
        </li>
      )} */}
      {determine_show_options(
        product,
        secondary_product,
        count_in_stock,
        option_product_object
      )}
      <li className="mb-0px">
        <div className="">
          <h4 className="mb-10px mt-10px">Shipping Calculated at Checkout</h4>
          {product.processing_time && (
            <h4
              className="mb-0px mt-0px"
              style={{ webkitTextStroke: "0.5px white" }}
            >
              This item ships in {product.processing_time[0]} -{" "}
              {product.processing_time[1]} business days
            </h4>
          )}
        </div>
        {product.name !== "Glowstringz V2" &&
          determine_add_to_cart(
            product,
            secondary_product,
            count_in_stock,
            option_product_object
          )}
      </li>
    </ul>
  );
};

export default ProductOptions;
// 1762 smoke tree st. Hesperia ca, 92345
