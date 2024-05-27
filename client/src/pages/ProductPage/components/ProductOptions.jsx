import React from "react";
import { sizes_conversion, sizes_short } from "../../../utils/helper_functions";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  determine_secondary_product_name,
  product_page_sale_price_switch,
} from "../../../utils/react_helper_functions";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import GLTooltip from "../../../shared/GlowLEDsComponents/GLTooltip/GLTooltip";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import {
  categories_hide_add_to_cart,
  determine_add_to_cart,
  determine_addon_color,
  determine_preorder,
  determine_sampler,
  determine_sampler_pack_name,
  determine_sampler_pack_pathname,
  determine_sizing_quick_look,
  names_hide_add_to_cart,
  update_url,
} from "../productHelpers";
import { useSelector } from "react-redux";
import {
  setQty,
  update_secondary,
  update_color,
  update_secondary_color,
  toggle_show_add_on,
} from "../productPageSlice";
import { useDispatch } from "react-redux";
import * as API from "../../../api";
import OptionButtons from "./OptionButtons";
import { Loading } from "../../../shared/SharedComponents";

const ProductOptions = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const productsPage = useSelector(state => state.products.productsPage);
  const { product } = productsPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const productPage = useSelector(state => state.products.productPage);
  const {
    qty,
    price,
    wholesale_price,
    previous_price,
    sale_price,
    size,
    quantity,
    count_in_stock,
    color_code,
    color,
    secondary_color_code,
    color_products,
    secondary_color_products,
    option_products,
    secondary_product,
    color_product_object,
    secondary_color_product_object,
    option_product_object,
    secondary_product_object,
    show_add_on,
    has_add_on,
    secondary_color,
    option_product_name,
    secondary_product_name,
    add_on_price,
    color_product,
    option_product,
    image,
    secondary_image,
    preorder,
    dimensions,
    name,
    secondary_color_product,
    images,
  } = productPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const hasAddOnColor = determine_addon_color({ has_add_on, show_add_on, secondary_color });

  const handleAddToCart = () => {
    const cart_item = {
      // length: length,
      // width: width,
      // height: height,
      product: product._id,
      color_product,
      color_code,
      secondary_color_code: hasAddOnColor ? secondary_color_code : null,
      secondary_color_product: hasAddOnColor ? secondary_color_product : null,
      secondary_color_group_name: hasAddOnColor ? product.secondary_color_group_name : null,
      secondary_color: hasAddOnColor ? secondary_color : null,
      secondary_color_product_name: hasAddOnColor ? product.secondary_color_product_name : null,
      color_group_name: product.color_group_name,
      option_group_name: product.option_group_name,
      secondary_group_name: product.secondary_group_name,
      option_product,
      option_product_name,
      secondary_product,
      secondary_product_name,
      name,
      size,
      color: size !== "1 Skin" && color,
      display_image: image ? image : images[0]?.link,
      secondary_image: secondary_image ? secondary_image : "",
      price,
      preorder,
      sale_price,
      sale_start_date: product.sale_start_date,
      sale_end_date: product.sale_end_date,
      quantity,
      weight_pounds: dimensions.weight_pounds,
      weight_ounces: dimensions.weight_ounces,
      package_length: dimensions.package_length,
      package_width: dimensions.package_width,
      package_height: dimensions.package_height,
      package_volume: dimensions.package_volume,
      processing_time: product.processing_time,
      pathname: params.pathname,
      category: product.category,
      subcategory: product.subcategory,
      product_collection: product.product_collection,
      qty: parseInt(qty),
      finite_stock: product.finite_stock,
      count_in_stock: product.count_in_stock,
      add_on_price,
      show_add_on,
      has_add_on: product.has_add_on,
      wholesale_product: product.wholesale_product,
      wholesale_price: wholesale_price,
    };
    if (preorder) {
      const confirm = window.confirm(
        `${name} are out of stock in your selected size.\n\nBy clicking OK you agree that you are preordering ${name} which will not ship within the usual time.\n\nIt is HIGHLY RECOMMENDED that you order ${name} separately from any in-stock items so we can ship you your in-stock products without needing to wait for your out-of-stock products.\n\nThank you for your support!\n\nYou will be notified when ${name} are restocked. We anticipate they will be restocked by the end of January.`
      );
      if (confirm) {
        dispatch(API.addToCart({ cart: my_cart, cart_item, type: "add_to_cart" }));
      }
    } else {
      dispatch(API.addToCart({ cart: my_cart, cart_item, type: "add_to_cart" }));
    }
  };

  const { text, variant, tooltip } = determine_add_to_cart({
    product,
    secondary_product,
    count_in_stock,
    option_product_object,
    cartItems: my_cart.cartItems,
  });

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
            "dark",
            current_user?.isWholesaler,
            wholesale_price
          )}
        </div>
        {width < 1150 && width > 482 && (
          <div className="mb-20px">
            <a href="#reviews">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </a>
          </div>
        )}
      </li>
      <li className="mv-1rem ai-c">
        <label className="mv-0px mr-10px title_font">Status:</label>{" "}
        <label>{determine_preorder(option_product_object, count_in_stock, "In Stock", product)}</label>
      </li>
      {product.secondary_product_group && product.secondary_products && product.secondary_products.length > 0 && (
        <li>
          <div className={`ai-c h-25px mv-20px ${width < 1150 ? "jc-b" : ""}`}>
            <label className="mv-0px mr-10px title_font">
              {product.secondary_group_name ? product.secondary_group_name : "Design"}:{" "}
            </label>
            <div className="custom-select">
              <select
                className="qty_select_dropdown w-100per"
                onChange={e => {
                  const secondary = JSON.parse(e.target.value);
                  dispatch(update_secondary({ secondary, product, current_user }));
                  update_url({
                    color,
                    secondary_color,
                    option: option_product_name,
                    secondary_product: secondary.name,
                    navigate,
                    show_add_on,
                  });
                }}
                value={JSON.stringify(secondary_product_object)}
                defaultValue={JSON.stringify(secondary_product_object)}
              >
                <option key={1} defaultValue="">
                  Choose {product.secondary_group_name && product.secondary_group_name}
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
      {(names_hide_add_to_cart.includes(product.name) && !secondary_product) ||
      (categories_hide_add_to_cart.includes(product.category) && !secondary_product) ? (
        <div></div>
      ) : (
        <div>
          {" "}
          {size !== "1 Sled" && product.color_product_group && color_products && color_products.length > 0 && (
            <li>
              <div className={`ai-c h-25px mb-25px ${width < 1150 ? "jc-b" : ""}`}>
                <label className="mv-0px mr-10px title_font">
                  {product.color_group_name ? product.color_group_name : "Color"}:{" "}
                </label>
                <div className="ai-c">
                  {color_code && (
                    <canvas className=" mh-1rem w-60px h-20px br-7px" style={{ backgroundColor: color_code }} />
                  )}
                  <div className="custom-select">
                    <select
                      className="qty_select_dropdown w-100per"
                      onChange={e => {
                        const option = JSON.parse(e.target.value);
                        dispatch(update_color(option));
                        update_url({
                          color: option.color,
                          secondary_color: secondary_color,
                          option: option_product_name,
                          secondary_product: secondary_product_name,
                          navigate,
                          show_add_on,
                        });
                      }}
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
                    dispatch(
                      toggle_show_add_on({
                        show_add_on,
                        product,
                        secondary_color_product_object,
                      })
                    );
                  }}
                />
                <label htmlFor="show_add_on mb-20px">
                  + {product.category === "glowskinz" ? "Add Capes (For Centering)" : "Add Adapters"}
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
                <div className={`ai-c h-25px mb-25px ${width < 1150 ? "jc-b" : ""}`}>
                  <label className="mv-0px mr-10px title_font">
                    {product.secondary_color_group_name ? product.secondary_color_group_name : "Secondary Color"}:{" "}
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
                        onChange={e => {
                          const option = JSON.parse(e.target.value);
                          dispatch(update_secondary_color({ option, product, has_add_on, show_add_on }));
                          update_url({
                            color: color,
                            secondary_color: option.color,
                            option: option_product_name,
                            secondary_product: secondary_product_name,
                            navigate,
                            show_add_on,
                          });
                        }}
                        value={JSON.stringify(secondary_color_product_object)}
                        defaultValue={JSON.stringify(secondary_color_product_object)}
                      >
                        {secondary_color_products
                          .filter(item => item.filament && item.filament.active)
                          .map((secondary_color, index) => (
                            <option key={index} value={JSON.stringify(secondary_color)}>
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
          {product.option_product_group && option_products && option_products.length > 0 && (
            <li>
              <div className={`ai-c  mv-10px ${width < 1150 ? "jc-b" : ""}`}>
                <h3 aria-label="Sort" htmlFor="sort" className="select-label mr-1rem mt-1rem">
                  {product.option_group_name ? product.option_group_name : "Size"}:
                </h3>
                <div className="ai-c wrap">
                  {option_products
                    .filter(option => option.price !== 2.98)
                    .map((option, index) => (
                      <OptionButtons option={option} index={index} />
                    ))}
                </div>
              </div>
            </li>
          )}
          {(product.subcategory === "novaskinz" || product.subcategory === "alt_novaskinz") &&
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
                        <OptionButtons option={option} index={index} />
                      ))}
                  </div>
                </div>
              </li>
            )}
          {determine_sizing_quick_look(product?.name) && (
            <ul className="mb-10px">
              <hr />
              <h3 className="title_font jc-c fs-20px"> {size && sizes_conversion(size)}</h3>{" "}
              <li className="jc-c ta-c w-100oer lh-30px">
                {product?.name?.includes("V1")
                  ? 'We recommend getting a size up compared to other company"s gloves'
                  : "We recommend getting the same size you usually get from other companies"}
              </li>
              <li className="mb-10px jc-b w-100per">
                <div className="title_font"> Hand Length:</div>{" "}
                <div className="title_font">{size && sizes_short(width, product.name)[size]?.hand_length} inches</div>
              </li>
              <li className="jc-b w-100per mb-10px">
                <div className="title_font"> Hand Width:</div>{" "}
                <div className="title_font">{size && sizes_short(width, product.name)[size]?.hand_width} inches</div>
              </li>
              {determine_sampler(product?.name) && (
                <>
                  <li className="jc-c ta-c w-100oer mt-20px lh-30px">
                    Worried about the fit? We've got your back with our:
                  </li>
                  <li>
                    {product.category === "gloves" &&
                      !(
                        product.name.includes("Ultra Gloves Sizing Sampler Pack") ||
                        product.name.includes("Supreme Gloves V1 Sizing Sampler Pack") ||
                        product.name.includes("Supreme Gloves V2 Sizing Sampler Pack")
                      ) && (
                        <div className="w-100per jc-c">
                          <Link to={`/collections/all/products/${determine_sampler_pack_pathname(product.name)}`}>
                            <GLButton variant="primary">{determine_sampler_pack_name(product.name)}</GLButton>
                          </Link>
                        </div>
                      )}
                  </li>
                </>
              )}
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
                    dispatch(setQty(e.target.value));
                  }}
                >
                  {[...Array(current_user?.isWholesaler ? 500 : quantity).keys()].map((x, index) => (
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
      )}
      <li className="mb-0px">
        <div className="">
          <h4 className="mb-10px mt-10px">Shipping Calculated at Checkout</h4>
          {product.processing_time && (
            <h4 className="mb-0px mt-0px" style={{ webkitTextStroke: "0.5px white" }}>
              This item ships in {product.processing_time[0]} - {product.processing_time[1]} business days
            </h4>
          )}
        </div>
        {product.name !== "Glowstringz V2" && (
          <GLTooltip
            tooltip={
              (variant === "disabled" && (tooltip || "You must choose an option before adding to you cart")) || ""
            }
          >
            <GLButton
              variant={variant}
              data-testid="add_to_cart_button"
              className={`${variant !== "disabled" && "bob"} mt-10px w-100per`}
              tooltip={variant === "disabled" && "You must choose an option before adding to you cart"}
              onClick={handleAddToCart}
            >
              {text}
            </GLButton>
          </GLTooltip>
        )}
      </li>
    </ul>
  );
};

export default ProductOptions;
