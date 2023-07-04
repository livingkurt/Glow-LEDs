const routes = [
  // { path: "/", component: "HomePage", exact: true },

  { path: "/account/login", component: "LoginPage" },
  { path: "/account/verified/:id", component: "VerifiedPage" },
  { path: "/account/checkemail", component: "CheckEmailPage" },
  { path: "/account/changepassword", component: "ChangePasswordPage" },
  { path: "/account/register", component: "RegisterPage" },
  { path: "/account/passwordreset", component: "PasswordResetPage" },
  { path: "/account/resetpassword/:id", component: "ResetPasswordPage" },

  { path: "/checkout/placeorder", component: "PlaceOrderPage" },
  { path: "/checkout/shipping", component: "ShippingPage" },
  { path: "/checkout/cart/:pathname?", component: "CartPage" },
  { path: "/checkout/order/:id", component: "OrderPage", exact: true },

  { path: "/collections/all/products", component: "ProductsGridPage", exact: true },
  { path: "/collections/all/products/shop_by_chip", component: "ProductsGridByChipPage" },
  { path: "/collections/all/products/category/:category/subcategory/:subcategory/collection/:collection?", component: "ProductsGridPage" },
  { path: "/collections/all/products/category/:category/subcategory/:subcategory?", component: "ProductsGridPage" },
  { path: "/collections/all/products/category/:category", component: "ProductsGridPage" },
  { path: "/collections/all/products/:pathname", component: "ProductPage" },

  { path: "/collections/all/features/category/:category?", component: "FeaturesGridPage", exact: true },
  { path: "/collections/all/features/category/:category/:pathname?", component: "FeaturedPage", exact: true },

  { path: "/collections/all/sponsors/category/:category?", component: "SponsorsGridPage", exact: true },
  { path: "/collections/all/sponsors", component: "SponsorsGridPage", exact: true },
  { path: "/collections/all/sponsors/:promo_code?", component: "SponsorPage", exact: true },

  { path: "/collections/all/teams/category/:category?", component: "TeamsGridPage", exact: true },
  { path: "/collections/all/teams", component: "TeamsGridPage", exact: true },
  { path: "/collections/all/teams/:pathname?", component: "TeamPage", exact: true },

  { path: "/collections/all/tutorials/category/:category?", component: "TutorialsGridPage", exact: true },
  { path: "/collections/all/tutorials", component: "TutorialsGridPage", exact: true },

  { path: "/pages/announcements", component: "AnnouncementsPage", exact: true },
  { path: "/pages/manual/:pathname?", component: "ManualPage", exact: true },
  { path: "/pages/affiliate_terms", component: "AffiliateTermsPage", exact: true },
  { path: "/pages/color_palettes", component: "ColorPalettePage", exact: true },
  { path: "/pages/events", component: "EventsPage", exact: true },
  { path: "/pages/contact/:reason?", component: "ContactPage", exact: true },
  { path: "/pages/glowcontrol", component: "ContactPage" },
  { path: "/pages/terms", component: "TermsPage", exact: true },
  { path: "/pages/menu/:pathname", component: "MenuPage", exact: true },
  { path: "/pages/about", component: "AboutPage", exact: true },
  { path: "/pages/faq", component: "FAQPage", exact: true },
  { path: "/pages/sitemap", component: "SitemapPage", exact: true },
  { path: "/pages/music", component: "MusicPage", exact: true },
  { path: "/pages/track_your_order", component: "TrackOrderPage", exact: true },
  { path: "/pages/complete/:type/:id?", component: "CompletePage", exact: true }
];

module.exports = routes;
