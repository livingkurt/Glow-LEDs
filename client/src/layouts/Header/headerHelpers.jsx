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
  item.subSideDrawer?.subHeaderDrawers?.length > 0;

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
  path: "/collections/all/products?category=our_picks",
  rows: [
    {
      name: "New Releases!",
      path: "/collections/all/products?category=new_releases",
      extraContent: "🆕",
    },
    {
      name: "Best Sellers",
      path: "/collections/all/products?category=best_sellers",
      extraContent: "✅",
    },
    {
      name: "Our Picks",
      path: "/collections/all/products?category=our_picks",
      extraContent: "⭐",
    },
    {
      name: "On Sale!",
      path: "/collections/all/products?category=discounted",
      extraContent: "💰",
    },
    {
      name: "Stickers",
      path: "/collections/all/products?tags[]=merch&stags[]=stickers",
    },
  ],
});
const glowskinz = addIdsRecursively({
  name: "Glowskinz",
  path: "/collections/all/products?tags[]=glowskinz",
  id: "glowskinz_dropdown",
  sideDrawer: {
    name: "Glowskinz",
    path: "/collections/all/products?tags[]=glowskinz",
    id: "glowskinz_dropdown",
    drawerItems: [
      {
        name: "CLOZD Glowskinz",
        path: "/collections/all/products?tags[]=glowskinz&tags[]=clozd",
        id: "clozd_dropdown",
        subSideDrawer: {
          id: "clozd_dropdown",
          subHeaderDrawers: [
            {
              name: "Classics",
              path: "/collections/all/products?tags[]=glowskinz&tags[]=clozd&tags[]=classics",
            },
            {
              name: "Novaskinz",
              path: "/collections/all/products?tags[]=glowskinz&tags[]=clozd&tags[]=novaskinz",
            },
          ],
        },
      },
      {
        name: "OPYN Glowskinz",
        path: "/collections/all/products?tags[]=glowskinz&tags[]=opyn",
        subHeaderDrawers: [],
      },
    ],
  },
});

const exo_diffusers = addIdsRecursively({
  name: "EXO Diffusers",
  path: "/collections/all/products?tags[]=exo_diffusers",
  id: "exo_diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Collections",
        path: "/collections/all/products?tags[]=exo_diffusers",
        id: "exo_diffusers_collections_dropdown",
        subSideDrawer: {
          id: "exo_diffusers_collections_dropdown",
          subHeaderDrawers: [
            {
              name: "Platonic Solids",
              path: "/collections/all/products?tags[]=exo_diffusers&tags[]=polyhedrons&tags[]=platonic_solids",
            },
            {
              name: "Spheroid",
              path: "/collections/all/products?tags[]=exo_diffusers&tags[]=domes&tags[]=spheroid",
            },
          ],
        },
      },
      {
        name: "Polyhedrons",
        path: "/collections/all/products?tags[]=exo_diffusers&tags[]=polyhedrons",
      },
      {
        name: "Domes",
        path: "/collections/all/products?tags[]=exo_diffusers&tags[]=domes",
      },
    ],
  },
});

const diffuser_caps = addIdsRecursively({
  name: "Diffuser Caps",
  path: "/collections/all/products?tags[]=diffuser_caps",
  id: "diffuser_caps_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Diffuser Caps Starter Kit",
        path: "/collections/all/products?tags[]=diffuser_caps&tags[]=adapters&tags[]=starter_kit",
      },
      {
        name: "Collections",
        path: "/collections/all/products?tags[]=diffuser_caps",
        id: "collections_dropdown",
        subSideDrawer: {
          subHeaderDrawers: [
            {
              name: "Texture",
              path: "/collections/all/products?tags[]=diffuser_caps&tags[]=geometric&tags[]=texture",
            },
            {
              name: "Fractal",
              path: "/collections/all/products?tags[]=diffuser_caps&tags[]=geometric&tags[]=fractal",
            },
            {
              name: "Space Cadet",
              path: "/collections/all/products?tags[]=diffuser_caps&tags[]=shapes&tags[]=space_cadet",
            },
            {
              name: "Festie Bestie",
              path: "/collections/all/products?tags[]=diffuser_caps&tags[]=shapes&tags[]=festie_bestie",
            },
            {
              name: "Platonic Solids",
              path: "/collections/all/products?tags[]=diffuser_caps&tags[]=geometric&tags[]=platonic_solids",
            },
          ],
        },
      },
      {
        name: "Geometric",
        path: "/collections/all/products?tags[]=diffuser_caps&tags[]=geometric",
      },
      {
        name: "Shapes",
        path: "/collections/all/products?tags[]=diffuser_caps&tags[]=shapes",
      },
      {
        name: "Abstract",
        path: "/collections/all/products?tags[]=diffuser_caps&tags[]=abstract",
      },
      {
        name: "Patterns",
        path: "/collections/all/products?tags[]=diffuser_caps&tags[]=patterns",
      },
    ],
  },
});

const diffusers = addIdsRecursively({
  name: "Diffusers",
  path: "/collections/all/products?tags[]=diffusers",
  id: "diffusers_dropdown",
  sideDrawer: {
    drawerItems: [
      {
        name: "Abstract",
        path: "/collections/all/products?tags[]=diffusers&tags[]=abstract",
      },
      {
        name: "Polygons",
        path: "/collections/all/products?tags[]=diffusers&tags[]=polygons",
      },
      {
        name: "Cylinders",
        path: "/collections/all/products?tags[]=diffusers&tags[]=cylinders",
      },
      {
        name: "Domes",
        path: "/collections/all/products?tags[]=diffusers&tags[]=domes",
      },
      {
        name: "Open Hole",
        path: "/collections/all/products?tags[]=diffusers&tags[]=open_hole",
      },
      {
        name: "Closed Hole",
        path: "/collections/all/products?tags[]=diffusers&tags[]=closed_hole",
      },
    ],
  },
});

const enhancers = addIdsRecursively({
  name: "Enhancers",
  // path: "/pages/menu/enhancers",
  id: "enhancers_dropdown",
  rows: [
    glowskinz,
    {
      name: "Glowframez",
      path: "/collections/all/products?tags[]=glowframez",
    },
    exo_diffusers,
    diffuser_caps,
    {
      name: "Diffusers",
      path: "/collections/all/products?tags[]=diffusers",
    },
    // diffusers,
    {
      name: "Decals",
      path: "/collections/all/products?tags[]=decals",
    },
  ],
});

const essentials = addIdsRecursively({
  name: "Essentials",
  id: "essentials_dropdown",
  path: "/collections/all/products?tags[]=essentials",
  rows: [
    {
      name: "Gloves",
      path: "/collections/all/products?tags[]=gloves&tags[]=singles",
    },
    {
      name: "Refresh Packs",
      path: "/collections/all/products?tags[]=gloves&tags[]=refresh",
    },
    {
      name: "Sizing Samplers",
      path: "/collections/all/products?tags[]=gloves&tags[]=sampler",
    },
    {
      name: "Coin Batteries",
      path: "/collections/all/products?tags[]=batteries&tags[]=coin",
    },
    {
      name: "Battery Storage",
      path: "/collections/all/products?tags[]=batteries&tags[]=storage",
    },
    {
      name: "Wholesale",
      path: "/collections/all/products?tags[]=wholesale",
      permissions: item => (item ? item.isWholesaler : undefined),
    },
  ],
});
const community = addIdsRecursively({
  name: "Community",
  id: "community_dropdown",
  // path: "/pages/menu/community",
  rows: [
    {
      name: "Space City Gloving Competition",
      path: "/pages/events/space_city_gloving_competition",
      feature: "events",
    },
    {
      name: "Sponsored Glovers",
      path: "/collections/all/sponsors",
    },
    {
      name: "Sponsored Teams",
      path: "/collections/all/teams",
    },
    {
      name: "Rave Mob",
      path: "/collections/all/teams/category/rave_mob",
    },
    // {
    //   name: "Featured",
    //   path: "/pages/menu/featured",
    //   id: "featured_dropdown",
    //   sideDrawer: {
    //     drawerItems: [
    //       {
    //         name: "Glovers",
    //         path: "/collections/all/sponsors",
    //       },
    //       {
    //         name: "Artists",
    //         path: "/collections/all/sponsors",
    //       },
    //       {
    //         name: "Producers",
    //         path: "/collections/all/teams",
    //       },
    //       {
    //         name: "VFX",
    //         path: "/collections/all/teams/category/rave_mob",
    //       },
    //     ],
    //   },
    // },
  ],
});

const learn = addIdsRecursively({
  name: "Learn",
  id: "learn_dropdown",
  path: "/pages/learn",
  rows: [
    {
      name: "What is Gloving?",
      path: "/pages/learn/what_is_gloving",
    },
    {
      name: "Anatomy of the Glove Set",
      path: "/pages/learn/what_is_a_microlight",
    },
    {
      name: "Deep Dive into Accessories",
      path: "/pages/learn/what_is_a_microlight",
    },
    {
      name: "Concept/Term Glossery",
      path: "/pages/learn/what_is_a_microlight",
    },
    {
      name: "Gloving History",
      path: "/pages/learn/gloving_history",
    },
  ],
});
const tutorials = addIdsRecursively({
  name: "Tutorials",
  id: "tutorials_dropdown",
  path: "/pages/learn",
  rows: [
    {
      name: "By Skill Level",
      path: "/pages/menu/featured",
      id: "skill_level_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Beginner",
            path: "/collections/all/sponsors",
          },
          {
            name: "Intermediate",
            path: "/collections/all/sponsors",
          },
          {
            name: "Advanced",
            path: "/collections/all/teams",
          },
          {
            name: "Experimental",
            path: "/collections/all/teams/category/rave_mob",
          },
        ],
      },
    },
    {
      name: "By Style",
      path: "/pages/menu/featured",
      id: "style_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Flow",
            path: "/collections/all/sponsors",
          },
          {
            name: "Tech",
            path: "/collections/all/sponsors",
          },
          {
            name: "Conjuring",
            path: "/collections/all/teams",
          },
          {
            name: "Impacting",
            path: "/collections/all/teams/category/rave_mob",
          },
          {
            name: "Morphing",
            path: "/collections/all/teams/category/rave_mob",
          },
        ],
      },
    },
    {
      name: "By Move",
      path: "/collections/all/tutorials",
    },
    {
      name: "By Concept",
      path: "/pages/menu/featured",
      id: "concept_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "Showmanship",
            path: "/collections/all/sponsors",
          },
          {
            name: "Musicality",
            path: "/collections/all/sponsors",
          },
          {
            name: "Transistions",
            path: "/collections/all/teams",
          },
          {
            name: "Stretches",
            path: "/collections/all/teams/category/rave_mob",
          },
          {
            name: "Finger Independence",
            path: "/collections/all/teams/category/rave_mob",
          },
          {
            name: "Story Telling",
            path: "/collections/all/teams/category/rave_mob",
          },
          {
            name: "Cleanliness",
            path: "/collections/all/teams/category/rave_mob",
          },
        ],
      },
    },
    {
      name: "By Artist",
      path: "/pages/menu/featured",
      id: "artist_dropdown",
      sideDrawer: {
        drawerItems: [
          {
            name: "BeMO",
            path: "/collections/all/sponsors",
          },
          {
            name: "Lykaios",
            path: "/collections/all/sponsors",
          },
          {
            name: "Po",
            path: "/collections/all/teams",
          },
          {
            name: "Puppet",
            path: "/collections/all/teams/category/rave_mob",
          },
          {
            name: "Rekursion",
            path: "/collections/all/teams/category/rave_mob",
          },
          {
            name: "Starstream TuT",
            path: "/collections/all/teams/category/rave_mob",
          },
        ],
      },
    },
  ],
});
const tips = addIdsRecursively({
  name: "Gloving Tips",
  id: "tips_dropdown",
  path: "/pages/learn",
  rows: [
    {
      name: "Gloving Etiquette",
      path: "/pages/learn/what_is_gloving",
    },
    {
      name: "Where do I start?",
      path: "/pages/learn/where_do_i_start",
    },
  ],
});
const support = addIdsRecursively({
  name: "Support",
  id: "support_dropdown",
  // path: "/pages/menu/support",
  rows: [
    {
      name: "Support Center",
      path: "/pages/support_center",
    },
    {
      name: "About",
      path: "/pages/about",
    },
    // {
    //   name: "Announcements",
    //   path: "/pages/announcements",
    // },
    {
      name: "Term and Condition",
      path: "/pages/terms",
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
    headerLocation: "center",
  },
  {
    name: "SHOP",
    path: "/pages/menu/shop",
    id: "shop_dropdown",
    dataTestId: "shop_button",
    columns: [features, enhancers],
    otherColumns: [essentials],
    headerLocation: "center",
  },
  {
    name: "LEARN",
    path: "/collections/all/tutorials",
    id: "learn_dropdown",
    // path: "/pages/learn",
    dataTestId: "learn_button",
    // columns: [learn, tutorials],
    // otherColumns: [tips],
    headerLocation: "center",
  },
  {
    name: "COMMUNITY",
    id: "community_dropdown",
    // path: "/pages/menu/community",
    dataTestId: "community_button",
    columns: [community],
    column: community.rows,
    headerLocation: "center",
  },
  {
    name: "SUPPORT",
    id: "support_dropdown",
    // path: "/pages/menu/support",
    dataTestId: "support_button",
    columns: [support],
    column: support.rows,
    headerLocation: "center",
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
      headerLocation: "center",
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
      headerLocation: "center",
    },
  ];
};

export const sidebarItems = dispatch => [
  navItems[0],
  rightNav(dispatch, true)[0],
  ...navItems.slice(1),
  rightNav(dispatch, true)[1],
];
