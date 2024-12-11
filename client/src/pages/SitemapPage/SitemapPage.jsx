import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";

const SitemapPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Sitemap | Glow LEDs"}</title>
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
        <h1 style={{ textAlign: "center" }}>{"Glow LEDs Sitemap"}</h1>
        <div>
          <h2 style={{ textTransform: "capitalize" }}>Home</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/">{"/"}</Link>
            </li>
          </ul>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Account Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/account/change_password">{"/account/change_password"}</Link>
              </li>
              <li>
                <Link to="/account/password_reset">{"/account/password_reset"}</Link>
              </li>
              <li>
                <Link to="/account/reset_password">{"/account/reset_password"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Checkout Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/checkout/place_order">{"/checkout/place_order"}</Link>
              </li>
              <li>
                <Link to="/checkout/cart">{"/checkout/cart"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Products Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/products">{"/products"}</Link>
              </li>
              <li>
                <Link to="/products/lattice_diffuser_caps">{"/products/lattice_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/penta_fractal_diffuser_caps">{"/products/penta_fractal_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/supreme_v1_refresh_pack_6_pairs_supreme_gloves_v1_120_batteries">
                  {"/products/supreme_v1_refresh_pack_6_pairs_supreme_gloves_v1_120_batteries"}
                </Link>
              </li>
              <li>
                <Link to="/products/icosahedron_exo_diffusers">{"/products/icosahedron_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_apolloskinz_v2">{"/products/opyn_apolloskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_vortexskinz">{"/products/opyn_vortexskinz"}</Link>
              </li>
              <li>
                <Link to="/products/nova_clip">{"/products/nova_clip"}</Link>
              </li>
              <li>
                <Link to="/products/2x2_hexahedron_exo_diffusers">{"/products/2x2_hexahedron_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_batman_decals">{"/products/opyn_batman_decals"}</Link>
              </li>
              <li>
                <Link to="/products/xxl_supreme_gloves_v1">{"/products/xxl_supreme_gloves_v1"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_duoskinz">{"/products/clozd_duoskinz"}</Link>
              </li>
              <li>
                <Link to="/products/duo_extended_charging_lid">{"/products/duo_extended_charging_lid"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_duoskinz">{"/products/opyn_duoskinz"}</Link>
              </li>
              <li>
                <Link to="/products/supreme_gloves_v2">{"/products/supreme_gloves_v2"}</Link>
              </li>
              <li>
                <Link to="/products/mega_universal_battery_dispenser">
                  {"/products/mega_universal_battery_dispenser"}
                </Link>
              </li>
              <li>
                <Link to="/products/clozd_omniskinz">{"/products/clozd_omniskinz"}</Link>
              </li>
              <li>
                <Link to="/products/hexahedron_exo_diffusers">{"/products/hexahedron_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/tetra_fractal_diffuser_caps">{"/products/tetra_fractal_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/tetrahedron_exo_diffusers">{"/products/tetrahedron_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/platonic_solids_exo_diffusers">{"/products/platonic_solids_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_nanoskinz_v2">{"/products/clozd_nanoskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_coinskinz_v2">{"/products/opyn_coinskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/mesh_diffuser_caps">{"/products/mesh_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_helioskinz">{"/products/opyn_helioskinz"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_coffinskinz_v2">{"/products/clozd_coffinskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_outline_batman_decals">{"/products/opyn_outline_batman_decals"}</Link>
              </li>
              <li>
                <Link to="/products/supreme_v2_refresh_pack_6_pairs_supreme_gloves_v2_120_batteries">
                  {"/products/supreme_v2_refresh_pack_6_pairs_supreme_gloves_v2_120_batteries"}
                </Link>
              </li>
              <li>
                <Link to="/products/clozd_evoskinz_v2">{"/products/clozd_evoskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_kineticskinz">{"/products/clozd_kineticskinz"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_omniskinz_sleds">{"/products/clozd_omniskinz_sleds"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_evoskinz_v2">{"/products/opyn_evoskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/ultras">{"/products/ultras"}</Link>
              </li>
              <li>
                <Link to="/products/ultra_refresh_pack_6_pairs_ultra_gloves_120_batteries">
                  {"/products/ultra_refresh_pack_6_pairs_ultra_gloves_120_batteries"}
                </Link>
              </li>
              <li>
                <Link to="/products/hexa_fractal_diffuser_caps">{"/products/hexa_fractal_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/glow_jar">{"/products/glow_jar"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_novaskinz">{"/products/clozd_novaskinz"}</Link>
              </li>
              <li>
                <Link to="/products/fractal_diffuser_caps">{"/products/fractal_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/kaleidoscope_diffuser_caps">{"/products/kaleidoscope_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/claw_diffusers">{"/products/claw_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/octahedron_exo_diffusers">{"/products/octahedron_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/hub_battery_backpack">{"/products/hub_battery_backpack"}</Link>
              </li>
              <li>
                <Link to="/products/universal_battery_dispenser">{"/products/universal_battery_dispenser"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_apolloskinz_v2">{"/products/clozd_apolloskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_nanoskinz_v2">{"/products/opyn_nanoskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_alt_novaskinz">{"/products/clozd_alt_novaskinz"}</Link>
              </li>
              <li>
                <Link to="/products/glowskinz_capez">{"/products/glowskinz_capez"}</Link>
              </li>
              <li>
                <Link to="/products/helios_gloveset">{"/products/helios_gloveset"}</Link>
              </li>
              <li>
                <Link to="/products/ultra_gloves_sizing_sampler_pack">
                  {"/products/ultra_gloves_sizing_sampler_pack"}
                </Link>
              </li>
              <li>
                <Link to="/products/supreme_gloves_v2_sizing_sampler_pack">
                  {"/products/supreme_gloves_v2_sizing_sampler_pack"}
                </Link>
              </li>
              <li>
                <Link to="/products/clozd_synergyskinz">{"/products/clozd_synergyskinz"}</Link>
              </li>
              <li>
                <Link to="/products/gyrosphere_diffuser_caps">{"/products/gyrosphere_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/heart_diffuser_caps">{"/products/heart_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/star_diffuser_caps">{"/products/star_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/dodecahedron_face_diffuser_caps">
                  {"/products/dodecahedron_face_diffuser_caps"}
                </Link>
              </li>
              <li>
                <Link to="/products/mandala_diffuser_caps">{"/products/mandala_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/dome_diffusers">{"/products/dome_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/mountain_diffuser_caps">{"/products/mountain_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/diffuser_adapters">{"/products/diffuser_adapters"}</Link>
              </li>
              <li>
                <Link to="/products/cylinder_diffusers">{"/products/cylinder_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/diffuser_caps_adapters_starter_kit">
                  {"/products/diffuser_caps_adapters_starter_kit"}
                </Link>
              </li>
              <li>
                <Link to="/products/helmat_diffusers">{"/products/helmat_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/flower_diffusers">{"/products/flower_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/seed_of_life_diffuser_caps">{"/products/seed_of_life_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/octahedron_diffuser_caps">{"/products/octahedron_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/cone_diffusers">{"/products/cone_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/platonic_solids_diffuser_caps">{"/products/platonic_solids_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/triangle_prism_diffusers">{"/products/triangle_prism_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/flower_diffuser_caps">{"/products/flower_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/square_prism_diffusers">{"/products/square_prism_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/dodecahedron_point_diffuser_caps">
                  {"/products/dodecahedron_point_diffuser_caps"}
                </Link>
              </li>
              <li>
                <Link to="/products/icosahedron_diffuser_caps">{"/products/icosahedron_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/tetrahedron_diffuser_caps">{"/products/tetrahedron_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/hexahedron_diffuser_caps">{"/products/hexahedron_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/visor_diffusers">{"/products/visor_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/circle_prism_diffusers">{"/products/circle_prism_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/crescent_moon_diffuser_caps">{"/products/crescent_moon_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/alien_diffuser_caps">{"/products/alien_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/leaf_diffuser_caps">{"/products/leaf_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/wiffle_ball_exo_diffusers">{"/products/wiffle_ball_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/square_pyramid_diffusers">{"/products/square_pyramid_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/festie_bestie_diffuser_caps">{"/products/festie_bestie_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/butteryfly_diffuser_caps">{"/products/butteryfly_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/peace_sign_diffuser_caps">{"/products/peace_sign_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/space_cadet_diffuser_caps">{"/products/space_cadet_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/mushroom_diffuser_caps">{"/products/mushroom_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/rocket_diffuser_caps">{"/products/rocket_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/ufo_diffuser_caps">{"/products/ufo_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/half_dome_diffusers">{"/products/half_dome_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/triangle_pyramid_diffusers">{"/products/triangle_pyramid_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/sparkle_diffuser_caps">{"/products/sparkle_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/1225_coin_battery_dispenser">{"/products/1225_coin_battery_dispenser"}</Link>
              </li>
              <li>
                <Link to="/products/1620_coin_battery_dispenser">{"/products/1620_coin_battery_dispenser"}</Link>
              </li>
              <li>
                <Link to="/products/wood_glow_leds_stickers">{"/products/wood_glow_leds_stickers"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_coinskinz_v2">{"/products/clozd_coinskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/x_decals">{"/products/x_decals"}</Link>
              </li>
              <li>
                <Link to="/products/alien_decals">{"/products/alien_decals"}</Link>
              </li>
              <li>
                <Link to="/products/tri_fractal_diffuser_caps">{"/products/tri_fractal_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/dodecahedron_exo_diffusers">{"/products/dodecahedron_exo_diffusers"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_batman_decals">{"/products/clozd_batman_decals"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_outline_batman_decals">{"/products/clozd_outline_batman_decals"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_novaframez">{"/products/clozd_novaframez"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_supernovaframez">{"/products/clozd_supernovaframez"}</Link>
              </li>
              <li>
                <Link to="/products/hearty_decals">{"/products/hearty_decals"}</Link>
              </li>
              <li>
                <Link to="/products/leaf_decals">{"/products/leaf_decals"}</Link>
              </li>
              <li>
                <Link to="/products/supreme_gloves_v1">{"/products/supreme_gloves_v1"}</Link>
              </li>
              <li>
                <Link to="/products/double_chevron_decals">{"/products/double_chevron_decals"}</Link>
              </li>
              <li>
                <Link to="/products/hepta_fractal_diffuser_caps">{"/products/hepta_fractal_diffuser_caps"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_coffinskinz_v2">{"/products/opyn_coffinskinz_v2"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_vortexskinz">{"/products/clozd_vortexskinz"}</Link>
              </li>
              <li>
                <Link to="/products/2016_batteries">{"/products/2016_batteries"}</Link>
              </li>
              <li>
                <Link to="/products/clozd_helioskinz">{"/products/clozd_helioskinz"}</Link>
              </li>
              <li>
                <Link to="/products/opyn_synergyskinz">{"/products/opyn_synergyskinz"}</Link>
              </li>
              <li>
                <Link to="/products/child_supreme_gloves_v1">{"/products/child_supreme_gloves_v1"}</Link>
              </li>
              <li>
                <Link to="/products/helios_microlight">{"/products/helios_microlight"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Sponsors Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/sponsors">{"/sponsors"}</Link>
              </li>
              <li>
                <Link to="/sponsors/starstream">{"/sponsors/starstream"}</Link>
              </li>
              <li>
                <Link to="/sponsors/puppet">{"/sponsors/puppet"}</Link>
              </li>
              <li>
                <Link to="/sponsors/po">{"/sponsors/po"}</Link>
              </li>
              <li>
                <Link to="/sponsors/lykaios">{"/sponsors/lykaios"}</Link>
              </li>
              <li>
                <Link to="/sponsors/bemo">{"/sponsors/bemo"}</Link>
              </li>
              <li>
                <Link to="/sponsors/30k">{"/sponsors/30k"}</Link>
              </li>
              <li>
                <Link to="/sponsors/zielzibub">{"/sponsors/zielzibub"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Teams Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/teams">{"/teams"}</Link>
              </li>
              <li>
                <Link to="/teams/2021_lights_all_night_rave_mob">{"/teams/2021_lights_all_night_rave_mob"}</Link>
              </li>
              <li>
                <Link to="/teams/freaky_deaky_2021">{"/teams/freaky_deaky_2021"}</Link>
              </li>
              <li>
                <Link to="/teams/2022_moonrise_rave_mob">{"/teams/2022_moonrise_rave_mob"}</Link>
              </li>
              <li>
                <Link to="/teams/2022_freaky_deaky_rave_mob">{"/teams/2022_freaky_deaky_rave_mob"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Learn Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/learn">{"/learn"}</Link>
              </li>
              <li>
                <Link to="/learn/deep_dive_into_accessories">{"/learn/deep_dive_into_accessories"}</Link>
              </li>
              <li>
                <Link to="/learn/concept_term_dictionary">{"/learn/concept_term_dictionary"}</Link>
              </li>
              <li>
                <Link to="/learn/filming_lightshows">{"/learn/filming_lightshows"}</Link>
              </li>
              <li>
                <Link to="/learn/gloving_etiquette">{"/learn/gloving_etiquette"}</Link>
              </li>
              <li>
                <Link to="/learn/anatomy_of_the_lightshow">{"/learn/anatomy_of_the_lightshow"}</Link>
              </li>
              <li>
                <Link to="/learn/maintaining_your_glove_set">{"/learn/maintaining_your_glove_set"}</Link>
              </li>
              <li>
                <Link to="/learn/where_do_i_start">{"/learn/where_do_i_start"}</Link>
              </li>
              <li>
                <Link to="/learn/whats_a_double_lightshow">{"/learn/whats_a_double_lightshow"}</Link>
              </li>
              <li>
                <Link to="/learn/anatomy_of_the_glove_set">{"/learn/anatomy_of_the_glove_set"}</Link>
              </li>
              <li>
                <Link to="/learn/gloving_history">{"/learn/gloving_history"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Events Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/events/space_city_gloving_competition">{"/events/space_city_gloving_competition"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Bundles Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/bundles">{"/bundles"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Modes Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/modes">{"/modes"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Tutorials Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/tutorials">{"/tutorials"}</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>{"Other Pages"}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/gift_cards">{"/gift_cards"}</Link>
              </li>
              <li>
                <Link to="/academy">{"/academy"}</Link>
              </li>
              <li>
                <Link to="/support_center">{"/support_center"}</Link>
              </li>
              <li>
                <Link to="/terms">{"/terms"}</Link>
              </li>
              <li>
                <Link to="/about">{"/about"}</Link>
              </li>
              <li>
                <Link to="/sitemap">{"/sitemap"}</Link>
              </li>
              <li>
                <Link to="/menu/shop">{"/menu/shop"}</Link>
              </li>
              <li>
                <Link to="/palettes">{"/palettes"}</Link>
              </li>
              <li>
                <Link to="/unsubscribe">{"/unsubscribe"}</Link>
              </li>
            </ul>
          </div>{" "}
        </div>
      </div>
    </Container>
  );
};

export default SitemapPage;
