import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";

const SitemapPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Sitemap | Glow LEDs</title>
        <meta property="og:title" content="Sitemap" />
        <meta name="twitter:title" content="Sitemap" />
        <link rel="canonical" href="https://www.glow-leds.com/sitemap" />
        <meta property="og:url" content="https://www.glow-leds.com/sitemap" />
        <meta
          name="description"
          content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
        />
        <meta
          property="og:description"
          content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
        />
        <meta
          name="twitter:description"
          content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
        />
      </Helmet>
      <div className="inner_content">
        <h1 style={{ textAlign: "center" }}>Glow LEDs Sitemap</h1>
        <div className="wrap jc-b">
          <div style={{ width: "50%" }}>
            <h2 style={{ textAlign: "left" }}>Home</h2>
            <ul>
              <li>
                <Link to="">Home</Link>
              </li>
            </ul>

            <h2 style={{ textAlign: "left" }}>Account</h2>
            <ul>
              <li>
                <Link to="/account/password_reset ">Password Reset</Link>
              </li>
              <li>
                <Link to="/account/resetpassword ">Reset Password</Link>
              </li>
            </ul>
            <h2 style={{ textAlign: "left" }}>Checkout</h2>
            <ul>
              <li>
                <Link to="/checkout/cart ">Cart</Link>
              </li>
            </ul>

            <h2 style={{ textAlign: "left" }}>Pages</h2>
            <ul>
              <li>
                <Link to="/support_center  ">Support Center</Link>
              </li>
              <li>
                <Link to="/terms  ">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/about  ">About</Link>
              </li>
              <li>
                <Link to="/faq  ">Frequently Asked Questions</Link>
              </li>
            </ul>

            <h2 style={{ textAlign: "left" }}>Categories</h2>
            <ul>
              <li>
                <Link to="/products/diffusers">Diffusers</Link>
              </li>
              <li>
                <Link to="/products/diffuser_caps">Diffuser Caps</Link>
              </li>
              <li>
                <Link to="/products/diffuser_adapters">Diffuser Adapters</Link>
              </li>
              <li>
                <Link to="/products/glowstringz">Glowstringz</Link>
              </li>
            </ul>
          </div>
          <div style={{ width: "50%" }}>
            <h2 style={{ textAlign: "left" }}>Products</h2>
            <ul>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
            <ul className="products_list">
              <ul>
                <li style={{ textAlign: "left" }}>
                  <Link to="/products/diffuser_adapters">Diffuser Adapters</Link>
                </li>
                <ul className="products_list">
                  <li>
                    <Link to="/products/large_frosted_dome_diffusers">Large Frosted Dome Diffuser</Link>
                  </li>
                  <li>
                    <Link to="/products/frosted_dome_diffusers">Frosted Dome Diffuser</Link>
                  </li>
                </ul>
              </ul>

              <ul className="products_list">
                <li style={{ textAlign: "left" }}>
                  <Link to="/products/glowstringz">Glowstringz</Link>
                </li>
                <ul>
                  <li>
                    <Link to="/products/50_led_3_5m_glowstringz">50 LED 3.5m Glowstringz</Link>
                  </li>
                  <li>
                    <Link to="/products/150_led_10_5m_glowstringz">150 LED 10.5m Glowstringz</Link>
                  </li>
                  <li>
                    <Link to="/products/200_led_14m_glowstringz">200 LED 14m Glowstringz</Link>
                  </li>
                  <li>
                    <Link to="/products/100_led_7m_glowstringz">100 LED 7m Glowstringz</Link>
                  </li>
                  {/* <li>
							<Link to="/products/glowstringz_controller_power_adapter">
								Home
							</Link>
						</li> */}
                  {/* <li>
							<Link to="/products/50_glowstringz_w_o_controller">
								Home
							</Link>
						</li> */}
                </ul>
              </ul>

              {/* <h3 style={{ textAlign: 'left' }}>Diffuser Adapters</h3> */}
              <ul className="products_list">
                <li style={{ textAlign: "left" }}>
                  <Link to="/products/diffuser_adapters">Diffuser Adapters</Link>
                </li>
                <ul>
                  <li>
                    <Link to="/products/diffuser_adapters_no_caps">Diffuser Adapters (No Caps)</Link>
                  </li>
                  <li>
                    <Link to="/products/diffuser_caps_adapters_starter_kit">Diffuser Caps + Adapters Starter Kit</Link>
                  </li>
                </ul>
              </ul>

              <ul className="products_list">
                <li style={{ textAlign: "left" }}>
                  <Link to="/products/diffuser_caps">Diffuser Caps</Link>
                </li>
                <ul>
                  <li>
                    <Link to="/products/honey_comb_diffuser_caps">Honey Comb Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/blinking_eyes_diffuser_caps">Blinking Eyes Diffuser Caps</Link>
                  </li>
                  {/* <li>
							<Link to="/products/x_diffuser_caps">
								X Diffuser Caps
							</Link>
						</li> */}
                  <li>
                    <Link to="/products/icosahedron_diffuser_caps">Icosahedron Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/peace_diffuser_caps">Peace Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/dodecahedron_point_diffuser_caps">Dodecahedron Point Diffuser Caps</Link>
                  </li>
                  {/* <li>
							<Link to="/products/owsla_diffuser_caps">
								Owsla Diffuser Caps
							</Link>
						</li> */}
                  <li>
                    <Link to="/products/mountain_diffuser_caps">Mountain Diffuser Caps</Link>
                  </li>

                  <li>
                    <Link to="/products/moon_phases_diffuser_caps">Moon Phases Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/vesica_piscis_diffuser_caps">Vesica Piscis Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/heart_diffuser_caps">Heart Diffuser Caps</Link>
                  </li>

                  {/* <li>
							<Link to="/products/tiger_diffuser_caps">
								Tiger Diffuser Caps
							</Link>
						</li> */}
                  <li>
                    <Link to="/products/cube_diffuser_caps">Cube Diffuser Caps</Link>
                  </li>
                  {/* <li>
							<Link to="/products/triforce_diffuser_caps">
								Triforce Diffuser Caps
							</Link>
						</li> */}
                  <li>
                    <Link to="/products/trinity_diffuser_caps">Trinity Diffuser Caps</Link>
                  </li>
                  {/* <li>
							<Link to="/products/phoenix_diffuser_caps">
								Phoenix Diffuser Caps
							</Link>
						</li> */}
                  <li>
                    <Link to="/products/seed_of_life_diffuser_caps">Seed of Life Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/flower_diffuser_caps">Flower Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/dodecahedron_face_diffuser_caps">Dodecahedron Face Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/dizzy_face_emoji_diffuser_caps">Dizzy Face Emoji Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/gyro_sphere_diffuser_caps">Gyro Sphere Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/custom_diffuser_caps">Custom Diffuser Caps</Link>
                  </li>
                  <li>
                    <Link to="/products/coin_battery_storage">Coin Battery Storage</Link>
                  </li>
                </ul>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SitemapPage;
