import { lazy } from "react";

// Helper function to handle named exports
const lazyNamedComponent = (importFactory, exportName) => {
  return lazy(async () => {
    const module = await importFactory();
    return { default: module[exportName] };
  });
};

// Lazy load all components
const Components = {
  PlaceOrderPage: lazyNamedComponent(() => import("../../pages/PlaceOrderPage"), "PlaceOrderPage"),
  OrderPage: lazyNamedComponent(() => import("../../pages/OrderPage"), "OrderPage"),
  ChangePasswordPage: lazyNamedComponent(() => import("../../pages/ProfilePage/components"), "ChangePasswordPage"),
  PasswordResetPage: lazyNamedComponent(() => import("../../pages/ProfilePage/components"), "PasswordResetPage"),
  ResetPasswordPage: lazyNamedComponent(() => import("../../pages/ProfilePage/components"), "ResetPasswordPage"),
  CartPage: lazyNamedComponent(() => import("../../pages/CartPage"), "CartPage"),
  ProductsGridPage: lazyNamedComponent(() => import("../../pages/ProductsGridPage"), "ProductsGridPage"),
  ProductPage: lazyNamedComponent(() => import("../../pages/ProductPage"), "ProductPage"),
  FeaturesGridPage: lazyNamedComponent(() => import("../../pages/FeaturesGridPage"), "FeaturesGridPage"),
  FeaturedPage: lazyNamedComponent(() => import("../../pages/FeaturedPage"), "FeaturedPage"),
  SponsorsGridPage: lazyNamedComponent(() => import("../../pages/SponsorsGridPage"), "SponsorsGridPage"),
  SponsorPage: lazyNamedComponent(() => import("../../pages/SponsorPage"), "SponsorPage"),
  TeamsGridPage: lazyNamedComponent(() => import("../../pages/TeamsGridPage"), "TeamsGridPage"),
  TeamPage: lazyNamedComponent(() => import("../../pages/TeamPage"), "TeamPage"),
  ManualPage: lazyNamedComponent(() => import("../../pages/ManualPage"), "ManualPage"),
  ColorPalettePage: lazyNamedComponent(() => import("../../pages/ColorPalettesPage"), "ColorPalettePage"),
  SupportCenterPage: lazy(() => import("../../pages/SupportCenterPage/SupportCenterPage")),
  TermsPage: lazyNamedComponent(() => import("../../pages/TermsPage"), "TermsPage"),
  MenuPage: lazy(() => import("../../pages/MenuPage/MenuPage")),
  AboutPage: lazyNamedComponent(() => import("../../pages/AboutPage"), "AboutPage"),
  SitemapPage: lazyNamedComponent(() => import("../../pages/SitemapPage"), "SitemapPage"),
  TutorialsGridPage: lazyNamedComponent(() => import("../../pages/TutorialsGridPage"), "TutorialsGridPage"),
  EventPage: lazy(() => import("../../pages/EventPage/EventPage")),
  ArticlesGridPage: lazy(() => import("../../pages/ArticlesGridPage/ArticlesGridPage")),
  ArticlePage: lazy(() => import("../../pages/ArticlePage/ArticlePage")),
  AcademyPage: lazy(() => import("../../pages/AcademyPage/AcademyPage")),
  UnsubscribePage: lazy(() => import("../../pages/UnsubscribePage/UnsubscribePage")),
  ProductBundlesGridPage: lazy(() => import("../../pages/ProductBundlesGridPage/ProductBundlesGridPage")),
  ProductBundlePage: lazy(() => import("../../pages/ProductBundlePage/ProductBundlePage")),
  GiftCardPage: lazy(() => import("../../pages/GiftCardPage/GiftCardPage2")),
  GiftCardsGridPage: lazy(() => import("../../pages/GiftCardsGridPage2/GiftCardsGridPage2")),
  ModeCreatorPage: lazy(() => import("../../pages/ModeCreatorPage/ModeCreatorPage")),
  ModePage: lazy(() => import("../../pages/ModePage/ModePage")),
  ModesGridPage: lazy(() => import("../../pages/ModesGridPage/ModesGridPage")),
  ReturnLabelPage: lazy(() => import("../../pages/ReturnLabelPage/ReturnLabelPage")),
};

const AdminComponents = {
  ProductsPage: lazyNamedComponent(() => import("../../pages/ProductsPage"), "ProductsPage"),
  OrdersPage: lazyNamedComponent(() => import("../../pages/OrdersPage"), "OrdersPage"),
  UsersPage: lazyNamedComponent(() => import("../../pages/UsersPage"), "UsersPage"),
  PaychecksPage: lazyNamedComponent(() => import("../../pages/PaychecksPage"), "PaychecksPage"),
  TagsPage: lazy(() => import("../../pages/TagsPage/TagsPage")),
  SurveysPage: lazyNamedComponent(() => import("../../pages/SurveysPage"), "SurveysPage"),
  ParcelsPage: lazyNamedComponent(() => import("../../pages/ParcelsPage"), "ParcelsPage"),
  PalettesPage: lazyNamedComponent(() => import("../../pages/PalettesPage"), "PalettesPage"),
  FilamentsPage: lazyNamedComponent(() => import("../../pages/FilamentsPage"), "FilamentsPage"),
  ProfilePage: lazyNamedComponent(() => import("../../pages/ProfilePage/ProfilePage"), "ProfilePage"),
  AdminChangePasswordPage: lazyNamedComponent(
    () => import("../../pages/ProfilePage/components"),
    "AdminChangePasswordPage"
  ),
  DashboardPage: lazyNamedComponent(() => import("../../pages/DashboardPage"), "DashboardPage"),
  ExpensesPage: lazyNamedComponent(() => import("../../pages/ExpensesPage"), "ExpensesPage"),
  FeaturesPage: lazyNamedComponent(() => import("../../pages/FeaturesPage"), "FeaturesPage"),
  CartsPage: lazyNamedComponent(() => import("../../pages/CartsPage"), "CartsPage"),
  ContentsPage: lazyNamedComponent(() => import("../../pages/ContentsPage"), "ContentsPage"),
  AnnouncementEmail: lazyNamedComponent(() => import("../../pages/EmailsPage/components"), "AnnouncementEmail"),
  PromosPage: lazyNamedComponent(() => import("../../pages/PromosPage"), "PromosPage"),
  AffiliatesPage: lazyNamedComponent(() => import("../../pages/AffiliatesPage"), "AffiliatesPage"),
  TeamsPage: lazy(() => import("../../pages/TeamsPage/TeamsPage")),
  MicrolightsPage: lazy(() => import("../../pages/MicrolightsPage/MicrolightsPage")),
  ModesPage: lazy(() => import("../../pages/ModesPage/ModesPage")),
  TutorialsPage: lazyNamedComponent(() => import("../../pages/TutorialsPage"), "TutorialsPage"),
  ImagesPage: lazyNamedComponent(() => import("../../pages/ImagesPage"), "ImagesPage"),
  WholesalersPage: lazyNamedComponent(() => import("../../pages/WholesalersPage"), "WholesalersPage"),
  EmailsPage: lazyNamedComponent(() => import("../../pages/EmailsPage"), "EmailsPage"),
  EventsPage: lazy(() => import("../../pages/EventsPage/EventsPage")),
  TicketsPage: lazy(() => import("../../pages/TicketsPage/TicketsPage")),
  ArticlesPage: lazy(() => import("../../pages/ArticlesPage/ArticlesPage")),
  GiftCardsPage: lazy(() => import("../../pages/GiftCardsPage/GiftCardsPage2")),
};

const PrivateComponents = {
  ProfilePage: lazyNamedComponent(() => import("../../pages/ProfilePage/ProfilePage"), "ProfilePage"),
  OrderPage: lazyNamedComponent(() => import("../../pages/OrderPage"), "OrderPage"),
  PlaceOrderPage: lazyNamedComponent(() => import("../../pages/PlaceOrderPage"), "PlaceOrderPage"),
};

export { Components, AdminComponents, PrivateComponents };
