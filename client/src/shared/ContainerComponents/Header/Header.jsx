import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Banner";
import useWindowDimensions from "../../Hooks/windowDimensions";
import { API_Products } from "../../../utils";
import { categories, humanize, subcategories, update_products_url } from "../../../utils/helper_functions";
import { GLButton } from "../../GlowLEDsComponents";
import * as API from "../../../api";
import { clear_order_state } from "../../../slices/orderSlice";
import NavColumn from "./components/NavColumn";
import DrawerItem from "./components/DrawerItem";
import SubDrawerItem from "./components/SubDrawerItem";
import { navItems } from "./headerHelpers";
import { setCartDrawer, setSideNavDrawer } from "../../../slices/cartSlice";
import { Search, ShoppingCart } from "@mui/icons-material";
import { openLoginModal } from "../../../slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [first_name, set_first_name] = useState("");
  const [loading, set_loading] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, set_options] = useState([]);
  const [pathname, set_pathname] = useState("");
  const [search, set_search] = useState("");
  const wrapperRef = useRef(null);

  const { height, width } = useWindowDimensions();

  const settingPage = useSelector(state => state.settings);
  const { show_search_bar } = settingPage;

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user) {
        set_first_name(current_user.first_name);
      }
    }
    return () => (clean = false);
  }, [current_user]);

  const cartPage = useSelector(state => state.carts.cartPage);

  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const open_sidebar = () => {
    dispatch(setSideNavDrawer(true));
  };
  const open_cart = () => {
    dispatch(setCartDrawer(true));
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(API.logoutUser(refreshToken));
    if (location.pathname.includes("secure")) {
      navigate("/");
    }
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
    navigate("/collections/all/products?search=" + product);
  };

  const submitHandler = e => {
    e.preventDefault();

    navigate("/collections/all/products?search=" + search);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listContents({ limit: 3 }));
      findAllGrid_products_a();
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, []);

  const findAllGrid_products_a = async () => {
    set_loading(true);
    const { data } = await API_Products.findAllGrid_products_a();

    set_options([
      ...categories.map(category => {
        return { name: humanize(category) };
      }),
      ...subcategories.map(category => {
        return { name: humanize(category) };
      }),
      ...data.products.filter(product => !product.option).filter(product => !product.hidden),
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

  const chipPage = useSelector(state => state.chips);
  const { chips: chips_list, loading: loading_chips } = chipPage;

  const [chip_name, set_chip_name] = useState();

  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    update_products_url(navigate, "", "", chip_selected.name, "", "0", "/collections/all/products");
    dispatch(
      API.listProducts({
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
              {width < 960 && (
                <GLButton
                  className="side-bar-open p-10px"
                  onClick={open_sidebar}
                  aria-label="Sidebar"
                  style={{ fontSize: "30px !important" }}
                >
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
                  <div className="row pos-rel">
                    <label className="glow_leds_text" data-testid="glow_leds_title">
                      Glow LEDs
                    </label>

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
                {navItems.map(item => (
                  <div key={item.name} className="dropdown-nav">
                    <Link to={item.path} aria-label={item.ariaLabel}>
                      <GLButton variant={item.variant} className={item.className} data-testid={item.dataTestId}>
                        {item.name}
                      </GLButton>
                    </Link>
                    {item.columns && (
                      <div className="hover_fade_in nav-dropdown">
                        <div className="jc-c">
                          <NavColumn
                            columns={item.columns}
                            show_hide={show_hide}
                            chip_name={chip_name}
                            filterHandler={filterHandler}
                            chips_list={chips_list}
                          />
                          <DrawerItem columns={item.columns} show_hide_nested={show_hide_nested} />
                          <SubDrawerItem columns={item.columns} show_hide_nested={show_hide_nested} />
                          <NavColumn columns={item.otherColumns} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <GLButton variant="mobile nav" className="cart_icon none" onClick={open_cart}>
              <ShoppingCart /> {cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
            </GLButton>
            <div className="nav_bar w-233px jc-fe ai-c">
              <GLButton
                variant="nav"
                className={`cart_text w-110px title_font ai-c ${cartItems.length > 0 ? "bob box-s-d bg-primary" : ""}`}
                onClick={open_cart}
              >
                Cart <ShoppingCart className="ml-5px mb-5px" />
                <div className="ml-5px">{cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} </div>
              </GLButton>
              <GLButton
                variant="mobile nav"
                className={`cart_icon title_font none ${cartItems.length > 0 ? "bob box-s-d bg-primary" : ""}`}
                onClick={open_cart}
              >
                <ShoppingCart /> {cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
              </GLButton>
              {current_user && current_user.hasOwnProperty("first_name") ? (
                <div className="dropdown">
                  <GLButton variant="nav" className="title_font">
                    {first_name}
                  </GLButton>
                  <ul className="dropdown-content hover_fade_in w-110px">
                    <Link to={`/secure/account/profile`}>
                      <GLButton variant="nav" className="">
                        Profile
                      </GLButton>
                    </Link>
                    <GLButton variant="nav" className="mr-auto" onClick={handleLogout}>
                      Logout
                    </GLButton>
                  </ul>
                </div>
              ) : (
                <div>
                  {/* <Link to="/account/login"> */}
                  <GLButton variant="nav" className="title_font" onClick={() => dispatch(openLoginModal())}>
                    Login
                  </GLButton>
                  {/* </Link> */}
                </div>
              )}
              {current_user?.isAdmin && (
                <div className="dropdown ">
                  <GLButton variant="nav" className="title_font">
                    Admin
                  </GLButton>
                  <ul className="dropdown-content hover_fade_in w-175px">
                    <Link to="/secure/glow/dashboard">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Dashboard
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/orders" onClick={() => dispatch(clear_order_state())}>
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Orders
                      </GLButton>
                    </Link>
                    <Link
                      to={`/secure/glow/products?search=&filters=%7B"hidden"%3A%5B%5D%2C"options"%3A%5B%5D%7D&page=0&pageSize=10&sorting=%5B3%2C"desc"%5D`}
                    >
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Products
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/users">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Users
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/affiliates">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Affiliates
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/wholesalers">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Wholesalers
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/tutorials">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Tutorials
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/images">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Images
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/paychecks">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Paychecks
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/promos">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Promos
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/carts">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Carts
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/chips">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Chips
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/surveys">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Surveys
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/teams">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Teams
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/contents">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Contents
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/emails">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Emails
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/expenses">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Expenses
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/features">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Features
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/logs">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Logs
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/parcels">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Parcels
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/categorys">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Categorys
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/settings">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Settings
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/palettes">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Palettes
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/filaments">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Filaments
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/edit_all_data">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Edit All Data
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/gcode_continous">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Gcode
                      </GLButton>
                    </Link>
                    <Link to="/secure/glow/image_compressor">
                      <GLButton variant="nav" fullWidth className="ta-l">
                        Compressor
                      </GLButton>
                    </Link>
                    <GLButton variant="nav" fullWidth className="ta-l" onClick={() => API.updateVersion()}>
                      Update Version
                    </GLButton>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {show_search_bar && (
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

                <GLButton type="submit" variant="primary" className="w-50px mb-0px">
                  <Search />
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
