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
  set_price,
  set_image,
  set_color_products,
  set_secondary_color_products,
  set_option_products,
  set_secondary_products,
  set_show_add_on,
  set_add_on_price,
  update_color_product_state,
  update_secondary_color_product_state,
  update_option_product_state,
  update_secondary_product_state,
  unset_state,
  update_universal_state,
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
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (product) {
        determine_options(product);
      } else {
        dispatch(unset_state());
      }
    }
    return () => (clean = false);
  }, [product]);

  const handleDefaultOptions = product => {
    if (product.color_products) {
      dispatch(set_color_products(product.color_products));
      const color = product.color_products.find(color => color.default_option === true);
      if (color) {
        dispatch(update_color_product_state({ color }));
      }
    }
  };

  const handleColorProducts = (product, query) => {
    if (product.color_products) {
      const color = product.color_products.find(color => color.color === query.color);
      if (color) {
        dispatch(update_color_product_state({ color }));
      }
    }
  };

  const handleSecondaryColorProducts = (product, query) => {
    if (product.secondary_color_products) {
      dispatch(set_secondary_color_products(product.secondary_color_products));
      const secondary_color = product.secondary_color_products.find(
        secondary_color => secondary_color.color === query.secondary_color
      );
      if (secondary_color) {
        dispatch(update_secondary_color_product_state({ secondary_color }));
      }
    }
  };

  const handleOptionProducts = (product, query, current_user) => {
    if (product.option_products) {
      dispatch(set_option_products(product.option_products));
      let query_option = query.option;
      if (query.option && query.option.indexOf("%20") > -1) {
        query_option = query.option.split("%20").join(" ");
      }
      const option = product.option_products.find(option => option.size === query_option?.split("%20").join(" "));
      if (option) {
        dispatch(update_option_product_state({ option, current_user }));
      }
    }
  };

  const handleSecondaryProducts = (product, query) => {
    if (product.secondary_products && product.secondary_products.length > 0) {
      dispatch(set_secondary_products(product.secondary_products));
      let query_secondary = query.secondary;
      if (query.secondary && query.secondary.indexOf("%20") > -1) {
        query_secondary = query.secondary.split("%20").join(" ");
      }
      const secondary =
        query.secondary &&
        product.secondary_products.find(secondary => secondary.name === query_secondary?.split("%20").join(" "));
      if (secondary) {
        dispatch(update_secondary_product_state({ secondary }));
      }
    }
  };

  const determine_options = product => {
    dispatch(update_universal_state({ item: product, current_user }));
    const query = getUrlParameter(location);

    if (location.search.length === 0) {
      handleDefaultOptions(product);
      handleColorProducts(product);
      handleSecondaryColorProducts(product);
      handleOptionProducts(product, current_user);
    } else if (location.search.length > 0) {
      handleColorProducts(product);
      handleSecondaryColorProducts(product);
      handleOptionProducts(product, current_user);
      handleSecondaryProducts(product, query);
    }
  };

  // const determine_options = product => {
  //   dispatch(update_universal_state({ item: product, current_user }));
  //   const query = getUrlParameter(location);
  //   if (location.search.length === 0) {
  //     if (product.color_products) {
  //       dispatch(set_color_products(product.color_products));

  //       const color = product.color_products.find(color => color.default_option === true);
  //       if (color) {
  //         dispatch(update_color_product_state({ color }));
  //       }
  //     }
  //     if (product.secondary_color_products) {
  //       dispatch(set_secondary_color_products(product.secondary_color_products));

  //       const secondary_color = product.secondary_color_products.find(
  //         secondary_color => secondary_color.default_option === true
  //       );
  //       if (secondary_color) {
  //         dispatch(update_secondary_color_product_state({ secondary_color }));
  //         if (product.has_add_on) {
  //           dispatch(set_show_add_on(false));
  //         }
  //         if (product.name !== "CLOZD Omniskinz Sleds") {
  //           dispatch(set_add_on_price(secondary_color.price));
  //           dispatch(set_price(secondary_color.price + product.price));
  //         }
  //       } else {
  //         dispatch(set_show_add_on(true));
  //       }
  //     }
  //     if (product.option_products) {
  //       dispatch(set_option_products(product.option_products));

  //       const option = product.option_products.find(option => option.default_option === true);
  //       if (option) {
  //         dispatch(update_option_product_state({ option, current_user }));
  //       }
  //     }
  //     if (product.secondary_products && product.secondary_products.length > 0) {
  //       // update_secondary_product_state(product.secondary_products[0]);
  //     }
  //   } else if (location.search.length > 0) {
  //     //
  //     if (product.color_products) {
  //       const color = product.color_products.find(color => color.color === query.color);
  //       //
  //       if (color) {
  //         dispatch(update_color_product_state({ color }));
  //       }
  //     }
  //     if (product.secondary_color_products) {
  //       dispatch(set_secondary_products(product.secondary_products));
  //       const secondary_color = product.secondary_color_products.find(
  //         secondary_color => secondary_color.color === query.secondary_color
  //       );
  //       if (secondary_color) {
  //         dispatch(update_secondary_color_product_state({ secondary_color }));
  //       }
  //     }
  //     if (product.option_products) {
  //       let query_option = query.option;
  //       if (query.option && query.option.indexOf("%20") > -1) {
  //         query_option = query.option.split("%20").join(" ");
  //       }

  //       const option = product.option_products.find(option => option.size === query_option.split("%20").join(" "));
  //       if (option) {
  //         dispatch(update_option_product_state({ option, current_user }));
  //       }
  //     }
  //     if (product.secondary_products && product.secondary_products.length > 0) {
  //       dispatch(set_secondary_products(product.secondary_products));
  //       let query_secondary = query.secondary;
  //       if (query.secondary && query.secondary.indexOf("%20") > -1) {
  //         query_secondary = query.secondary.split("%20").join(" ");
  //       }
  //       const secondary =
  //         query.secondary &&
  //         product.secondary_products.find(secondary => secondary.name === query_secondary.split("%20").join(" "));
  //       if (secondary) {
  //         dispatch(update_secondary_product_state({ secondary }));
  //       }
  //     }
  //   }
  // };

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
  }, [product]);

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
