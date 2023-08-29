import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { update_products_url } from "../../utils/helper_functions";
import { GLButton } from "../GlowLEDsComponents";
import Filter from "../GlowLEDsComponents/GLTable/Filter";
import * as API from "../../api";

const Sidebar = () => {
  const navigate = useNavigate();

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /** Alert if clicked on outside of element */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert('You clicked outside of me!');
          if (
            document.querySelector(".sidebar") &&
            document.querySelector(".side-btn") &&
            document.querySelector(".head-btn")
          ) {
            document.querySelector(".sidebar").classList.remove("open");
            document.querySelector(".side-btn").classList.remove("active");
            document.querySelector(".side-btn").classList.add("not-active");
            document.querySelector(".head-btn").classList.remove("active");
            document.querySelector(".head-btn").classList.add("not-active");
          }
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
    document.querySelector(".side-btn").classList.remove("active");
    document.querySelector(".side-btn").classList.add("not-active");
    document.querySelector(".head-btn").classList.remove("active");
    document.querySelector(".head-btn").classList.add("not-active");
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(API.logoutUser(refreshToken));
    closeMenu();
    navigate("/account/login");
  };

  const [first_name, set_first_name] = useState("");
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

  const show_hide = id => {
    const current_menu = document.getElementById(id);

    current_menu.classList.toggle("hide-menu");
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, [dispatch]);

  // var btn = $('.side-btn');
  // var btn = document.querySelector('.side-btn');

  // btn.on('click', function() {
  //   $(this).toggleClass('active');
  //   $(this).toggleClass('not-active');
  // });
  // btn.addEventListener('click', function(e) {
  // 	// check the target has an attribute of `a[href^="http"]`
  // 	btn.classList.toggle('active');
  // 	btn.classList.toggle('not-active');
  // });

  const chipPage = useSelector(state => state.chips);
  const { chips: chips_list } = chipPage;

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
    <aside ref={wrapperRef} className="sidebar" style={{ top: "0px", overflowY: "scroll", zIndex: 4 }}>
      {/* <div className="logo_text mh-auto ai-c p-1rem pb-0px">
				<Link to="/" aria-label="Home Page">
					<div className="h-40px w-40px">
						<img
							className="zoom logo_s"
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs Logo"
							title="Small Logo"
						/>
					</div>
				</Link>
				<Link to="/" aria-label="Home Page">
					<div className="row">
						<label className="ml-5px fs-25px mv-0px ff-h">Glow LEDs</label>
					</div>
				</Link>
			</div> */}
      <div />
      <div className="h-40px bg-primary ta-c title_font ai-c w-100per">
        <p className="w-100per fs-20px mt-24px">Find Your Glow</p>
      </div>
      <div className="ai-c">
        <div className="ai-c">
          <Link to="/" aria-label="Home Page">
            <div className="h-30px w-30px">
              <img
                className="zoom logo_s"
                src="/images/optimized_images/logo_images/glow_logo_optimized.png"
                alt="Glow LEDs Logo"
                title="Small Logo"
              />
            </div>
          </Link>

          <GLButton className="sidebar_close_button" aria-label="Close" onClick={closeMenu}>
            <div className="box ">
              <div className="side-btn active">
                <span className="span" />
                <span className="span" />
                <span className="span" />
              </div>
            </div>
          </GLButton>
        </div>
        <Link to="/" aria-label="Home Page">
          <label className="fs-20px mv-0px ff-h mr-20px ta-c">GL</label>
        </Link>
      </div>

      <nav className="h-63vh">
        <Link to="/">
          <GLButton className="sidebar-btn primary" onClick={closeMenu}>
            Home
          </GLButton>
        </Link>
        {current_user && current_user.hasOwnProperty("first_name") ? (
          <div className="sidebar_dropdown">
            <div className="sidebar-btn-container">
              <GLButton className="sidebar-btn primary">{first_name}</GLButton>
              <GLButton className="sidebar-btn-dropdown" onClick={() => show_hide("user_dropdown")} aria-label="Show">
                <i className="fas fa-sort-up" />
              </GLButton>
            </div>
            <ul className="sidebar_dropdown_container" id="user_dropdown">
              <Link to={`/secure/account/profile`}>
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Profile
                </GLButton>
              </Link>
              <GLButton onClick={handleLogout} className=" sidebar-btn secondary">
                {" "}
                Logout
              </GLButton>
            </ul>
          </div>
        ) : (
          <Link to="/account/login">
            <GLButton className="sidebar-btn primary" onClick={closeMenu}>
              Login
            </GLButton>
          </Link>
        )}
        <div className="sidebar_dropdown">
          <div className="sidebar-btn-container">
            <GLButton className="sidebar-btn primary">
              <Link to="/pages/menu/gloving" onClick={closeMenu}>
                Shop
              </Link>
            </GLButton>
            <GLButton className="sidebar-btn-dropdown" onClick={() => show_hide("products_dropdown")} aria-label="Show">
              <i className="fas fa-sort-up" />
            </GLButton>
          </div>

          <ul className="sidebar_dropdown_container" id="products_dropdown">
            <div className="sidebar_dropdown_nested">
              <div className="sidebar-btn-container">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  <Link to="/pages/menu/gloving">Enhancers </Link>
                </GLButton>
                <GLButton
                  className="sidebar-btn-dropdown"
                  onClick={() => show_hide("gloving_dropdown")}
                  aria-label="Show"
                >
                  <i className="fas fa-sort-up" />
                </GLButton>
              </div>
              <ul className="sidebar_dropdown_secondary_container" id="gloving_dropdown">
                {/* {browser_check() !== "safari" ? (
                  <Link to="/collections/all/products/glowstringz_v2">
                    <GLButton
                      className={`sidebar-btn nested  special_font gradient-btn`}
                      onClick={closeMenu}
                    >
                      <span>GLOWSTRINGZ V2</span>
                    </GLButton>
                  </Link>
                ) : (
                  <Link
                    to="/collections/all/products/glowstringz_v2"
                    onClick={closeMenu}
                  >
                    <GLButton  className={`sidebar-btn nested `}>
                      <span>Glowstringz V2</span>
                    </GLButton>
                  </Link>
                )} */}
                <div className="sidebar_dropdown_nested">
                  <div className="sidebar-btn-container">
                    <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                      <Link to="/collections/all/products/category/glowskinz">Glowskinz</Link>
                    </GLButton>
                    <GLButton
                      className="sidebar-btn-dropdown"
                      onClick={() => show_hide("glowskinz_dropdown_2")}
                      aria-label="Show"
                    >
                      <i className="fas fa-sort-up" />
                    </GLButton>
                  </div>
                  <ul className="sidebar_dropdown_nested_container" id="glowskinz_dropdown_2">
                    <div className="sidebar_dropdown_nested">
                      {/* <GLButton  className="sidebar-btn secondary">Collections</GLButton> */}
                      <div className="sidebar-btn-container">
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd" className="w-100per">
                          <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                            CLOZD Glowskinz
                          </GLButton>
                        </Link>
                        <GLButton
                          className="sidebar-btn-dropdown"
                          onClick={() => show_hide("clozd_glowskinz_dropdown")}
                          aria-label="Show"
                        >
                          <i className="fas fa-sort-up" />
                        </GLButton>
                      </div>
                      <ul className="sidebar_dropdown_nested_2_container" id="clozd_glowskinz_dropdown">
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/classics">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Classics
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/glowskinz/subcategory/clozd/collection/novaskinz">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Novaskinz
                          </GLButton>
                        </Link>
                      </ul>
                    </div>
                    <Link to="/collections/all/products/category/glowskinz/subcategory/opyn">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        OPYN Glowskinz
                      </GLButton>
                    </Link>
                  </ul>
                </div>
                <Link to="/collections/all/products/category/glowframez">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Glowframez
                  </GLButton>
                </Link>
                <div className="sidebar_dropdown_nested">
                  <div className="sidebar-btn-container">
                    <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                      <Link to="/collections/all/products/category/exo_diffusers">EXO Diffusers</Link>
                    </GLButton>
                    <GLButton
                      className="sidebar-btn-dropdown"
                      onClick={() => show_hide("exo_diffuseres_dropdown")}
                      aria-label="Show"
                    >
                      <i className="fas fa-sort-up" />
                    </GLButton>
                  </div>
                  <ul className="sidebar_dropdown_nested_container" id="exo_diffuseres_dropdown">
                    <div className="sidebar_dropdown_nested">
                      {/* <GLButton  className="sidebar-btn secondary">Collections</GLButton> */}
                      <div className="sidebar-btn-container">
                        <Link to="/collections/all/products/category/exo_diffuser" className="w-100per">
                          <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                            Collections
                          </GLButton>
                        </Link>
                        <GLButton
                          className="sidebar-btn-dropdown"
                          onClick={() => show_hide("exo_collection_dropdown")}
                          aria-label="Show"
                        >
                          <i className="fas fa-sort-up" />
                        </GLButton>
                      </div>
                      <ul className="sidebar_dropdown_nested_2_container" id="exo_collection_dropdown">
                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Platonic Solids
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/exo_diffusers/subcategory/domes/collection/spheroid">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Spheroid
                          </GLButton>
                        </Link>
                      </ul>
                    </div>
                    <Link to="/collections/all/products/category/exo_diffusers/subcategory/polyhedrons">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Polyhedrons
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/exo_diffusers/subcategory/domes">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Domes
                      </GLButton>
                    </Link>
                  </ul>
                </div>
                <div className="sidebar_dropdown_nested">
                  <div className="sidebar-btn-container">
                    <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                      <Link to="/collections/all/products/category/diffuser_caps">Diffuser Caps</Link>
                    </GLButton>
                    <GLButton
                      className="sidebar-btn-dropdown"
                      onClick={() => show_hide("glowskinz_dropdown_4")}
                      aria-label="Show"
                    >
                      <i className="fas fa-sort-up" />
                    </GLButton>
                  </div>
                  <ul className="sidebar_dropdown_nested_container" id="glowskinz_dropdown_4">
                    <div className="sidebar_dropdown_nested">
                      {/* <GLButton  className="sidebar-btn secondary">Collections</GLButton> */}
                      <div className="sidebar-btn-container">
                        <Link to="/pages/menu/collections" className="w-100per">
                          <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                            Collections
                          </GLButton>
                        </Link>
                        <GLButton
                          className="sidebar-btn-dropdown"
                          onClick={() => show_hide("glowskinz_dropdown_5")}
                          aria-label="Show"
                        >
                          <i className="fas fa-sort-up" />
                        </GLButton>
                      </div>
                      <ul className="sidebar_dropdown_nested_2_container" id="glowskinz_dropdown_5">
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/texture">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Texture
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/fractal">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Fractal
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/space_cadet">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Space Cadet
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/festie_bestie">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Festie Bestie
                          </GLButton>
                        </Link>
                        <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids">
                          <GLButton className="sidebar-btn nested-3" onClick={closeMenu}>
                            Platonic Solids
                          </GLButton>
                        </Link>
                      </ul>
                    </div>
                    <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Geomotric
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Shapes
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Abstract
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Patterns
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffuser_caps/subcategory/imperfect">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Imperfect
                      </GLButton>
                    </Link>
                  </ul>
                </div>

                <div className="sidebar_dropdown_nested">
                  <div className="sidebar-btn-container">
                    <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                      <Link to="/collections/all/products/category/diffusers">Diffusers </Link>
                    </GLButton>
                    <GLButton
                      className="sidebar-btn-dropdown"
                      onClick={() => show_hide("glowskinz_dropdown_3")}
                      aria-label="Show"
                    >
                      <i className="fas fa-sort-up" />
                    </GLButton>
                  </div>
                  <ul className="sidebar_dropdown_nested_container" id="glowskinz_dropdown_3">
                    <Link to="/collections/all/products/category/diffusers/subcategory/abstract">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Abstract
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffusers/subcategory/polygons">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Polygons
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffusers/subcategory/cylinders">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Cylinders
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffusers/subcategory/domes">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Domes
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffusers/subcategory/open_hole">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Open Hole
                      </GLButton>
                    </Link>
                    <Link to="/collections/all/products/category/diffusers/subcategory/closed_hole">
                      <GLButton className="sidebar-btn nested-2" onClick={closeMenu}>
                        Closed Hole
                      </GLButton>
                    </Link>
                  </ul>
                </div>
                <Link to="/collections/all/products/category/decals">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Decals
                  </GLButton>
                </Link>
              </ul>
            </div>
            <div className="sidebar-btn-container">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Essentials
              </GLButton>
              <GLButton
                className="sidebar-btn-dropdown"
                onClick={() => show_hide("glowskinz_dropdown_6")}
                aria-label="Show"
              >
                <i className="fas fa-sort-up" />
              </GLButton>
            </div>
            <ul className="sidebar_dropdown_secondary_container" id="glowskinz_dropdown_6">
              <Link to="/collections/all/products/category/gloves/subcategory/singles">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Supreme Gloves
                </GLButton>
              </Link>
              <Link to="/collections/all/products/category/gloves/subcategory/refresh">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Refresh Packs
                </GLButton>
              </Link>
              <Link to="/collections/all/products/category/gloves/subcategory/sampler">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Sizing Samplers
                </GLButton>
              </Link>
              <Link to="/collections/all/products/category/batteries/subcategory/coin">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Coin Batteries
                </GLButton>
              </Link>
              <Link to="/collections/all/products/category/batteries/subcategory/storage">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Battery Storage
                </GLButton>
              </Link>
              {current_user?.isWholesaler && (
                <Link to="/collections/all/products/category/wholesale">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Wholesale
                  </GLButton>
                </Link>
              )}
            </ul>
            <Link to="/collections/all/products/shop_by_chip">
              <GLButton className="sidebar-btn secondary" style={{ padding: "7px 10px 7px 20px" }} onClick={closeMenu}>
                Shop By Chip
              </GLButton>
            </Link>
            <div style={{ marginLeft: -"5px" }} className="sidebar-btn secondary pl-0px">
              <Filter
                title="Shop By Chip"
                width="100per"
                state={chip_name}
                filterHandler={filterHandler}
                filter_options={chips_list}
              />
            </div>
            <Link to="/collections/all/products/category/new_releases">
              <GLButton className="sidebar-btn secondary" style={{ padding: "7px 10px 7px 20px" }} onClick={closeMenu}>
                New Releases! 🆕
              </GLButton>
            </Link>
            <Link to="/collections/all/products/category/best_sellers">
              <GLButton className="sidebar-btn secondary" style={{ padding: "7px 10px 7px 20px" }} onClick={closeMenu}>
                Best Sellers ✅
              </GLButton>
            </Link>
            <Link to="/collections/all/products/category/our_picks">
              <GLButton className="sidebar-btn secondary" style={{ padding: "7px 10px 7px 20px" }} onClick={closeMenu}>
                Our Picks ⭐
              </GLButton>
            </Link>
            <Link to="/collections/all/products/category/discounted">
              <GLButton className="sidebar-btn secondary" style={{ padding: "7px 10px 7px 20px" }} onClick={closeMenu}>
                On Sale! 💰
              </GLButton>
            </Link>
            <Link to="/collections/all/products/category/merch/subcategory/stickers">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Stickers
              </GLButton>
            </Link>
            {/* <Link to="/collections/all/products/custom_product_deposit">
              <GLButton  className="sidebar-btn secondary" onClick={closeMenu}>
                Customize Any Product!
              </GLButton>
            </Link> */}
            {/* <Link to="/collections/all/products/glowstringz_v2">
							<GLButton  className="sidebar-btn secondary special_font gradient-btn" onClick={closeMenu}>
								Glowstringz V2
							</GLButton>
						</Link> */}
            {/* {browser_check() !== 'safari' ? (
							<Link to="/collections/all/products/glowstringz_v2">
								<GLButton
									className={`sidebar-btn secondary  special_font gradient-btn`}
									onClick={closeMenu}
								>
									<span>GLOWSTRINGZ V2</span>
								</GLButton>
							</Link>
						) : (
							<Link to="/collections/all/products/glowstringz_v2" onClick={closeMenu}>
								<GLButton  className={`sidebar-btn secondary `}>
									<span>Glowstringz V2</span>
								</GLButton>
							</Link>
						)} */}
          </ul>
          {/* <GLButton
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('products_dropdown')}
					>
						<i className="fas fa-sort-up" />
					</GLButton> */}
        </div>
        <Link to="/collections/all/tutorials">
          <GLButton className="sidebar-btn primary" onClick={closeMenu}>
            Learn
          </GLButton>
        </Link>
        <div className="sidebar_dropdown">
          {/* <div className="sidebar-btn-container">
            <GLButton className="sidebar-btn primary" onClick={closeMenu}>
              <Link to="/collections/all/sponsors">Our Team</Link>
            </GLButton>
            <GLButton className="sidebar-btn-dropdown" onClick={() => show_hide("our_team_dropdown")} aria-label="Show">
              <i className="fas fa-sort-up" />
            </GLButton>
          </div>
          <ul className="sidebar_dropdown_container" id="our_team_dropdown">
            <div className="sidebar_dropdown_nested">
              <Link to="/collections/all/sponsors">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Sponsored Glovers
                </GLButton>
              </Link>
              <Link to="/collections/all/teams">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Sponsored Teams
                </GLButton>
              </Link>
              <Link to="/collections/all/teams/category/rave_mob">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Rave Mob
                </GLButton>
              </Link>
            </div>
          </ul> */}

          <div className="sidebar-btn-container">
            <GLButton className="sidebar-btn primary" onClick={closeMenu}>
              <Link to="/pages/menu/featured">Community</Link>
            </GLButton>
            <GLButton
              className="sidebar-btn-dropdown"
              onClick={() => show_hide("community_dropdown")}
              aria-label="Show"
            >
              <i className="fas fa-sort-up" />
            </GLButton>
          </div>
          <ul className="sidebar_dropdown_container" id="community_dropdown">
            <Link to="/collections/all/sponsors">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Sponsored Glovers
              </GLButton>
            </Link>
            <Link to="/collections/all/teams">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Sponsored Teams
              </GLButton>
            </Link>
            <Link to="/collections/all/teams/category/rave_mob">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Rave Mob
              </GLButton>
            </Link>
            <div className="sidebar-btn-container">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                <Link to="/pages/menu/featured">Featured</Link>
              </GLButton>
              <GLButton
                className="sidebar-btn-dropdown"
                onClick={() => show_hide("nested_faq_dropdown")}
                aria-label="Show"
              >
                <i className="fas fa-sort-up" />
              </GLButton>
            </div>
            <ul className="sidebar_dropdown_secondary_container" id="nested_faq_dropdown">
              <Link to="/collections/all/features/category/glovers">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Glovers
                </GLButton>
              </Link>
              <Link to="/collections/all/features/category/artists">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Artists
                </GLButton>
              </Link>
              <Link to="/collections/all/features/category/producers">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  Producers
                </GLButton>
              </Link>
              <Link to="/collections/all/features/category/vfx">
                <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                  VFX
                </GLButton>
              </Link>
            </ul>
          </ul>
        </div>
        <div className="sidebar_dropdown">
          {/* <GLButton  className="sidebar-btn primary" onClick={closeMenu}>
						<Link to="/pages/menu/support">Support</Link>
					</GLButton> */}
          <div className="sidebar-btn-container">
            <GLButton className="sidebar-btn primary" onClick={closeMenu}>
              <Link to="/pages/menu/support">Support</Link>
            </GLButton>
            <GLButton className="sidebar-btn-dropdown" onClick={() => show_hide("support_dropdown")} aria-label="Show">
              <i className="fas fa-sort-up" />
            </GLButton>
          </div>
          <ul className="sidebar_dropdown_container" id="support_dropdown">
            <div className="sidebar_dropdown_secondary">
              <div className="sidebar-btn-container">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  <Link to="/pages/faq">FAQ</Link>
                </GLButton>
                <GLButton
                  className="sidebar-btn-dropdown"
                  onClick={() => show_hide("nested_faq_dropdown")}
                  aria-label="Show"
                >
                  <i className="fas fa-sort-up" />
                </GLButton>
              </div>
              <ul className="sidebar_dropdown_secondary_container" id="nested_faq_dropdown">
                <HashLink href="/pages/faq#glowskinz">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Glowskinz
                  </GLButton>
                </HashLink>
                <HashLink href="/pages/faq#using_diffuser_caps_and_adapters">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Diffuser Caps
                  </GLButton>
                </HashLink>
                <HashLink href="/pages/faq#ordering_custom_products">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Ordering Custom Products
                  </GLButton>
                </HashLink>
                <HashLink href="/pages/faq#featured_content">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Featured Content
                  </GLButton>
                </HashLink>
                <HashLink href="/pages/faq#processing_shipping">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Processing/Shipping
                  </GLButton>
                </HashLink>
                <HashLink href="/pages/faq#order_issues">
                  <GLButton className="sidebar-btn nested" onClick={closeMenu}>
                    Order Issues
                  </GLButton>
                </HashLink>
              </ul>
            </div>

            <Link to="/pages/contact">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Contact
              </GLButton>
            </Link>
            <Link to="/pages/track_your_order">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Track Your Order
              </GLButton>
            </Link>
            <Link to="/pages/about">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                About
              </GLButton>
            </Link>
            {/* <Link to="/pages/events">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Events
              </GLButton>
            </Link> */}
            {/* <Link to="/pages/menu/manuals">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Manuals
              </GLButton>
            </Link> */}

            <Link to="/pages/terms">
              <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                Terms and Conditions
              </GLButton>
            </Link>
          </ul>
          {/* <GLButton
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('support_dropdown')}
					>
						<i className="fas fa-sort-up" />
					</GLButton> */}
        </div>
        {current_user?.isAdmin && (
          <div className="sidebar_dropdown">
            {/* <GLButton  className="sidebar-btn primary">Admin</GLButton> */}
            <div className="sidebar-btn-container">
              <GLButton className="sidebar-btn primary" onClick={closeMenu}>
                Admin
              </GLButton>
              <GLButton className="sidebar-btn-dropdown" onClick={() => show_hide("admin_dropdown")} aria-label="Show">
                <i className="fas fa-sort-up" />
              </GLButton>
            </div>
            <ul className="sidebar_dropdown_container" id="admin_dropdown">
              <Link to="/secure/glow/dashboard">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Dashboard
                </GLButton>
              </Link>
              <Link to="/secure/glow/orders">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Orders
                </GLButton>
              </Link>
              <Link to="/secure/glow/products">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Products
                </GLButton>
              </Link>
              <Link to="/secure/glow/users">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Users
                </GLButton>
              </Link>
              <Link to="/secure/glow/affiliates">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Affiliates
                </GLButton>
              </Link>
              <Link to="/secure/glow/wholesalers">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Wholesalers
                </GLButton>
              </Link>
              <Link to="/secure/glow/tutorials">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Tutorials
                </GLButton>
              </Link>
              <Link to="/secure/glow/images">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Images
                </GLButton>
              </Link>
              <Link to="/secure/glow/paychecks">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Paychecks
                </GLButton>
              </Link>
              <Link to="/secure/glow/promos">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Promos
                </GLButton>
              </Link>
              <Link to="/secure/glow/teams">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Teams
                </GLButton>
              </Link>
              <Link to="/secure/glow/carts">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Carts
                </GLButton>
              </Link>
              <Link to="/secure/glow/chips">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Chips
                </GLButton>
              </Link>
              <Link to="/secure/glow/surveys">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Surveys
                </GLButton>
              </Link>
              <Link to="/secure/glow/contents">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Contents
                </GLButton>
              </Link>
              <Link to="/secure/glow/emails">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Emails
                </GLButton>
              </Link>
              <Link to="/secure/glow/expenses">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Expenses
                </GLButton>
              </Link>
              <Link to="/secure/glow/features">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Features
                </GLButton>
              </Link>
              <Link to="/secure/glow/logs">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Logs
                </GLButton>
              </Link>
              <Link to="/secure/glow/parcels">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Parcels
                </GLButton>
              </Link>
              <Link to="/secure/glow/categorys">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Categorys
                </GLButton>
              </Link>
              <Link to="/secure/glow/settings">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Settings
                </GLButton>
              </Link>
              <Link to="/secure/glow/palettes">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Palettes
                </GLButton>
              </Link>
              <Link to="/secure/glow/filaments">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Filaments
                </GLButton>
              </Link>
              <Link to="/secure/glow/edit_all_data">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Edit All Data
                </GLButton>
              </Link>
              <Link to="/secure/glow/gcode_continous">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Gcode
                </GLButton>
              </Link>
              <Link to="/secure/glow/iamge_compressor">
                <GLButton className="sidebar-btn secondary" onClick={closeMenu}>
                  Compressor
                </GLButton>
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
