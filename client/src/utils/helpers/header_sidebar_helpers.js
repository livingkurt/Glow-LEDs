export const navigation = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Products",
    link: "/products?page=1?limit=21",
    sub_menu: [
      {
        title: "Products",
        link: "/products?page=1?limit=21",
        sub_menu: [
          {
            title: "New Releases! 🆕️",
            link: "/products/category/new_releases",
          },
          {
            title: "Best Sellers ✅",
            link: "/products/category/best_sellers",
          },
          {
            title: "Our Picks ⭐",
            link: "/products/category/our_picks",
          },
          {
            title: "On Sale! 💰",
            link: "/products/category/discounted",
          },
          {
            title: "Stickers",
            link: "/products/category/merch/subcategory/stickers",
          },
        ],
      },
      {
        title: "Enhancers",
        link: "/pages/menu/gloving",
        sub_menu: [
          {
            title: "Glowskinz",
            link: "/products/category/glowskinz",
            sub_menu: [
              {
                title: "CLOZD Glowskinz",
                link: "/products/category/glowskinz/subcategory/clozd",
                sub_menu: [
                  {
                    title: "Classics",
                    link: "/products/category/glowskinz/subcategory/clozd/collection/classics",
                  },
                  {
                    title: "Novaskinz",
                    link: "/products/category/glowskinz/subcategory/clozd/collection/novaskinz",
                  },
                ],
              },
              {
                title: "OPYN Glowskinz",
                link: "/products/category/glowskinz/subcategory/opyn",
              },
            ],
          },
          {
            title: "Glowframez",
            link: "/products/category/glowframez",
          },
          {
            title: "EXO Diffusers",
            link: "/products/category/exo_diffusers",
            sub_menu: [
              {
                title: "Collections",
                link: "/products/category/exo_diffusers",
                sub_menu: [
                  {
                    title: "Platonic Solids",
                    link: "/products/category/exo_diffusers/subcategory/polyhedrons/collection/platonic_solids",
                  },
                  {
                    title: "Spheroid",
                    link: "/products/category/exo_diffusers/subcategory/polyhedrons/collection/spheroid",
                  },
                ],
              },
              {
                title: "Polyhedrons",
                link: "/products/category/exo_diffusers/subcategory/polyhedrons",
              },
            ],
          },
          {
            title: "Diffuser Caps",
            link: "/products/category/diffuser_caps",
            sub_menu: [
              {
                title: "Diffuser Caps Starter Kit",
                link: "/products/diffuser_caps_adapters_starter_kit",
              },
              {
                title: "Collections",
                link: "/pages/menu/collections",
                sub_menu: [
                  {
                    title: "Texture",
                    link: "/products/category/diffuser_caps/subcategory/geometric/collection/texture",
                  },
                  {
                    title: "Fractal",
                    link: "/products/category/diffuser_caps/subcategory/geometric/collection/fractal",
                  },
                  {
                    title: "Space Cadet",
                    link: "/products/category/diffuser_caps/subcategory/geometric/collection/space_cadet",
                  },
                  {
                    title: "Festie Bestie",
                    link: "/products/category/diffuser_caps/subcategory/geometric/collection/festie_bestie",
                  },
                  {
                    title: "Platonic Solids",
                    link: "/products/category/diffuser_caps/subcategory/geometric/collection/platonic_solids",
                  },
                ],
              },
              {
                title: "Geometric",
                link: "/products/category/diffuser_caps/subcategory/geometric",
              },
            ],
          },
          {
            title: "Diffusers",
            link: "/products/category/diffusers",
            sub_menu: [
              {
                title: "Abstract",
                link: "/products/category/diffusers/subcategory/abstract",
              },
              {
                title: "Polygons",
                link: "/products/category/diffusers/subcategory/polygons",
              },
              {
                title: "Cylinders",
                link: "/products/category/diffusers/subcategory/cylinders",
              },
              {
                title: "Domes",
                link: "/products/category/diffusers/subcategory/domes",
              },
              {
                title: "Open Hole",
                link: "/products/category/diffusers/subcategory/open_hole",
              },
              {
                title: "Closed Hole",
                link: "/products/category/diffusers/subcategory/closed_hole",
              },
            ],
          },
          {
            title: "Decals",
            link: "/products/category/decals",
          },
        ],
      },
      {
        title: "Essentials",
        link: "/products/category/our_picks",
        sub_menu: [
          {
            title: "Gloves",
            link: "/products/category/glowskinz",
            sub_menu: [],
          },
          {
            title: "Refresh Packs",
            link: "/products/category/glowframez",
          },
          {
            title: "Sizing Sampler",
            link: "/products/category/exo_diffusers",
            sub_menu: [],
          },
          {
            title: "1225 Batteries",
            link: "/products/category/diffuser_caps",
            sub_menu: [],
          },
          {
            title: "1616 Batteries",
            link: "/products/category/diffusers",
            sub_menu: [],
          },
          {
            title: "1620 Batteries",
            link: "/products/category/diffusers",
            sub_menu: [],
          },
          {
            title: "2016 Batteries",
            link: "/products/category/diffusers",
            sub_menu: [],
          },
          {
            title: "Battery Storage",
            link: "/products/category/decals",
          },
        ],
      },
    ],
  },
  {
    title: "Features",
    link: "/pages/menu/featured",
    sub_menu: [
      {
        title: "Features",
        link: "/pages/menu/features",
        sub_menu: [
          {
            title: "Featured",
            link: "/pages/menu/featured",
          },
          {
            title: "Rave Mob",
            link: "/teams/category/rave_mob",
          },
          {
            title: "Sponsored Artists",
            link: "/pages/menu/sponsored_artists",
            sub_menu: [
              {
                title: "Sponsored Artists",
                link: "/pages/menu/sponsored_artists",
              },
              {
                title: "Sponsored Glovers",
                link: "/sponsors",
              },
              {
                title: "Sponsored Teams",
                link: "/teams",
              },
            ],
          },
          {
            title: "Artists",
            link: "/features/category/artists",
          },
          {
            title: "Glovers",
            link: "/features/category/glovers",
          },
          {
            title: "Producers",
            link: "/features/category/producers",
          },
          {
            title: "VFX",
            link: "/features/category/vfx",
          },
        ],
      },
    ],
  },
  {
    title: "Support",
    link: "/pages/menu/support",
    sub_menu: [
      {
        title: "Support",
        link: "/pages/menu/support",
        sub_menu: [
          {
            title: "Track Your Order",
            link: "/pages/track_your_order",
          },
          {
            title: "About",
            link: "/pages/aboutz",
          },
          {
            title: "Events",
            link: "/pages/events",
          },
          {
            title: "Manuals",
            link: "/pages/menu/manuals",
          },
          {
            title: "Announcements",
            link: "/pages/announcements",
          },
          {
            title: "FAQ",
            linsk: "/pages/faq",
            sub_menu: [
              {
                title: "Glowskinz",
                link: "/pages/faq#glowskinz",
              },
              {
                title: "Diffuser Caps",
                link: "/pages/faq#diffuser_caps",
              },
              {
                title: "Ordering Custom Products",
                link: "/pages/faq#ordering_custom_products",
              },
              {
                title: "Featured Content",
                link: "/pages/faq#featured_content",
              },
              {
                title: "Processing/Shipping",
                link: "/pages/faq#processing_shipping",
              },
              {
                title: "Order Issues",
                link: "/pages/faq#order_issues",
              },
            ],
          },
          {
            title: "Contact",
            link: "/pages/support_center",
          },
          {
            title: "Term and Conditions",
            link: "/pages/terms",
          },
        ],
      },
    ],
  },
  {
    title: "Cart",
  },
  {
    title: "User",
  },
  {
    title: "Admin",
    sub_menu: [
      {
        title: "Dashboard",
        link: "/secure/glow/dashboard",
      },
      {
        title: "Orders",
        link: "/secure/glow/orders",
      },
      {
        title: "Products",
        link: "/secure/glow/products",
      },
      {
        title: "Users",
        link: "/secure/glow/users",
      },
      {
        title: "Expenses",
        link: "/secure/glow/expenses",
      },
      {
        title: "Features",
        link: "/secure/glow/features",
      },
      {
        title: "Paychecks",
        link: "/secure/glow/paychecks",
      },
      {
        title: "Affiliates",
        link: "/secure/glow/affiliates",
      },
      {
        title: "Teams",
        link: "/secure/glow/teams",
      },
      {
        title: "Promos",
        link: "/secure/glow/promos",
      },
      {
        title: "Carts",
        link: "/secure/glow/carts",
      },
      {
        title: "Contents",
        link: "/secure/glow/contents",
      },
      {
        title: "Emails",
        link: "/secure/glow/emails",
      },
      {
        title: "Logs",
        link: "/secure/glow/logs",
      },
      {
        title: "Chips",
        link: "/secure/glow/chips",
      },
      {
        title: "Surveys",
        link: "/secure/glow/surveys",
      },
      {
        title: "Parcels",
        link: "/secure/glow/parcels",
      },
      {
        title: "Categorys",
        link: "/secure/glow/categorys",
      },
      {
        title: "Palettes",
        link: "/secure/glow/palettes",
      },
      {
        title: "Filaments",
        link: "/secure/glow/filaments",
      },
      {
        title: "Edit All Data",
        link: "/secure/glow/edit_all_data",
      },
      {
        title: "Compressor",
        link: "/secure/glow/image_compressor",
      },
    ],
  },
];
