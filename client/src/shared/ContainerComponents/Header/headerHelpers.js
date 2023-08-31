const features = {
  name: "Featured",
  path: "/collections/all/products/category/our_picks",
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "New Releases!",
      path: "/collections/all/products/category/new_releases",
      variant: "nav",
      className: "ta-l",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "🆕",
    },
    {
      name: "Best Sellers",
      path: "/collections/all/products/category/best_sellers",
      variant: "nav",
      className: "ta-l",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "✅",
    },
    {
      name: "Our Picks",
      path: "/collections/all/products/category/our_picks",
      variant: "nav",
      className: "ta-l jc-b",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "⭐",
    },
    {
      name: "On Sale!",
      path: "/collections/all/products/category/discounted",
      variant: "nav",
      className: "ta-l",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "💰",
    },
    {
      name: "Stickers",
      path: "/collections/all/products/category/merch/subcategory/stickers",
      variant: "nav",
      className: "ta-l",
    },
  ],
};

const glowskinz = {
  name: "Glowskinz",
  path: "/collections/all/products/category/glowskinz",
  variant: "",
  className: "nav-btn-link",
  id: "glowskinz_dropdown",
  sideDrawer: {
    name: "Glowskinz",
    path: "/collections/all/products/category/glowskinz",
    variant: "nav",
    className: "ta-l fs-18px title_font",
    id: "glowskinz_dropdown",
    drawerItems: [
      {
        name: "CLOZD Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/clozd",
        variant: "",
        className: "nav-btn-link",
        id: "clozd_dropdown",
        subSideDrawer: {
          variant: "nav",
          className: "ta-l fs-18px title_font",
          subDrawerItems: [
            {
              name: "Classics",
              path: "/collections/all/products/category/glowskinz/subcategory/clozd/collection/classics",
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Novaskinz",
              path: "/collections/all/products/category/glowskinz/subcategory/clozd/collection/novaskinz",
              variant: "nav",
              className: "ta-l",
            },
          ],
        },
      },
      {
        name: "OPYN Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/opyn",
        variant: "nav",
        className: "ta-l",
        subDrawerItems: [],
      },
    ],
  },
};

const exo_diffusers = {
  name: "EXO Diffusers",
  path: "/collections/all/products/category/exo_diffusers",
  variant: "",
  className: "nav-btn-link",
  id: "exo_diffusers_dropdown",
  sideDrawer: {
    className: "ta-l fs-18px title_font",
    drawerItems: [
      {
        name: "Collections",
        path: "/collections/all/products/category/exo_diffusers",
        variant: "",
        className: "nav-btn-link w-100per",
        id: "exo_diffusers_collections_dropdown",
        subSideDrawer: {
          variant: "nav",
          className: "ta-l fs-18px title_font",
          id: "exo_diffusers_collections_dropdown",
          subDrawerItems: [
            {
              name: "Platonic Solids",
              path: "/collections/all/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids",
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Spheroid",
              path: "/collections/all/products/category/exo_diffusers/subcategory/domes/collection/spheroid",
              variant: "nav",
              className: "ta-l",
            },
          ],
        },
      },

      {
        name: "Polyhedrons",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/polyhedrons",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/domes",
        variant: "nav",
        className: "ta-l block",
      },
    ],
  },
};

const diffuser_caps = {
  name: "Diffuser Caps",
  path: "/collections/all/products/category/diffuser_caps",
  variant: "",
  className: "nav-btn-link",
  id: "diffuser_caps_dropdown",
  sideDrawer: {
    className: "ta-l fs-18px title_font",
    drawerItems: [
      {
        name: "Diffuser Caps Starter Kit",
        path: "/collections/all/products/category/diffuser_caps_adapters_starter_kit",
        variant: "nav",
        className: "ta-l",
      },
      {
        name: "Collections",
        path: "/collections/all/products/category/diffuser_caps",
        variant: "",
        className: "nav-btn-link w-100per",
        id: "collections_dropdown",
        subSideDrawer: {
          variant: "nav",
          className: "ta-l fs-18px title_font",
          subDrawerItems: [
            {
              name: "Texture",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/texture",
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Fractal",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/fractal",
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Space Cadet",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/space_cadet",
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Festie Bestie",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/festie_bestie",
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Platonic Solids",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids",
              variant: "nav",
              className: "ta-l",
            },
          ],
        },
      },
      {
        name: "Geometric",
        path: "/collections/all/products/category/diffuser_caps/subcategory/geometric",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Shapes",
        path: "/collections/all/products/category/diffuser_caps/subcategory/shapes",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffuser_caps/subcategory/abstract",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Patterns",
        path: "/collections/all/products/category/diffuser_caps/subcategory/patterns",
        variant: "nav",
        className: "ta-l block",
      },
    ],
  },
};

const diffusers = {
  name: "Diffusers",
  path: "/collections/all/products/category/diffusers",
  variant: "",
  className: "nav-btn-link",
  id: "diffusers_dropdown",
  sideDrawer: {
    className: "ta-l fs-18px title_font",
    drawerItems: [
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffusers/subcategory/abstract",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Polygons",
        path: "/collections/all/products/category/diffusers/subcategory/polygons",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Cylinders",
        path: "/collections/all/products/category/diffusers/subcategory/cylinders",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/diffusers/subcategory/domes",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Open Hole",
        path: "/collections/all/products/category/diffusers/subcategory/open_hole",
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Closed Hole",
        path: "/collections/all/products/category/diffusers/subcategory/closed_hole",
        variant: "nav",
        className: "ta-l block",
      },
    ],
  },
};

const enhancers = {
  name: "Enhancers",
  path: "/pages/menu/gloving",
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    glowskinz,

    {
      name: "Glowframez",
      path: "/collections/all/products/category/glowframez",
      variant: "nav",
      className: "ta-l",
    },
    exo_diffusers,
    diffuser_caps,
    diffusers,
    {
      name: "Decals",
      path: "/collections/all/products/category/decals",
      variant: "nav",
      className: "ta-l",
    },
  ],
};

const essentials = {
  name: "Essentials",
  path: "/collections/all/products/category/essentials",
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "Supreme Gloves",
      path: "/collections/all/products/category/gloves/subcategory/singles",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Refresh Packs",
      path: "/collections/all/products/category/gloves/subcategory/refresh",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Sizing Samplers",
      path: "/collections/all/products/category/gloves/subcategory/sampler",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Coin Batteries",
      path: "/collections/all/products/category/batteries/subcategory/coin",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Battery Storage",
      path: "/collections/all/products/category/batteries/subcategory/storage",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Wholesale",
      path: "/collections/all/products/category/wholesale",
      variant: "nav",
      className: "ta-l",
      permissions: item => (item ? item.isWholesaler : undefined),
    },
  ],
};
const community = {
  name: "Community",
  path: "/pages/menu/support",
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "Sponsored Glovers",
      path: "/collections/all/sponsors",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Sponsored Teams",
      path: "/collections/all/teams",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Rave Mob",
      path: "/collections/all/teams/category/rave_mob",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Featured",
      path: "/pages/menu/featured",
      variant: "nav",
      className: "ta-l",
      id: "featured_dropdown",
      sideDrawer: {
        className: "ta-l fs-18px title_font",
        drawerItems: [
          {
            name: "Glovers",
            path: "/collections/all/sponsors",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Artists",
            path: "/collections/all/sponsors",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Producers",
            path: "/collections/all/teams",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "VFX",
            path: "/collections/all/teams/category/rave_mob",
            variant: "nav",
            className: "ta-l block",
          },
        ],
      },
    },
  ],
};
const support = {
  name: "Support",
  path: "/pages/menu/support",
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "FAQ",
      path: "/pages/faq",
      variant: "nav",
      className: "ta-l",
      id: "faq_dropdown",
      sideDrawer: {
        className: "ta-l fs-18px title_font",
        drawerItems: [
          {
            name: "Glowskinz",
            path: "/pages/faq#glowskinz",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Diffuser Caps",
            path: "/pages/faq#diffuser_caps",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Ordering Custom Products",
            path: "/pages/faq#ordering_custom_products",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Featured Content",
            path: "/pages/faq#featured_content",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Processing/Shipping",
            path: "/pages/faq#processing_shipping",
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Order Issues",
            path: "/pages/faq#order_issues",
            variant: "nav",
            className: "ta-l block",
          },
        ],
      },
    },
    {
      name: "Track Your Order",
      path: "/pages/track_your_order",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Contact",
      path: "/pages/contact",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "About",
      path: "/pages/about",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Announcements",
      path: "/pages/announcements",
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Term and Condition",
      path: "/pages/terms",
      variant: "nav",
      className: "ta-l",
    },
  ],
};

const user = {
  name: "User",
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "Profile",
      path: "/secure/glow/profile",
      variant: "nav",
    },

    {
      name: "Logout",
      // onClick: handleLogout
      variant: "nav",
      className: "r-auto",
    },
  ],
};

const admin = {
  name: "Admin",
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "Dashboard",
      path: "/secure/glow/dashboard",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Orders",
      path: "/secure/glow/orders",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Products",
      path: `/secure/glow/products?search=&filters=%7B"hidden"%3A%5B%5D%2C"options"%3A%5B%5D%7D&page=0&pageSize=10&sorting=%5B3%2C"desc"%5D`,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Users",
      path: "/secure/glow/users",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Affiliates",
      path: "/secure/glow/affiliates",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Wholesalers",
      path: "/secure/glow/wholesalers",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Tutorials",
      path: "/secure/glow/tutorials",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Images",
      path: "/secure/glow/images",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Paychecks",
      path: "/secure/glow/paychecks",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Promos",
      path: "/secure/glow/promos",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Carts",
      path: "/secure/glow/carts",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Chips",
      path: "/secure/glow/chips",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Surveys",
      path: "/secure/glow/surveys",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Teams",
      path: "/secure/glow/teams",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Contents",
      path: "/secure/glow/contents",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Emails",
      path: "/secure/glow/emails",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Expenses",
      path: "/secure/glow/expenses",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Features",
      path: "/secure/glow/features",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Logs",
      path: "/secure/glow/logs",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Parcels",
      path: "/secure/glow/parcels",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Categorys",
      path: "/secure/glow/categorys",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Settings",
      path: "/secure/glow/settings",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Palettes",
      path: "/secure/glow/palettes",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Filaments",
      path: "/secure/glow/filaments",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Edit All Data",
      path: "/secure/glow/edit_all_data",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Gcode",
      path: "/secure/glow/gcode_continous",
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Compressor",
      path: "/secure/glow/image_compressor",
      variant: "nav",
      className: "ta-l",
    },
  ],
};

export const navItems = [
  {
    name: "Home",
    path: "/",
    variant: "nav",
    className: "title_font",
    ariaLabel: "Home Page",
    headerLocation: "center",
  },
  {
    name: "Shop",
    path: "/pages/menu/gloving",
    variant: "nav",
    className: "title_font",
    dataTestId: "shop_button",
    columns: [features, enhancers],
    otherColumns: [essentials],
    headerLocation: "center",
  },
  {
    name: "Learn",
    path: "/collections/all/tutorials",
    variant: "nav",
    className: "title_font",
    dataTestId: "learn_button",
    headerLocation: "center",
  },
  {
    name: "Community",
    path: "/pages/menu/support",
    variant: "nav",
    className: "title_font",
    dataTestId: "community_button",
    columns: [community],
    headerLocation: "center",
  },
  {
    name: "Support",
    path: "/pages/menu/support",
    variant: "nav",
    className: "title_font",
    dataTestId: "support_button",
    columns: [support],
    headerLocation: "center",
  },
];

export const rightNaNearMeSharp = [
  {
    name: "Cart",
    variant: "nav",
    className: "title_font",
    dataTestId: "learn_button",
    headerLocation: "center",
  },
  {
    name: name => name,
    path: "/pages/menu/support",
    variant: "nav",
    className: "title_font",
    dataTestId: "community_button",
    columns: [user],
    headerLocation: "center",
  },
  {
    name: "Admin",
    variant: "nav",
    className: "title_font",
    dataTestId: "support_button",
    columns: [admin],
    headerLocation: "center",
  },
];
