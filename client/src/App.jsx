import React, { useEffect, useState, useRef } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {
  HomePage,
  AllProductsPage,
  ProductPage,
  CartPage,
  LoginPage,
  RegisterPage,
  ProductsPage,
  ShippingPage,
  PlaceOrderPage,
  OrderPage,
  ProfilePage,
  OrdersPage,
  ContactPage,
  MyOrdersPage,
  Four04Page,
  EditProfilePage,
  EditProductPage,
  PasswordResetPage,
  VerifiedPage,
  CheckEmailPage,
  ChangePasswordPage,
  TermsPage,
  AboutPage,
  UsersPage,
  FAQPage,
  UserProfilePage,
  EditUserPage,
  SitemapPage,
  ControlPanelPage,
  FeaturedPage,
  ExpensesPage,
  EditExpensePage,
  EditFeaturePage,
  FeaturesPage,
  EditPromoPage,
  EditAffiliatePage,
  PromosPage,
  AffiliatesPage,
  EditOrderPage,
  EditCartPage,
  CartsPage,
  ContentsPage,
  EditContentPage,
  MusicPage,
  EditEmailPage,
  EmailsPage,
  MenuPage,
  ResetPasswordPage,
  ProductsDisplayPage,
  TrackOrderPage,
  AnnouncementsPage,
  EditAllDataPage,
  AllFeaturesPage,
  SubmitFeaturePage,
  SubmissionComplete,
  EditUserAffiliatePage,
  AffiliateCreationComplete,
  ChipsPage,
  AllSponsorsPage,
  SponsorPage,
  EditTeamPage,
  TeamsPage,
  TeamPage,
  AllTeamsPage,
  ManualPage,
  AffiliateTermsPage,
  BecomeAffiliatePage,
  EditPaycheckPage,
  PaychecksPage,
  EditSurveyPage,
  SurveysPage,
  EditParcelPage,
  ParcelsPage,
  CategorysPage,
  EditCategoryPage,
  EditSettingPage,
  SettingsPage,
  LabelCreatorPage,
  AdminChangePasswordPage,
  MonthlyExpensesPage,
  MonthExpensesPage,
  ColorPalettePage,
  EditPalettePage,
  PalettesPage,
  OrderCombinerPage,
  EditChipPage,
  EventsPage,
  CompletePage,
  GcodeContinousPage,
  AllProductsByChipPage,
  ImageCompressorPage,
  AnnouncementEmail,
} from "./pages/index";
import {
  Header,
  Container,
  Content,
  Footer,
  Sidebar,
  Cart,
} from "./components/ContainerComponents/index";
import { AdminRoute, PrivateRoute } from "./components/RouteComponents";
import { Notification, ScrollToTop } from "./components/UtilityComponents";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Helmet } from "react-helmet";
import useWindowDimensions from "./components/Hooks/windowDimensions";
// import Particles from "react-particles-js";
import particlesjs_config from "./particlesjs_config.json";
import { check_authentication } from "./utils/react_helper_functions";
import { EmailModal } from "./components/SpecialtyComponents";
import { daysBetween } from "./utils/helper_functions";
import { isBrowser, isMobile } from "react-device-detect";
import Headroom from "react-headroom";
import FilamentsPage from "./pages/AdminPages/ListPages/FilamentsPage";
import EditFilamentPage from "./pages/AdminPages/EditPages/EditFilamentPage";

const App = props => {
  const theme_colors = {
    footer: "#333333",
    header: "#333333",
    content: "linear-gradient(180deg, #8a8a8a 0%, #272727 100%);",
    container: "#272727",
  };

  const out_of_office_date_1 = "2021-11-23";
  const out_of_office_date_2 = "2021-12-02";
  const { height, width } = useWindowDimensions();

  const [ message, set_message ] = useState("");
  // const userLogin = useSelector((state) => state.userLogin);

  check_authentication();

  // const frame = document.getElementsByTagName("iframe").classList.add("none");

  setInterval(() => {
    check_authentication();
  }, 800000);

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
      const context = this,
        args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const [ prevScrollPos, setPrevScrollPos ] = useState(0);
  const [ visible, setVisible ] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 50);

  useEffect(
    () => {
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    },
    [ prevScrollPos, visible, handleScroll ]
  );

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  var modal = document.getElementById("myModal");
  const [ show_modal, set_show_modal ] = useState(false);

  const date = new Date();

  const today = date.toISOString();

  useEffect(() => {
    let clean = true;
    if (clean) {
      const popup = JSON.parse(localStorage.getItem("popup"));
      if (!popup) {
        setTimeout(() => {
          set_show_modal(true);
        }, 5000);
      } else if (daysBetween(popup.date, today) > 2 && !popup.email) {
        setTimeout(() => {
          set_show_modal(true);
        }, 5000);
      }
      // if (!popup) {
      // 	setTimeout(() => {
      // 		set_show_modal(true);
      // 	}, 5000);
      // }
    }
    return () => (clean = false);
  }, []);

  const [ active, set_active ] = useState(false);
  console.log({ active });

  const open_sidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    console.log({ classList: sidebar.classList });
  };

  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);

  const open_close = () => {
    open_sidebar();
    const sidebar = document.querySelector(".head-btn");
    if (sidebar.classList.value === "head-btn not-active") {
      document.querySelector(".head-btn").classList.remove("not-active");
      document.querySelector(".head-btn").classList.add("active");
    } else {
      document.querySelector(".head-btn").classList.remove("active");
      document.querySelector(".head-btn").classList.add("not-active");
    }
  };

  return (
    <Router>
      <Container>
        <Helmet>
          <title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
          <meta
            name="description"
            content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
          />
          <link rel="canonical" href="https://www.glow-leds.com" />
          <meta charset="utf-8" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="https://www.glow-leds.com/favicon.ico"
          />
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
          <meta
            property="og:title"
            content="Glow LEDs | Home of the LED Glove Diffuser Caps"
          />
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
          <meta
            name="twitter:title"
            content="Glow LEDs | Home of the LED Glove Diffuser Caps"
          />
          <meta
            name="twitter:image"
            content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
          />
          <meta name="twitter:creator" content="@glow_leds" />
        </Helmet>
        <Notification message={message} />
        <EmailModal set_show_modal={set_show_modal} show_modal={show_modal} />
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
        <Sidebar
          visible={visible}
          height={height}
          width={width}
          wrapperRef={wrapperRef}
        />

        <Cart
          visible={visible}
          height={height}
          width={width}
          date_1={out_of_office_date_1}
          date_2={out_of_office_date_2}
        />

        <Content>
          {process.env.NODE_ENV === "production" && (
            <MessengerCustomerChat
              pageId="100365571740684"
              appId="379385106779969"
              greetingDialogDisplay="show"
              shouldShowDialog={false}
              loggedInGreeting="Hi! How can we help you?"
              loggedOutGreeting="Hi! How can we help you?"
            />
          )}
          <ScrollToTop>
            <Switch>
              {/* Private Routes */}
              <PrivateRoute
                path="/secure/account/profile"
                component={ProfilePage}
              />
              <PrivateRoute
                path="/secure/account/editprofile"
                component={EditProfilePage}
              />
              {/* <PrivateRoute path="/account/submit_feature" component={SubmitFeaturePage} /> */}
              <PrivateRoute
                path="/secure/account/orders"
                component={MyOrdersPage}
              />
              <PrivateRoute
                path="/secure/checkout/shipping"
                component={ShippingPage}
              />
              <PrivateRoute
                path="/secure/account/order/:id"
                component={OrderPage}
              />
              <PrivateRoute
                path="/secure/checkout/placeorder"
                component={PlaceOrderPage}
              />
              {/* <PrivateRoute
								path="/secure/checkout/placeorder"
								component={(props) => (
									<PlaceOrderPage
										{...props}
										date_1={out_of_office_date_1}
										date_2={out_of_office_date_2}
									/>
								)}
							/> */}
              <PrivateRoute
                path="/secure/account/affiliate_sign_up_complete"
                component={AffiliateCreationComplete}
              />
              <PrivateRoute
                path="/secure/account/edit_affiliate/:id?"
                component={EditUserAffiliatePage}
              />
              <PrivateRoute
                path="/secure/account/submission_complete"
                component={SubmissionComplete}
              />
              {/* Admin Routes */}
              <AdminRoute
                path="/secure/glow/editproduct/:pathname?/:template?/:product_option?/:item_group_id?"
                component={EditProductPage}
              />
              <AdminRoute
                path="/secure/glow/gcode_continous"
                component={GcodeContinousPage}
              />
              <AdminRoute
                path="/secure/glow/image_compressor"
                component={ImageCompressorPage}
              />
              <AdminRoute
                path="/secure/glow/edit_all_data"
                component={EditAllDataPage}
              />
              <AdminRoute
                path="/secure/glow/products"
                component={ProductsPage}
              />
              <AdminRoute
                path="/secure/glow/create_label"
                component={LabelCreatorPage}
              />
              <AdminRoute path="/secure/glow/orders" component={OrdersPage} />
              <AdminRoute path="/secure/glow/users" component={UsersPage} />
              <AdminRoute
                path="/secure/glow/paychecks"
                component={PaychecksPage}
              />
              <AdminRoute
                path="/secure/glow/settings"
                component={SettingsPage}
              />
              <AdminRoute
                path="/secure/glow/categorys"
                component={CategorysPage}
              />
              <AdminRoute path="/secure/glow/surveys" component={SurveysPage} />
              <AdminRoute path="/secure/glow/parcels" component={ParcelsPage} />
              <AdminRoute
                path="/secure/glow/palettes"
                component={PalettesPage}
              />
              <AdminRoute
                path="/secure/glow/filaments"
                component={FilamentsPage}
              />
              <AdminRoute
                path="/secure/glow/userprofile/:id"
                component={UserProfilePage}
              />
              <AdminRoute
                path="/secure/glow/userorders/:id"
                component={MyOrdersPage}
              />
              <AdminRoute
                path="/secure/glow/edituser/:id?"
                component={EditUserPage}
              />
              <AdminRoute
                path="/secure/glow/editorder/:id?"
                component={EditOrderPage}
              />
              <AdminRoute
                path="/secure/glow/editpaycheck/:id?"
                component={EditPaycheckPage}
              />
              <AdminRoute
                path="/secure/glow/editsetting/:id?"
                component={EditSettingPage}
              />
              <AdminRoute
                path="/secure/glow/editcategory/:id?"
                component={EditCategoryPage}
              />
              <AdminRoute
                path="/secure/glow/editsurvey/:id?"
                component={EditSurveyPage}
              />
              <AdminRoute
                path="/secure/glow/editparcel/:id?"
                component={EditParcelPage}
              />
              <AdminRoute
                path="/secure/glow/editpalette/:id?"
                component={EditPalettePage}
              />
              <AdminRoute
                path="/secure/glow/editfilament/:id?"
                component={EditFilamentPage}
              />

              <AdminRoute
                path="/secure/glow/change_password/:id"
                component={AdminChangePasswordPage}
              />
              <AdminRoute
                path="/secure/glow/controlpanel/monthly_expenes/:year"
                exact={true}
                component={MonthlyExpensesPage}
              />
              <AdminRoute
                path="/secure/glow/controlpanel/monthly_expenes/:year/:month"
                exact={true}
                component={MonthExpensesPage}
              />
              <AdminRoute
                path="/secure/glow/controlpanel"
                component={ControlPanelPage}
              />
              <AdminRoute
                path="/secure/glow/editexpense/:id?"
                component={EditExpensePage}
              />
              <AdminRoute
                path="/secure/glow/editfeature/:pathname?"
                component={EditFeaturePage}
              />
              <AdminRoute
                path="/secure/glow/editcart/:id?"
                component={EditCartPage}
              />
              <AdminRoute
                path="/secure/glow/expenses"
                component={ExpensesPage}
              />
              <AdminRoute
                path="/secure/glow/features"
                component={FeaturesPage}
              />
              <AdminRoute path="/secure/glow/carts" component={CartsPage} />
              <AdminRoute
                path="/secure/glow/contents"
                component={ContentsPage}
              />
              <AdminRoute
                path="/secure/glow/display_products"
                component={ProductsDisplayPage}
              />
              <AdminRoute
                path="/secure/glow/combine_orders"
                component={OrderCombinerPage}
              />
              <AdminRoute
                path="/secure/glow/emails/announcement/:id"
                exact={true}
                component={AnnouncementEmail}
              />
              <AdminRoute path="/secure/glow/emails" component={EmailsPage} />
              <AdminRoute
                path="/secure/glow/editpromo/:id?"
                component={EditPromoPage}
              />
              <AdminRoute
                path="/secure/glow/editaffiliate/:pathname?"
                component={EditAffiliatePage}
              />
              <AdminRoute
                path="/secure/glow/editteam/:pathname?"
                component={EditTeamPage}
              />
              <AdminRoute
                path="/secure/glow/editchip/:id?"
                component={EditChipPage}
              />
              <AdminRoute
                path="/secure/glow/editcontent/:id?"
                component={EditContentPage}
              />
              <AdminRoute
                path="/secure/glow/editemail/:id?"
                component={EditEmailPage}
              />
              <AdminRoute path="/secure/glow/promos" component={PromosPage} />
              <AdminRoute
                path="/secure/glow/affiliates"
                component={AffiliatesPage}
              />
              <AdminRoute path="/secure/glow/teams" component={TeamsPage} />
              <AdminRoute
                path="/secure/glow/teams/category/:category"
                component={TeamsPage}
              />
              <AdminRoute path="/secure/glow/chips" component={ChipsPage} />
              <AdminRoute
                path="/secure/glow/product_display"
                component={ProductsDisplayPage}
              />

              {/* Public Routes */}
              <Route path="/" exact={true} component={HomePage} />
              {/* Account */}
              <Route path="/account/login" component={LoginPage} />
              <Route path="/account/verified/:id" component={VerifiedPage} />
              <Route path="/account/checkemail" component={CheckEmailPage} />
              <Route
                path="/account/changepassword"
                component={ChangePasswordPage}
              />
              <Route path="/account/register" component={RegisterPage} />
              <Route
                path="/account/passwordreset"
                component={PasswordResetPage}
              />
              <Route
                path="/account/resetpassword/:id"
                component={ResetPasswordPage}
              />
              <Route
                path="/account/submit_feature"
                component={SubmitFeaturePage}
              />
              {/* Checkout */}
              <Route path="/checkout/placeorder" component={PlaceOrderPage} />
              <Route path="/checkout/shipping" component={ShippingPage} />
              <Route path="/checkout/cart/:pathname?" component={CartPage} />
              <Route
                path="/checkout/order/:id"
                exact={true}
                component={OrderPage}
              />

              {/* Collections */}
              {/* Product Collections */}
              <Route
                path="/collections/all/products/code/:promo_code"
                exact={true}
                component={AllProductsPage}
              />
              <Route
                path="/collections/all/products"
                exact={true}
                component={AllProductsPage}
              />
              <Route
                path="/collections/all/products/shop_by_chip"
                component={AllProductsByChipPage}
              />
              <Route
                path="/collections/all/products/category/:category/subcategory/:subcategory/collection/:collection?"
                component={AllProductsPage}
              />
              <Route
                path="/collections/all/products/category/:category/subcategory/:subcategory?"
                component={AllProductsPage}
              />
              <Route
                path="/collections/all/products/category/:category"
                component={AllProductsPage}
              />
              <Route
                path="/collections/all/products/:pathname"
                component={ProductPage}
              />
              {/* Feature Collections */}
              <Route
                path="/collections/all/features/category/:category?"
                exact={true}
                component={AllFeaturesPage}
              />
              <Route
                path="/collections/all/features/category/:category/:pathname?"
                exact={true}
                component={FeaturedPage}
              />
              {/* Sponsors Collections */}
              <Route
                path="/collections/all/sponsors/category/:category?"
                exact={true}
                component={AllSponsorsPage}
              />
              <Route
                path="/collections/all/sponsors"
                exact={true}
                component={AllSponsorsPage}
              />
              <Route
                path="/collections/all/sponsors/:promo_code?"
                exact={true}
                component={SponsorPage}
              />
              {/* Team Collections */}
              <Route
                path="/collections/all/teams/category/:category?"
                exact={true}
                component={AllTeamsPage}
              />
              <Route
                path="/collections/all/teams"
                exact={true}
                component={AllTeamsPage}
              />
              <Route
                path="/collections/all/teams/:pathname?"
                exact={true}
                component={TeamPage}
              />

              {/* Pages */}
              <Route
                path="/pages/announcements"
                exact={true}
                component={AnnouncementsPage}
              />
              <Route
                path="/pages/manual/:pathname?"
                exact={true}
                component={ManualPage}
              />
              <Route
                path="/pages/affiliate_terms"
                exact={true}
                component={AffiliateTermsPage}
              />
              <Route
                path="/pages/become_affiliate"
                exact={true}
                component={BecomeAffiliatePage}
              />
              <Route
                path="/pages/color_palettes"
                exact={true}
                component={ColorPalettePage}
              />
              <Route path="/pages/events" exact={true} component={EventsPage} />
              <Route
                path="/pages/contact/:reason?"
                exact={true}
                component={ContactPage}
              />
              <Route path="/pages/glowcontrol" component={ContactPage} />
              <Route path="/pages/terms" exact={true} component={TermsPage} />
              <Route
                path="/pages/menu/:pathname"
                exact={true}
                component={MenuPage}
              />
              <Route path="/pages/about" exact={true} component={AboutPage} />
              <Route path="/pages/faq" exact={true} component={FAQPage} />
              <Route
                path="/pages/sitemap"
                exact={true}
                component={SitemapPage}
              />
              <Route path="/pages/music" exact={true} component={MusicPage} />
              <Route
                path="/pages/track_your_order"
                exact={true}
                component={TrackOrderPage}
              />
              <Route
                path="/pages/complete/:type/:id?"
                exact={true}
                component={CompletePage}
              />

              <Route component={Four04Page} />
            </Switch>
          </ScrollToTop>
        </Content>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;
