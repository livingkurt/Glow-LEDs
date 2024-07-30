import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LazyImage, Loading } from "../../shared/SharedComponents";
import {
  description_determination,
  getUrlParameter,
  humanize,
  shuffle,
  sort_options,
  update_products_url,
} from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { API_Chips, API_Products } from "../../utils";
import { userWindowDimensions } from "../../shared/Hooks";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import { Container, Grid, Skeleton } from "@mui/material";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import { productGridPageBreadCrumbs } from "./productGridPageHelpers";
import { determine_product_name_display, sale_price_switch } from "../../utils/react_helper_functions";
import Rating from "../../shared/GlowLEDsComponents/GLRating/Rating";

const AllProductsPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product_occurrences, set_product_occurrences] = useState([]);
  const [best_sellers, set_best_sellers] = useState([]);
  const [loading_products, set_loading_products] = useState(false);
  const [products, set_products] = useState([]);
  const [page_title, set_page_title] = useState();
  const [hidden, set_hidden] = useState(false);
  const [option, set_option] = useState(false);
  const [message, set_message] = useState("");

  const [category, set_category] = useState(params.category ? params.category : "");
  const [subcategory, set_subcategory] = useState(params.subcategory ? params.subcategory : "");
  const [collection, set_collection] = useState(params.collection ? params.collection : "");
  const [promo_code, set_promo_code] = useState(params.promo_code ? params.promo_code : "");
  const [search, set_search] = useState("");
  const [sort, set_sort] = useState("");
  const [filter, set_filter] = useState("");

  const productsGridPage = useSelector(state => state.products.productsGridPage);
  const { gridProducts, loading, error } = productsGridPage;

  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips: chips_list } = chipPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (promo_code) {
        sessionStorage.setItem("promo_code", promo_code);
        set_message(`${promo_code} Added to Checkout`);
      }
    }
    return () => (clean = false);
  }, [promo_code]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (gridProducts) {
        if (category !== "our_picks" || category !== "best_sellers") {
          set_products(gridProducts);
          set_loading_products(false);
        }
      }
    }
    return () => (clean = false);
  }, [gridProducts]);

  const { width, height } = userWindowDimensions();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({}));
      determine_products();
      get_occurrences(params.category);
    }
    return () => (clean = false);
  }, [params.category, params.subcategory, params.collection, getUrlParameter(location).search]);

  const determine_products = async () => {
    const query = getUrlParameter(location);
    let category = params.category ? params.category : "";
    let sale = "";
    let subcategory = params.subcategory ? params.subcategory : "";
    if (category === "discounted") {
      category = "";
      // subcategory = 'sale';
      sale = true;
    }
    let search = "";
    let sort = "";
    let filter = "";
    let hidden = false;
    let option = false;
    let collection = params.collection ? params.collection : "";

    if (category === "wholesale") {
      category = "";
      collection = "wholesale";
    }

    determine_page_name(category, subcategory, collection);
    // prnt({ query });
    if (category !== "our_picks" || category !== "best_sellers" || category !== "new_releases") {
      if (Object.keys(query).length > 0) {
        if (query.search) {
          set_search(query.search.split("%20").join(" "));
          search = query.search.split("%20").join(" ");
        }
        if (query.sort) {
          set_sort(query.sort);
          sort = query.sort;
        }
        if (query.filter) {
          //
          const { data } = await API_Chips.get_chip_by_name(query.filter);
          filter = data._id;

          set_chip_name(data);
          set_filter_on(true);
        }
      }

      dispatch(
        API.listGridProducts({
          category,
          subcategory,
          chip: filter,
          search,
          sort,
          product_collection: collection,
          hidden,
          option,
          sale,
        })
      );
    } else {
      if (category) {
        if (category === "our_picks" || category === "best_sellers" || category === "new_releases") {
          get_occurrences(category);
        }
      }
    }
  };

  const get_occurrences = async category => {
    set_loading_products(true);
    const { data: occurrences } = await API_Products.get_occurrences();
    //
    set_product_occurrences(occurrences);
    if (occurrences && category === "best_sellers") {
      const { data } = await API_Products.get_best_sellers(occurrences);
      set_products(data);
    } else if (occurrences && category === "our_picks") {
      const { data } = await API_Products.get_our_picks();
      //
      set_products(data);
    } else if (occurrences && category === "new_releases") {
      const { data } = await API_Products.get_new_releases();

      set_products(shuffle(data));
    } else {
      set_best_sellers(false);
    }
    set_loading_products(false);
  };

  const sortHandler = e => {
    set_sort(e.target.value);
    update_products_url(navigate, search, e.target.value, filter);
    dispatch(
      API.listGridProducts({
        category,
        subcategory,
        search,
        sort: e.target.value,
        product_collection: collection,
        hidden,
        option,
      })
    );
  };

  const [filter_on, set_filter_on] = useState(false);
  const filterHandler = e => {
    set_chip_name(JSON.parse(e.target.value));
    const chip_selected = JSON.parse(e.target.value);

    set_search("");
    set_filter(chip_selected._id);
    //
    update_products_url(navigate, "", sort, chip_selected.name);
    dispatch(
      API.listGridProducts({
        category,
        subcategory,
        chip: chip_selected._id,
        sort,
        product_collection: collection,
        hidden,
        option,
      })
    );
    set_filter_on(true);
  };

  const [chip_name, set_chip_name] = useState();

  const reset_filter = () => {
    set_filter_on(false);
    set_chip_name({});
    dispatch(
      API.listGridProducts({
        category,
        subcategory,
        hidden,
        option,
      })
    );
    navigate("/collections/all/products");
  };

  const determine_page_name = (category, subcategory, collection) => {
    set_page_title(
      <div className="jc-c">
        <div className="row">
          <h1 className="fs-25px mb-5px ta-c">
            {` ${(collection && humanize(collection)) || (subcategory && humanize(subcategory))} ${
              humanize(category) === "Exo Diffusers" ? "EXO Diffusers" : humanize(category)
            }` || "Products"}
          </h1>
          <label style={{ color: "#d2cfcf", marginTop: "10px" }}>
            {category === "diffuser_caps" ||
            category === "diffuser_adapters" ||
            category === "exo_diffusers" ||
            category === "glowskinz" ||
            category === "glowstringz"
              ? "™"
              : ""}{" "}
          </label>
        </div>
      </div>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Helmet>
        <title>
          {" "}
          {` ${(collection && humanize(collection)) || (subcategory && humanize(subcategory))} ${
            category ? (humanize(category) === "Exo Diffusers" ? "EXO Diffusers" : humanize(category)) : "Products"
          }`}{" "}
          | Glow LEDs
        </title>
        <meta property="og:title" content={category ? humanize(category) : "Products"} />
        <meta name="twitter:title" content={category ? humanize(category) : "Products"} />
        <link rel="canonical" href="https://www.glow-leds.com/collections/all/products" />
        <meta property="og:url" content="https://www.glow-leds.com/collections/all/products" />
        <meta name="description" content={description_determination(category)} />
        <meta property="og:description" content={description_determination(category)} />
        <meta name="twitter:description" content={description_determination(category)} />
      </Helmet>
      <GLBreadcrumbs
        items={productGridPageBreadCrumbs({
          category: params.category,
          subcategory: params.subcategory,
          collection: params.collection,
        })}
      />

      {page_title}

      <div className="jc-c ai-c wrap m-auto pb-1rem">
        <div className="ai-c mv-1rem ">
          <div className="custom-select">
            <select name="sort" className="sort_select w-221px" onChange={sortHandler}>
              <option className="grey_option" disabled="disabled" selected="selected" defaultValue="">
                Sort By
              </option>
              {sort_options.map((option, index) => {
                return (
                  <option key={index} defaultValue={option.toLowerCase()}>
                    {option}
                  </option>
                );
              })}
            </select>
            <span className="custom-arrow" />
          </div>
        </div>
        <div className="ai-c ml-1rem mh-1rem">
          <div className={`custom-select w-100per`}>
            <select
              name="filterOrder"
              className={`filter_select w-221px`}
              onChange={filterHandler}
              value={JSON.stringify(chip_name)} // use this instead of 'selected' on option
            >
              <option className="grey_option" value={""}>
                {"Filter By Chip"}
              </option>
              {chips_list?.map((option, index) => (
                <option key={index} value={JSON.stringify(option)}>
                  {option.name}
                </option>
              ))}
            </select>
            <span className="custom-arrow" />
          </div>
        </div>
        {filter_on && (
          <GLButton
            type="submit"
            variant="primary"
            className="w-50px h-40px fs-20px mb-0px "
            onClick={() => reset_filter()}
          >
            &#10008;
          </GLButton>
        )}
      </div>
      <Loading loading={loading_products} />
      <Loading loading={loading} error={error} />
      {loading && (
        <Grid container spacing={5}>
          {[...Array(30).keys()].map(item => (
            <>
              {width >= 704 ? (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={item}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  {/* Square Skeleton for Picture */}
                  <Skeleton
                    className="br-20px"
                    variant="rectangular"
                    sx={{ bgcolor: "#4e5061" }}
                    animation="wave"
                    height={300}
                    width={300}
                  />
                  {/* Rectangle Skeleton for Name */}
                  <Skeleton
                    className="br-20px"
                    variant="text"
                    width={300}
                    sx={{ width: "100%", maxWidth: "400px", height: "30px", bgcolor: "#4e5061" }}
                    animation="wave"
                  />
                  {/* Rectangle Skeleton for Price */}
                  <Skeleton
                    className="br-20px"
                    variant="text"
                    sx={{ width: "50px", height: "30px", bgcolor: "#4e5061" }}
                    animation="wave"
                  />
                </Grid>
              ) : (
                <Grid item xs={12} key={item} style={{ display: "flex" }}>
                  {/* Square Skeleton for Picture */}
                  <Skeleton
                    className="br-20px"
                    variant="rectangular"
                    sx={{ bgcolor: "#4e5061" }}
                    animation="wave"
                    height={200}
                    width={200}
                  />
                  <div style={{ marginLeft: "16px" }}>
                    {/* Rectangle Skeleton for Name */}
                    <Skeleton
                      className="br-20px"
                      variant="text"
                      width={200}
                      sx={{ width: "100%", maxWidth: "400px", height: "30px", bgcolor: "#4e5061" }}
                      animation="wave"
                    />
                    {/* Rectangle Skeleton for Price */}
                    <Skeleton
                      className="br-20px"
                      variant="text"
                      sx={{ width: "50px", height: "30px", bgcolor: "#4e5061" }}
                      animation="wave"
                    />
                  </div>
                </Grid>
              )}
            </>
          ))}
        </Grid>
      )}
      <Grid container spacing={5}>
        {!loading &&
          products &&
          products
            .filter(product => !product.option)
            .map(product => (
              <>
                {width >= 704 ? (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={product}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <div key={product?.pathname} className="product-thumb">
                      <div className="tooltip">
                        <div className="tooltipoverlay">
                          <div className="product">
                            <div
                              onClick={() =>
                                navigate("/collections/all/products/" + product?.pathname, {
                                  state: { prevPath: location.pathname },
                                })
                              }
                              className="mt-13px"
                            >
                              <div className="row mt-15px" data-testid={product?.pathname}>
                                <div className="column ai-c pos-rel">
                                  <LazyImage
                                    className="product-image"
                                    alt={product?.name}
                                    title="Product Image"
                                    size={{ height: "300px", width: "300px" }}
                                    effect="blur"
                                    src={product?.images && product?.images[0].link}
                                  />
                                  {Array.from({ length: 60 }).map((_, index) => {
                                    const productOccurrence = product_occurrences[index];

                                    if (productOccurrence?.name === product?.name) {
                                      return (
                                        <div
                                          className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px"
                                          key={product?._id}
                                        >
                                          <img
                                            className=" mt-3px ml-2px h-100px w-100px"
                                            alt={product?.name}
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
                            </div>

                            <div
                              onClick={() =>
                                navigate("/collections/all/products/" + product?.pathname, {
                                  state: { prevPath: location.pathname },
                                })
                              }
                              className="mt-13px"
                            >
                              <label style={{ fontSize: "1.6rem" }}>
                                {determine_product_name_display(product, false)}
                              </label>
                            </div>

                            <label className="product-price mv-3px">
                              {sale_price_switch({
                                product: product,
                                cartItem: false,
                                isWholesaler: current_user?.isWholesaler,
                              })}
                            </label>

                            {product?.rating ? (
                              <div className="rating">
                                <span>
                                  <i
                                    className={
                                      product?.rating >= 1
                                        ? "fa fa-star"
                                        : product?.rating >= 0.5
                                          ? "fa fa-star-half"
                                          : "fa fa-star-o"
                                    }
                                  />
                                  <i className="fa fa-star-o pos-rel left-n20px" />
                                </span>
                                <span className="ml-n23px">
                                  <i
                                    className={
                                      product?.rating >= 2
                                        ? "fa fa-star"
                                        : product?.rating >= 1.5
                                          ? "fa fa-star-half"
                                          : "fa fa-star-o"
                                    }
                                  />
                                  <i className="fa fa-star-o pos-rel left-n20px" />
                                </span>
                                <span className="ml-n23px">
                                  <i
                                    className={
                                      product?.rating >= 3
                                        ? "fa fa-star"
                                        : product?.rating >= 2.5
                                          ? "fa fa-star-half"
                                          : "fa fa-star-o"
                                    }
                                  />
                                  <i className="fa fa-star-o pos-rel left-n20px" />
                                </span>
                                <span className="ml-n23px">
                                  <i
                                    className={
                                      product?.rating >= 4
                                        ? "fa fa-star"
                                        : product?.rating >= 3.5
                                          ? "fa fa-star-half"
                                          : "fa fa-star-o"
                                    }
                                  />
                                  <i className="fa fa-star-o pos-rel left-n20px" />
                                </span>
                                <span className="ml-n23px">
                                  <i
                                    className={
                                      product?.rating >= 5
                                        ? "fa fa-star"
                                        : product?.rating >= 4.5
                                          ? "fa fa-star-half"
                                          : "fa fa-star-o"
                                    }
                                  />
                                  <i className="fa fa-star-o pos-rel left-n20px" />
                                </span>
                                <span className="rating ml-n17px">
                                  {product?.numReviews && product?.numReviews === 1
                                    ? product?.numReviews + " review"
                                    : product?.numReviews}
                                </span>
                              </div>
                            ) : (
                              <span className="rating vis-hid ta-c">No Reviews</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={12}
                    key={product}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                  >
                    <div key={product.pathname} className=" w-100per">
                      {product_occurrences && (
                        <div
                          onClick={() =>
                            navigate("/collections/all/products/" + product?.pathname, {
                              state: { prevPath: location.pathname },
                            })
                          }
                        >
                          <div className="small_screen_product row">
                            <div className="row">
                              <div className="column ai-c pos-rel">
                                <LazyImage
                                  className="product-image w-200px h-200px "
                                  alt={product.name}
                                  title="Product Image"
                                  size={{ height: "300px", width: "300px" }}
                                  effect="blur"
                                  src={product?.images && product?.images[0].link}
                                />

                                {Array.from({ length: 60 }).map((_, index) => {
                                  const productOccurrence = product_occurrences[index];

                                  if (productOccurrence?.name === product.name) {
                                    return (
                                      <div
                                        className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px"
                                        key={product._id}
                                      >
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
                  </Grid>
                )}
              </>
            ))}
      </Grid>

      {products.length === 0 && !best_sellers && (
        <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>
      )}
    </Container>
  );
};
export default AllProductsPage;
