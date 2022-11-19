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
import { categories, humanize, subcategories, update_products_url } from "../../utils/helper_functions";
import { DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
import { hide_search_bar, show_search_bar } from "../../actions/settingActions";
import { Filter } from "../SpecialtyComponents";
import { listChips } from "../../actions/chipActions";
import { GLButton } from "../GlowLEDsComponents";

const Header = props => {
  const history = useHistory();
  const [first_name, set_first_name] = useState("");
  const [loading, set_loading] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, set_options] = useState([]);
  const [products, set_products] = useState([]);
  const [slideshow, set_slideshow] = useState([]);
  const [pathname, set_pathname] = useState("");
  const [search, set_search] = useState("");
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

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (userInfo) {
        set_first_name(userInfo.first_name);
      }
    }
    return () => (clean = false);
  }, [userInfo]);

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const open_sidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    if (sidebar.classList.value === "sidebar open") {
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".side-btn").classList.remove("active");
      document.querySelector(".side-btn").classList.add("not-active");
      document.querySelector(".head-btn").classList.remove("active");
      document.querySelector(".head-btn").classList.add("not-active");
    } else if (sidebar.classList.value === "sidebar") {
      document.querySelector(".sidebar").classList.add("open");
      document.querySelector(".side-btn").classList.remove("not-active");
      document.querySelector(".side-btn").classList.add("active");
      document.querySelector(".head-btn").classList.remove("not-active");
      document.querySelector(".head-btn").classList.add("active");
    }
  };
  const open_cart = () => {
    const cart = document.querySelector(".cart_sidebar");

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
  const [last_id, set_last_id] = useState("");
  const [current_id, set_current_id] = useState("");

  const show_hide = id => {
    set_current_id(id);
    var elems = document.querySelectorAll(".nav-dropdown-subcategory-content");
    [].forEach.call(elems, el => {
      el.classList.remove("show-dropdown");
    });
    const current_menu = document.getElementById(id);

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

    set_options([
      ...categories.map(category => {
        return { name: humanize(category) };
      }),
      ...subcategories.map(category => {
        return { name: humanize(category) };
      }),
      ...data.products.filter(product => !product.option).filter(product => !product.hidden)
    ]);
    set_loading(false);
  };
  // var btn = document.querySelector('.side-btn');
  //

  // btn.addEventListener('click', function(e) {
  // 	// check the target has an attribute of `a[href^="http"]`
  // 	btn.classList.toggle('active');
  // 	btn.classList.toggle('not-active');
  // });

  const chipList = useSelector(state => state.chipList);
  const { chips: chips_list } = chipList;

  const [chip_name, set_chip_name] = useState();

  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    update_products_url(history, "", "", chip_selected.name, "", "0", "/collections/all/products");
    dispatch(
      listProducts({
        chip: chip_selected._id,
        hidden: false
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
                  <div className="logo h-125px w-125px" aria-label="Home Page" role="button">
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
                <GLButton
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
                </GLButton>
              )}
            </div>

            <div className="column jc-c mh-auto">
              <div className="logo_text jc-c mh-auto ai-c">
                <Link to="/" aria-label="Home Page">
                  <div className="logo_2 h-80px w-80px none" aria-label="Home Page" role="button">
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
                    <label className="make_it_glow_text fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px">Make it Glow</label>
                  </div>
                </Link>
              </div>

              <nav className="jc-b nav_bar">
                <Link to="/" aria-label="Home Page">
                  <GLButton variant="nav" className="title_font">
                    Home
                  </GLButton>
                </Link>
                <div className="dropdown-nav">
                  <Link to="/collections/all/products?page=1?limit=21">
                    <GLButton variant="nav" className="title_font">
                      Products
                    </GLButton>
                  </Link>
                  <div className="hover_fade_in nav-dropdown">
                    <div className="jc-c">
                      <div className="nav-column">
                        <Link to="/collections/all/products?page=1?limit=21">
                          <GLButton variant="nav" className="ta-l fs-18px title_font">
                            Products
                          </GLButton>
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
                          <GLButton variant="nav" className="w-100per ta-l" style={{ padding: "7px 10px 7px 10px" }}>
                            New Releases!{" "}
                            <span aria-label="emoji" role="img">
                              🆕
                            </span>
                            ️
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/best_sellers">
                          <GLButton variant="nav" className="w-100per ta-l" style={{ padding: "7px 10px 7px 10px" }}>
                            Best Sellers
                            <span aria-label="emoji" role="img">
                              {" "}
                              ✅
                            </span>
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/our_picks">
                          <GLButton variant="nav" className="w-100per ta-l jc-b" style={{ padding: "7px 10px 7px 10px" }}>
                            Our Picks ⭐
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/discounted">
                          <GLButton variant="nav" className="w-100per ta-l" style={{ padding: "7px 10px 7px 10px" }}>
                            On Sale! 💰
                          </GLButton>
                        </Link>

                        <Link to="/collections/all/products/category/merch/subcategory/stickers">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Stickers
                          </GLButton>
                        </Link>
                        {/* <Link to="/collections/all/products/custom_product_deposit">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Customize Any Product!
                          </GLButton>
                        </Link> */}
                      </div>
                      <div className="nav-column">
                        <Link to="/pages/menu/gloving">
                          <GLButton variant="nav" className="w-100per ta-l fs-18px title_font">
                            Enhancers
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        {/* {browser_check() !== "safari" ? (
                          <Link to="/collections/all/products/glowstringz_v2">
                            <GLButton
                              className={`btn nav ta-l w-100per special_font gradient-btn`}
                            >
                              <span>GLOWSTRINGZ V2</span>
                            </GLButton>
                          </Link>
                        ) : (
                          <Link to="/collections/all/products/glowstringz_v2">
                            <GLButton className={`btn nav ta-l w-100per`}>
                              <span>Glowstringz V2</span>
                            </GLButton>
                          </Link>
                        )} */}
                        <div className="nav-btn-container">
                          <Link to="/collections/all/products/category/glowskinz" className="w-100per">
                            <GLButton className="nav-btn-link">Glowskinz</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide("glowskinz_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>
                        <Link to="/collections/all/products/category/glowframez">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Glowframez
                          </GLButton>
                        </Link>
                        <div className="nav-btn-container">
                          <Link to="/collections/all/products/category/exo_diffusers" className="w-100per">
                            <GLButton className="nav-btn-link">EXO Diffusers</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide("exo_diffusers_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>
                        <div className="nav-btn-container">
                          <Link to="/collections/all/products/category/diffuser_caps" className="w-100per">
                            <GLButton className="nav-btn-link">Diffuser Caps</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide("diffuser_caps_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>

                        <div className="nav-btn-container">
                          <Link to="/collections/all/products/category/diffusers" className="w-100per">
                            <GLButton className="nav-btn-link">Diffusers</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide("diffusers_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>
                        <Link to="/collections/all/products/category/decals">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Decals
                          </GLButton>
                        </Link>
                      </div>

                      {/* Glowskinz */}
                      <div className="nav-dropdown-subcategory-content hover_fade_in " id="glowskinz_dropdown">
                        <Link to="/collections/all/products/category/glowskinz">
                          <GLButton variant="nav" className="w-100per ta-l fs-18px title_font">
                            Glowskinz
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <div className="nav-btn-container">
                          <Link to="/collections/all/products/category/glowskinz/subcategory/clozd" className="w-100per">
                            <GLButton className="nav-btn-link w-100per ">CLOZD Glowskinz</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide_nested("clozd_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>

                        <Link to="/collections/all/products/category/glowskinz/subcategory/opyn" className="w-100per">
                          <GLButton variant="nav" className="w-100per ta-l">
                            OPYN Glowskinz
                          </GLButton>
                        </Link>
                      </div>
                      {/* EXO Diffusers */}
                      {/* <div
                          className="nav-dropdown-subcategory-content hover_fade_in "
                          id="exo_diffusers_dropdown"
                        >
                          <Link to="/collections/all/products/category/exo_diffusers">
                            <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                              EXO Diffusers
                            </GLButton>
                          </Link>
                          <hr className="w-95per m-0px" />
                          <Link to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids">
                              <GLButton variant="nav" className="w-100per ta-l">
                                Platonic Solids
                              </GLButton>
                          </Link>
                        </div> */}
                      <div className="nav-dropdown-subcategory-content hover_fade_in " id="exo_diffusers_dropdown">
                        <Link to="/collections/all/products/category/exo_diffusers">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            EXO Diffusers
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <div className="nav-btn-container">
                          <Link to="/collections/all/products/category/exo_diffusers" className="w-100per">
                            <GLButton className="nav-btn-link w-100per ">Collections</GLButton>
                          </Link>
                          <GLButton
                            className="nav-btn-dropdown"
                            onClick={() => show_hide_nested("exo_diffusers_collections_dropdown")}
                            aria-label="Show"
                          >
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>

                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons" className="w-100per">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Polyhedrons
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/domes" className="w-100per">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Domes
                          </GLButton>
                        </Link>
                      </div>
                      {/* Frosted Diffusers */}
                      <div className="nav-dropdown-subcategory-content hover_fade_in " id="diffusers_dropdown">
                        <Link to="/collections/all/products/category/diffusers">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            Diffusers
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/diffusers/subcategory/abstract">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Abstract
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/polygons">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Polygons
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/cylinders">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Cylinders
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/domes">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Domes
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/open_hole">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Open Hole
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffusers/subcategory/closed_hole">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Closed Hole
                          </GLButton>
                        </Link>
                      </div>
                      {/* Diffuser Caps */}
                      <div className="nav-dropdown-subcategory-content hover_fade_in " id="diffuser_caps_dropdown">
                        <Link to="/collections/all/products/category/diffuser_caps">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            Diffuser Caps
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/diffuser_caps_adapters_starter_kit">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Diffuser Caps Starter Kit
                          </GLButton>
                        </Link>
                        <div className="nav-btn-container">
                          <Link to="/pages/menu/collections" className="w-100per">
                            <GLButton className="nav-btn-link w-100per ">Collections</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide_nested("collections_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Geometric
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Shapes
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Abstract
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Patterns
                          </GLButton>
                        </Link>
                        {/* <Link to="/collections/all/products/category/diffuser_caps/subcategory/imperfect">
                              <GLButton variant="nav" className="w-100per ta-l">
                                Imperfect
                              </GLButton>
                          </Link> */}
                      </div>
                      {/* Collections */}
                      <div className="nav-dropdown-nested-content hover_fade_in" id="collections_dropdown">
                        <Link to="/pages/menu/collections">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            Collections
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/texture">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Texture
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/fractal">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Fractal
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/space_cadet">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Space Cadet
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/festie_bestie">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Festie Bestie
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Platonic Solids
                          </GLButton>
                        </Link>
                      </div>
                      <div className="nav-dropdown-nested-content hover_fade_in" id="exo_diffusers_collections_dropdown">
                        <Link to="/collections/all/products/category/exo_diffusers">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            Collections
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Platonic Solids
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/domes/collection/spheroid">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Spheroid
                          </GLButton>
                        </Link>
                      </div>
                      <div className="nav-dropdown-nested-content hover_fade_in" id="clozd_dropdown">
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            CLOZD
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/classics">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Classics
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/novaskinz">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Novaskinz
                          </GLButton>
                        </Link>
                        {/* <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/imperfect">
                            <GLButton variant="nav" className="w-100per ta-l">
                            Imperfect
                            </GLButton>
                          </Link> */}
                      </div>
                      {/* <div
                          className="nav-dropdown-nested-content hover_fade_in"
                          id="opyn_dropdown"
                        >
                          <Link to="/collections/all/products/category/glowskinz/subcategory/opyn">
                            <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                              OPYN
                            </GLButton>
                          </Link>
                          <hr className="w-95per m-0px" />
                          <Link to="/collections/all/products/category/glowskinz/subcategory/opyn/collection/classics">
                            <GLButton variant="nav" className="w-100per ta-l">
                            Classics
                            </GLButton>
                          </Link>
                        </div> */}
                      <div className="nav-column">
                        <Link to="/collections/all/products/category/essentials">
                          <GLButton variant="nav" className="w-100per ta-l fs-18px title_font max-w-244px">
                            Essentials
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/products/supremes">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Supremes
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/refresh_pack">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Refresh Packs
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/supremes_sizing_sampler_pack">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Sizing Sampler
                          </GLButton>
                        </Link>

                        <Link to="/collections/all/products/1225_batteries">
                          <GLButton variant="nav" className="w-100per ta-l">
                            1225 Batteries
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/1616_batteries">
                          <GLButton variant="nav" className="w-100per ta-l">
                            1616 Batteries
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/1620_batteries">
                          <GLButton variant="nav" className="w-100per ta-l">
                            1620 Batteries
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/2016_batteries">
                          <GLButton variant="nav" className="w-100per ta-l">
                            2016 Batteries
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/batteries/subcategory/storage">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Battery Storage
                          </GLButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-nav">
                  <Link to="/pages/menu/featured">
                    <GLButton variant="nav" className="title_font">
                      Features
                    </GLButton>
                  </Link>
                  <div className="hover_fade_in nav-dropdown">
                    <div className="jc-c">
                      <div className="w-100per max-w-300px">
                        <Link to="/pages/menu/featured">
                          <GLButton variant="nav" className="w-100per ta-l fs-18px title_font">
                            Featured
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/teams/category/rave_mob">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Rave Mob
                          </GLButton>
                        </Link>
                        <div className="nav-btn-container">
                          <Link to="/pages/menu/sponsored_artists" className="w-100per">
                            <GLButton className="nav-btn-link w-100per ">Sponsored Artists</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide("sponsored_artists_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>
                        <Link to="/collections/all/features/category/artists">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Artists
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/features/category/glovers">
                          <GLButton variant="nav" className="w-100per ta-l jc-b">
                            Glovers
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/features/category/producers">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Producers
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/features/category/vfx">
                          <GLButton variant="nav" className="w-100per ta-l">
                            VFX
                          </GLButton>
                        </Link>
                        {/* <Link to="/collections/all/features/category/submit_feature">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Submit Feature
                          </GLButton>
                        </Link> */}
                      </div>

                      <div className="nav-dropdown-subcategory-content hover_fade_in" id="sponsored_artists_dropdown">
                        <Link to="/pages/menu/sponsored_artists">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            Sponsored Artists
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/collections/all/sponsors">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Sponsored Glovers
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/teams">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Sponsored Teams
                          </GLButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-nav">
                  <Link to="/pages/menu/support">
                    <GLButton variant="nav" className="title_font">
                      Support
                    </GLButton>
                  </Link>

                  <div className="hover_fade_in nav-dropdown">
                    <div className="jc-c">
                      <div className="w-100per max-w-300px">
                        <Link to="/pages/menu/support">
                          <GLButton variant="nav" className="w-100per ta-l fs-18px title_font">
                            Support
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <Link to="/pages/track_your_order">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Track Your Order
                          </GLButton>
                        </Link>
                        {/* <Link to="/pages/color_palettes">
													<GLButton variant="nav" className="w-100per ta-l jc-b">
														Color Palettes
													</GLButton>
												</Link> */}
                        <Link to="/pages/about">
                          <GLButton variant="nav" className="w-100per ta-l jc-b">
                            About
                          </GLButton>
                        </Link>
                        <Link to="/pages/events">
                          <GLButton variant="nav" className="w-100per ta-l jc-b">
                            Events
                          </GLButton>
                        </Link>
                        <Link to="/pages/menu/manuals">
                          <GLButton variant="nav" className="w-100per ta-l jc-b">
                            Manuals
                          </GLButton>
                        </Link>
                        <Link to="/pages/announcements">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Announcements
                          </GLButton>
                        </Link>
                        <div className="nav-btn-container">
                          <Link to="/pages/faq" className="w-80per">
                            <GLButton className="nav-btn-link w-100per ta-l">FAQ</GLButton>
                          </Link>
                          <GLButton className="nav-btn-dropdown" onClick={() => show_hide("faq_dropdown")} aria-label="Show">
                            <i className="fas fa-sort-up" />
                          </GLButton>
                        </div>
                        <Link to="/pages/contact">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Contact
                          </GLButton>
                        </Link>
                        <Link to="/pages/terms">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Term and Conditions
                          </GLButton>
                        </Link>
                      </div>

                      <div className="nav-dropdown-subcategory-content hover_fade_in" id="faq_dropdown">
                        <Link to="/pages/faq">
                          <GLButton variant="nav" className="w-100per ta-l fs-20px title_font">
                            FAQ
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        <HashLink to="/pages/faq#glowskinz">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Glowskinz
                          </GLButton>
                        </HashLink>
                        <HashLink to="/pages/faq#diffuser_caps">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Diffuser Caps
                          </GLButton>
                        </HashLink>
                        <HashLink to="/pages/faq#ordering_custom_products">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Ordering Custom Products
                          </GLButton>
                        </HashLink>
                        <HashLink to="/pages/faq#featured_content">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Featured Content
                          </GLButton>
                        </HashLink>

                        <HashLink to="/pages/faq#processing_shipping">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Processing/Shipping
                          </GLButton>
                        </HashLink>
                        <HashLink to="/pages/faq#order_issues">
                          <GLButton variant="nav" className="w-100per ta-l">
                            Order Issues
                          </GLButton>
                        </HashLink>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            {/* <Link to="/checkout/cart"> */}
            <GLButton variant="mobile nav" className="cart_icon none" onClick={open_cart}>
              <i className="fas fa-shopping-cart" /> {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
            </GLButton>
            {/* </Link> */}
            <div className="nav_bar w-233px jc-fe ai-c">
              {/* <Link to="/checkout/cart"> */}
              <GLButton
                variant="nav"
                className={`cart_text w-110px title_font ai-c ${cartItems.length > 0 ? "bob box-s-d bg-primary" : ""}`}
                onClick={open_cart}
              >
                Cart <i className="fas fa-shopping-cart ml-5px mb-5px" />
                <div className="ml-5px">{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} </div>
              </GLButton>
              {/* </Link> */}
              {/* <Link to="/checkout/cart"> */}
              <GLButton
                variant="mobile nav"
                className={`cart_icon title_font none ${cartItems.length > 0 ? "bob box-s-d bg-primary" : ""}`}
                onClick={open_cart}
              >
                <i className="fas fa-shopping-cart" /> {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
              </GLButton>
              {/* </Link> */}
              {userInfo && userInfo.hasOwnProperty("first_name") ? (
                <div className="dropdown">
                  <GLButton variant="nav" className="title_font">
                    {first_name}
                  </GLButton>
                  <ul className="dropdown-content hover_fade_in w-110px">
                    <Link to="/secure/account/profile">
                      <GLButton variant="nav" className="">
                        Profile
                      </GLButton>
                    </Link>
                    <Link to="/secure/account/orders">
                      <GLButton variant="nav">Orders</GLButton>
                    </Link>
                    <GLButton variant="nav" className="mr-auto" onClick={handleLogout}>
                      {" "}
                      Logout
                    </GLButton>
                  </ul>
                </div>
              ) : (
                <div>
                  <Link to="/account/login">
                    <GLButton variant="nav" className="title_font">
                      Login
                    </GLButton>
                  </Link>
                </div>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown ">
                  <GLButton variant="nav" className="title_font">
                    Admin
                  </GLButton>
                  <ul className="dropdown-content hover_fade_in w-175px">
                    <Link to="/secure/glow/controlpanel">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Control Panel
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/orders?page=1?limit=10">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Orders
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/products">
                      <GLButton variant="nav" className="w-100per ta-l">
                        {" "}
                        Products
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/users">
                      <GLButton variant="nav" className="w-100per ta-l">
                        {" "}
                        Users
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/expenses">
                      <GLButton variant="nav" className="w-100per ta-l">
                        {" "}
                        Expenses
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/features">
                      <GLButton variant="nav" className="w-100per ta-l">
                        {" "}
                        Features
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/paychecks">
                      <GLButton variant="nav" className="w-100per ta-l">
                        {" "}
                        Paychecks
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/affiliates">
                      <GLButton variant="nav" className="w-100per ta-l">
                        {" "}
                        Affiliates
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/teams">
                      <GLButton variant="nav" className="w-100per ta-l">
                        {" "}
                        Teams
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/promos">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Promos
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/carts">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Carts
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/contents">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Contents
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/emails">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Emails
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/logs">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Logs
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/chips">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Chips
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/surveys">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Surveys
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/parcels">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Parcels
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/categorys">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Categorys
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/settings">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Settings
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/palettes">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Palettes
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/filaments">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Filaments
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/edit_all_data">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Edit All Data
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/gcode_continous">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Gcode
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/image_compressor">
                      <GLButton variant="nav" className="w-100per ta-l">
                        Compressor
                      </GLButton>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {show && (
            <form
              onSubmit={submitHandler}
              className={`max-w-900px m-auto p-10px ph-20px br-10px w-100per mt-${width < 1107 ? "15px" : "5px"} jc-c`}
              style={{ display: pathname === "/" ? "none" : "flex" }}
            >
              <div className="jc-b ai-c search_container w-100per max-w-600px">
                <div ref={wrapperRef} className="flex-container flex-column pos-rel w-100per max-w-600px">
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
                        .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                        .slice(0, 20)
                        .map((value, i) => {
                          return (
                            <div
                              onClick={() => update_list(value.name)}
                              className="auto-option ai-c jc-b  p-5px z-pos-10"
                              key={i}
                              tabIndex="0"
                            >
                              <span className="fs-16px " style={{ color: "white" }}>
                                {value.name}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                <GLButton type="submit" variant="primary" className="w-50px fs-16px mb-0px">
                  <i className="fas fa-search" />
                </GLButton>
              </div>
            </form>
          )}
        </header>
      </div>
    </div>
  );
};

export default Header;
