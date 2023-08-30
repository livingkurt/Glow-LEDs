import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../shared/SharedComponents";
import useChangedEffect from "../../shared/Hooks/useChangedEffect";
import useWindowDimensions from "../../shared/Hooks/windowDimensions";
import { getUrlParameter } from "../../utils/helper_functions";
import { ProductDetails, ProductFacts, ProductImages, ProductOptions, ProductSelection } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import ProductSlideshow from "../../shared/GlowLEDsComponents/GLCarousel/ProductSlideshow copy";
import PictureChooser from "./components/PictureChooser";
import RelatedProductsSlideshow from "../../shared/GlowLEDsComponents/GLCarousel/RelatedProductsSlideshow";

import { open_edit_product_modal } from "../ProductsPage/productsPageSlice";
import * as API from "../../api";
import config from "../../config";
import {
  set_name,
  set_description,
  set_facts,
  set_included_items,
  setQty,
  set_images,
  set_price,
  set_wholesale_price,
  set_previous_price,
  set_sale_price,
  set_size,
  set_quantity,
  set_count_in_stock,
  set_image,
  set_secondary_image,
  set_secondary_images,
  set_dimensions,
  set_color,
  set_secondary_color,
  set_color_code,
  set_secondary_color_code,
  set_color_product,
  set_color_products,
  set_secondary_color_product,
  set_secondary_color_products,
  set_option_product,
  set_option_products,
  set_secondary_product,
  set_secondary_products,
  set_preorder,
  set_secondary_product_name,
  set_option_product_name,
  set_color_product_object,
  set_secondary_color_product_object,
  set_option_product_object,
  set_secondary_product_object,
  set_show_add_on,
  set_add_on_price,
  set_has_add_on,
} from "./productPageSlice";
import ProductPageHead from "./components/ProductPageHead";

const ProductPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const productPage = useSelector(state => state.products.productPage);
  const { name, images, image, secondary_image, secondary_images } = productPage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { success } = cartPage;

  const productsPage = useSelector(state => state.products.productsPage);
  const { product, loading, error } = productsPage;

  const { width } = useWindowDimensions();

  const open_cart = () => {
    const cart = document.querySelector(".cart_sidebar");

    if (cart.classList.value === "cart_sidebar open") {
      document.querySelector(".cart_sidebar").classList.remove("open");
    } else if (cart.classList.value === "cart_sidebar") {
      document.querySelector(".cart_sidebar").classList.add("open");
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsProduct(params.pathname));
      const video = document.getElementsByClassName("product_video");
      video.muted = true;
      video.autoplay = true;
      const query = getUrlParameter(location);
    }
    return () => (clean = false);
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsProduct(params.pathname));
    }
    return () => (clean = false);
  }, [params.pathname]);

  const update_universal_state = item => {
    dispatch(set_previous_price(0));
    if (item) {
      dispatch(set_image(item.images_object && item.images_object[0].link));
      dispatch(set_images(item.images_object));

      if (item.price > 0) {
        if (current_user?.isWholesaler) {
          dispatch(set_wholesale_price(item.wholesale_price));
        }
        dispatch(set_price(item.price));
      }
      if (item.hasOwnProperty("previous_price") && item.previous_price > 0) {
        dispatch(set_previous_price(item.previous_price));
      }
      if (item.sale_price > 0) {
        dispatch(set_sale_price(item.sale_price));
      }
      dispatch(set_quantity(item.quantity));
      dispatch(set_count_in_stock(item.count_in_stock));
      if (item.count_in_stock === 0) {
        dispatch(set_preorder(true));
      } else {
        dispatch(set_preorder(false));
      }
      dispatch(set_name(item.name));
      dispatch(set_description(item.description));
      dispatch(set_facts(item.facts));
      dispatch(set_color(item.color));
      dispatch(set_secondary_color(item.secondary_color));
      dispatch(set_color_products(item.color_products));
      dispatch(set_secondary_color_products(item.secondary_color_products));
      dispatch(set_option_products(item.option_products));

      dispatch(set_secondary_products(item.secondary_products));
      dispatch(set_included_items(item.included_items));
      dispatch(set_has_add_on(item.has_add_on));
      dispatch(
        set_dimensions({
          weight_pounds: item.weight_pounds,
          weight_ounces: item.weight_ounces,
          package_length: item.package_length,
          package_width: item.package_width,
          package_height: item.package_height,
          package_volume: item.package_volume,
        })
      );
      dispatch(set_size(item.size));
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (product) {
        determine_options(product);
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [product]);

  const determine_options = product => {
    update_universal_state(product);
    const query = getUrlParameter(location);
    if (location.search.length === 0) {
      if (product.color_products) {
        dispatch(set_color_products(product.color_products));

        const color = product.color_products.find(color => color.default_option === true);
        if (color) {
          update_color_product_state(color);
        }
      }
      if (product.secondary_color_products) {
        dispatch(set_secondary_color_products(product.secondary_color_products));

        const secondary_color = product.secondary_color_products.find(
          secondary_color => secondary_color.default_option === true
        );
        if (secondary_color) {
          update_secondary_color_product_state(secondary_color);
          if (product.has_add_on) {
            dispatch(set_show_add_on(false));
          }
          if (product.name !== "CLOZD Omniskinz Sleds") {
            dispatch(set_add_on_price(secondary_color.price));
            dispatch(set_price(secondary_color.price + product.price));
          }
        } else {
          dispatch(set_show_add_on(true));
        }
      }
      if (product.option_products) {
        dispatch(set_option_products(product.option_products));

        const option = product.option_products.find(option => option.default_option === true);
        if (option) {
          update_option_product_state(option);
        }
      }
      if (product.secondary_products && product.secondary_products.length > 0) {
        // update_secondary_product_state(product.secondary_products[0]);
      }
    } else if (location.search.length > 0) {
      //
      if (product.color_products) {
        const color = product.color_products.find(color => color.color === query.color);
        //
        if (color) {
          update_color_product_state(color);
        }
      }
      if (product.secondary_color_products) {
        dispatch(set_secondary_products(product.secondary_products));
        const secondary_color = product.secondary_color_products.find(
          secondary_color => secondary_color.color === query.secondary_color
        );
        if (secondary_color) {
          update_secondary_color_product_state(secondary_color);
        }
      }
      if (product.option_products) {
        let query_option = query.option;
        if (query.option && query.option.indexOf("%20") > -1) {
          query_option = query.option.split("%20").join(" ");
        }

        const option = product.option_products.find(option => option.size === query_option.split("%20").join(" "));
        if (option) {
          update_option_product_state(option);
        }
      }
      if (product.secondary_products && product.secondary_products.length > 0) {
        dispatch(set_secondary_products(product.secondary_products));
        let query_secondary = query.secondary;
        if (query.secondary && query.secondary.indexOf("%20") > -1) {
          query_secondary = query.secondary.split("%20").join(" ");
        }
        const secondary =
          query.secondary &&
          product.secondary_products.find(secondary => secondary.name === query_secondary.split("%20").join(" "));
        if (secondary) {
          update_secondary_product_state(secondary);
        }
      }
    }
  };

  const update_color_product_state = color => {
    //
    dispatch(set_color_product(color._id));
    dispatch(set_color(color.color));
    dispatch(set_color_code(color.color_code));
    dispatch(set_color_product_object(color));
    // if (color.quantity) {
    // 	dispatch(set_quantity(color.quantity));
    // }
    // if (color.count_in_stock) {
    // 	dispatch(set_count_in_stock(color.count_in_stock));
    // }
    // update_url(color.color);
  };

  const update_secondary_color_product_state = secondary_color => {
    // if (product.name === "CLOZD Omniskinz Sleds") {
    //   dispatch(set_color_product(secondary_color._id));
    //   dispatch(set_color(secondary_color.color));
    //   dispatch(set_color_code(secondary_color.color_code));
    //   dispatch(set_color_product_object(secondary_color));
    // } else {
    dispatch(set_secondary_color_product(secondary_color._id));
    dispatch(set_secondary_color(secondary_color.color));
    dispatch(set_secondary_color_code(secondary_color.color_code));
    dispatch(set_secondary_color_product_object(secondary_color));
    // }

    // if (secondary_color.quantity) {
    // 	dispatch(set_quantity(secondary_color.quantity));
    // }
    // if (secondary_color.count_in_stock) {
    // 	dispatch(set_count_in_stock(secondary_color.count_in_stock));
    // }
    // update_url(color, secondary_color.color);
  };

  const update_option_product_state = option => {
    if (option.size) {
      dispatch(set_size(option.size));
    }
    // else {
    // 	dispatch(set_size(option.name));
    // }

    if (option.secondary_color) {
      dispatch(set_secondary_color(option.secondary_color));
    }
    if (option.price > 0) {
      if (current_user?.isWholesaler) {
        dispatch(set_wholesale_price(option.wholesale_price));
      }
      dispatch(set_price(option.price));
    }
    if (option.sale_price > 0) {
      dispatch(set_sale_price(option.sale_price));
    }
    if (option.count_in_stock === 0) {
      dispatch(set_preorder(true));
    } else {
      dispatch(set_preorder(false));
    }
    if (option.quantity) {
      dispatch(set_quantity(option.quantity));
    }
    if (option.count_in_stock) {
      dispatch(set_count_in_stock(option.count_in_stock));
    }

    dispatch(
      set_dimensions({
        weight_pounds: option.weight_pounds,
        weight_ounces: option.weight_ounces,
        package_length: option.package_length,
        package_width: option.package_width,
        package_height: option.package_height,
        package_volume: option.package_volume,
      })
    );
    dispatch(set_option_product(option._id));
    dispatch(set_option_product_name(option.name));
    dispatch(set_option_product_object(option));
  };

  const update_secondary_product_state = secondary => {
    //
    dispatch(set_secondary_product(secondary._id));
    dispatch(set_secondary_product_name(secondary.name));
    dispatch(set_secondary_product_object(secondary));
    if (secondary.quantity) {
      dispatch(set_quantity(secondary.quantity));
    }
    if (secondary.count_in_stock) {
      dispatch(set_count_in_stock(secondary.count_in_stock));
    }
    if (secondary.subcategory !== "batteries") {
      if (secondary.images_object.length > 0) {
        dispatch(set_images(secondary.images_object));
        dispatch(set_image(secondary.images_object && secondary.images_object[0]?.link));
      }
    }
  };

  const unset_state = () => {
    dispatch(set_name(""));
    dispatch(set_description(""));
    dispatch(set_facts(""));
    dispatch(set_included_items(""));
    dispatch(setQty(1));
    dispatch(set_images([]));
    dispatch(set_price());
    dispatch(set_previous_price(0));
    dispatch(set_sale_price(0));
    dispatch(set_size());
    dispatch(set_quantity());
    dispatch(set_count_in_stock());
    dispatch(set_image(""));
    dispatch(set_secondary_image(""));
    dispatch(set_secondary_images([]));
    dispatch(set_dimensions({}));
    dispatch(set_color(""));
    dispatch(set_secondary_color(""));
    dispatch(set_color_code(""));
    dispatch(set_secondary_color_code(""));
    dispatch(set_color_product(null));
    dispatch(set_color_products([]));
    dispatch(set_secondary_color_product(null));
    dispatch(set_secondary_color_products([]));
    dispatch(set_option_product(null));
    dispatch(set_option_products([]));
    dispatch(set_secondary_product(null));
    dispatch(set_secondary_products([]));
    dispatch(set_preorder(false));
    dispatch(set_secondary_product_name(""));
    dispatch(set_option_product_name(""));
    dispatch(set_color_product_object({}));
    dispatch(set_secondary_color_product_object({}));
    dispatch(set_option_product_object({}));
    dispatch(set_secondary_product_object({}));
    dispatch(set_show_add_on(true));
    dispatch(set_add_on_price(0));
    dispatch(set_has_add_on(false));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (config.NODE_ENV === "production") {
        const recently_viewed = sessionStorage.getItem("recently_viewed");
        const products = JSON.parse(recently_viewed);
        if (recently_viewed) {
          if (product && product.hasOwnProperty("name")) {
            sessionStorage.setItem("recently_viewed", JSON.stringify([product, ...products]));
          }
        } else {
          if (product && product.hasOwnProperty("name")) {
            sessionStorage.setItem("recently_viewed", JSON.stringify([product]));
          }
        }
      }
    }
    return () => (clean = false);
  }, []);

  useChangedEffect(() => {
    if (success) {
      open_cart();
    }
  }, [success]);

  return (
    product?.hasOwnProperty("name") && (
      <div className="">
        <div className="p-1rem">
          <div className="jc-b">
            <div className="mb-10px">
              <Link to={location.state?.prevPath || "/collections/all/products"} className="m-auto">
                <GLButton variant="secondary">Back to Products</GLButton>
              </Link>
            </div>
            {current_user?.isAdmin && (
              <div className="br-10px">
                <GLButton
                  variant="secondary"
                  className=" w-300px"
                  onClick={e => dispatch(open_edit_product_modal(product))}
                >
                  Edit Product
                </GLButton>
              </div>
            )}
          </div>
        </div>

        <Loading loading={loading} error={error}>
          {product && (
            <div className="">
              <ProductPageHead />
              {!secondary_image && width <= 819 && (
                <div>
                  <h1 className="product_title_side ta-c lh-50px fs-25px mv-0px">{name}</h1>
                  <div className=" w-100per h-auto m-auto br-20px pos-rel" style={{ overflowX: "hidden" }}>
                    {images && (
                      <ProductSlideshow
                        product={product}
                        images={images}
                        secondary_images={secondary_images}
                        className=""
                        set_image={set_image}
                        interval={6000}
                        transitionTime={200}
                      />
                    )}
                  </div>
                </div>
              )}
              <div className="details">
                <div className="">
                  {(secondary_image || width > 819) && (
                    <div>
                      <label
                        className="product_title_top fs-25px title_font mb-2rem ta-c lh-50px"
                        style={{ display: width < 819 ? "block" : "none" }}
                      >
                        {name}
                      </label>
                      <div className="details-image">
                        <ProductImages secondary_image={secondary_image} name={name} image={image} />
                        {!secondary_image && width > 819 && (
                          <div>
                            <PictureChooser
                              product={product}
                              images={images}
                              secondary_images={secondary_images}
                              className="w-100per jc-c max-w-400px m-auto"
                              set_image={set_image}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {width < 500 &&
                  product &&
                  (product.category === "diffusers" ||
                    product.category === "diffuser_caps" ||
                    product.category === "exo_diffusers") && (
                    <div className=" w-100per m-auto">
                      <RelatedProductsSlideshow
                        product_category={"glowskinz"}
                        product_subcategory={"opyn"}
                        product={product}
                        random={false}
                        className=""
                        product_pathname={product.pathname}
                        title="Pairs great with OPYN Glowskinz"
                        category="opyn"
                      />
                    </div>
                  )}
                <div className="details-info desktop_product_view" style={{ display: width > 819 ? "block" : "none" }}>
                  <ProductSelection />
                </div>
                <div
                  className="details-action desktop_product_view"
                  style={{ display: width > 819 ? "block" : "none" }}
                >
                  <ProductOptions />
                </div>

                <div className="w-100per">
                  <div
                    className="details-action mobile_product_view"
                    style={{ display: width <= 819 ? "block" : "none" }}
                  >
                    <ProductOptions />
                  </div>
                  <div
                    className="details-info mobile_product_view"
                    style={{ display: width <= 819 ? "block" : "none" }}
                  >
                    <ProductFacts />
                  </div>
                </div>
              </div>

              <ProductDetails />
            </div>
          )}
        </Loading>
        {product && product.name !== "Glowstringz V2" && product.name !== "Nova Clip" && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              product={product}
              random={false}
              className=""
              product_pathname={params.pathname}
              title="Fits the Same Microlight"
              category="chips"
            />
          </div>
        )}
        {product && product.name !== "Glowstringz V2" && product.name !== "Nova Clip" && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              random={false}
              className=""
              product_pathname={params.pathname}
              title="Related Products"
              category="related"
            />
          </div>
        )}
        {product &&
          product.category !== "batteries" &&
          product.name !== "Glowstringz V2" &&
          product.name !== "Nova Clip" && (
            <div className=" w-100per m-auto">
              <RelatedProductsSlideshow
                product_category={product.category}
                random={false}
                className=""
                product_pathname={params.pathname}
                title="Accessories You May Need"
                category="batteries"
              />
            </div>
          )}

        {product && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              random={true}
              className=""
              product_pathname={params.pathname}
              title="Suggested Products"
              category="all"
            />
          </div>
        )}
      </div>
    )
  );
};
export default ProductPage;
