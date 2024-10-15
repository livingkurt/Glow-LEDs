import { updateVersion } from "../../api";
import { clear_order_state } from "../../slices/orderSlice";
import { openLoginModal } from "../../slices/userSlice";
import * as API from "../../api";
import { AccountCircle, AdminPanelSettings } from "@mui/icons-material";

import { uniqueId } from "lodash";

export const determineDropdown = (item, current_user) => {
  // If it's the login item and there's no current user, don't show the dropdown
  if (typeof item.name === "function" && item.name({}) === "LOGIN" && Object.keys(current_user).length === 0) {
    return false;
  }
  // For all other items, or when there is a current user, show the dropdown
  return true;
};

export const hasChildren = item =>
  item.rows?.length > 0 ||
  item.columns?.length > 0 ||
  item.column?.length > 0 ||
  item.otherColumns?.length > 0 ||
  item.sideDrawer?.drawerItems?.length > 0 ||
  item.subSideDrawer?.subNavbarDrawers?.length > 0;

export const determineName = (item, current_user) => {
  return typeof item.name === "function" ? item.name(current_user) : item.name;
};

export const determineBackgroundColor = level => {
  switch (level) {
    case 0:
      return "#333333";
    case 1:
      return "#4c526d";
    case 2:
      return "#343a52";
    case 3:
      return "#282c3b";
    case 4:
      return "#1d202b";
    default:
      return "#999999";
  }
};

export const toggleDropdown = ({ id, dropdownClass, toggleClass }) => {
  const elems = document.querySelectorAll(`.${dropdownClass}`);

  // Always close nested dropdowns when a subcategory is toggled
  const nestedElems = document.querySelectorAll(".navbar-subdrawer.show-navbar-subdrawer");
  nestedElems.forEach(el => {
    el.classList.remove("show-navbar-subdrawer");
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

const generateUniqueId = () => uniqueId("nav_");

const addIdsRecursively = obj => {
  if (Array.isArray(obj)) {
    return obj.map(item => addIdsRecursively(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj = { ...obj, _id: generateUniqueId() };
    for (const key in newObj) {
      if (typeof newObj[key] === "object" && newObj[key] !== null) {
        newObj[key] = addIdsRecursively(newObj[key]);
      }
    }
    return newObj;
  }
  return obj;
};

const features = addIdsRecursively({
  name: "Featured",
  path: "/products?category=our_picks",
  rows: [
    {
      name: "New Releases!",
      path: "/products?category=new_releases",
      extraContent: "🆕",
    },
    {
      name: "Best Sellers",
      path: "/products?category=best_sellers",
      extraContent: "✅",
    },
    {
      name: "Our Picks",
      path: "/products?category=our_picks",
      extraContent: "⭐",
    },
    {
      name: "On Sale!",
      path: "/products?category=discounted",
      extraContent: "💰",
    },
    {
      name: "Stickers",
      path: "/products?tags[]=merch&stags[]=stickers",
    },
  ],
});
const glowskinz = addIdsRecursively({
  name: "Glowskinz",
  path: "/products?tags[]=glowskinz",
  id: "glowskinz_dropdown",
  sideDrawer: {
    name: "Glowskinz",
    path: "/products?tags[]=glowskinz",
    id: "glowskinz_dropdown",
    drawerItems: [
      {
        name: "CLOZD Glowskinz",
        path: "/products?tags[]=glowskinz&tags[]=clozd",
        id: "clozd_dropdown",
        subSideDrawer: {
          id: "clozd_dropdown",
          subNavbarDrawers: [
            {
              name: "Classics",
              path: "/products?tags[]=glowskinz&tags[]=clozd&tags[]=classics",
            },
            {
              name: "Novaskinz",
              path: "/products?tags[]=glowskinz&tags[]=clozd&tags[]=novaskinz",
            },
          ],
        },
      },
      {
        name: "OPYN Glowskinz",
        path: "/products?tags[]=glowskinz&tags[]=opyn",
        subNavbarDrawers: [],
      },
    ],
  },
});

const exo_diffusers = addIdsRecursively({
  name: "EXO Diffusers",
  path: "/products?tags[]=exo_diffusers",
  id: "exo_diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Collections",
        path: "/products?tags[]=exo_diffusers",
        id: "exo_diffusers_collections_dropdown",
        subSideDrawer: {
          id: "exo_diffusers_collections_dropdown",
          subNavbarDrawers: [
            {
              name: "Platonic Solids",
              path: "/products?tags[]=exo_diffusers&tags[]=polyhedrons&tags[]=platonic_solids",
            },
            {
              name: "Spheroid",
              path: "/products?tags[]=exo_diffusers&tags[]=domes&tags[]=spheroid",
            },
          ],
        },
      },
      {
        name: "Polyhedrons",
        path: "/products?tags[]=exo_diffusers&tags[]=polyhedrons",
      },
      {
        name: "Domes",
        path: "/products?tags[]=exo_diffusers&tags[]=domes",
      },
    ],
  },
});

const diffuser_caps = addIdsRecursively({
  name: "Diffuser Caps",
  path: "/products?tags[]=diffuser_caps",
  id: "diffuser_caps_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Diffuser Caps Starter Kit",
        path: "/products?tags[]=diffuser_caps&tags[]=adapters&tags[]=starter_kit",
      },
      {
        name: "Collections",
        path: "/products?tags[]=diffuser_caps",
        id: "collections_dropdown",
        subSideDrawer: {
          subNavbarDrawers: [
            {
              name: "Texture",
              path: "/products?tags[]=diffuser_caps&tags[]=geometric&tags[]=texture",
            },
            {
              name: "Fractal",
              path: "/products?tags[]=diffuser_caps&tags[]=geometric&tags[]=fractal",
            },
            {
              name: "Space Cadet",
              path: "/products?tags[]=diffuser_caps&tags[]=shapes&tags[]=space_cadet",
            },
            {
              name: "Festie Bestie",
              path: "/products?tags[]=diffuser_caps&tags[]=shapes&tags[]=festie_bestie",
            },
            {
              name: "Platonic Solids",
              path: "/products?tags[]=diffuser_caps&tags[]=geometric&tags[]=platonic_solids",
            },
          ],
        },
      },
      {
        name: "Geometric",
        path: "/products?tags[]=diffuser_caps&tags[]=geometric",
      },
      {
        name: "Shapes",
        path: "/products?tags[]=diffuser_caps&tags[]=shapes",
      },
      {
        name: "Abstract",
        path: "/products?tags[]=diffuser_caps&tags[]=abstract",
      },
      {
        name: "Patterns",
        path: "/products?tags[]=diffuser_caps&tags[]=patterns",
      },
    ],
  },
});

const diffusers = addIdsRecursively({
  name: "Diffusers",
  path: "/products?tags[]=diffusers",
  id: "diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Abstract",
        path: "/products?tags[]=diffusers&tags[]=abstract",
      },
      {
        name: "Polygons",
        path: "/products?tags[]=diffusers&tags[]=polygons",
      },
      {
        name: "Cylinders",
        path: "/products?tags[]=diffusers&tags[]=cylinders",
      },
      {
        name: "Domes",
        path: "/products?tags[]=diffusers&tags[]=domes",
      },
      {
        name: "Open Hole",
        path: "/products?tags[]=diffusers&tags[]=open_hole",
      },
      {
        name: "Closed Hole",
        path: "/products?tags[]=diffusers&tags[]=closed_hole",
      },
    ],
  },
});

const enhancers = addIdsRecursively({
  name: "Enhancers",
  // path: "/menu/enhancers",
  id: "enhancers_dropdown",
  rows: [
    glowskinz,
    {
      name: "Glowframez",
      path: "/products?tags[]=glowframez",
    },
    exo_diffusers,
    diffuser_caps,
    {
      name: "Diffusers",
      path: "/products?tags[]=diffusers",
    },
    // diffusers,
    {
      name: "Decals",
      path: "/products?tags[]=decals",
    },
  ],
});

const essentials = addIdsRecursively({
  name: "Essentials",
  id: "essentials_dropdown",
  path: "/products?tags[]=essentials",
  rows: [
    {
      name: "Gloves",
      path: "/products?tags[]=gloves&tags[]=singles",
    },
    {
      name: "Refresh Packs",
      path: "/products?tags[]=gloves&tags[]=refresh",
    },
    {
      name: "Sizing Samplers",
      path: "/products?tags[]=gloves&tags[]=sampler",
    },
    {
      name: "Coin Batteries",
      path: "/products?tags[]=batteries&tags[]=coin",
    },
    {
      name: "Battery Storage",
      path: "/products?tags[]=batteries&tags[]=storage",
    },
    {
      name: "Wholesale",
      path: "/products?tags[]=wholesale",
      permissions: item => (item ? item.isWholesaler : undefined),
    },
  ],
});
const community = addIdsRecursively({
  name: "Community",
  id: "community_dropdown",
  // path: "/menu/community",
  rows: [
    {
      name: "Space City Gloving Competition",
      path: "/events/space_city_gloving_competition",
      feature: "events",
    },
    {
      name: "Sponsored Glovers",
      path: "/sponsors",
    },
    {
      name: "Sponsored Teams",
      path: "/teams",
    },
    // {
    //   name: "Rave Mob",
    //   path: "/teams/rave_mob",
    // },
    // {
    //   name: "Featured",
    //   path: "/menu/featured",
    //   id: "featured_dropdown",
    //   sideDrawer: {
    //     drawerItems: [
    //       {
    //         name: "Glovers",
    //         path: "/sponsors",
    //       },
    //       {
    //         name: "Artists",
    //         path: "/sponsors",
    //       },
    //       {
    //         name: "Producers",
    //         path: "/teams",
    //       },
    //       {
    //         name: "VFX",
    //         path: "/teams/category/rave_mob",
    //       },
    //     ],
    //   },
    // },
  ],
});

const learn = addIdsRecursively({
  name: "Learn",
  id: "academy_dropdown",
  path: "/academy",
  rows: [
    {
      name: "Academy Home",
      path: "/academy",
    },
    {
      name: "All Articles",
      path: "/learn",
    },
    {
      name: "What is Gloving?",
      path: "/learn/what_is_gloving",
    },
    {
      name: "Anatomy of the Glove Set",
      path: "/learn/anatomy_of_the_glove_set",
    },
    {
      name: "Anatomy of the Lightshow",
      path: "/learn/anatomy_of_the_lightshow",
    },
    {
      name: "Deep Dive into Accessories",
      path: "/learn/deep_dive_into_accessories",
    },
    {
      name: "Concept/Term Dictionary",
      path: "/learn/concept_term_dictionary",
    },
    {
      name: "Gloving History",
      path: "/learn/gloving_history",
    },
  ],
});
const tutorials = addIdsRecursively({
  name: "Tutorials",
  id: "tutorials_dropdown",
  path: "/tutorials",
  rows: [
    {
      name: "All Tutorials",
      path: "/tutorials",
    },
    {
      name: "By Skill Level",
      // path: "/menu/featured",
      id: "skill_level_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Beginner",
            path: "/tutorials?level=beginner",
          },
          {
            name: "Intermediate",
            path: "/tutorials?level=intermediate",
          },
          {
            name: "Advanced (Coming Soon)",
            path: "/tutorials?level=advanced",
          },
          {
            name: "Experimental (Coming Soon)",
            path: "/tutorials?level=experimental",
          },
        ],
      },
    },
    {
      name: "By Style",
      // path: "/menu/featured",
      id: "style_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Flow",
            path: "/tutorials?tags[]=flow",
          },
          {
            name: "Tech",
            path: "/tutorials?tags[]=tech",
          },
          {
            name: "Conjuring (Coming Soon)",
            path: "/tutorials?tags[]=conjuring",
          },
          {
            name: "Impacting (Coming Soon)",
            path: "/tutorials?tags[]=impacting",
          },
          {
            name: "Morphing (Coming Soon)",
            path: "/tutorials?tags[]=morphing",
          },
        ],
      },
    },
    // {
    //   name: "By Move",
    //   path: "/tutorials",
    // },
    {
      name: "By Concept",
      // path: "/tutorials?tags[]=concept",
      id: "concept_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Theory",
            path: "/tutorials?&tags[]=theory",
          },
          {
            name: "Transitions",
            path: "/tutorials?&tags[]=transitions",
          },
          {
            name: "Stretches",
            path: "/tutorials?&tags[]=stretches",
          },
          {
            name: "Finger Independence",
            path: "/tutorials?&tags[]=finger_independence",
          },
          {
            name: "Storytelling (Coming Soon)",
            path: "/tutorials?&tags[]=storytelling",
          },
          {
            name: "Cleanliness (Coming Soon)",
            path: "/tutorials?&tags[]=cleanliness",
          },
          {
            name: "Showmanship (Coming Soon)",
            path: "/tutorials?&tags[]=showmanship",
          },
          {
            name: "Musicality (Coming Soon)",
            path: "/tutorials?&tags[]=musicality",
          },
        ],
      },
    },
    {
      name: "By Glover",
      path: "/menu/featured",
      id: "artist_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Po",
            path: "/tutorials?&glover=po",
          },
          {
            name: "Puppet",
            path: "/tutorials?&glover=puppet",
          },
          // {
          //   name: "BeMO",
          //   path: "/tutorials?&glover=bemo",
          // },
          // {
          //   name: "Lykaios",
          //   path: "/tutorials?&glover=lykaios",
          // },
          // {
          //   name: "Zielzibub",
          //   path: "/tutorials?&glover=zielzibub",
          // },
          {
            name: "Starstream",
            path: "/tutorials?&glover=starstream",
          },
        ],
      },
    },
  ],
});
const tips = addIdsRecursively({
  name: "Gloving Tips",
  id: "tips_dropdown",
  path: "/learn",
  rows: [
    {
      name: "Gloving Etiquette",
      path: "/learn/gloving_etiquette",
    },
    {
      name: "Where do I start?",
      path: "/learn/where_do_i_start",
    },
    {
      name: "Maintaining Your Glove Set",
      path: "/learn/maintaining_your_glove_set",
    },
    {
      name: "Filming Lightshows",
      path: "/learn/filming_lightshows",
    },
    {
      name: "What's a Double Lightshow?",
      path: "/learn/whats_a_double_lightshow",
    },
  ],
});
const support = addIdsRecursively({
  name: "Support",
  id: "support_dropdown",
  // path: "/menu/support",
  rows: [
    {
      name: "Support Center",
      path: "/support_center",
    },
    {
      name: "About",
      path: "/about",
    },
    // {
    //   name: "Announcements",
    //   path: "/announcements",
    // },
    {
      name: "Term and Condition",
      path: "/terms",
    },
  ],
});

const user = addIdsRecursively({
  name: "User",
  id: "user_dropdown",
  rows: [
    {
      name: "Profile",
      path: "/secure/account/profile",
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
});

const admin = addIdsRecursively({
  name: "Admin",
  id: "admin_dropdown",
  rows: [
    {
      name: "Dashboard",
      path: "/secure/glow/dashboard",
      onClick: x => true,
    },

    {
      name: "Orders",
      path: "/secure/glow/orders",
      onClick: dispatch => dispatch(clear_order_state()),
    },

    {
      name: "Expenses",
      path: "/secure/glow/expenses",
      onClick: x => true,
    },

    {
      name: "Products",
      path: `/secure/glow/products?search=&filters=%7B"hidden"%3A%5B%5D%2C"options"%3A%5B%5D%7D&page=0&pageSize=10&sorting=%5B3%2C"desc"%5D`,
      onClick: x => true,
    },

    {
      name: "Users",
      path: "/secure/glow/users",
      onClick: x => true,
    },

    {
      name: "Affiliates",
      path: "/secure/glow/affiliates",
      onClick: x => true,
    },

    {
      name: "Events",
      path: "/secure/glow/events",
      onClick: x => true,
    },

    {
      name: "Tickets",
      path: "/secure/glow/tickets",
      onClick: x => true,
    },

    {
      name: "Wholesalers",
      path: "/secure/glow/wholesalers",
      onClick: x => true,
    },

    {
      name: "Tutorials",
      path: "/secure/glow/tutorials",
      onClick: x => true,
    },

    {
      name: "Articles",
      path: "/secure/glow/articles",
      onClick: x => true,
    },

    {
      name: "Images",
      path: "/secure/glow/images",
      onClick: x => true,
    },

    {
      name: "Paychecks",
      path: "/secure/glow/paychecks",
      onClick: x => true,
    },

    {
      name: "Promos",
      path: "/secure/glow/promos",
      onClick: x => true,
    },

    {
      name: "Carts",
      path: "/secure/glow/carts",
      onClick: x => true,
    },

    {
      name: "Chips",
      path: "/secure/glow/chips",
      onClick: x => true,
    },

    {
      name: "Surveys",
      path: "/secure/glow/surveys",
      onClick: x => true,
    },

    {
      name: "Teams",
      path: "/secure/glow/teams",
      onClick: x => true,
    },

    {
      name: "Contents",
      path: "/secure/glow/contents",
      onClick: x => true,
    },

    {
      name: "Emails",
      path: "/secure/glow/emails",
      onClick: x => true,
    },

    {
      name: "Features",
      path: "/secure/glow/features",
      onClick: x => true,
    },

    {
      name: "Parcels",
      path: "/secure/glow/parcels",
      onClick: x => true,
    },

    {
      name: "Categorys",
      path: "/secure/glow/categorys",
      onClick: x => true,
    },
    {
      name: "Palettes",
      path: "/secure/glow/palettes",
      onClick: x => true,
    },

    {
      name: "Filaments",
      path: "/secure/glow/filaments",
      onClick: x => true,
    },

    {
      name: "Edit All Data",
      path: "/secure/glow/edit_all_data",
      onClick: x => true,
    },

    {
      name: "Update Version",
      path: "",
      onClick: () => updateVersion(),
    },
  ],
});
export const navItems = [
  {
    name: "HOME",
    path: "/",
    ariaLabel: "Home Page",
    navbarLocation: "center",
  },
  {
    name: "SHOP",
    path: "/menu/shop",
    id: "shop_dropdown",
    dataTestId: "shop_button",
    columns: [features, enhancers],
    otherColumns: [essentials],
    navbarLocation: "center",
  },
  {
    name: "ACADEMY",
    // path: "/tutorials",
    id: "academy_dropdown",
    // path: "/learn",
    dataTestId: "learn_button",
    // columns: [learn],
    columns: [learn, tutorials],
    otherColumns: [tips],
    navbarLocation: "center",
  },
  {
    name: "COMMUNITY",
    id: "community_dropdown",
    // path: "/menu/community",
    dataTestId: "community_button",
    columns: [community],
    column: community.rows,
    navbarLocation: "center",
  },
  {
    name: "SUPPORT",
    id: "support_dropdown",
    // path: "/menu/support",
    dataTestId: "support_button",
    columns: [support],
    column: support.rows,
    navbarLocation: "center",
  },
];

export const rightNav = (dispatch, sidebarOnly) => {
  return [
    {
      name: current_user =>
        sidebarOnly ? (
          current_user && current_user.hasOwnProperty("first_name") ? (
            current_user.first_name.toUpperCase()
          ) : (
            "LOGIN"
          )
        ) : (
          <AccountCircle color="white" />
        ),
      path: "/secure/account/profile",
      onClick: current_user =>
        !(current_user && current_user.hasOwnProperty("first_name") && current_user.first_name) &&
        dispatch(openLoginModal()),
      dataTestId: "community_button",
      id: "user_dropdown",
      columns: [user],
      column: user.rows,
      navbarLocation: "center",
      permissions: x => true,
    },
    {
      name: current_user =>
        sidebarOnly ? (
          current_user && current_user.hasOwnProperty("first_name") ? (
            "ADMIN"
          ) : (
            ""
          )
        ) : (
          <AdminPanelSettings color="white" />
        ),
      id: "admin_dropdown",
      dataTestId: "support_button",
      permissions: current_user => current_user.isAdmin,
      columns: [admin],
      column: admin.rows,
      navbarLocation: "center",
    },
  ];
};

export const sidebarItems = dispatch => [
  navItems[0],
  rightNav(dispatch, true)[0],
  ...navItems.slice(1),
  rightNav(dispatch, true)[1],
];
