export const routes = [
  { path: "/account/change_password", element: "ChangePasswordPage" },
  { path: "/account/password_reset", element: "PasswordResetPage" },
  { path: "/account/reset_password", element: "ResetPasswordPage" },

  { path: "/checkout/place_order", element: "PlaceOrderPage" },
  { path: "/checkout/cart", element: "CartPage" },
  { path: "/checkout/order/:id", element: "OrderPage", exact: true },

  { path: "/products", element: "ProductsGridPage", exact: true },
  { path: "/products/:pathname", element: "ProductPage" },

  { path: "/sponsors", element: "SponsorsGridPage", exact: true },
  { path: "/sponsors/:pathname", element: "SponsorPage", exact: true },

  { path: "/teams", element: "TeamsGridPage", exact: true },
  { path: "/teams/:pathname", element: "TeamPage", exact: true },

  { path: "/tutorials", element: "TutorialsGridPage", exact: true },

  { path: "/learn", element: "ArticlesGridPage", exact: true },
  { path: "/learn/:pathname", element: "ArticlePage", exact: true },

  { path: "/academy", element: "AcademyPage", exact: true },

  { path: "/events/:pathname", element: "EventPage", exact: true },

  { path: "/support_center", element: "SupportCenterPage", exact: true },

  { path: "/terms", element: "TermsPage", exact: true },

  { path: "/about", element: "AboutPage", exact: true },

  { path: "/sitemap", element: "SitemapPage", exact: true },

  { path: "/menu/:pathname", element: "MenuPage", exact: true },

  { path: "/palettes", element: "ColorPalettePage", exact: true },
];
export const adminRoutes = [
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
  { path: "/secure/glow/chips", element: "ChipsPage" },
  { path: "/secure/glow/tutorials", element: "TutorialsPage" },
  { path: "/secure/glow/tickets", element: "TicketsPage" },
  { path: "/secure/glow/events", element: "EventsPage" },
  { path: "/secure/glow/images", element: "ImagesPage" },
  { path: "/secure/glow/wholesalers", element: "WholesalersPage" },
  { path: "/secure/glow/articles", element: "ArticlesPage" },
];
export const privateRoutes = [
  { path: "/secure/account/profile", element: "ProfilePage" },
  { path: "/secure/account/order/:id", element: "OrderPage" },
  { path: "/secure/checkout/place_order", element: "PlaceOrderPage" },
];

export const redirects = [
  { from: "/account/changepassword", to: "/account/change_password" },
  { from: "/account/passwordreset", to: "/account/password_reset" },
  { from: "/checkout/placeorder", to: "/checkout/place_order" },
  { from: "/checkout/shipping", to: "/checkout/cart" },
  { from: "/collections/all/products", to: "/products" },
  {
    from: "/collections/all/products/category/:category/subcategory/:subcategory/collection/:collection?",
    to: "/products",
  },
  { from: "/collections/all/products/category/:category/subcategory/:subcategory?", to: "/products" },
  { from: "/collections/all/products/category/:category", to: "/products" },
  { from: "/collections/all/products/:pathname", to: "/products/:pathname" },
  { from: "/collections/all/sponsors", to: "/sponsors" },
  { from: "/collections/all/sponsors/:promo_code?", to: "/sponsors/:promo_code" },
  { from: "/collections/all/teams", to: "/teams" },
  { from: "/collections/all/teams/:pathname?", to: "/teams/:pathname" },
  { from: "/collections/all/tutorials", to: "/tutorials" },
  { from: "/pages/announcements", to: "/learn" },
  { from: "/pages/learn", to: "/learn" },
  { from: "/pages/learn/:pathname", to: "/learn/:pathname" },
  { from: "/pages/manual/:pathname?", to: "/learn" },
  { from: "/pages/affiliate_terms", to: "/terms" },
  { from: "/pages/color_palettes", to: "/palettes" },
  { from: "/pages/events/:pathname?", to: "/events/:pathname" },
  { from: "/pages/support_center/:reason?", to: "/support_center" },
  { from: "/pages/terms", to: "/terms" },
  { from: "/pages/menu/:pathname", to: "/menu/:pathname" },
  { from: "/pages/about", to: "/about" },
  { from: "/pages/sitemap", to: "/sitemap" },
  { from: "/pages/music", to: "/about" },
  { from: "/pages/complete/:type/:id?", to: "/" },
];
