import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Headroom from "react-headroom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { listProducts } from "../../actions/productActions";
import Banner from "./Banner";
import { HashLink } from "react-router-hash-link";
import { browser_check } from "../../utils/react_helper_functions";
import useWindowDimensions from "../Hooks/windowDimensions";
import { API_Products } from "../../utils";
import {
  categories,
  humanize,
  subcategories,
  update_products_url,
} from "../../utils/helper_functions";
import {
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { hide_search_bar, show_search_bar } from "../../actions/settingActions";
import { Filter } from "../SpecialtyComponents";
import { listChips } from "../../actions/chipActions";

const Header = props => {
  const history = useHistory();
  const [ first_name, set_first_name ] = useState("");
  const [ loading, set_loading ] = useState("");
  const [ display, setDisplay ] = useState(false);
  const [ options, set_options ] = useState([]);
  const [ products, set_products ] = useState([]);
  const [ slideshow, set_slideshow ] = useState([]);
  const [ pathname, set_pathname ] = useState("");
  const [ search, set_search ] = useState("");
  const wrapperRef = useRef(null);

  const { height, width } = useWindowDimensions();

  const showHideSearchBar = useSelector(state => state.showHideSearchBar);
  const { show } = showHideSearchBar;

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        if (userInfo) {
          set_first_name(userInfo.first_name);
        }
      }
      return () => (clean = false);
    },
    [ userInfo ]
  );

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const open_sidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    console.log(sidebar.classList.value);
    if (sidebar.classList.value === "sidebar open") {
      console.log("Close");
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".side-btn").classList.remove("active");
      document.querySelector(".side-btn").classList.add("not-active");
      document.querySelector(".head-btn").classList.remove("active");
      document.querySelector(".head-btn").classList.add("not-active");
    } else if (sidebar.classList.value === "sidebar") {
      console.log("Open");
      document.querySelector(".sidebar").classList.add("open");
      document.querySelector(".side-btn").classList.remove("not-active");
      document.querySelector(".side-btn").classList.add("active");
      document.querySelector(".head-btn").classList.remove("not-active");
      document.querySelector(".head-btn").classList.add("active");
    }
  };
  const open_cart = () => {
    const cart = document.querySelector(".cart_sidebar");
    console.log(cart.classList.value);
    if (cart.classList.value === "cart_sidebar open") {
      document.querySelector(".cart_sidebar").classList.remove("open");
    } else if (cart.classList.value === "cart_sidebar") {
      document.querySelector(".cart_sidebar").classList.add("open");
    }
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(userInfo.refresh_token));
    history.push("/account/login");
  };
  const [ last_id, set_last_id ] = useState("");
  const [ current_id, set_current_id ] = useState("");

  const show_hide = id => {
    set_current_id(id);
    var elems = document.querySelectorAll(".nav-dropdown-subcategory-content");
    [].forEach.call(elems, el => {
      el.classList.remove("show-dropdown");
    });
    const current_menu = document.getElementById(id);
    console.log(current_menu.classList);
    if (last_id === id) {
      current_menu.classList.remove("show-dropdown");
    } else {
      current_menu.classList.add("show-dropdown");
    }

    set_last_id(id);
  };
  const show_hide_nested = id => {
    set_current_id(id);
    var elems = document.querySelectorAll(".nav-dropdown-nested-content");
    [].forEach.call(elems, el => {
      el.classList.remove("show-dropdown-nested");
    });
    const current_menu = document.getElementById(id);
    console.log(current_menu.classList);
    if (last_id === id) {
      current_menu.classList.remove("show-dropdown-nested");
    } else {
      current_menu.classList.add("show-dropdown-nested");
    }

    set_last_id(id);
  };

  const clicked_outside = () => {
    var elems = document.querySelectorAll(".nav-dropdown-subcategory-content");
    [].forEach.call(elems, el => {
      el.classList.remove("show-dropdown");
    });
  };

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const update_list = product => {
    set_search(product);
    setDisplay(false);
    history.push("/collections/all/products?search=" + product);
  };

  const submitHandler = e => {
    e.preventDefault();

    history.push("/collections/all/products?search=" + search);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      findAll_products_a();
      dispatch(listChips({}));
    }
    return () => (clean = false);
  }, []);

  const findAll_products_a = async () => {
    set_loading(true);
    const { data } = await API_Products.findAll_products_a();
    console.log({ data });
    set_options([
      ...categories.map(category => {
        return { name: humanize(category) };
      }),
      ...subcategories.map(category => {
        return { name: humanize(category) };
      }),
      ...data.products
        .filter(product => !product.option)
        .filter(product => !product.hidden),
    ]);
    set_loading(false);
  };
  // var btn = document.querySelector('.side-btn');
  // console.log({ btn });

  // btn.addEventListener('click', function(e) {
  // 	// check the target has an attribute of `a[href^="http"]`
  // 	btn.classList.toggle('active');
  // 	btn.classList.toggle('not-active');
  // });

  const chipList = useSelector(state => state.chipList);
  const { chips: chips_list } = chipList;

  const [ chip_name, set_chip_name ] = useState();

  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    update_products_url(
      history,
      "",
      "",
      chip_selected.name,
      "",
      "0",
      "/collections/all/products"
    );
    dispatch(
      listProducts({
        chip: chip_selected._id,
        hidden: false,
      })
    );
    set_chip_name({});
  };

  return (
    <div>
      <div>
        <Banner />
        <header>
          <div className="header">
            <div className="menu_button w-233px">
              <Link to="/" aria-label="Home Page">
                <div className="row">
                  <div
                    className="logo h-125px w-125px"
                    aria-label="Home Page"
                    role="button"
                  >
                    <img
                      className="zoom logo_s"
                      src="/images/optimized_images/logo_images/glow_logo_optimized.png"
                      alt="Glow LEDs Logo"
                      title="Big Logo"
                    />
                  </div>
                </div>
              </Link>
              {width < 1106 && (
                <button
                  className="side-bar-open p-10px"
                  onClick={open_sidebar}
                  aria-label="Sidebar"
                  style={{ fontSize: "30px !important" }}
                >
                  {/* <i className="fas fa-bars" /> */}
                  <div className="box">
                    <div className="head-btn not-active">
                      <span className="span" />
                      <span className="span" />
                      <span className="span" />
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div className="column jc-c mh-auto">
              <div className="logo_text jc-c mh-auto ai-c">
                <Link to="/" aria-label="Home Page">
                  <div
                    className="logo_2 h-80px w-80px none"
                    aria-label="Home Page"
                    role="button"
                  >
                    <img
                      className="zoom logo_s"
                      src="/images/optimized_images/logo_images/glow_logo_optimized.png"
                      alt="Glow LEDs Logo"
                      title="Small Logo"
                    />
                  </div>
                </Link>
                <Link to="/" aria-label="Home Page">
                  {/* <div className="pos-rel"> */}
                  <div className="row pos-rel">
                    <label className="glow_leds_text">Glow LEDs</label>

                    <label className="tm" style={{ color: "#9a9898" }}>
                      ™
                    </label>
                    <label className="make_it_glow_text fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px">
                      Make it Glow
                    </label>
                  </div>
                </Link>
              </div>

              <nav className="jc-b nav_bar">
                <Link to="/" aria-label="Home Page">
                  <button className="btn nav title_font">Home</button>
                </Link>
                <div className="dropdown-nav">
                  <Link to="/collections/all/products?page=1?limit=21">
                    <button className="btn nav title_font">Products</button>
                  </Link>
                  <div className="hover_fade_in nav-dropdown">
                    <div className="jc-c">
                      <div className="nav-column">
                        <Link to="/collections/all/products?page=1?limit=21">
                          <button className="btn nav  ta-l fs-18px title_font">
                            Products
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <div style={{ marginLeft: -"5px" }} className="">
                          <Filter
                            title="Shop By Chip"
                            width="100per"
                            state={chip_name}
                            filterHandler={filterHandler}
                            filter_options={chips_list}
                          />
                        </div>
                        <Link to="/collections/all/products/category/new_releases">
                          <button
                            className="btn nav w-100per ta-l"
                            style={{ padding: "7px 10px 7px 10px" }}
                          >
                            New Releases!{" "}
                            <span aria-label="emoji" role="img">
                              🆕
                            </span>️
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/best_sellers">
                          <button
                            className="btn nav w-100per ta-l"
                            style={{ padding: "7px 10px 7px 10px" }}
                          >
                            Best Sellers<span aria-label="emoji" role="img">
                              {" "}
                              ✅
                            </span>
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/our_picks">
                          <button
                            className="btn nav w-100per ta-l jc-b"
                            style={{ padding: "7px 10px 7px 10px" }}
                          >
                            Our Picks ⭐
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/discounted">
                          <button
                            className="btn nav w-100per ta-l"
                            style={{ padding: "7px 10px 7px 10px" }}
                          >
                            On Sale! 💰
                          </button>
                        </Link>

                        <Link to="/collections/all/products/category/merch/subcategory/stickers">
                          <button className="btn nav w-100per ta-l">
                            Stickers
                          </button>
                        </Link>
                        <Link to="/collections/all/products/custom_product_deposit">
                          <button className="btn nav w-100per ta-l">
                            Customize Any Product!
                          </button>
                        </Link>
                      </div>
                      <div className="nav-column">
                        <Link to="/pages/menu/gloving">
                          <button className="btn nav w-100per ta-l fs-18px title_font">
                            Enhancers
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        {browser_check() !== "safari" ? (
                          <Link to="/collections/all/products/glowstringz_v2">
                            <button
                              className={`btn nav ta-l w-100per special_font gradient-btn`}
                            >
                              <span>GLOWSTRINGZ V2</span>
                            </button>
                          </Link>
                        ) : (
                          <Link to="/collections/all/products/glowstringz_v2">
                            <button className={`btn nav ta-l w-100per`}>
                              <span>Glowstringz V2</span>
                            </button>
                          </Link>
                        )}
                        <div className="nav-btn-container">
                          <Link
                            to="/collections/all/products/category/glowskinz"
                            className="w-100per"
                          >
                            <button className="nav-btn-link">Glowskinz</button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() => show_hide("glowskinz_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>
                        <Link to="/collections/all/products/category/glowframez">
                          <button className="btn nav w-100per ta-l">
                            Glowframez
                          </button>
                        </Link>
                        <div className="nav-btn-container">
                          <Link
                            to="/collections/all/products/category/exo_diffusers"
                            className="w-100per"
                          >
                            <button className="nav-btn-link">
                              EXO Diffusers
                            </button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() => show_hide("exo_diffusers_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>
                        <div className="nav-btn-container">
                          <Link
                            to="/collections/all/products/category/diffuser_caps"
                            className="w-100per"
                          >
                            <button className="nav-btn-link">
                              Diffuser Caps
                            </button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() => show_hide("diffuser_caps_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>

                        <div className="nav-btn-container">
                          <Link
                            to="/collections/all/products/category/diffusers"
                            className="w-100per"
                          >
                            <button className="nav-btn-link">Diffusers</button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() => show_hide("diffusers_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>
                        <Link to="/collections/all/products/category/decals">
                          <button className="btn nav w-100per ta-l">
                            Decals
                          </button>
                        </Link>
                      </div>

                      {/* Glowskinz */}
                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in "
                        id="glowskinz_dropdown"
                      >
                        <Link to="/collections/all/products/category/glowskinz">
                          <button className="btn nav w-100per ta-l fs-18px title_font">
                            Glowskinz
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <div className="nav-btn-container">
                          <Link
                            to="/collections/all/products/category/glowskinz/subcategory/clozd"
                            className="w-100per"
                          >
                            <button className="nav-btn-link w-100per ">
                              CLOZD Glowskinz
                            </button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() => show_hide_nested("clozd_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>

                        <Link
                          to="/collections/all/products/category/glowskinz/subcategory/opyn"
                          className="w-100per"
                        >
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              OPYN Glowskinz
                            </button>
                          </div>
                        </Link>
                      </div>
                      {/* EXO Diffusers */}
                      {/* <div
                          className="nav-dropdown-subcategory-content hover_fade_in "
                          id="exo_diffusers_dropdown"
                        >
                          <Link to="/collections/all/products/category/exo_diffusers">
                            <button className="btn nav w-100per ta-l fs-20px title_font">
                              EXO Diffusers
                            </button>
                          </Link>
                          <hr className="w-95per m-0px" />
                          <Link to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids">
                            <div className="row">
                              <button className="btn nav w-100per ta-l">
                                Platonic Solids
                              </button>
                            </div>
                          </Link>
                        </div> */}
                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in "
                        id="exo_diffusers_dropdown"
                      >
                        <Link to="/collections/all/products/category/exo_diffusers">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            EXO Diffusers
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <div className="nav-btn-container">
                          <Link
                            to="/collections/all/products/category/exo_diffusers"
                            className="w-100per"
                          >
                            <button className="nav-btn-link w-100per ">
                              Collections
                            </button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() =>
                              show_hide_nested(
                                "exo_diffusers_collections_dropdown"
                              )}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>

                        <Link
                          to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons"
                          className="w-100per"
                        >
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Polyhedrons
                            </button>
                          </div>
                        </Link>
                        <Link
                          to="/collections/all/products/category/exo_diffusers/subcategory/domes"
                          className="w-100per"
                        >
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Domes
                            </button>
                          </div>
                        </Link>
                      </div>
                      {/* Frosted Diffusers */}
                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in "
                        id="diffusers_dropdown"
                      >
                        <Link to="/collections/all/products/category/diffusers">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            Diffusers
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/diffusers/subcategory/abstract">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Abstract
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/polygons">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Polygons
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/cylinders">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Cylinders
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/domes">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Domes
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/open_hole">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Open Hole
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/closed_hole">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Closed Hole
                            </button>
                          </div>
                        </Link>
                      </div>
                      {/* Diffuser Caps */}
                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in "
                        id="diffuser_caps_dropdown"
                      >
                        <Link to="/collections/all/products/category/diffuser_caps">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            Diffuser Caps
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/diffuser_caps_adapters_starter_kit">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Diffuser Caps Starter Kit
                            </button>
                          </div>
                        </Link>
                        <div className="nav-btn-container">
                          <Link
                            to="/pages/menu/collections"
                            className="w-100per"
                          >
                            <button className="nav-btn-link w-100per ">
                              Collections
                            </button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() =>
                              show_hide_nested("collections_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Geometric
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Shapes
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Abstract
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Patterns
                            </button>
                          </div>
                        </Link>
                        {/* <Link to="/collections/all/products/category/diffuser_caps/subcategory/imperfect">
                            <div className="row">
                              <button className="btn nav w-100per ta-l">
                                Imperfect
                              </button>
                            </div>
                          </Link> */}
                      </div>
                      {/* Collections */}
                      <div
                        className="nav-dropdown-nested-content hover_fade_in"
                        id="collections_dropdown"
                      >
                        <Link to="/pages/menu/collections">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            Collections
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/texture">
                          <button className="btn nav w-100per ta-l">
                            Texture
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/fractal">
                          <button className="btn nav w-100per ta-l">
                            Fractal
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/space_cadet">
                          <button className="btn nav w-100per ta-l">
                            Space Cadet
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/festie_bestie">
                          <button className="btn nav w-100per ta-l">
                            Festie Bestie
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids">
                          <button className="btn nav w-100per ta-l">
                            Platonic Solids
                          </button>
                        </Link>
                      </div>
                      <div
                        className="nav-dropdown-nested-content hover_fade_in"
                        id="exo_diffusers_collections_dropdown"
                      >
                        <Link to="/collections/all/products/category/exo_diffusers">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            Collections
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids">
                          <button className="btn nav w-100per ta-l">
                            Platonic Solids
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/domes/collection/spheroid">
                          <button className="btn nav w-100per ta-l">
                            Spheroid
                          </button>
                        </Link>
                      </div>
                      <div
                        className="nav-dropdown-nested-content hover_fade_in"
                        id="clozd_dropdown"
                      >
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            CLOZD
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/classics">
                          <button className="btn nav w-100per ta-l">
                            Classics
                          </button>
                        </Link>
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/novaskinz">
                          <button className="btn nav w-100per ta-l">
                            Novaskinz
                          </button>
                        </Link>
                        {/* <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/imperfect">
                            <button className="btn nav w-100per ta-l">
                            Imperfect
                            </button>
                          </Link> */}
                      </div>
                      {/* <div
                          className="nav-dropdown-nested-content hover_fade_in"
                          id="opyn_dropdown"
                        >
                          <Link to="/collections/all/products/category/glowskinz/subcategory/opyn">
                            <button className="btn nav w-100per ta-l fs-20px title_font">
                              OPYN
                            </button>
                          </Link>
                          <hr className="w-95per m-0px" />
                          <Link to="/collections/all/products/category/glowskinz/subcategory/opyn/collection/classics">
                            <button className="btn nav w-100per ta-l">
                            Classics
                            </button>
                          </Link>
                        </div> */}
                      <div className="nav-column">
                        <Link to="/collections/all/products/category/essentials">
                          <button className="btn nav w-100per ta-l fs-18px title_font max-w-244px">
                            Essentials
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/supremes">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Supremes
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/refresh_pack">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Refresh Packs
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/supremes_sizing_sampler_pack">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Sizing Sampler
                            </button>
                          </div>
                        </Link>

                        <Link to="/collections/all/products/1225_batteries">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              1225 Batteries
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/1616_batteries">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              1616 Batteries
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/1620_batteries">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              1620 Batteries
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/products/category/batteries/subcategory/storage">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Battery Storage
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-nav">
                  <Link to="/pages/menu/featured">
                    <button className="btn nav title_font">Features</button>
                  </Link>
                  <div className="hover_fade_in nav-dropdown">
                    <div className="jc-c">
                      <div className="w-100per max-w-300px">
                        <Link to="/pages/menu/featured">
                          <button className="btn nav w-100per ta-l fs-18px title_font">
                            Featured
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/teams/category/rave_mob">
                          <button className="btn nav w-100per ta-l">
                            Rave Mob
                          </button>
                        </Link>
                        <div className="nav-btn-container">
                          <Link
                            to="/pages/menu/sponsored_artists"
                            className="w-100per"
                          >
                            <button className="nav-btn-link w-100per ">
                              Sponsored Artists
                            </button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() =>
                              show_hide("sponsored_artists_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>
                        <Link to="/collections/all/features/category/artists">
                          <button className="btn nav w-100per ta-l">
                            Artists
                          </button>
                        </Link>
                        <Link to="/collections/all/features/category/glovers">
                          <button className="btn nav w-100per ta-l jc-b">
                            Glovers
                          </button>
                        </Link>
                        <Link to="/collections/all/features/category/producers">
                          <button className="btn nav w-100per ta-l">
                            Producers
                          </button>
                        </Link>
                        <Link to="/collections/all/features/category/vfx">
                          <button className="btn nav w-100per ta-l">VFX</button>
                        </Link>
                        <Link to="/collections/all/features/category/submit_feature">
                          <button className="btn nav w-100per ta-l">
                            Submit Feature
                          </button>
                        </Link>
                      </div>

                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in"
                        id="sponsored_artists_dropdown"
                      >
                        <Link to="/pages/menu/sponsored_artists">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            Sponsored Artists
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/sponsors">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Sponsored Glovers
                            </button>
                          </div>
                        </Link>
                        <Link to="/collections/all/teams">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Sponsored Teams
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-nav">
                  <Link to="/pages/menu/support">
                    <button className="btn nav title_font">Support</button>
                  </Link>

                  <div className="hover_fade_in nav-dropdown">
                    <div className="jc-c">
                      <div className="w-100per max-w-300px">
                        <Link to="/pages/menu/support">
                          <button className="btn nav w-100per ta-l fs-18px title_font">
                            Support
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/pages/track_your_order">
                          <button className="btn nav w-100per ta-l">
                            Track Your Order
                          </button>
                        </Link>
                        {/* <Link to="/pages/color_palettes">
													<button className="btn nav w-100per ta-l jc-b">
														Color Palettes
													</button>
												</Link> */}
                        <Link to="/pages/about">
                          <button className="btn nav w-100per ta-l jc-b">
                            About
                          </button>
                        </Link>
                        <Link to="/pages/events">
                          <button className="btn nav w-100per ta-l jc-b">
                            Events
                          </button>
                        </Link>
                        <Link to="/pages/menu/manuals">
                          <button className="btn nav w-100per ta-l jc-b">
                            Manuals
                          </button>
                        </Link>
                        <Link to="/pages/announcements">
                          <button className="btn nav w-100per ta-l">
                            Announcements
                          </button>
                        </Link>
                        <div className="nav-btn-container">
                          <Link to="/pages/faq" className="w-80per">
                            <button className="nav-btn-link w-100per ta-l">
                              FAQ
                            </button>
                          </Link>
                          <button
                            className="nav-btn-dropdown"
                            onClick={() => show_hide("faq_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </button>
                        </div>
                        <Link to="/pages/contact">
                          <button className="btn nav w-100per ta-l">
                            Contact
                          </button>
                        </Link>
                        <Link to="/pages/terms">
                          <button className="btn nav w-100per ta-l">
                            Term and Conditions
                          </button>
                        </Link>
                      </div>

                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in"
                        id="faq_dropdown"
                      >
                        <Link to="/pages/faq">
                          <button className="btn nav w-100per ta-l fs-20px title_font">
                            FAQ
                          </button>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <HashLink to="/pages/faq#glowskinz">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Glowskinz
                            </button>
                          </div>
                        </HashLink>
                        <HashLink to="/pages/faq#diffuser_caps">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Diffuser Caps
                            </button>
                          </div>
                        </HashLink>
                        <HashLink to="/pages/faq#ordering_custom_products">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Ordering Custom Products
                            </button>
                          </div>
                        </HashLink>
                        <HashLink to="/pages/faq#featured_content">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Featured Content
                            </button>
                          </div>
                        </HashLink>

                        <HashLink to="/pages/faq#processing_shipping">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Processing/Shipping
                            </button>
                          </div>
                        </HashLink>
                        <HashLink to="/pages/faq#order_issues">
                          <div className="row">
                            <button className="btn nav w-100per ta-l">
                              Order Issues
                            </button>
                          </div>
                        </HashLink>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            {/* <Link to="/checkout/cart"> */}
            <button
              className="btn mobile nav cart_icon none"
              onClick={open_cart}
            >
              <i className="fas fa-shopping-cart" />{" "}
              {cartItems.reduce(
                (a, c) => parseInt(a) + parseInt(c.qty),
                0
              )}{" "}
            </button>
            {/* </Link> */}
            <div className="nav_bar w-233px jc-fe ai-c">
              {/* <Link to="/checkout/cart"> */}
              <button
                className={`btn nav cart_text w-110px title_font ai-c ${cartItems.length >
                0
                  ? "bob box-s-d bg-primary"
                  : ""}`}
                onClick={open_cart}
              >
                Cart <i className="fas fa-shopping-cart ml-5px mb-5px" />
                <div className="ml-5px">
                  {cartItems.reduce(
                    (a, c) => parseInt(a) + parseInt(c.qty),
                    0
                  )}{" "}
                </div>
              </button>
              {/* </Link> */}
              {/* <Link to="/checkout/cart"> */}
              <button
                className={`btn mobile nav cart_icon title_font none ${cartItems.length >
                0
                  ? "bob box-s-d bg-primary"
                  : ""}`}
                onClick={open_cart}
              >
                <i className="fas fa-shopping-cart" />{" "}
                {cartItems.reduce(
                  (a, c) => parseInt(a) + parseInt(c.qty),
                  0
                )}{" "}
              </button>
              {/* </Link> */}
              {userInfo && userInfo.hasOwnProperty("first_name") ? (
                <div className="dropdown">
                  <button className="btn nav title_font">{first_name}</button>
                  <ul className="dropdown-content hover_fade_in w-110px">
                    <Link to="/secure/account/profile">
                      <button className="btn nav ">Profile</button>
                    </Link>
                    <Link to="/secure/account/orders">
                      <button className="btn nav">Orders</button>
                    </Link>
                    <button className="btn nav mr-auto" onClick={handleLogout}>
                      {" "}
                      Logout
                    </button>
                  </ul>
                </div>
              ) : (
                <div>
                  <Link to="/account/login">
                    <button className="btn nav title_font">Login</button>
                  </Link>
                </div>
              )}
              {userInfo &&
              userInfo.isAdmin && (
                <div className="dropdown ">
                  <button className="btn nav title_font">Admin</button>
                  <ul className="dropdown-content hover_fade_in w-175px">
                    <Link to="/secure/glow/controlpanel">
                      <button className="btn nav w-100per ta-l">
                        Control Panel
                      </button>
                    </Link>
                    <Link to="/secure/glow/orders?page=1?limit=10">
                      <button className="btn nav w-100per ta-l">Orders</button>
                    </Link>
                    <Link to="/secure/glow/products">
                      <button className="btn nav w-100per ta-l">
                        {" "}
                        Products
                      </button>
                    </Link>
                    <Link to="/secure/glow/users">
                      <button className="btn nav w-100per ta-l"> Users</button>
                    </Link>
                    <Link to="/secure/glow/expenses">
                      <button className="btn nav w-100per ta-l">
                        {" "}
                        Expenses
                      </button>
                    </Link>
                    <Link to="/secure/glow/features">
                      <button className="btn nav w-100per ta-l">
                        {" "}
                        Features
                      </button>
                    </Link>
                    <Link to="/secure/glow/paychecks">
                      <button className="btn nav w-100per ta-l">
                        {" "}
                        Paychecks
                      </button>
                    </Link>
                    <Link to="/secure/glow/affiliates">
                      <button className="btn nav w-100per ta-l">
                        {" "}
                        Affiliates
                      </button>
                    </Link>
                    <Link to="/secure/glow/teams">
                      <button className="btn nav w-100per ta-l"> Teams</button>
                    </Link>
                    <Link to="/secure/glow/promos">
                      <button className="btn nav w-100per ta-l">Promos</button>
                    </Link>
                    <Link to="/secure/glow/carts">
                      <button className="btn nav w-100per ta-l">Carts</button>
                    </Link>
                    <Link to="/secure/glow/contents">
                      <button className="btn nav w-100per ta-l">
                        Contents
                      </button>
                    </Link>
                    <Link to="/secure/glow/emails">
                      <button className="btn nav w-100per ta-l">Emails</button>
                    </Link>
                    <Link to="/secure/glow/logs">
                      <button className="btn nav w-100per ta-l">Logs</button>
                    </Link>
                    <Link to="/secure/glow/chips">
                      <button className="btn nav w-100per ta-l">Chips</button>
                    </Link>
                    <Link to="/secure/glow/surveys">
                      <button className="btn nav w-100per ta-l">Surveys</button>
                    </Link>
                    <Link to="/secure/glow/parcels">
                      <button className="btn nav w-100per ta-l">Parcels</button>
                    </Link>
                    <Link to="/secure/glow/categorys">
                      <button className="btn nav w-100per ta-l">
                        Categorys
                      </button>
                    </Link>
                    <Link to="/secure/glow/settings">
                      <button className="btn nav w-100per ta-l">
                        Settings
                      </button>
                    </Link>
                    <Link to="/secure/glow/palettes">
                      <button className="btn nav w-100per ta-l">
                        Palettes
                      </button>
                    </Link>
                    <Link to="/secure/glow/edit_all_data">
                      <button className="btn nav w-100per ta-l">
                        Edit All Data
                      </button>
                    </Link>
                    <Link to="/secure/glow/gcode_continous">
                      <button className="btn nav w-100per ta-l">Gcode</button>
                    </Link>
                    <Link to="/secure/glow/image_compressor">
                      <button className="btn nav w-100per ta-l">
                        Compressor
                      </button>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {show && (
            <form
              onSubmit={submitHandler}
              className={`max-w-900px m-auto p-10px ph-20px br-10px w-100per mt-${width <
              1107
                ? "15px"
                : "5px"} jc-c`}
              style={{ display: pathname === "/" ? "none" : "flex" }}
            >
              <div className="jc-b ai-c search_container w-100per max-w-600px">
                <div
                  ref={wrapperRef}
                  className="flex-container flex-column pos-rel w-100per max-w-600px"
                >
                  <input
                    id="auto"
                    autoComplete="off"
                    onClick={() => setDisplay(true)}
                    className="form_input search mv-0px w-100per fs-16px"
                    placeholder="Find Your Glow Here"
                    value={search}
                    onChange={e => set_search(e.target.value)}
                  />
                  {display && (
                    <div className="pos-abs bg-primary br-10px z-pos-10 w-100per max-w-600px">
                      {options
                        .filter(
                          ({ name }) =>
                            name.toLowerCase().indexOf(search.toLowerCase()) >
                            -1
                        )
                        .slice(0, 20)
                        .map((value, i) => {
                          return (
                            <div
                              onClick={() => update_list(value.name)}
                              className="auto-option ai-c jc-b  p-5px z-pos-10"
                              key={i}
                              tabIndex="0"
                            >
                              <span
                                className="fs-16px "
                                style={{ color: "white" }}
                              >
                                {value.name}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn primary w-50px fs-16px mb-0px"
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </form>
          )}
        </header>
      </div>
    </div>
  );
};

export default Header;
