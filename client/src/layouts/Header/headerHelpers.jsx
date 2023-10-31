import { ShoppingCart } from "@mui/icons-material";
import { updateVersion } from "../../api";
import { clear_order_state } from "../../slices/orderSlice";
import { openLoginModal } from "../../slices/userSlice";
import * as API from "../../api";

const features = {
  name: "Featured",
  path: "/collections/all/products/category/our_picks",
  _id: 0,
  rows: [
    {
      name: "New Releases!",
      path: "/collections/all/products/category/new_releases",
      _id: 1,
      extraContent: "🆕",
    },
    {
      name: "Best Sellers",
      path: "/collections/all/products/category/best_sellers",
      _id: 2,
      extraContent: "✅",
    },
    {
      name: "Our Picks",
      path: "/collections/all/products/category/our_picks",
      _id: 3,
      extraContent: "⭐",
    },
    {
      name: "On Sale!",
      path: "/collections/all/products/category/discounted",
      _id: 4,
      extraContent: "💰",
    },
    {
      name: "Stickers",
      path: "/collections/all/products/category/merch/subcategory/stickers",
      _id: 5,
    },
  ],
};

const glowskinz = {
  name: "Glowskinz",
  path: "/collections/all/products/category/glowskinz",
  _id: 6,
  id: "glowskinz_dropdown",
  sideDrawer: {
    name: "Glowskinz",
    path: "/collections/all/products/category/glowskinz",
    _id: 7,
    id: "glowskinz_dropdown",
    drawerItems: [
      {
        name: "CLOZD Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/clozd",
        _id: 8,
        id: "clozd_dropdown",
        subSideDrawer: {
          subDrawerItems: [
            {
              name: "Classics",
              path: "/collections/all/products/category/glowskinz/subcategory/clozd/collection/classics",
              _id: 9,
            },
            {
              name: "Novaskinz",
              path: "/collections/all/products/category/glowskinz/subcategory/clozd/collection/novaskinz",
              _id: 10,
            },
          ],
        },
      },
      {
        name: "OPYN Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/opyn",
        _id: 11,
        subDrawerItems: [],
      },
    ],
  },
};

const exo_diffusers = {
  name: "EXO Diffusers",
  path: "/collections/all/products/category/exo_diffusers",
  _id: 12,
  id: "exo_diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Collections",
        path: "/collections/all/products/category/exo_diffusers",
        _id: 13,
        id: "exo_diffusers_collections_dropdown",
        subSideDrawer: {
          id: "exo_diffusers_collections_dropdown",
          subDrawerItems: [
            {
              name: "Platonic Solids",
              path: "/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids",
              _id: 14,
            },
            {
              name: "Spheroid",
              path: "/collections/all/products/category/exo_diffusers/subcategory/domes/collection/spheroid",
              _id: 15,
            },
          ],
        },
      },

      {
        name: "Polyhedrons",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/polyhedrons",
        _id: 16,
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/domes",
        _id: 17,
      },
    ],
  },
};

const diffuser_caps = {
  name: "Diffuser Caps",
  path: "/collections/all/products/category/diffuser_caps",
  _id: 18,
  id: "diffuser_caps_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Diffuser Caps Starter Kit",
        path: "/collections/all/products/category/diffuser_caps_adapters_starter_kit",
        _id: 19,
      },
      {
        name: "Collections",
        path: "/collections/all/products/category/diffuser_caps",
        _id: 20,
        id: "collections_dropdown",
        subSideDrawer: {
          subDrawerItems: [
            {
              name: "Texture",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/texture",
              _id: 21,
            },
            {
              name: "Fractal",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/fractal",
              _id: 22,
            },
            {
              name: "Space Cadet",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/space_cadet",
              _id: 23,
            },
            {
              name: "Festie Bestie",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/festie_bestie",
              _id: 24,
            },
            {
              name: "Platonic Solids",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids",
              _id: 25,
            },
          ],
        },
      },
      {
        name: "Geometric",
        path: "/collections/all/products/category/diffuser_caps/subcategory/geometric",
        _id: 26,
      },
      {
        name: "Shapes",
        path: "/collections/all/products/category/diffuser_caps/subcategory/shapes",
        _id: 27,
      },
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffuser_caps/subcategory/abstract",
        _id: 28,
      },
      {
        name: "Patterns",
        path: "/collections/all/products/category/diffuser_caps/subcategory/patterns",
        _id: 29,
      },
    ],
  },
};

const diffusers = {
  name: "Diffusers",
  path: "/collections/all/products/category/diffusers",
  _id: 30,
  id: "diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffusers/subcategory/abstract",
        _id: 31,
      },
      {
        name: "Polygons",
        path: "/collections/all/products/category/diffusers/subcategory/polygons",
        _id: 32,
      },
      {
        name: "Cylinders",
        path: "/collections/all/products/category/diffusers/subcategory/cylinders",
        _id: 33,
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/diffusers/subcategory/domes",
        _id: 34,
      },
      {
        name: "Open Hole",
        path: "/collections/all/products/category/diffusers/subcategory/open_hole",
        _id: 35,
      },
      {
        name: "Closed Hole",
        path: "/collections/all/products/category/diffusers/subcategory/closed_hole",
        _id: 36,
      },
    ],
  },
};

const enhancers = {
  name: "Enhancers",
  path: "/pages/menu/gloving",
  _id: 37,
  rows: [
    glowskinz,

    {
      name: "Glowframez",
      path: "/collections/all/products/category/glowframez",
      _id: 38,
    },
    exo_diffusers,
    diffuser_caps,
    diffusers,
    {
      name: "Decals",
      path: "/collections/all/products/category/decals",
      _id: 39,
    },
  ],
};

const essentials = {
  name: "Essentials",
  path: "/collections/all/products/category/essentials",
  _id: 40,
  rows: [
    {
      name: "Supreme Gloves",
      path: "/collections/all/products/category/gloves/subcategory/singles",
      _id: 41,
    },
    {
      name: "Refresh Packs",
      path: "/collections/all/products/category/gloves/subcategory/refresh",
      _id: 42,
    },
    {
      name: "Sizing Samplers",
      path: "/collections/all/products/category/gloves/subcategory/sampler",
      _id: 43,
    },
    {
      name: "Coin Batteries",
      path: "/collections/all/products/category/batteries/subcategory/coin",
      _id: 44,
    },
    {
      name: "Battery Storage",
      path: "/collections/all/products/category/batteries/subcategory/storage",
      _id: 45,
    },
    {
      name: "Wholesale",
      path: "/collections/all/products/category/wholesale",
      _id: 46,
      permissions: item => (item ? item.isWholesaler : undefined),
    },
  ],
};
const community = {
  name: "Community",
  path: "/pages/menu/support",
  _id: 47,
  rows: [
    {
      name: "Sponsored Glovers",
      path: "/collections/all/sponsors",
      _id: 48,
    },
    {
      name: "Sponsored Teams",
      path: "/collections/all/teams",
      _id: 49,
    },
    {
      name: "Rave Mob",
      path: "/collections/all/teams/category/rave_mob",
      _id: 50,
    },
    {
      name: "Featured",
      path: "/pages/menu/featured",
      _id: 51,
      id: "featured_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Glovers",
            path: "/collections/all/sponsors",
            _id: 52,
          },
          {
            name: "Artists",
            path: "/collections/all/sponsors",
            _id: 53,
          },
          {
            name: "Producers",
            path: "/collections/all/teams",
            _id: 54,
          },
          {
            name: "VFX",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
        ],
      },
    },
  ],
};

const learn = {
  name: "Learn",
  path: "/pages/learn",
  _id: 103,
  rows: [
    {
      name: "What is Gloving?",
      path: "/pages/learn/what_is_gloving",
      _id: 104,
    },
    {
      name: "Anatomy of the Glove Set",
      path: "/pages/learn/what_is_a_microlight",
      _id: 107,
    },
    {
      name: "Deep Dive into Accessories",
      path: "/pages/learn/what_is_a_microlight",
      _id: 107,
    },
    {
      name: "Concept/Term Glossery",
      path: "/pages/learn/what_is_a_microlight",
      _id: 107,
    },
    {
      name: "Gloving History",
      path: "/pages/learn/gloving_history",
      _id: 108,
    },
  ],
};
const tutorials = {
  name: "Tutorials",
  path: "/pages/learn",
  _id: 103,
  rows: [
    {
      name: "By Skill Level",
      path: "/pages/menu/featured",
      _id: 51,
      id: "skill_level_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Beginner",
            path: "/collections/all/sponsors",
            _id: 52,
          },
          {
            name: "Intermediate",
            path: "/collections/all/sponsors",
            _id: 53,
          },
          {
            name: "Advanced",
            path: "/collections/all/teams",
            _id: 54,
          },
          {
            name: "Experimental",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
        ],
      },
    },
    {
      name: "By Style",
      path: "/pages/menu/featured",
      _id: 51,
      id: "style_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Flow",
            path: "/collections/all/sponsors",
            _id: 52,
          },
          {
            name: "Tech",
            path: "/collections/all/sponsors",
            _id: 53,
          },
          {
            name: "Conjuring",
            path: "/collections/all/teams",
            _id: 54,
          },
          {
            name: "Impacting",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
          {
            name: "Morphing",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
        ],
      },
    },
    {
      name: "By Move",
      path: "/collections/all/tutorials",
      _id: 106,
    },
    {
      name: "By Concept",
      path: "/pages/menu/featured",
      _id: 51,
      id: "concept_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Showmanship",
            path: "/collections/all/sponsors",
            _id: 52,
          },
          {
            name: "Musicality",
            path: "/collections/all/sponsors",
            _id: 53,
          },
          {
            name: "Transistions",
            path: "/collections/all/teams",
            _id: 54,
          },
          {
            name: "Stretches",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
          {
            name: "Finger Independence",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
          {
            name: "Story Telling",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
          {
            name: "Cleanliness",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
        ],
      },
    },
    {
      name: "By Artist",
      path: "/pages/menu/featured",
      _id: 51,
      id: "artist_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "BeMO",
            path: "/collections/all/sponsors",
            _id: 52,
          },
          {
            name: "Lykaios",
            path: "/collections/all/sponsors",
            _id: 53,
          },
          {
            name: "Po",
            path: "/collections/all/teams",
            _id: 54,
          },
          {
            name: "Puppet",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
          {
            name: "Rekursion",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
          {
            name: "Starstream TuT",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
          },
        ],
      },
    },
  ],
};
const tips = {
  name: "Gloving Tips",
  path: "/pages/learn",
  _id: 103,
  rows: [
    {
      name: "Gloving Etiquette",
      path: "/pages/learn/what_is_gloving",
      _id: 104,
    },
    {
      name: "Where do I start?",
      path: "/pages/learn/where_do_i_start",
      _id: 105,
    },
  ],
};
const support = {
  name: "Support",
  path: "/pages/menu/support",
  _id: 56,
  rows: [
    {
      name: "FAQ",
      path: "/pages/faq",
      _id: 57,
      id: "faq_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Glowskinz",
            path: "/pages/faq#glowskinz",
            _id: 58,
          },
          {
            name: "Diffuser Caps",
            path: "/pages/faq#diffuser_caps",
            _id: 59,
          },
          {
            name: "Ordering Custom Products",
            path: "/pages/faq#ordering_custom_products",
            _id: 60,
          },
          {
            name: "Featured Content",
            path: "/pages/faq#featured_content",
            _id: 61,
          },
          {
            name: "Processing/Shipping",
            path: "/pages/faq#processing_shipping",
            _id: 62,
          },
          {
            name: "Order Issues",
            path: "/pages/faq#order_issues",
            _id: 63,
          },
        ],
      },
    },
    {
      name: "Track Your Order",
      path: "/pages/track_your_order",
      _id: 64,
    },
    {
      name: "Contact",
      path: "/pages/contact",
      _id: 65,
    },
    {
      name: "About",
      path: "/pages/about",
      _id: 66,
    },
    {
      name: "Announcements",
      path: "/pages/announcements",
      _id: 67,
    },
    {
      name: "Term and Condition",
      path: "/pages/terms",
      _id: 68,
    },
  ],
};

const user = {
  name: "User",
  rows: [
    {
      name: "Profile",
      path: "/secure/account/profile",
      _id: 69,
    },

    {
      name: "Logout",
      onClick: (dispatch, navigate, location) => {
        dispatch(API.logoutUser());
        if (location.pathname.includes("secure")) {
          navigate("/");
        }
      },
    },
  ],
};

const admin = {
  name: "Admin",
  rows: [
    {
      name: "Dashboard",
      path: "/secure/glow/dashboard",
      onClick: x => true,
      _id: 70,
    },

    {
      name: "Orders",
      path: "/secure/glow/orders",
      onClick: dispatch => dispatch(clear_order_state()),
      _id: 71,
    },

    {
      name: "Products",
      path: `/secure/glow/products?search=&filters=%7B"hidden"%3A%5B%5D%2C"options"%3A%5B%5D%7D&page=0&pageSize=10&sorting=%5B3%2C"desc"%5D`,
      onClick: x => true,
      _id: 72,
    },

    {
      name: "Users",
      path: "/secure/glow/users",
      onClick: x => true,
      _id: 73,
    },

    {
      name: "Affiliates",
      path: "/secure/glow/affiliates",
      onClick: x => true,
      _id: 74,
    },

    {
      name: "Wholesalers",
      path: "/secure/glow/wholesalers",
      onClick: x => true,
      _id: 75,
    },

    {
      name: "Tutorials",
      path: "/secure/glow/tutorials",
      onClick: x => true,
      _id: 76,
    },

    {
      name: "Images",
      path: "/secure/glow/images",
      onClick: x => true,
      _id: 77,
    },

    {
      name: "Paychecks",
      path: "/secure/glow/paychecks",
      onClick: x => true,
      _id: 78,
    },

    {
      name: "Promos",
      path: "/secure/glow/promos",
      onClick: x => true,
      _id: 79,
    },

    {
      name: "Carts",
      path: "/secure/glow/carts",
      onClick: x => true,
      _id: 80,
    },

    {
      name: "Chips",
      path: "/secure/glow/chips",
      onClick: x => true,
      _id: 81,
    },

    {
      name: "Surveys",
      path: "/secure/glow/surveys",
      onClick: x => true,
      _id: 82,
    },

    {
      name: "Teams",
      path: "/secure/glow/teams",
      onClick: x => true,
      _id: 83,
    },

    {
      name: "Contents",
      path: "/secure/glow/contents",
      onClick: x => true,
      _id: 84,
    },

    {
      name: "Emails",
      path: "/secure/glow/emails",
      onClick: x => true,
      _id: 85,
    },

    {
      name: "Expenses",
      path: "/secure/glow/expenses",
      onClick: x => true,
      _id: 86,
    },

    {
      name: "Features",
      path: "/secure/glow/features",
      onClick: x => true,
      _id: 87,
    },

    {
      name: "Logs",
      path: "/secure/glow/logs",
      onClick: x => true,
      _id: 88,
    },

    {
      name: "Parcels",
      path: "/secure/glow/parcels",
      onClick: x => true,
      _id: 89,
    },

    {
      name: "Categorys",
      path: "/secure/glow/categorys",
      onClick: x => true,
      _id: 90,
    },

    {
      name: "Settings",
      path: "/secure/glow/settings",
      onClick: x => true,
      _id: 91,
    },

    {
      name: "Palettes",
      path: "/secure/glow/palettes",
      onClick: x => true,
      _id: 92,
    },

    {
      name: "Filaments",
      path: "/secure/glow/filaments",
      onClick: x => true,
      _id: 93,
    },

    {
      name: "Edit All Data",
      path: "/secure/glow/edit_all_data",
      onClick: x => true,
      _id: 94,
    },

    {
      name: "Gcode",
      path: "/secure/glow/gcode_continous",
      onClick: x => true,
      _id: 95,
    },

    {
      name: "Compressor",
      path: "/secure/glow/image_compressor",
      onClick: () => updateVersion(),
      _id: 96,
    },
  ],
};
export const navItems = [
  {
    name: "Home",
    path: "/",
    _id: 97,
    ariaLabel: "Home Page",
    headerLocation: "center",
  },
  {
    name: "Shop",
    path: "/pages/menu/gloving",
    _id: 98,
    dataTestId: "shop_button",
    columns: [features, enhancers],
    otherColumns: [essentials],
    headerLocation: "center",
  },
  {
    name: "Learn",
    path: "/pages/learn",
    _id: 99,
    dataTestId: "learn_button",
    columns: [learn, tutorials],
    otherColumns: [tips],
    headerLocation: "center",
  },
  {
    name: "Community",
    path: "/pages/menu/support",
    _id: 100,
    dataTestId: "community_button",
    columns: [community],
    headerLocation: "center",
  },
  {
    name: "Support",
    path: "/pages/menu/support",
    _id: 101,
    dataTestId: "support_button",
    columns: [support],
    headerLocation: "center",
  },
];

export const rightNav = dispatch => {
  return [
    {
      name: current_user =>
        (current_user && current_user.hasOwnProperty("first_name") && current_user.first_name) || "Login",
      path: "/secure/account/profile",
      _id: 102,
      onClick: () => dispatch(openLoginModal()),
      dataTestId: "community_button",
      columns: [user],
      headerLocation: "center",
      permissions: x => true,
    },
    {
      name: "Admin",
      dataTestId: "support_button",
      permissions: current_user => current_user.isAdmin,
      columns: [admin],
      headerLocation: "center",
    },
  ];
};
