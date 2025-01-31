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
  SupportCenterPage: lazyNamedComponent(
    () => import("../../pages/SupportCenterPage/SupportCenterPage"),
    "SupportCenterPage"
  ),
  TermsPage: lazyNamedComponent(() => import("../../pages/TermsPage"), "TermsPage"),
  MenuPage: lazyNamedComponent(() => import("../../pages/MenuPage/MenuPage"), "MenuPage"),
  AboutPage: lazyNamedComponent(() => import("../../pages/AboutPage"), "AboutPage"),
  SitemapPage: lazyNamedComponent(() => import("../../pages/SitemapPage"), "SitemapPage"),
  TutorialsGridPage: lazyNamedComponent(() => import("../../pages/TutorialsGridPage"), "TutorialsGridPage"),
  EventPage: lazyNamedComponent(() => import("../../pages/EventPage/EventPage"), "EventPage"),
  ArticlesGridPage: lazyNamedComponent(
    () => import("../../pages/ArticlesGridPage/ArticlesGridPage"),
    "ArticlesGridPage"
  ),
  ArticlePage: lazyNamedComponent(() => import("../../pages/ArticlePage/ArticlePage"), "ArticlePage"),
  AcademyPage: lazyNamedComponent(() => import("../../pages/AcademyPage/AcademyPage"), "AcademyPage"),
  UnsubscribePage: lazyNamedComponent(() => import("../../pages/UnsubscribePage/UnsubscribePage"), "UnsubscribePage"),
  ProductBundlesGridPage: lazyNamedComponent(
    () => import("../../pages/ProductBundlesGridPage/ProductBundlesGridPage"),
    "ProductBundlesGridPage"
  ),
  ProductBundlePage: lazyNamedComponent(
    () => import("../../pages/ProductBundlePage/ProductBundlePage"),
    "ProductBundlePage"
  ),
  GiftCardPage: lazyNamedComponent(() => import("../../pages/GiftCardPage/GiftCardPage2"), "GiftCardPage"),
  GiftCardsGridPage: lazyNamedComponent(
    () => import("../../pages/GiftCardsGridPage2/GiftCardsGridPage2"),
    "GiftCardsGridPage"
  ),
  ModeCreatorPage: lazyNamedComponent(() => import("../../pages/ModeCreatorPage/ModeCreatorPage"), "ModeCreatorPage"),
  ModePage: lazyNamedComponent(() => import("../../pages/ModePage/ModePage"), "ModePage"),
  ModesGridPage: lazyNamedComponent(() => import("../../pages/ModesGridPage/ModesGridPage"), "ModesGridPage"),
  ReturnLabelPage: lazyNamedComponent(() => import("../../pages/ReturnLabelPage/ReturnLabelPage"), "ReturnLabelPage"),
};

const AdminComponents = {
  ProductsPage: lazyNamedComponent(() => import("../../pages/ProductsPage"), "ProductsPage"),
  OrdersPage: lazyNamedComponent(() => import("../../pages/OrdersPage"), "OrdersPage"),
  UsersPage: lazyNamedComponent(() => import("../../pages/UsersPage"), "UsersPage"),
  PaychecksPage: lazyNamedComponent(() => import("../../pages/PaychecksPage"), "PaychecksPage"),
  TagsPage: lazyNamedComponent(() => import("../../pages/TagsPage/TagsPage"), "TagsPage"),
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
  TeamsPage: lazyNamedComponent(() => import("../../pages/TeamsPage/TeamsPage"), "TeamsPage"),
  MicrolightsPage: lazyNamedComponent(() => import("../../pages/MicrolightsPage/MicrolightsPage"), "MicrolightsPage"),
  ModesPage: lazyNamedComponent(() => import("../../pages/ModesPage/ModesPage"), "ModesPage"),
  TutorialsPage: lazyNamedComponent(() => import("../../pages/TutorialsPage"), "TutorialsPage"),
  ImagesPage: lazyNamedComponent(() => import("../../pages/ImagesPage"), "ImagesPage"),
  WholesalersPage: lazyNamedComponent(() => import("../../pages/WholesalersPage"), "WholesalersPage"),
  EmailsPage: lazyNamedComponent(() => import("../../pages/EmailsPage"), "EmailsPage"),
  EventsPage: lazyNamedComponent(() => import("../../pages/EventsPage/EventsPage"), "EventsPage"),
  TicketsPage: lazyNamedComponent(() => import("../../pages/TicketsPage/TicketsPage"), "TicketsPage"),
  ArticlesPage: lazyNamedComponent(() => import("../../pages/ArticlesPage/ArticlesPage"), "ArticlesPage"),
  GiftCardsPage: lazyNamedComponent(() => import("../../pages/GiftCardsPage/GiftCardsPage2"), "GiftCardsPage"),
};

const PrivateComponents = {
  ProfilePage: lazyNamedComponent(() => import("../../pages/ProfilePage/ProfilePage"), "ProfilePage"),
  OrderPage: lazyNamedComponent(() => import("../../pages/OrderPage"), "OrderPage"),
  PlaceOrderPage: lazyNamedComponent(() => import("../../pages/PlaceOrderPage"), "PlaceOrderPage"),
};

export { Components, AdminComponents, PrivateComponents };
