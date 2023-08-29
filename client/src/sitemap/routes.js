const routes = [
  // { path: "/", element: "HomePage", exact: true },

  { path: "/account/login", element: "LoginPage" },
  { path: "/account/verified/:id", element: "VerifiedPage" },
  { path: "/account/checkemail", element: "CheckEmailPage" },
  { path: "/account/changepassword", element: "ChangePasswordPage" },
  { path: "/account/register", element: "RegisterPage" },
  { path: "/account/passwordreset", element: "PasswordResetPage" },
  { path: "/account/resetpassword/:id", element: "ResetPasswordPage" },

  { path: "/checkout/placeorder", element: "PlaceOrderPage" },
  { path: "/checkout/shipping", element: "ShippingPage" },
  { path: "/checkout/cart/:pathname?", element: "CartPage" },
  { path: "/checkout/order/:id", element: "OrderPage", exact: true },

  { path: "/collections/all/products", element: "ProductsGridPage", exact: true },
  { path: "/collections/all/products/shop_by_chip", element: "ProductsGridByChipPage" },
  {
    path: "/collections/all/products/category/:category/subcategory/:subcategory/collection/:collection?",
    element: "ProductsGridPage",
  },
  { path: "/collections/all/products/category/:category/subcategory/:subcategory?", element: "ProductsGridPage" },
  { path: "/collections/all/products/category/:category", element: "ProductsGridPage" },
  { path: "/collections/all/products/:pathname", element: "ProductPage" },

  { path: "/collections/all/features/category/:category?", element: "FeaturesGridPage", exact: true },
  { path: "/collections/all/features/category/:category/:pathname?", element: "FeaturedPage", exact: true },

  { path: "/collections/all/sponsors/category/:category?", element: "SponsorsGridPage", exact: true },
  { path: "/collections/all/sponsors", element: "SponsorsGridPage", exact: true },
  { path: "/collections/all/sponsors/:promo_code?", element: "SponsorPage", exact: true },

  { path: "/collections/all/teams/category/:category?", element: "TeamsGridPage", exact: true },
  { path: "/collections/all/teams", element: "TeamsGridPage", exact: true },
  { path: "/collections/all/teams/:pathname?", element: "TeamPage", exact: true },

  { path: "/collections/all/tutorials/category/:category?", element: "TutorialsGridPage", exact: true },
  { path: "/collections/all/tutorials", element: "TutorialsGridPage", exact: true },

  { path: "/pages/announcements", element: "AnnouncementsPage", exact: true },
  { path: "/pages/manual/:pathname?", element: "ManualPage", exact: true },
  { path: "/pages/affiliate_terms", element: "AffiliateTermsPage", exact: true },
  { path: "/pages/color_palettes", element: "ColorPalettePage", exact: true },
  { path: "/pages/events", element: "EventsPage", exact: true },
  { path: "/pages/contact/:reason?", element: "ContactPage", exact: true },
  { path: "/pages/glowcontrol", element: "ContactPage" },
  { path: "/pages/terms", element: "TermsPage", exact: true },
  { path: "/pages/menu/:pathname", element: "MenuPage", exact: true },
  { path: "/pages/about", element: "AboutPage", exact: true },
  { path: "/pages/faq", element: "FAQPage", exact: true },
  { path: "/pages/sitemap", element: "SitemapPage", exact: true },
  { path: "/pages/music", element: "MusicPage", exact: true },
  { path: "/pages/track_your_order", element: "TrackOrderPage", exact: true },
  { path: "/pages/complete/:type/:id?", element: "CompletePage", exact: true },
];

module.exports = routes;
