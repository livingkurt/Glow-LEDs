const features = {
  name: "Featured",
  path: "/collections/all/products/category/our_picks",
  _id: 0,
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "New Releases!",
      path: "/collections/all/products/category/new_releases",
      _id: 1,
      variant: "nav",
      className: "ta-l",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "🆕",
    },
    {
      name: "Best Sellers",
      path: "/collections/all/products/category/best_sellers",
      _id: 2,
      variant: "nav",
      className: "ta-l",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "✅",
    },
    {
      name: "Our Picks",
      path: "/collections/all/products/category/our_picks",
      _id: 3,
      variant: "nav",
      className: "ta-l jc-b",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "⭐",
    },
    {
      name: "On Sale!",
      path: "/collections/all/products/category/discounted",
      _id: 4,
      variant: "nav",
      className: "ta-l",
      style: { padding: "7px 10px 7px 10px" },
      extraContent: "💰",
    },
    {
      name: "Stickers",
      path: "/collections/all/products/category/merch/subcategory/stickers",
      _id: 5,
      variant: "nav",
      className: "ta-l",
    },
  ],
};

const glowskinz = {
  name: "Glowskinz",
  path: "/collections/all/products/category/glowskinz",
  _id: 6,
  variant: "",
  className: "nav-btn-link",
  id: "glowskinz_dropdown",
  sideDrawer: {
    name: "Glowskinz",
    path: "/collections/all/products/category/glowskinz",
    _id: 7,
    variant: "nav",
    className: "ta-l fs-18px title_font",
    id: "glowskinz_dropdown",
    drawerItems: [
      {
        name: "CLOZD Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/clozd",
        _id: 8,
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
              _id: 9,
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Novaskinz",
              path: "/collections/all/products/category/glowskinz/subcategory/clozd/collection/novaskinz",
              _id: 10,
              variant: "nav",
              className: "ta-l",
            },
          ],
        },
      },
      {
        name: "OPYN Glowskinz",
        path: "/collections/all/products/category/glowskinz/subcategory/opyn",
        _id: 11,
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
  _id: 12,
  variant: "",
  className: "nav-btn-link",
  id: "exo_diffusers_dropdown",
  sideDrawer: {
    className: "ta-l fs-18px title_font",
    drawerItems: [
      {
        name: "Collections",
        path: "/collections/all/products/category/exo_diffusers",
        _id: 13,
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
              _id: 14,
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Spheroid",
              path: "/collections/all/products/category/exo_diffusers/subcategory/domes/collection/spheroid",
              _id: 15,
              variant: "nav",
              className: "ta-l",
            },
          ],
        },
      },

      {
        name: "Polyhedrons",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/polyhedrons",
        _id: 16,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/exo_diffusers/subcategory/clozd/collection/domes",
        _id: 17,
        variant: "nav",
        className: "ta-l block",
      },
    ],
  },
};

const diffuser_caps = {
  name: "Diffuser Caps",
  path: "/collections/all/products/category/diffuser_caps",
  _id: 18,
  variant: "",
  className: "nav-btn-link",
  id: "diffuser_caps_dropdown",
  sideDrawer: {
    className: "ta-l fs-18px title_font",
    drawerItems: [
      {
        name: "Diffuser Caps Starter Kit",
        path: "/collections/all/products/category/diffuser_caps_adapters_starter_kit",
        _id: 19,
        variant: "nav",
        className: "ta-l",
      },
      {
        name: "Collections",
        path: "/collections/all/products/category/diffuser_caps",
        _id: 20,
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
              _id: 21,
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Fractal",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/fractal",
              _id: 22,
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Space Cadet",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/space_cadet",
              _id: 23,
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Festie Bestie",
              path: "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/festie_bestie",
              _id: 24,
              variant: "nav",
              className: "ta-l",
            },
            {
              name: "Platonic Solids",
              path: "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids",
              _id: 25,
              variant: "nav",
              className: "ta-l",
            },
          ],
        },
      },
      {
        name: "Geometric",
        path: "/collections/all/products/category/diffuser_caps/subcategory/geometric",
        _id: 26,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Shapes",
        path: "/collections/all/products/category/diffuser_caps/subcategory/shapes",
        _id: 27,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffuser_caps/subcategory/abstract",
        _id: 28,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Patterns",
        path: "/collections/all/products/category/diffuser_caps/subcategory/patterns",
        _id: 29,
        variant: "nav",
        className: "ta-l block",
      },
    ],
  },
};

const diffusers = {
  name: "Diffusers",
  path: "/collections/all/products/category/diffusers",
  _id: 30,
  variant: "",
  className: "nav-btn-link",
  id: "diffusers_dropdown",
  sideDrawer: {
    className: "ta-l fs-18px title_font",
    drawerItems: [
      {
        name: "Abstract",
        path: "/collections/all/products/category/diffusers/subcategory/abstract",
        _id: 31,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Polygons",
        path: "/collections/all/products/category/diffusers/subcategory/polygons",
        _id: 32,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Cylinders",
        path: "/collections/all/products/category/diffusers/subcategory/cylinders",
        _id: 33,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Domes",
        path: "/collections/all/products/category/diffusers/subcategory/domes",
        _id: 34,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Open Hole",
        path: "/collections/all/products/category/diffusers/subcategory/open_hole",
        _id: 35,
        variant: "nav",
        className: "ta-l block",
      },
      {
        name: "Closed Hole",
        path: "/collections/all/products/category/diffusers/subcategory/closed_hole",
        _id: 36,
        variant: "nav",
        className: "ta-l block",
      },
    ],
  },
};

const enhancers = {
  name: "Enhancers",
  path: "/pages/menu/gloving",
  _id: 37,
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    glowskinz,

    {
      name: "Glowframez",
      path: "/collections/all/products/category/glowframez",
      _id: 38,
      variant: "nav",
      className: "ta-l",
    },
    exo_diffusers,
    diffuser_caps,
    diffusers,
    {
      name: "Decals",
      path: "/collections/all/products/category/decals",
      _id: 39,
      variant: "nav",
      className: "ta-l",
    },
  ],
};

const essentials = {
  name: "Essentials",
  path: "/collections/all/products/category/essentials",
  _id: 40,
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "Supreme Gloves",
      path: "/collections/all/products/category/gloves/subcategory/singles",
      _id: 41,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Refresh Packs",
      path: "/collections/all/products/category/gloves/subcategory/refresh",
      _id: 42,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Sizing Samplers",
      path: "/collections/all/products/category/gloves/subcategory/sampler",
      _id: 43,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Coin Batteries",
      path: "/collections/all/products/category/batteries/subcategory/coin",
      _id: 44,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Battery Storage",
      path: "/collections/all/products/category/batteries/subcategory/storage",
      _id: 45,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Wholesale",
      path: "/collections/all/products/category/wholesale",
      _id: 46,
      variant: "nav",
      className: "ta-l",
      permissions: item => (item ? item.isWholesaler : undefined),
    },
  ],
};
const community = {
  name: "Community",
  path: "/pages/menu/support",
  _id: 47,
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "Sponsored Glovers",
      path: "/collections/all/sponsors",
      _id: 48,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Sponsored Teams",
      path: "/collections/all/teams",
      _id: 49,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Rave Mob",
      path: "/collections/all/teams/category/rave_mob",
      _id: 50,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Featured",
      path: "/pages/menu/featured",
      _id: 51,
      variant: "nav",
      className: "ta-l",
      id: "featured_dropdown",
      sideDrawer: {
        className: "ta-l fs-18px title_font",
        drawerItems: [
          {
            name: "Glovers",
            path: "/collections/all/sponsors",
            _id: 52,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Artists",
            path: "/collections/all/sponsors",
            _id: 53,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Producers",
            path: "/collections/all/teams",
            _id: 54,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "VFX",
            path: "/collections/all/teams/category/rave_mob",
            _id: 55,
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
  _id: 56,
  variant: "nav",
  className: "ta-l fs-18px title_font",
  rows: [
    {
      name: "FAQ",
      path: "/pages/faq",
      _id: 57,
      variant: "nav",
      className: "ta-l",
      id: "faq_dropdown",
      sideDrawer: {
        className: "ta-l fs-18px title_font",
        drawerItems: [
          {
            name: "Glowskinz",
            path: "/pages/faq#glowskinz",
            _id: 58,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Diffuser Caps",
            path: "/pages/faq#diffuser_caps",
            _id: 59,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Ordering Custom Products",
            path: "/pages/faq#ordering_custom_products",
            _id: 60,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Featured Content",
            path: "/pages/faq#featured_content",
            _id: 61,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Processing/Shipping",
            path: "/pages/faq#processing_shipping",
            _id: 62,
            variant: "nav",
            className: "ta-l block",
          },
          {
            name: "Order Issues",
            path: "/pages/faq#order_issues",
            _id: 63,
            variant: "nav",
            className: "ta-l block",
          },
        ],
      },
    },
    {
      name: "Track Your Order",
      path: "/pages/track_your_order",
      _id: 64,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Contact",
      path: "/pages/contact",
      _id: 65,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "About",
      path: "/pages/about",
      _id: 66,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Announcements",
      path: "/pages/announcements",
      _id: 67,
      variant: "nav",
      className: "ta-l",
    },
    {
      name: "Term and Condition",
      path: "/pages/terms",
      _id: 68,
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
      _id: 69,
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
      _id: 70,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Orders",
      path: "/secure/glow/orders",
      _id: 71,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Products",
      path: `/secure/glow/products?search=&filters=%7B"hidden"%3A%5B%5D%2C"options"%3A%5B%5D%7D&page=0&pageSize=10&sorting=%5B3%2C"desc"%5D`,
      _id: 72,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Users",
      path: "/secure/glow/users",
      _id: 73,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Affiliates",
      path: "/secure/glow/affiliates",
      _id: 74,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Wholesalers",
      path: "/secure/glow/wholesalers",
      _id: 75,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Tutorials",
      path: "/secure/glow/tutorials",
      _id: 76,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Images",
      path: "/secure/glow/images",
      _id: 77,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Paychecks",
      path: "/secure/glow/paychecks",
      _id: 78,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Promos",
      path: "/secure/glow/promos",
      _id: 79,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Carts",
      path: "/secure/glow/carts",
      _id: 80,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Chips",
      path: "/secure/glow/chips",
      _id: 81,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Surveys",
      path: "/secure/glow/surveys",
      _id: 82,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Teams",
      path: "/secure/glow/teams",
      _id: 83,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Contents",
      path: "/secure/glow/contents",
      _id: 84,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Emails",
      path: "/secure/glow/emails",
      _id: 85,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Expenses",
      path: "/secure/glow/expenses",
      _id: 86,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Features",
      path: "/secure/glow/features",
      _id: 87,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Logs",
      path: "/secure/glow/logs",
      _id: 88,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Parcels",
      path: "/secure/glow/parcels",
      _id: 89,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Categorys",
      path: "/secure/glow/categorys",
      _id: 90,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Settings",
      path: "/secure/glow/settings",
      _id: 91,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Palettes",
      path: "/secure/glow/palettes",
      _id: 92,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Filaments",
      path: "/secure/glow/filaments",
      _id: 93,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Edit All Data",
      path: "/secure/glow/edit_all_data",
      _id: 94,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Gcode",
      path: "/secure/glow/gcode_continous",
      _id: 95,
      variant: "nav",
      className: "ta-l",
    },

    {
      name: "Compressor",
      path: "/secure/glow/image_compressor",
      _id: 96,
      variant: "nav",
      className: "ta-l",
    },
  ],
};

export const navItems = [
  {
    name: "Home",
    path: "/",
    _id: 97,
    variant: "nav",
    className: "title_font",
    ariaLabel: "Home Page",
    headerLocation: "center",
  },
  {
    name: "Shop",
    path: "/pages/menu/gloving",
    _id: 98,
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
    _id: 99,
    variant: "nav",
    className: "title_font",
    dataTestId: "learn_button",
    headerLocation: "center",
  },
  {
    name: "Community",
    path: "/pages/menu/support",
    _id: 100,
    variant: "nav",
    className: "title_font",
    dataTestId: "community_button",
    columns: [community],
    headerLocation: "center",
  },
  {
    name: "Support",
    path: "/pages/menu/support",
    _id: 101,
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
    _id: 102,
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
