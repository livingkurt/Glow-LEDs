const routes = [
  { path: "/account/changepassword", element: "ChangePasswordPage" },
  { path: "/account/passwordreset", element: "PasswordResetPage" },
  { path: "/account/reset_password", element: "ResetPasswordPage" },

  { path: "/checkout/placeorder", element: "PlaceOrderPage" },
  { path: "/checkout/shipping", element: "ShippingPage" },
  { path: "/checkout/cart/:pathname?", element: "CartPage" },
  { path: "/checkout/order/:id", element: "OrderPage", exact: true },

  { path: "/collections/all/products", element: "ProductsGridPage", exact: true },
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
  // { path: "/pages/learn/*", element: "LearnPage" },
  { path: "/pages/manual/:pathname?", element: "ManualPage", exact: true },
  { path: "/pages/affiliate_terms", element: "AffiliateTermsPage", exact: true },
  { path: "/pages/color_palettes", element: "ColorPalettePage", exact: true },
  { path: "/pages/events", element: "EventsPage", exact: true },
  { path: "/pages/support_center/:reason?", element: "SupportCenterPage", exact: true },
  { path: "/pages/terms", element: "TermsPage", exact: true },
  { path: "/pages/menu/:pathname", element: "MenuPage", exact: true },
  { path: "/pages/about", element: "AboutPage", exact: true },
  { path: "/pages/sitemap", element: "SitemapPage", exact: true },
  { path: "/pages/music", element: "MusicPage", exact: true },
  { path: "/pages/complete/:type/:id?", element: "CompletePage", exact: true },
];
const adminRoutes = [
  { path: "/secure/glow/edit_all_data", element: "DatabaseMigrationPage" },
  { path: "/secure/glow/products", element: "ProductsPage" },
  { path: "/secure/glow/orders", element: "OrdersPage" },
  { path: "/secure/glow/users", element: "UsersPage" },
  { path: "/secure/glow/paychecks", element: "PaychecksPage" },
  { path: "/secure/glow/categorys", element: "CategorysPage" },
  { path: "/secure/glow/surveys", element: "SurveysPage" },
  { path: "/secure/glow/parcels", element: "ParcelsPage" },
  { path: "/secure/glow/palettes", element: "PalettesPage" },
  { path: "/secure/glow/filaments", element: "FilamentsPage" },
  { path: "/secure/glow/userprofile/:id", element: "ProfilePage" },
  { path: "/secure/glow/change_password/:id", element: "AdminChangePasswordPage" },
  { path: "/secure/glow/dashboard", element: "DashboardPage" },
  { path: "/secure/glow/expenses", element: "ExpensesPage" },
  { path: "/secure/glow/features", element: "FeaturesPage" },
  { path: "/secure/glow/carts", element: "CartsPage" },
  { path: "/secure/glow/contents", element: "ContentsPage" },
  { path: "/secure/glow/emails/announcement/:id", element: "AnnouncementEmail" },
  { path: "/secure/glow/emails", element: "EmailsPage" },
  { path: "/secure/glow/promos", element: "PromosPage" },
  { path: "/secure/glow/affiliates", element: "AffiliatesPage" },
  { path: "/secure/glow/teams", element: "TeamsPage" },
  { path: "/secure/glow/teams/category/:category", element: "TeamsPage" },
  { path: "/secure/glow/chips", element: "ChipsPage" },
  { path: "/secure/glow/tutorials", element: "TutorialsPage" },
  { path: "/secure/glow/images", element: "ImagesPage" },
  { path: "/secure/glow/wholesalers", element: "WholesalersPage" },
];
const privateRoutes = [
  { path: "/secure/account/profile", element: "ProfilePage" },
  { path: "/secure/account/order/:id", element: "OrderPage" },
  { path: "/secure/checkout/placeorder", element: "PlaceOrderPage" },
];

module.exports = { routes, adminRoutes, privateRoutes };
