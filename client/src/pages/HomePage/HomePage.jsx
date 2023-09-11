import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { categories, homepage_videos, humanize, subcategories } from "../../utils/helper_functions";
import { API_Content, API_Products } from "../../utils";
import useWindowDimensions from "../../shared/Hooks/windowDimensions";
import { Loading, Notification } from "../../shared/SharedComponents";
import { GLButton } from "../../shared/GlowLEDsComponents";
import HomeSlideshow from "./HomeSlideshow";
import ReadMore from "../../shared/GlowLEDsComponents/GLReadMore/ReadMore";
import * as API from "../../api";
import { set_show_search_bar } from "../../slices/settingSlice";

const HomePage = () => {
  const navigate = useNavigate();

  const [display, setDisplay] = useState(false);
  const [loading, set_loading] = useState(false);
  const [options, set_options] = useState([]);
  const [search, set_search] = useState("");
  const [message, set_message] = useState("");
  const wrapperRef = useRef(null);

  const { height, width } = useWindowDimensions();

  const contentPage = useSelector(state => state.contents.contentPage);
  const { contents } = contentPage;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      sessionStorage.setItem("promo_code", code);
      set_message(`Code ${code} Added to Checkout`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    dispatch(set_show_search_bar(false));
    return () => {
      dispatch(set_show_search_bar(true));
    };
  }, []);

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

  const featurePage = useSelector(state => state.features);
  const { features } = featurePage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listFeatures({}));
      findAllGrid_products_a();
      // get_display_content();
    }
    return () => (clean = false);
  }, []);

  // const get_display_content = async () => {
  //   const { data } = await API_Content.get_display_content();

  //   if (data) {
  //     set_slideshow(data[0].home_page.slideshow);
  //   }
  // };
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

  const determine_welcome_font_size = width => {
    if (width > 1500) {
      return "fs-40px";
    } else if (width < 1500 && width > 1100) {
      return "fs-35px";
    } else if (width < 528 && width > 529) {
      return "fs-25px";
    } else if (width < 438 && width > 300) {
      return "fs-20px";
    }
  };
  const determine_innovators_font_size = width => {
    if (width > 1500) {
      return "fs-25px";
    } else if (width < 1500 && width > 1100) {
      return "fs-25px";
    } else if (width < 528 && width > 529) {
      return "fs-20px";
    } else if (width < 438 && width > 300) {
      return "fs-16px";
    }
  };

  return (
    <div className="main_container">
      <Helmet>
        <title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
        <meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
        <meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
        <link rel="canonical" href="https://www.glow-leds.com/" />
        <meta property="og:url" content="https://www.glow-leds.com" />
        <meta
          name="description"
          content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        />

        <meta
          property="og:description"
          content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        />
        <meta
          name="twitter:description"
          content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        />
        <meta
          property="og:image"
          content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
        />

        <meta
          name="twitter:image"
          content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
        />
      </Helmet>

      <Loading loading={contents.length > 0 && contents[0]?.home_page?.slideshow?.length === 0} />
      {contents &&
      contents.filter(content => content.active === true)[0] &&
      contents.filter(content => content.active === true)[0]?.home_page?.banner_image_object.link ? (
        <img
          style={{ borderRadius: "20px", width: "100%" }}
          src={contents.filter(content => content.active === true)[0]?.home_page?.banner_image_object.link}
          className="jc-c mb-20px"
          alt="Promo"
          title="Promo Image"
        />
      ) : (
        <div></div>
      )}

      <div>
        {width > 1019 && (
          <div>
            {contents.length > 0 && contents[0]?.home_page?.slideshow?.length > 0 ? (
              <div className="carousel-wrapper pos-rel">
                {<HomeSlideshow slideshow={contents[0]?.home_page?.slideshow} />}

                <div
                  className="pos-abs max-w-900px m-auto p-10px ph-20px br-10px w-100per"
                  style={{
                    backgroundColor: "#6a6c8091",
                    top: "100px",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  <div className="jc-c">
                    <h1 className={`welcome_text mb-1rem ta-c ${determine_welcome_font_size(width)}`}>
                      Welcome to Glow-LEDs
                    </h1>
                  </div>
                  <div className="jc-c">
                    <h2 className={`mb-1rem ta-c lh-25px ${determine_innovators_font_size(width)}`}>
                      Innovators of Gloving and Flow Art Technology
                    </h2>
                  </div>

                  <div className="jc-c">
                    <form onSubmit={submitHandler} className="jc-c w-100per mv-20px">
                      <div className="jc-b ai-c search_container w-100per max-w-600px">
                        <div ref={wrapperRef} className="flex-container flex-column pos-rel w-100per max-w-600px">
                          <input
                            id="auto"
                            autoComplete="off"
                            onClick={() => setDisplay(true)}
                            className="form_input search mv-0px w-100per fs-20px"
                            placeholder="Find Your Glow Here"
                            value={search}
                            onChange={e => set_search(e.target.value)}
                          />
                          {display && (
                            <div className="pos-abs bg-primary br-10px">
                              {options
                                .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                                .slice(0, 20)
                                .map((value, i) => {
                                  return (
                                    <div
                                      onClick={() => update_list(value.name)}
                                      className="auto-option ai-c jc-b w-600px p-5px"
                                      key={i}
                                      tabIndex="0"
                                    >
                                      <span className="fs-20px" style={{ color: "white" }}>
                                        {value.name}
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                        <GLButton type="submit" variant="primary" className="w-50px fs-20px mb-0px" aria-label="Search">
                          <i className="fas fa-search" />
                        </GLButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="carousel-wrapper pos-rel">
                <div className="skeleton-img skeleton" />
                <div
                  className="pos-abs max-w-900px m-auto p-10px ph-20px br-10px w-100per"
                  style={{
                    backgroundColor: "#6a6c8091",
                    top: "100px",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  <div className="jc-c">
                    <h1 className={`welcome_text mv-2rem ta-c ${determine_welcome_font_size(width)}`}>
                      Welcome to Glow-LEDs
                    </h1>
                  </div>
                  <div className="jc-c">
                    <h2 className={`mb-1rem ta-c lh-25px ${determine_innovators_font_size(width)}`}>
                      Innovators of Gloving and Flow Art Technology
                    </h2>
                  </div>

                  <div className="jc-c">
                    <form onSubmit={submitHandler} className="jc-c w-100per mv-20px">
                      <div className="jc-b ai-c search_container w-100per max-w-600px">
                        <div ref={wrapperRef} className="flex-container flex-column pos-rel w-100per max-w-600px">
                          <input
                            id="auto"
                            autoComplete="off"
                            onClick={() => setDisplay(true)}
                            className="form_input search mv-0px w-100per fs-20px"
                            placeholder="Find Your Glow Here"
                            value={search}
                            onChange={e => set_search(e.target.value)}
                          />
                          {display && (
                            <div className="pos-abs bg-primary br-10px">
                              {options
                                .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                                .slice(0, 20)
                                .map((value, i) => {
                                  return (
                                    <div
                                      onClick={() => update_list(value.name)}
                                      className="auto-option ai-c jc-b w-600px p-5px"
                                      key={i}
                                      tabIndex="0"
                                    >
                                      <span className="fs-20px" style={{ color: "white" }}>
                                        {value.name}
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                        <GLButton type="submit" variant="primary" className="w-50px fs-20px mb-0px" aria-label="Search">
                          <i className="fas fa-search" />
                        </GLButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {width < 1019 && (
          <div>
            {contents[0]?.home_page?.slideshow.length > 0 ? (
              <div className="carousel-wrapper ">
                <div
                  className="max-w-900px m-auto p-10px ph-20px br-10px w-100per mb-2rem"
                  style={
                    {
                      // backgroundColor: '#6a6c8091'
                    }
                  }
                >
                  <div className="jc-c">
                    <h1 className={`welcome_text mv-2rem ta-c ${determine_welcome_font_size(width)}`}>
                      Welcome to Glow-LEDs
                    </h1>
                  </div>
                  <div className="jc-c">
                    <h2 className={`mb-1rem ta-c lh-25px ${determine_innovators_font_size(width)}`}>
                      Innovators of Gloving and Flow Art Technology
                    </h2>
                  </div>

                  <div className="jc-c">
                    <form onSubmit={submitHandler} className="jc-c w-100per mv-20px">
                      <div className="jc-b ai-c search_container w-100per max-w-600px">
                        <div ref={wrapperRef} className="flex-container flex-column pos-rel w-100per max-w-600px">
                          <input
                            id="auto"
                            autoComplete="off"
                            onClick={() => setDisplay(true)}
                            className="form_input search mv-0px w-100per fs-20px"
                            placeholder="Find Your Glow Here"
                            value={search}
                            onChange={e => set_search(e.target.value)}
                          />
                          {display && (
                            <div className="pos-abs bg-primary br-10px z-pos-2">
                              {options
                                .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                                .slice(0, 20)
                                .map((value, i) => {
                                  return (
                                    <div
                                      onClick={() => update_list(value.name)}
                                      className="auto-option ai-c jc-b w-600px p-5px"
                                      key={i}
                                      tabIndex="0"
                                    >
                                      <span className="fs-20px" style={{ color: "white" }}>
                                        {value.name}
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                        <GLButton type="submit" variant="primary" className="w-50px fs-20px mb-0px" aria-label="Search">
                          <i className="fas fa-search" />
                        </GLButton>
                      </div>
                    </form>
                  </div>
                </div>
                {<HomeSlideshow slideshow={contents[0]?.home_page?.slideshow} />}
              </div>
            ) : (
              <div
                className="max-w-900px m-auto p-10px ph-20px br-10px w-100per mb-2rem"
                style={
                  {
                    // backgroundColor: '#6a6c8091'
                  }
                }
              >
                <div className="jc-c">
                  <h1 className={`welcome_text mb-1rem ta-c ${determine_welcome_font_size(width)}`}>
                    Welcome to Glow-LEDs
                  </h1>
                </div>
                <div className="jc-c">
                  <h2 className={`mb-1rem ta-c lh-30px ${determine_innovators_font_size(width)}`}>
                    Innovators of Gloving and Flow Art Technology
                  </h2>
                </div>

                <div className="jc-c">
                  <form onSubmit={submitHandler} className="jc-c w-100per mv-20px">
                    <div className="jc-b ai-c search_container w-100per max-w-600px">
                      <div ref={wrapperRef} className="flex-container flex-column pos-rel w-100per max-w-600px">
                        <input
                          id="auto"
                          autoComplete="off"
                          onClick={() => setDisplay(true)}
                          className="form_input search mv-0px w-100per fs-20px"
                          placeholder="Find Your Glow Here"
                          value={search}
                          onChange={e => set_search(e.target.value)}
                        />
                        {display && (
                          <div className="pos-abs bg-primary br-10px z-pos-2">
                            {options
                              .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                              .slice(0, 20)
                              .map((value, i) => {
                                return (
                                  <div
                                    onClick={() => update_list(value.name)}
                                    className="auto-option ai-c jc-b w-600px p-5px"
                                    key={i}
                                    tabIndex="0"
                                  >
                                    <span className="fs-20px" style={{ color: "white" }}>
                                      {value.name}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                      <GLButton type="submit" variant="primary" className="w-50px fs-20px mb-0px" aria-label="Search">
                        <i className="fas fa-search" />
                      </GLButton>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: contents[0]?.home_page?.slideshow.length === 0 ? 0 : "-25%" }} className="pv-2rem">
        <div className="jc-c">
          <div>
            <p
              style={{
                fontSize: "16px",
                width: "100%",
                lineHeight: "30px",
                margin: "1rem",
                color: "white",
                textAlign: "center",
              }}
            >
              Here at Glow LEDs we aim to be the biggest innovators in the gloving industry.
            </p>

            <div style={{ borderBottom: "1px white solid" }} className="m-auto max-w-800px" />

            <p
              style={{
                fontSize: "16px",
                width: "100%",
                lineHeight: "30px",
                margin: "1rem",
                color: "white",
                textAlign: "center",
              }}
            >
              Some of our most popular inventions include EXO Diffusers, Decals, Diffuser Caps and Glowskinz! We've even
              put our own spin on gloves and batteries! Plus we're one of the few places where you can order Custom
              gloving accessories.
            </p>

            <div style={{ borderBottom: "1px white solid" }} className="m-auto max-w-800px" />

            <p
              style={{
                fontSize: "16px",
                width: "100%",
                lineHeight: "30px",
                margin: "1rem",
                color: "white",
                textAlign: "center",
              }}
            >
              We are ran by a very small team of people who are dedicated to listening to the community and creating
              what's most wanted. Our products are made by hand to order, so every order is made with love.
            </p>
          </div>
        </div>
      </div>

      <div className={`${width > 1019 ? "jc-b" : "jc-c"} wrap`}>
        {contents &&
          contents
            .filter(content => content.active === true)
            .slice(0, width > 1473 ? 3 : width > 1019 ? 2 : 1)
            .map(({ home_page }, index) => {
              return (
                <div
                  key={index}
                  className={`container ${
                    width > 1473 ? "max-w-450px" : width > 1019 ? `w-49per ${index === 0 ? "mr-1rem" : ""}` : "w-100per"
                  } jc-b column bg-secondary`}
                >
                  <div>
                    <h4 className="fs-20px mv-8px ta-c jc-c title_font lh-30px">{home_page.h1}</h4>
                    {home_page.show_image && home_page.images_object && (
                      <div className="m-auto jc-c max-w-300px">
                        <Link to={home_page.link}>
                          <img
                            style={{ borderRadius: "20px", width: "100%" }}
                            src={home_page?.images_object[0]?.link}
                            className="max-w-300px jc-c m-auto"
                            alt="Promo"
                            title="Promo Image"
                          />
                        </Link>
                      </div>
                    )}

                    <div className="m-auto jc-c max-w-300px">
                      {!home_page.show_image && home_page.images_object && (
                        <Link to={home_page.link} className="home_page_pictures">
                          {home_page?.images_object.map((image, index) => (
                            <img
                              key={index}
                              src={image.link}
                              className={"w-100per br-20px m-auto image_" + (index + 1)}
                              alt="Promo"
                              title="Promo Image"
                            />
                          ))}
                        </Link>
                      )}
                    </div>
                    {home_page.show_video && (
                      <div className="jc-c pos-rel">
                        <div className="iframe-container">
                          <iframe
                            title="Content Video"
                            width="996"
                            height="560"
                            style={{ borderRadius: "20px" }}
                            src={`https://www.youtube.com/embed/${home_page.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen="1"
                          />
                        </div>
                      </div>
                    )}

                    <div className="jc-c">
                      <h4 className="fs-18px mb-0px ta-c title_font lh-30px">{home_page.h2}</h4>
                    </div>
                    <div className="jc-c w-100per m-auto">
                      <ReadMore width={5000} className="p_descriptions paragraph_font" length={100} pre={true}>
                        {home_page.p}
                      </ReadMore>
                    </div>
                  </div>
                  <div className="jc-c">
                    {home_page?.link[0] === "/" ? (
                      <Link to={home_page.link}>
                        <GLButton variant="primary" className="bob">
                          {home_page.button}
                        </GLButton>
                      </Link>
                    ) : (
                      <a href={home_page.link} target="_blank" rel="noreferrer">
                        <GLButton variant="primary" className="bob">
                          {home_page.button}
                        </GLButton>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
      <h4 className="fs-25px mv-8px ta-c jc-c title_font lh-30px">Featured Artists</h4>
      <div className={`${width > 1019 ? "jc-b" : "jc-c"} wrap`}>
        {features &&
          features
            .filter(feature => feature.release_date)
            .slice(0, width > 1473 ? 3 : width > 1019 ? 2 : 1)
            .map((feature, index) => {
              return (
                <div
                  key={index}
                  className={`container ${
                    width > 1473 ? "max-w-450px" : width > 1019 ? `w-49per ${index === 0 ? "mr-1rem" : ""}` : "w-100per"
                  } w-500px jc-b column bg-secondary `}
                >
                  <div>
                    <h4 className="fs-20px mt-1rem mb-2rem ta-c jc-c title_font lh-30px">{feature.artist_name}</h4>
                    {feature.show_image && feature.logo && (
                      <div className="m-auto jc-c max-w-300px">
                        <Link to={`/collections/all/features/category/glovers/${feature.pathname}`}>
                          <img
                            style={{ borderRadius: "20px", width: "100%" }}
                            src={feature.logo}
                            className="max-w-300px jc-c m-auto"
                            alt="Promo"
                            title="Promo Image"
                          />
                        </Link>
                      </div>
                    )}

                    {feature.video && (
                      <div className="jc-c pos-rel">
                        <div className="iframe-container">
                          <iframe
                            title="Content Video"
                            width="996"
                            height="560"
                            style={{ borderRadius: "20px" }}
                            src={`https://www.youtube.com/embed/${feature.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen="1"
                          />
                        </div>
                      </div>
                    )}

                    <div className="jc-c">
                      <h4 className="fs-18px mb-0px ta-c title_font lh-30px mv-1rem">
                        {feature.product && humanize(feature.product)}
                      </h4>
                    </div>
                    <div className="jc-c w-100per mv-1rem">
                      <p>{feature.song_id}</p>
                      {/* <ReadMore
											width={5000}
											className="p_descriptions paragraph_font"
											length={100}
											pre={true}
										>
											{feature.description}
										</ReadMore> */}
                    </div>
                  </div>
                  <div className="jc-c">
                    <Link to={`/collections/all/features/category/glovers/${feature.pathname}`}>
                      <GLButton variant="primary" className="bob mv-1rem">
                        Learn More About {feature.artist_name}
                      </GLButton>
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
      <h4 className="fs-25px mv-8px ta-c jc-c title_font lh-30px">Check out Our Products in Action</h4>
      <div className={`small_home_page_cards ${width > 1019 ? "jc-b" : "jc-c"} wrap`}>
        {homepage_videos.map((card, index) => {
          return (
            <div
              className={`container ${
                width > 1473 ? "max-w-450px" : width > 1019 ? `w-49per ${index === 0 ? "mr-1rem" : ""}` : "w-100per"
              } jc-b column`}
              style={{ backgroundColor: card.color }}
              key={index}
            >
              <div className="">
                <div className="jc-c">
                  <h2 className="ta-c fs-20px mt-1rem mb-2rem">{card.name}</h2>
                </div>
                <div className="jc-c pos-rel mb-1rem">
                  <div className="iframe-container">
                    <iframe
                      title={`${card.name} Promo Video`}
                      style={{ borderRadius: "20px" }}
                      src={`https://www.youtube.com/embed/${card.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="1"
                    />
                  </div>
                </div>
                <ReadMore width={3000} className="p_descriptions paragraph_font " length={100}>
                  {card.description}
                </ReadMore>
              </div>
              <div className="jc-c">
                <Link className="w-100per" to={`/collections/all/products/category/${card.category}`}>
                  <GLButton variant="primary" className="w-100per">
                    Shop {card.name}
                  </GLButton>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
