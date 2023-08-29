import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Loading, Notification } from "../../../shared/SharedComponents";
import { humanize } from "../../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { API_Products } from "../../../utils";
import ProductItemD from "./ProductItemD";
import ProductItemM from "./ProductItemM";
import Search from "../../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../../shared/GlowLEDsComponents/GLTable/Sort";
import Filter from "../../../shared/GlowLEDsComponents/GLTable/Filter";
import * as API from "../../../api";

const AllProductsPage = ({ set_message }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product_occurrences, set_product_occurrences] = useState([]);
  const [best_sellers, set_best_sellers] = useState([]);
  const [loading_products, set_loading_products] = useState(false);
  const [products, set_products] = useState([]);
  const [chip, set_chip] = useState("");
  const [search, set_search] = useState(location.search.substring(8) ? location.search.substring(8) : "");
  const [sort, setSortOrder] = useState("");
  const [filter, set_filter] = useState(location.hasOwnProperty("filter") ? location.filter.substring(8) : "");

  const category = params.category ? params.category : "";
  const subcategory = params.subcategory ? params.subcategory : "";
  const collection = params.collection ? params.collection : "";
  const promo_code = params.promo_code ? params.promo_code : "";

  const productPage = useSelector(state => state.products.productPage);
  const { products: main_products, loading, error } = productPage;

  const chipPage = useSelector(state => state.chips);
  const { chips: chips_list } = chipPage;

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
      if (main_products) {
        if (category === "discounted") {
          // get_occurrences();
        } else if (category === "best_sellers") {
          // get_occurrences();
        } else if (category === "our_picks") {
          // get_occurrences();
        } else {
          set_products(main_products);
          set_loading_products(false);
        }
      }
    }
    return () => (clean = false);
  }, [main_products]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      get_occurrences();
      if (search) {
        navigate({
          search: "?search=" + search,
        });
        dispatch(API.listProducts({ search, collection, option: false }));
        dispatch(API.listChips({}));
      }
    }
    return () => (clean = false);
  }, [search]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (category) {
        if (category === "discounted") {
          get_occurrences();
        } else if (category === "best_sellers") {
          get_occurrences();
        } else if (category === "our_picks") {
          get_occurrences();
        }
        if (category !== "our_picks" || category === "discounted" || category === "best_sellers") {
          dispatch(API.listProducts({ category, subcategory, search, collection, option: false }));
        }
      }
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, [category]);

  const get_occurrences = async () => {
    set_loading_products(true);
    const { data: occurrences } = await API_Products.get_occurrences();
    set_product_occurrences(occurrences);

    if (occurrences && category === "best_sellers") {
      const { data } = await API_Products.get_best_sellers(occurrences);
      //
      // set_best_sellers(data);
      // set_alternative_products(data);
      set_products(data);
    } else if (occurrences && category === "our_picks") {
      const { data } = await API_Products.get_our_picks();
      //
      // set_our_picks(data);
      // set_alternative_products(data);
      set_products(data);
    } else if (category === "discounted") {
      const { data } = await API_Products.findAllGrid_products_a({ subcategory: "imperfect" });
      //
      // set_imperfect(data);
      // set_alternative_products(data);
      set_products(data);
    } else {
      set_best_sellers(false);
    }
    set_loading_products(false);
  };

  const handleListItems = e => {
    e.preventDefault();
    navigate({
      search: "?search=" + search,
    });
    // navigate({
    // 	search: '?search=' + search + chip && '?filter=' + chip
    // });
    dispatch(API.listProducts({ search, sort, collection, option: false }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listProducts({ category, subcategory, search, sort: e.target.value, collection, option: false }));
  };
  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    set_chip(chip_selected._id);
    set_filter(chip_selected._id);
    //
    navigate({
      search: "?search=" + search + "?filter=" + chip_selected.name,
    });
    dispatch(
      API.listProducts({ category, subcategory, search, sort, chip: chip_selected._id, collection, option: false })
    );
  };

  const descriptions = {
    all_products:
      "Take your rave and festival experience to the next level with our LED Accessories at Glow LEDs. Shop Diffuser Caps, Glowskinz, and Glowstringz. Click to Shop.",
    diffusers:
      "Take your gloving light shows to the next level with our Frosted Dome Diffusers at Glow LEDs. Shop Dome Diffusers, Large Dome Diffusers, and Frosted Diffusers. Click to Shop.",
    diffuser_caps:
      "Take your gloving light shows to the next level with our Diffuser Caps at Glow LEDs. Shop Screw on LED Caps, Cap over Diffusers, and Diffuser filters. Click to Shop.",
    diffuser_adapters:
      "Take your gloving light shows to the next level with our Diffuser Adapters at Glow LEDs. Shop Screw On Diffusers, LED Adapters, and Diffuser Cap Adapters. Click to Shop.",
    glowstringz:
      "Decorate your home and festival with these stunning Glowstringz at Glow LEDs. Shop String Lights, LED Strips, and Addressable LEDs. Click to Shop.",
    glowskinz:
      "Take your gloving light shows to the next level with our Glowskinz at Glow LEDs. Shop Diffuser Skins, LED Skins, and Diffuser Casing Combo. Click to Shop.",
  };

  const description_determination = () => {
    if (category === "diffusers") {
      return descriptions.diffusers;
    }
    if (category === "diffuser_adapters") {
      return descriptions.diffuser_adapters;
    }
    if (category.toLowerCase() === "diffuser_caps") {
      return descriptions.diffuser_caps;
    }
    if (category === "glowskinz") {
      return descriptions.glowskinz;
    }
    if (category === "glowstringz") {
      return descriptions.glowstringz;
    } else {
      return descriptions.all_products;
    }
  };

  const sort_options = ["Category", "Newest", "Lowest", "Highest"];

  return (
    <div>
      <Helmet>
        <title>{category ? humanize(category) : "Products"} | Glow LEDs</title>
        <meta property="og:title" content={category ? humanize(category) : "Products"} />
        <meta name="twitter:title" content={category ? humanize(category) : "Products"} />
        <link rel="canonical" href="https://www.glow-leds.com/collections/all/products" />
        <meta property="og:url" content="https://www.glow-leds.com/collections/all/products" />
        <meta name="description" content={description_determination()} />
        <meta property="og:description" content={description_determination()} />
        <meta name="twitter:description" content={description_determination()} />
      </Helmet>

      <div className="jc-c">
        <div className="row">
          <h1>
            {`${humanize(category) === "Exo Diffusers" ? "EXO Diffusers" : humanize(category)} ${
              subcategory && humanize(subcategory)
            } ${collection && humanize(collection)}` || "Products"}
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

      <div className="jc-c ai-c wrap m-auto pb-1rem" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
        {/* {category === 'glowskinz' && <Filter filterHandler={filterHandler} filter_options={chips_list} />} */}
        <Filter filterHandler={filterHandler} filter_options={chips_list} />
      </div>
      <Loading loading={loading_products} />
      <Loading loading={loading} error={error}>
        {products && (
          <div>
            <div className="product_big_screen">
              {products && (
                <ul className="products" style={{ marginTop: 0 }}>
                  {products
                    .filter(product => !product.option)
                    .map((product, index) => (
                      <ProductItemD
                        size="300px"
                        key={index}
                        product={product}
                        product_occurrences={product_occurrences}
                      />
                    ))}
                </ul>
              )}
            </div>

            <div className="product_small_screen none">
              {products && (
                <ul className="products" style={{ marginTop: 0 }}>
                  {products
                    .filter(product => !product.option)
                    .map((product, index) => (
                      <ProductItemM
                        size="300px"
                        key={index}
                        product={product}
                        product_occurrences={product_occurrences}
                      />
                    ))}
                </ul>
              )}
            </div>
          </div>
        )}
        {products.length === 0 && !best_sellers && (
          <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>
        )}
      </Loading>
    </div>
  );
};
export default AllProductsPage;
