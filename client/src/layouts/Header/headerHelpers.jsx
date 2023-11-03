import { updateVersion } from "../../api";
import { clear_order_state } from "../../slices/orderSlice";
import { openLoginModal } from "../../slices/userSlice";
import * as API from "../../api";

export const determineDropdown = (item, current_user) => {
  if (typeof item.name === "function" && item.name(current_user) === "Login") {
    return false;
  }
  return true;
};

export const determineName = (item, current_user) => {
  return typeof item.name === "function" ? item.name(current_user) : item.name;
};

export const toggleDropdown = ({ id, dropdownClass, toggleClass }) => {
  const elems = document.querySelectorAll(`.${dropdownClass}`);

  // Always close nested dropdowns when a subcategory is toggled
  const nestedElems = document.querySelectorAll(".header-subdrawer.show-header-subdrawer");
  nestedElems.forEach(el => {
    el.classList.remove("show-header-subdrawer");
  });

  let isAlreadyOpen = false;
  const current_menu = document.getElementById(id);

  if (current_menu && current_menu.classList.contains(toggleClass)) {
    isAlreadyOpen = true;
  }

  // Close all dropdowns of the same class
  elems.forEach(el => {
    el.classList.remove(toggleClass);
  });

  if (!isAlreadyOpen) {
    // Open the current menu only if it was not already open
    current_menu.classList.add(toggleClass);
  }
};

const features = {
  name: "Featured",
  path: "/collections/all/products/category/our_picks",
  _id: 139,
  rows: [
    {
      name: "New Releases!",
      path: "/collections/all/products/category/new_releases",
      _id: 0,
      extraContent: "🆕",
    },
    {
      name: "Best Sellers",
      path: "/collections/all/products/category/best_sellers",
      _id: 1,
      extraContent: "✅",
    },
    {
      name: "Our Picks",
      path: "/collections/all/products/category/our_picks",
      _id: 2,
      extraContent: "⭐",
    },
    {
      name: "On Sale!",
      path: "/collections/all/products/category/discounted",
      _id: 3,
      extraContent: "💰",
    },
    {
      name: "Stickers",
      path: "/collections/all/products/category/merch/subcategory/stickers",
      _id: 4,
    },
  ],
};

const glowskinz = {
  name: "Glowskinz",
  path: "/collections/all/products/category/glowskinz",
  _id: 5,
  id: "glowskinz_dropdown",
  sideDrawer: {
    name: "Glowskinz",
    path: "/collections/all/products/category/glowskinz",
    _id: 6,
    id: "glowskinz_dropdown",
    drawerItems: [
      {
        name: "CLOZD Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/clozd",
        _id: 7,
        id: "clozd_dropdown",
        subSideDrawer: {
          id: "clozd_dropdown",
          subHeaderDrawers: [
            {
              name: "Classics",
              path: "/collections/all/products/category/glowskinz/subcategory/clozd/collection/classics",
              _id: 8,
            },
            {
              name: "Novaskinz",
              path: "/collections/all/products/category/glowskinz/subcategory/clozd/collection/novaskinz",
              _id: 19,
            },
          ],
        },
      },
      {
        name: "OPYN Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/opyn",
        _id: 110,
        subHeaderDrawers: [],
      },
    ],
  },
};

const exo_diffusers = {
  name: "EXO Diffusers",
  path: "/collections/all/products/category/exo_diffusers",
  _id: 111,
  id: "exo_diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Collections",
        path: "/collections/all/products/category/exo_diffusers",
        _id: 112,
        id: "exo_diffusers_collections_dropdown",
        subSideDrawer: {
          id: "exo_diffusers_collections_dropdown",
          subHeaderDrawers: [
            {
              name: "Platonic Solids",
              path: "/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids",
              _id: 113,
            },
            {
              name: "Spheroid",
              path: "/collections/all/products/category/exo_diffusers/subcategory/domes/collection/spheroid",
              _id: 114,
            },
          ],
        },
      },

      {
        name: "Polyhedrons",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/polyhedrons",
        _id: 115,
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/domes",
        _id: 116,
      },
    ],
  },
};

const diffuser_caps = {
  name: "Diffuser Caps",
  path: "/collections/all/products/category/diffuser_caps",
  _id: 117,
  id: "diffuser_caps_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Diffuser Caps Starter Kit",
        path: "/collections/all/products/category/diffuser_caps_adapters_starter_kit",
        _id: 118,
      },
      {
        name: "Collections",
        path: "/collections/all/products/category/diffuser_caps",
        _id: 219,
        id: "collections_dropdown",
        subSideDrawer: {
          subHeaderDrawers: [
            {
              name: "Texture",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/texture",
              _id: 220,
            },
            {
              name: "Fractal",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/fractal",
              _id: 221,
            },
            {
              name: "Space Cadet",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/space_cadet",
              _id: 222,
            },
            {
              name: "Festie Bestie",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/festie_bestie",
              _id: 223,
            },
            {
              name: "Platonic Solids",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids",
              _id: 224,
            },
          ],
        },
      },
      {
        name: "Geometric",
        path: "/collections/all/products/category/diffuser_caps/subcategory/geometric",
        _id: 225,
      },
      {
        name: "Shapes",
        path: "/collections/all/products/category/diffuser_caps/subcategory/shapes",
        _id: 226,
      },
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffuser_caps/subcategory/abstract",
        _id: 227,
      },
      {
        name: "Patterns",
        path: "/collections/all/products/category/diffuser_caps/subcategory/patterns",
        _id: 228,
      },
    ],
  },
};

const diffusers = {
  name: "Diffusers",
  path: "/collections/all/products/category/diffusers",
  _id: 329,
  id: "diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffusers/subcategory/abstract",
        _id: 330,
      },
      {
        name: "Polygons",
        path: "/collections/all/products/category/diffusers/subcategory/polygons",
        _id: 331,
      },
      {
        name: "Cylinders",
        path: "/collections/all/products/category/diffusers/subcategory/cylinders",
        _id: 332,
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/diffusers/subcategory/domes",
        _id: 333,
      },
      {
        name: "Open Hole",
        path: "/collections/all/products/category/diffusers/subcategory/open_hole",
        _id: 334,
      },
      {
        name: "Closed Hole",
        path: "/collections/all/products/category/diffusers/subcategory/closed_hole",
        _id: 335,
      },
    ],
  },
};

const enhancers = {
  name: "Enhancers",
  path: "/pages/menu/gloving",
  _id: 336,
  rows: [
    glowskinz,

    {
      name: "Glowframez",
      path: "/collections/all/products/category/glowframez",
      _id: 337,
    },
    exo_diffusers,
    diffuser_caps,
    diffusers,
    {
      name: "Decals",
      path: "/collections/all/products/category/decals",
      _id: 338,
    },
  ],
};

const essentials = {
  name: "Essentials",
  path: "/collections/all/products/category/essentials",
  _id: 439,
  rows: [
    {
      name: "Supreme Gloves",
      path: "/collections/all/products/category/gloves/subcategory/singles",
      _id: 440,
    },
    {
      name: "Refresh Packs",
      path: "/collections/all/products/category/gloves/subcategory/refresh",
      _id: 441,
    },
    {
      name: "Sizing Samplers",
      path: "/collections/all/products/category/gloves/subcategory/sampler",
      _id: 442,
    },
    {
      name: "Coin Batteries",
      path: "/collections/all/products/category/batteries/subcategory/coin",
      _id: 443,
    },
    {
      name: "Battery Storage",
      path: "/collections/all/products/category/batteries/subcategory/storage",
      _id: 444,
    },
    {
      name: "Wholesale",
      path: "/collections/all/products/category/wholesale",
      _id: 445,
      permissions: item => (item ? item.isWholesaler : undefined),
    },
  ],
};
const community = {
  name: "Community",
  path: "/pages/menu/support",
  _id: 446,
  rows: [
    {
      name: "Sponsored Glovers",
      path: "/collections/all/sponsors",
      _id: 447,
    },
    {
      name: "Sponsored Teams",
      path: "/collections/all/teams",
      _id: 448,
    },
    {
      name: "Rave Mob",
      path: "/collections/all/teams/category/rave_mob",
      _id: 549,
    },
    {
      name: "Featured",
      path: "/pages/menu/featured",
      _id: 550,
      id: "featured_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Glovers",
            path: "/collections/all/sponsors",
            _id: 551,
          },
          {
            name: "Artists",
            path: "/collections/all/sponsors",
            _id: 552,
          },
          {
            name: "Producers",
            path: "/collections/all/teams",
            _id: 553,
          },
          {
            name: "VFX",
            path: "/collections/all/teams/category/rave_mob",
            _id: 554,
          },
        ],
      },
    },
  ],
};

const learn = {
  name: "Learn",
  path: "/pages/learn",
  _id: 1055,
  rows: [
    {
      name: "What is Gloving?",
      path: "/pages/learn/what_is_gloving",
      _id: 1056,
    },
    {
      name: "Anatomy of the Glove Set",
      path: "/pages/learn/what_is_a_microlight",
      _id: 1057,
    },
    {
      name: "Deep Dive into Accessories",
      path: "/pages/learn/what_is_a_microlight",
      _id: 1058,
    },
    {
      name: "Concept/Term Glossery",
      path: "/pages/learn/what_is_a_microlight",
      _id: 1059,
    },
    {
      name: "Gloving History",
      path: "/pages/learn/gloving_history",
      _id: 1060,
    },
  ],
};
const tutorials = {
  name: "Tutorials",
  path: "/pages/learn",
  _id: 1061,
  rows: [
    {
      name: "By Skill Level",
      path: "/pages/menu/featured",
      _id: 562,
      id: "skill_level_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Beginner",
            path: "/collections/all/sponsors",
            _id: 563,
          },
          {
            name: "Intermediate",
            path: "/collections/all/sponsors",
            _id: 564,
          },
          {
            name: "Advanced",
            path: "/collections/all/teams",
            _id: 565,
          },
          {
            name: "Experimental",
            path: "/collections/all/teams/category/rave_mob",
            _id: 566,
          },
        ],
      },
    },
    {
      name: "By Style",
      path: "/pages/menu/featured",
      _id: 567,
      id: "style_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Flow",
            path: "/collections/all/sponsors",
            _id: 568,
          },
          {
            name: "Tech",
            path: "/collections/all/sponsors",
            _id: 569,
          },
          {
            name: "Conjuring",
            path: "/collections/all/teams",
            _id: 570,
          },
          {
            name: "Impacting",
            path: "/collections/all/teams/category/rave_mob",
            _id: 571,
          },
          {
            name: "Morphing",
            path: "/collections/all/teams/category/rave_mob",
            _id: 572,
          },
        ],
      },
    },
    {
      name: "By Move",
      path: "/collections/all/tutorials",
      _id: 1073,
    },
    {
      name: "By Concept",
      path: "/pages/menu/featured",
      _id: 574,
      id: "concept_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Showmanship",
            path: "/collections/all/sponsors",
            _id: 575,
          },
          {
            name: "Musicality",
            path: "/collections/all/sponsors",
            _id: 576,
          },
          {
            name: "Transistions",
            path: "/collections/all/teams",
            _id: 577,
          },
          {
            name: "Stretches",
            path: "/collections/all/teams/category/rave_mob",
            _id: 578,
          },
          {
            name: "Finger Independence",
            path: "/collections/all/teams/category/rave_mob",
            _id: 579,
          },
          {
            name: "Story Telling",
            path: "/collections/all/teams/category/rave_mob",
            _id: 580,
          },
          {
            name: "Cleanliness",
            path: "/collections/all/teams/category/rave_mob",
            _id: 581,
          },
        ],
      },
    },
    {
      name: "By Artist",
      path: "/pages/menu/featured",
      _id: 582,
      id: "artist_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "BeMO",
            path: "/collections/all/sponsors",
            _id: 583,
          },
          {
            name: "Lykaios",
            path: "/collections/all/sponsors",
            _id: 584,
          },
          {
            name: "Po",
            path: "/collections/all/teams",
            _id: 585,
          },
          {
            name: "Puppet",
            path: "/collections/all/teams/category/rave_mob",
            _id: 586,
          },
          {
            name: "Rekursion",
            path: "/collections/all/teams/category/rave_mob",
            _id: 587,
          },
          {
            name: "Starstream TuT",
            path: "/collections/all/teams/category/rave_mob",
            _id: 588,
          },
        ],
      },
    },
  ],
};
const tips = {
  name: "Gloving Tips",
  path: "/pages/learn",
  _id: 1089,
  rows: [
    {
      name: "Gloving Etiquette",
      path: "/pages/learn/what_is_gloving",
      _id: 1090,
    },
    {
      name: "Where do I start?",
      path: "/pages/learn/where_do_i_start",
      _id: 1091,
    },
  ],
};
const support = {
  name: "Support",
  path: "/pages/menu/support",
  _id: 592,
  rows: [
    {
      name: "FAQ",
      path: "/pages/faq",
      _id: 593,
      id: "faq_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Glowskinz",
            path: "/pages/faq#glowskinz",
            _id: 594,
          },
          {
            name: "Diffuser Caps",
            path: "/pages/faq#diffuser_caps",
            _id: 595,
          },
          {
            name: "Ordering Custom Products",
            path: "/pages/faq#ordering_custom_products",
            _id: 696,
          },
          {
            name: "Featured Content",
            path: "/pages/faq#featured_content",
            _id: 697,
          },
          {
            name: "Processing/Shipping",
            path: "/pages/faq#processing_shipping",
            _id: 698,
          },
          {
            name: "Order Issues",
            path: "/pages/faq#order_issues",
            _id: 699,
          },
        ],
      },
    },
    {
      name: "Track Your Order",
      path: "/pages/track_your_order",
      _id: 6100,
    },
    {
      name: "Contact",
      path: "/pages/contact",
      _id: 6101,
    },
    {
      name: "About",
      path: "/pages/about",
      _id: 6102,
    },
    {
      name: "Announcements",
      path: "/pages/announcements",
      _id: 6103,
    },
    {
      name: "Term and Condition",
      path: "/pages/terms",
      _id: 6104,
    },
  ],
};

const user = {
  name: "User",
  rows: [
    {
      name: "Profile",
      path: "/secure/account/profile",
      _id: 6105,
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
      _id: 7106,
    },

    {
      name: "Orders",
      path: "/secure/glow/orders",
      onClick: dispatch => dispatch(clear_order_state()),
      _id: 7107,
    },

    {
      name: "Products",
      path: `/secure/glow/products?search=&filters=%7B"hidden"%3A%5B%5D%2C"options"%3A%5B%5D%7D&page=0&pageSize=10&sorting=%5B3%2C"desc"%5D`,
      onClick: x => true,
      _id: 7108,
    },

    {
      name: "Users",
      path: "/secure/glow/users",
      onClick: x => true,
      _id: 7109,
    },

    {
      name: "Affiliates",
      path: "/secure/glow/affiliates",
      onClick: x => true,
      _id: 7110,
    },

    {
      name: "Wholesalers",
      path: "/secure/glow/wholesalers",
      onClick: x => true,
      _id: 7111,
    },

    {
      name: "Tutorials",
      path: "/secure/glow/tutorials",
      onClick: x => true,
      _id: 7112,
    },

    {
      name: "Images",
      path: "/secure/glow/images",
      onClick: x => true,
      _id: 7113,
    },

    {
      name: "Paychecks",
      path: "/secure/glow/paychecks",
      onClick: x => true,
      _id: 7114,
    },

    {
      name: "Promos",
      path: "/secure/glow/promos",
      onClick: x => true,
      _id: 7115,
    },

    {
      name: "Carts",
      path: "/secure/glow/carts",
      onClick: x => true,
      _id: 8116,
    },

    {
      name: "Chips",
      path: "/secure/glow/chips",
      onClick: x => true,
      _id: 8117,
    },

    {
      name: "Surveys",
      path: "/secure/glow/surveys",
      onClick: x => true,
      _id: 8118,
    },

    {
      name: "Teams",
      path: "/secure/glow/teams",
      onClick: x => true,
      _id: 8119,
    },

    {
      name: "Contents",
      path: "/secure/glow/contents",
      onClick: x => true,
      _id: 8120,
    },

    {
      name: "Emails",
      path: "/secure/glow/emails",
      onClick: x => true,
      _id: 8121,
    },

    {
      name: "Expenses",
      path: "/secure/glow/expenses",
      onClick: x => true,
      _id: 8122,
    },

    {
      name: "Features",
      path: "/secure/glow/features",
      onClick: x => true,
      _id: 8123,
    },

    {
      name: "Logs",
      path: "/secure/glow/logs",
      onClick: x => true,
      _id: 8124,
    },

    {
      name: "Parcels",
      path: "/secure/glow/parcels",
      onClick: x => true,
      _id: 8125,
    },

    {
      name: "Categorys",
      path: "/secure/glow/categorys",
      onClick: x => true,
      _id: 9126,
    },

    {
      name: "Settings",
      path: "/secure/glow/settings",
      onClick: x => true,
      _id: 9127,
    },

    {
      name: "Palettes",
      path: "/secure/glow/palettes",
      onClick: x => true,
      _id: 9128,
    },

    {
      name: "Filaments",
      path: "/secure/glow/filaments",
      onClick: x => true,
      _id: 9129,
    },

    {
      name: "Edit All Data",
      path: "/secure/glow/edit_all_data",
      onClick: x => true,
      _id: 9130,
    },

    {
      name: "Gcode",
      path: "/secure/glow/gcode_continous",
      onClick: x => true,
      _id: 9131,
    },

    {
      name: "Update Version",
      path: "",
      onClick: () => updateVersion(),
      _id: 9132,
    },
  ],
};
export const navItems = [
  {
    name: "Home",
    path: "/",
    _id: 9133,
    ariaLabel: "Home Page",
    headerLocation: "center",
  },
  {
    name: "Shop",
    path: "/pages/menu/gloving",
    _id: 9134,
    dataTestId: "shop_button",
    columns: [features, enhancers],
    otherColumns: [essentials],
    headerLocation: "center",
  },
  {
    name: "Learn",
    path: "/pages/learn",
    _id: 9135,
    dataTestId: "learn_button",
    columns: [learn, tutorials],
    otherColumns: [tips],
    headerLocation: "center",
  },
  {
    name: "Community",
    path: "/pages/menu/support",
    _id: 10136,
    dataTestId: "community_button",
    columns: [community],
    headerLocation: "center",
  },
  {
    name: "Support",
    path: "/pages/menu/support",
    _id: 10137,
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
      _id: 10138,
      onClick: current_user =>
        !(current_user && current_user.hasOwnProperty("first_name") && current_user.first_name) &&
        dispatch(openLoginModal()),
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
