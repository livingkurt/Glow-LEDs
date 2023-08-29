import { createElement, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header, Container, Content, Footer, Sidebar, Cart } from "./shared/ContainerComponents/index";
import { AdminRoute, PrivateRoute } from "./shared/RouteComponents";
import { ScrollToTop } from "./shared/SharedComponents";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import { Helmet } from "react-helmet";
import useWindowDimensions from "./shared/Hooks/windowDimensions";
import { isBrowser } from "react-device-detect";
import Headroom from "react-headroom";

import { createTheme, ThemeProvider } from "@mui/material";
import glow_leds_theme from "./theme";
import { OrderPage } from "./pages/OrderPage";
import { PlaceOrderPage } from "./pages/PlaceOrderPage";
import { AdminChangePasswordPage } from "./pages/ProfiePage/components";
import { EditProductPage } from "./pages/ProductsPage/components";
import { GcodeContinousPage } from "./pages/GcodeContinousPage";
import { DatabaseMigrationPage } from "./pages/DatabaseMigrationPage";
import { ProductsPage } from "./pages/ProductsPage";
import { OrdersPage } from "./pages/OrdersPage";
import { EditPaycheckPage, PaychecksPage } from "./pages/PaychecksPage";
import { EditSettingPage, SettingsPage } from "./pages/SettingsPage";
import { CategorysPage, EditCategoryPage } from "./pages/CategorysPage";
import { EditSurveyPage, SurveysPage } from "./pages/SurveysPage";
import { EditParcelPage, ParcelsPage } from "./pages/ParcelsPage";
import { EditPalettePage, PalettesPage } from "./pages/PalettesPage";
import { EditFilamentPage, FilamentsPage } from "./pages/FilamentsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EditExpensePage, ExpensesPage } from "./pages/ExpensesPage";
import { EditFeaturePage, FeaturesPage } from "./pages/FeaturesPage";
import { CartsPage } from "./pages/CartsPage";
import { ContentsPage, EditContentPage } from "./pages/ContentsPage";
import { ProductsDisplayPage } from "./pages/ProductsGridPage/components";
import { AnnouncementEmail, EditEmailPage, EmailModal } from "./pages/EmailsPage/components";
import { EmailsPage } from "./pages/EmailsPage";
import { EditPromoPage, PromosPage } from "./pages/PromosPage";
import { AffiliatesPage } from "./pages/AffiliatesPage";
import { EditTeamPage, TeamsPage } from "./pages/TeamsPage";
import { ChipsPage, EditChipPage } from "./pages/ChipsPage";

import { ProfilePage } from "./pages/ProfiePage";
import { UsersPage } from "./pages/UsersPage";
import { Four04Page } from "./pages/Four04Page";
import { TutorialsPage } from "./pages/TutorialsPage";
import { WholesalersPage } from "./pages/WholesalersPage";
import { ImagesPage } from "./pages/ImagesPage";
import { EditOrderPage } from "./pages/EditOrderPage";
import { useDispatch, useSelector } from "react-redux";
import { handleTokenRefresh } from "./api/axiosInstance";
import * as API from "./api";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import VerifiedPage from "./pages/LoginPage/components/VerifiedPage";
import { ChangePasswordPage, PasswordResetPage, ResetPasswordPage } from "./pages/ProfiePage/components";
import { RegisterPage } from "./pages/RegisterPage";
import ShippingPage from "./pages/ProfiePage/components/UserShippingPage";
import { CartPage } from "./pages/CartPage";
import { ProductsGridPage } from "./pages/ProductsGridPage";
import { ProductsGridByChipPage } from "./pages/ProductsGridPage/components";
import { ProductPage } from "./pages/ProductPage";
import { FeaturesGridPage } from "./pages/FeaturesGridPage";
import { FeaturedPage } from "./pages/FeaturedPage";
import { SponsorsGridPage } from "./pages/SponsorsGridPage";
import { SponsorPage } from "./pages/SponsorPage";
import { TeamsGridPage } from "./pages/TeamsGridPage";
import { TeamPage } from "./pages/TeamPage";
import { AnnouncementsPage } from "./pages/AnnouncementsPage";
import { ManualPage } from "./pages/ManualPage";
import { ColorPalettePage } from "./pages/ColorPalettesPage";
import { EventsPage } from "./pages/EventsPage";
import { ContactPage } from "./pages/ContactPage";
import { TermsPage } from "./pages/TermsPage";
import { MenuPage } from "./pages/MenuPage";
import { AboutPage } from "./pages/AboutPage";
import { FAQPage } from "./pages/FAQPage";
import { SitemapPage } from "./pages/SitemapPage";
import { MusicPage } from "./pages/MusicPage";
import { CompletePage } from "./pages/CompletePage";
import { CheckEmailPage } from "./pages/LoginPage/components";
import { AffiliateTermsPage } from "./pages/AffiliatesPage/components";
import { TutorialsGridPage } from "./pages/TutorialsGridPage";
import TrackOrderPage from "./pages/TrackOrderPage/TrackOrderPage";
import routes from "./sitemap/routes";
import UpdateNotifier from "./shared/SharedComponents/UpdateNotifier";
import { hot } from "react-hot-loader/root";

const App = () => {
  const Components = {
    LoginPage,
    PlaceOrderPage,
    OrderPage,
    VerifiedPage,
    ChangePasswordPage,
    PasswordResetPage,
    ResetPasswordPage,
    RegisterPage,
    ShippingPage,
    CartPage,
    ProductsGridPage,
    ProductsGridByChipPage,
    ProductPage,
    FeaturesGridPage,
    FeaturedPage,
    SponsorsGridPage,
    SponsorPage,
    TeamsGridPage,
    TeamPage,
    AnnouncementsPage,
    ManualPage,
    ColorPalettePage,
    EventsPage,
    ContactPage,
    TermsPage,
    MenuPage,
    AboutPage,
    FAQPage,
    SitemapPage,
    MusicPage,
    CompletePage,
    CheckEmailPage,
    AffiliateTermsPage,
    TutorialsGridPage,
    TrackOrderPage,
  };
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    handleTokenRefresh();
  }, [dispatch]);

  useEffect(() => {
    if (current_user._id) {
      dispatch(API.getCurrentUserCart(current_user._id));
    }
  }, [dispatch, current_user._id]);

  const { height, width } = useWindowDimensions();

  const theme = createTheme(glow_leds_theme);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container setVisible={setVisible} visible={visible}>
          <Helmet>
            <title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
            <meta
              name="description"
              content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
            />
            <link rel="canonical" href="https://www.glow-leds.com" />
            <meta charset="utf-8" />
            <link rel="shortcut icon" type="image/x-icon" href="https://www.glow-leds.com/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#272727" />
            <meta name="referrer" content="always" />
            <link rel="shortlink" href="https://www.glow-leds.com" />
            <meta property="og:site_name" content="Glow LEDs" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="en_US" />
            <meta
              property="og:image"
              content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
            />
            <meta
              property="og:image:secure_url"
              content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
            />
            <meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
            <meta
              property="og:description"
              content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
            />
            <meta property="og:url" content="https://www.glow-leds.com" />

            <meta name="twitter:site" content="@glow_leds" />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:description"
              content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
            />
            <meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
            <meta
              name="twitter:image"
              content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
            />
            <meta name="twitter:creator" content="@glow_leds" />
          </Helmet>

          <EmailModal />
          <UpdateNotifier />
          {/* <Particles
          params={particlesjs_config}
          className="zi-n5"
          style={{ zIndex: -5, position: "fixed" }}
        /> */}
          {isBrowser && width > 1158 && height > 900 ? (
            <Headroom>
              <Header visible={visible} />
            </Headroom>
          ) : (
            <Header visible={visible} />
          )}
          <Sidebar />

          <Cart visible={visible} height={height} width={width} />

          <Content>
            {/* {config.NODE_ENV === "production" && (
              <MessengerCustomerChat
                pageId="100365571740684"
                appId="379385106779969"
                greetingDialogDisplay="show"
                shouldShowDialog={false}
                loggedInGreeting="Hi! How can we help you?"
                loggedOutGreeting="Hi! How can we help you?"
              />
            )} */}
            <ScrollToTop>
              <Routes>
                {/* Private Routes */}
                <Route
                  path="/secure/account/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/secure/account/order/:id"
                  element={
                    <PrivateRoute>
                      <OrderPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/secure/checkout/placeorder"
                  element={
                    <PrivateRoute>
                      <PlaceOrderPage />
                    </PrivateRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/secure/glow/editproduct/:pathname?/:template?/:product_option?/:item_group_id?"
                  element={
                    <AdminRoute>
                      <EditProductPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/gcode_continous"
                  element={
                    <AdminRoute>
                      <GcodeContinousPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/edit_all_data"
                  element={
                    <AdminRoute>
                      <DatabaseMigrationPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/products"
                  element={
                    <AdminRoute>
                      <ProductsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/edit_order/:id"
                  element={
                    <AdminRoute>
                      <EditOrderPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/orders"
                  element={
                    <AdminRoute>
                      <OrdersPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/users"
                  element={
                    <AdminRoute>
                      <UsersPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/paychecks"
                  element={
                    <AdminRoute>
                      <PaychecksPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/settings"
                  element={
                    <AdminRoute>
                      <SettingsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/categorys"
                  element={
                    <AdminRoute>
                      <CategorysPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/surveys"
                  element={
                    <AdminRoute>
                      <SurveysPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/parcels"
                  element={
                    <AdminRoute>
                      <ParcelsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/palettes"
                  element={
                    <AdminRoute>
                      <PalettesPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/filaments"
                  element={
                    <AdminRoute>
                      <FilamentsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/userprofile/:id"
                  element={
                    <AdminRoute>
                      <ProfilePage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editpaycheck/:id?"
                  element={
                    <AdminRoute>
                      <EditPaycheckPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editsetting/:id?"
                  element={
                    <AdminRoute>
                      <EditSettingPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editcategory/:id?"
                  element={
                    <AdminRoute>
                      <EditCategoryPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editsurvey/:id?"
                  element={
                    <AdminRoute>
                      <EditSurveyPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editparcel/:id?"
                  element={
                    <AdminRoute>
                      <EditParcelPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editpalette/:id?"
                  element={
                    <AdminRoute>
                      <EditPalettePage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editfilament/:id?"
                  element={
                    <AdminRoute>
                      <EditFilamentPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/change_password/:id"
                  element={
                    <AdminRoute>
                      <AdminChangePasswordPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/dashboard"
                  element={
                    <AdminRoute>
                      <DashboardPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editexpense/:id?"
                  element={
                    <AdminRoute>
                      <EditExpensePage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editfeature/:pathname?"
                  element={
                    <AdminRoute>
                      <EditFeaturePage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/expenses"
                  element={
                    <AdminRoute>
                      <ExpensesPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/features"
                  element={
                    <AdminRoute>
                      <FeaturesPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/carts"
                  element={
                    <AdminRoute>
                      <CartsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/contents"
                  element={
                    <AdminRoute>
                      <ContentsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/display_products"
                  element={
                    <AdminRoute>
                      <ProductsDisplayPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/emails/announcement/:id"
                  exact={true}
                  element={
                    <AdminRoute>
                      <AnnouncementEmail />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/emails"
                  element={
                    <AdminRoute>
                      <EmailsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editpromo/:id?"
                  element={
                    <AdminRoute>
                      <EditPromoPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editteam/:pathname?"
                  element={
                    <AdminRoute>
                      <EditTeamPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editchip/:id?"
                  element={
                    <AdminRoute>
                      <EditChipPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editcontent/:id?"
                  element={
                    <AdminRoute>
                      <EditContentPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/editemail/:id?"
                  element={
                    <AdminRoute>
                      <EditEmailPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/promos"
                  element={
                    <AdminRoute>
                      <PromosPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/affiliates"
                  element={
                    <AdminRoute>
                      <AffiliatesPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/teams"
                  element={
                    <AdminRoute>
                      <TeamsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/teams/category/:category"
                  element={
                    <AdminRoute>
                      <TeamsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/chips"
                  element={
                    <AdminRoute>
                      <ChipsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/product_display"
                  element={
                    <AdminRoute>
                      <ProductsDisplayPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/tutorials"
                  element={
                    <AdminRoute>
                      <TutorialsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/images"
                  element={
                    <AdminRoute>
                      <ImagesPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/secure/glow/wholesalers"
                  element={
                    <AdminRoute>
                      <WholesalersPage />
                    </AdminRoute>
                  }
                />

                <Route path={"/"} exact={true} element={<HomePage />} />
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={createElement(Components[route.element])}
                  />
                ))}
                <Route element={<Four04Page />} />
              </Routes>
            </ScrollToTop>
          </Content>
          <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
