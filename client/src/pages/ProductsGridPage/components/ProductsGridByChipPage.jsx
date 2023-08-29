import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading, Notification } from "../../../shared/SharedComponents";
import {
  description_determination,
  getUrlParameter,
  humanize,
  prnt,
  shuffle,
  sort_options,
  update_products_url,
} from "../../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { API_Chips, API_Products } from "../../../utils";
import { userWindowDimensions } from "../../../shared/Hooks";
import ProductItemD from "./ProductItemD";
import ProductItemM from "./ProductItemM";
import Pagination from "../../../shared/GlowLEDsComponents/GLTable/Pagination";
import Sort from "../../../shared/GlowLEDsComponents/GLTable/Sort";
import Filter from "../../../shared/GlowLEDsComponents/GLTable/Filter";
import * as API from "../../../api";

const AllProductsByChipPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product_occurrences, set_product_occurrences] = useState([]);
  const [query, set_query] = useState({});
  const [best_sellers, set_best_sellers] = useState([]);
  const [our_picks, set_our_picks] = useState([]);
  const [imperfect, set_imperfect] = useState([]);
  const [loading_products, set_loading_products] = useState(false);
  const [alternative_products, set_alternative_products] = useState([]);
  const [products, set_products] = useState([]);
  const [chip, set_chip] = useState("");
  const [page, set_page] = useState(1);
  const [page_title, set_page_title] = useState();
  const [hidden, set_hidden] = useState(false);
  const [option, set_option] = useState(false);
  const [limit, set_limit] = useState(21);
  const [message, set_message] = useState("");
  // const [ currentPage, setCurrentPage ] = useState(1);

  // const category = params.category ? params.category : '';
  // const subcategory = params.subcategory ? params.subcategory : '';
  // const collection = params.collection ? params.collection : '';
  // const promo_code = params.promo_code ? params.promo_code : '';

  const [category, set_category] = useState(params.category ? params.category : "");
  const [subcategory, set_subcategory] = useState(params.subcategory ? params.subcategory : "");
  const [collection, set_collection] = useState(params.collection ? params.collection : "");
  const [promo_code, set_promo_code] = useState(params.promo_code ? params.promo_code : "");
  const [search, set_search] = useState("");
  const [sort, set_sort] = useState("");
  const [filter, set_filter] = useState("");

  const productPage = useSelector(state => state.products.productPage);
  const { products: main_products, totalPages, currentPage, loading, error } = productPage;

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
        if (category !== "our_picks" || category !== "best_sellers") {
          set_products(main_products);
          if (currentPage) {
            set_page(currentPage);
          }
          set_loading_products(false);
        }
      }
    }
    return () => (clean = false);
  }, [main_products]);

  const { width, height } = userWindowDimensions();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({}));
      determine_products();
      get_occurrences(params.category);
    }
    return () => (clean = false);
  }, [params.category, params.subcategory, getUrlParameter(location).search]);

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
    let limit = "";
    let page = "";
    let option = false;
    let collection = params.collection ? params.collection : "";
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
          // filter = waitForElement(query.filter, chips_list);
        }
        if (query.page) {
          set_page(query.page);
          page = query.page;
        }
        if (query.limit) {
          set_limit(query.limit);
          limit = query.limit;
        }
      }

      dispatch(
        API.listProducts({
          category,
          subcategory,
          chip: filter,
          search,
          sort,
          collection,
          page,
          limit,
          hidden,
          option,
          sale,
        })
      );
    } else {
      if (category) {
        if (category === "best_sellers") {
          get_occurrences(category);
        } else if (category === "our_picks") {
          get_occurrences(category);
        } else if (category === "new_releases") {
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
      //
      set_products(data);
    } else if (occurrences && category === "our_picks") {
      const { data } = await API_Products.get_our_picks();
      //
      set_products(data);
    } else if (occurrences && category === "new_releases") {
      const { data } = await API_Products.get_new_releases();

      set_products(shuffle(data));
    } else {
      // else if (category === 'discounted') {
      // 	const { data } = await API_Products.findAllGrid_products_a({ subcategory: 'imperfect' });
      // 	//
      // 	set_products(data);
      // }
      set_best_sellers(false);
    }
    set_loading_products(false);
  };

  const sortHandler = e => {
    set_sort(e.target.value);
    update_products_url(navigate, search, e.target.value, filter, limit);
    dispatch(
      API.listProducts({
        category,
        subcategory,
        search,
        sort: e.target.value,
        collection,
        page,
        limit,
        hidden,
        option,
      })
    );
  };

  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    set_chip(chip_selected._id);
    set_search("");
    set_filter(chip_selected._id);
    //
    update_products_url(navigate, "", sort, chip_selected.name, limit);
    dispatch(
      API.listProducts({
        category,
        subcategory,
        chip: chip_selected._id,
        sort,
        collection,
        page,
        limit,
        hidden,
        option,
      })
    );
  };

  const update_page = (e, new_page) => {
    //
    e.preventDefault();
    const page = parseInt(new_page);
    update_products_url(navigate, search, sort, filter, page, limit);

    //
    dispatch(
      API.listProducts({
        category,
        subcategory,
        chip: filter,
        search,
        sort,
        page: new_page,
        limit,
        hidden,
        option,
      })
    );
  };

  const determine_page_name = (category, subcategory, collection) => {
    set_page_title(
      <div className="jc-c">
        <div className="row">
          <h1 className="fs-25px mb-5px ta-c">
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
    );
  };

  return (
    <div>
      <Helmet>
        <title>{category ? humanize(category) : "Products"} | Glow LEDs</title>
        <meta property="og:title" content={category ? humanize(category) : "Products"} />
        <meta name="twitter:title" content={category ? humanize(category) : "Products"} />
        <link rel="canonical" href="https://www.glow-leds.com/collections/all/products" />
        <meta property="og:url" content="https://www.glow-leds.com/collections/all/products" />
        <meta name="description" content={description_determination(category)} />
        <meta property="og:description" content={description_determination(category)} />
        <meta name="twitter:description" content={description_determination(category)} />
      </Helmet>

      {page_title}

      <div className="jc-c ai-c wrap m-auto pb-1rem">
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
        <Filter filterHandler={filterHandler} filter_options={chips_list} />
      </div>
      <Loading loading={loading_products} />
      <div className="jc-c">
        {totalPages && (
          <Pagination
            className="pagination-bar"
            currentPage={page}
            totalCount={totalPages}
            pageSize={limit}
            onPageChange={(e, page) => update_page(e, page)}
          />
        )}
      </div>
      <Loading loading={loading} error={error}>
        <div>
          <ul className="products" style={{ marginTop: 0 }}>
            {products &&
              products
                .filter(product => !product.option)
                .map((product, index) =>
                  width >= 704 ? (
                    <ProductItemD
                      size="300px"
                      key={index}
                      product={product}
                      product_occurrences={product_occurrences}
                    />
                  ) : (
                    <ProductItemM
                      size="300px"
                      key={index}
                      product={product}
                      product_occurrences={product_occurrences}
                    />
                  )
                )}
          </ul>
        </div>
        <div className="jc-c">
          {totalPages && (
            <Pagination
              className="pagination-bar"
              currentPage={page}
              totalCount={totalPages}
              pageSize={limit}
              onPageChange={(e, page) => update_page(e, page)}
            />
          )}
        </div>
        {products.length === 0 && !best_sellers && (
          <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>
        )}
      </Loading>
    </div>
  );
};
export default AllProductsByChipPage;
