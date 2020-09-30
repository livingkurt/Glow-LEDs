import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
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
	UserOrdersPage,
	Four04Page,
	EditProfilePage,
	EditProductPage,
	PasswordResetPage,
	ResetPasswordPage,
	VerifiedPage,
	CheckEmailPage,
	ChangePasswordPage,
	TermsPage,
	AboutPage,
	OrderPaymentCompletePage,
	UsersPage,
	FAQPage,
	UserProfilePage,
	EditUserProfilePage,
	SitemapPage,
	ControlPanelPage,
	FeaturedPage,
	ExpensesPage,
	EditExpensePage,
	EditFeaturePage,
	FeaturesPage,
	EmailSentPage,
	EditPromoPage,
	EditSponsorPage,
	PromosPage,
	SponsorsPage,
	EditOrderPage,
	EditCartPage,
	CartsPage,
	ContentsPage,
	EditContentPage,
	GlowControlPage,
	GlowControlHomePage,
	EditDevicePage
} from './pages/index';
import { Header, Container, Content, Footer, Sidebar } from './components/ContainerComponents/index';
import { useSelector } from 'react-redux';

import { AdminRoute, PrivateRoute } from './components/RouteComponents';
import { ScrollToTop } from './components/UtilityComponents';
import DevicesPage from './pages/PrivatePages/DevicesPage';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const App = () => {
	const userLogin = useSelector((state) => state.userLogin);

	let { userInfo } = userLogin;

	const theme_colors = {
		footer: '#333333',
		header: '#333333',
		content: 'linear-gradient(180deg, #8a8a8a 0%, #272727 100%);',
		container: '#272727'
	};

	return (
		<Router>
			<Container>
				<Header userInfo={userInfo} />

				<Sidebar userInfo={userInfo} />
				<Content>
					<ScrollToTop>
						<Switch>
							{/* Private Routes */}
							<PrivateRoute path="/secure/account/profile" component={ProfilePage} />
							<PrivateRoute path="/secure/account/editprofile" component={EditProfilePage} />
							<PrivateRoute path="/secure/account/orders" component={UserOrdersPage} />
							<PrivateRoute path="/secure/checkout/shipping" component={ShippingPage} />
							<PrivateRoute path="/secure/account/glowcontrol/:id" component={GlowControlPage} />
							<PrivateRoute path="/secure/account/devices" component={DevicesPage} />
							<PrivateRoute
								path="/secure/account/editdevice/:id?"
								component={(props) => <EditDevicePage userInfo={userInfo} {...props} />}
							/>
							<PrivateRoute
								path="/secure/checkout/paymentcomplete/:id"
								exact={true}
								component={OrderPaymentCompletePage}
							/>
							<PrivateRoute
								path="/secure/account/order/:id"
								component={(props) => <OrderPage userInfo={userInfo} {...props} />}
							/>
							<PrivateRoute
								path="/secure/checkout/placeorder"
								component={(props) => <PlaceOrderPage userInfo={userInfo} {...props} />}
							/>
							{/* Admin Routes */}
							<AdminRoute path="/secure/glow/editproduct/:pathname?" component={EditProductPage} />
							<AdminRoute path="/secure/glow/products" component={ProductsPage} />
							<AdminRoute path="/secure/glow/orders" component={OrdersPage} />
							<AdminRoute path="/secure/glow/users" component={UsersPage} />
							<AdminRoute path="/secure/glow/userprofile/:id" component={UserProfilePage} />
							<AdminRoute path="/secure/glow/edituserprofile" component={EditUserProfilePage} />
							<AdminRoute path="/secure/glow/editorder/:id?" component={EditOrderPage} />
							<AdminRoute path="/secure/glow/controlpanel" component={ControlPanelPage} />
							<AdminRoute path="/secure/glow/editexpense/:id?" component={EditExpensePage} />
							<AdminRoute path="/secure/glow/editfeature/:id?" component={EditFeaturePage} />
							<AdminRoute path="/secure/glow/editcart/:id?" component={EditCartPage} />
							<AdminRoute path="/secure/glow/expenses" component={ExpensesPage} />
							<AdminRoute path="/secure/glow/features" component={FeaturesPage} />
							<AdminRoute path="/secure/glow/carts" component={CartsPage} />
							<AdminRoute path="/secure/glow/contents" component={ContentsPage} />
							<AdminRoute path="/secure/glow/editpromo/:id?" component={EditPromoPage} />
							<AdminRoute path="/secure/glow/editsponsor/:id?" component={EditSponsorPage} />
							<AdminRoute path="/secure/glow/editcontent/:id?" component={EditContentPage} />
							<AdminRoute path="/secure/glow/promos" component={PromosPage} />
							<AdminRoute path="/secure/glow/sponsors" component={SponsorsPage} />
							{/* Public Routes */}
							<Route path="/account/login" component={LoginPage} />
							<Route path="/account/verified/:id" component={VerifiedPage} />
							<Route path="/account/checkemail" component={CheckEmailPage} />
							<Route path="/account/emailsent" component={EmailSentPage} />
							<Route path="/account/changepassword" component={ChangePasswordPage} />
							<Route path="/account/register" component={RegisterPage} />
							<Route path="/account/passwordreset" component={PasswordResetPage} />
							<Route path="/account/resetpassword/:id" component={ResetPasswordPage} />

							<Route path="/checkout/cart/:pathname?" component={CartPage} />
							<Route path="/collections/all/products" exact={true} component={AllProductsPage} />
							<Route
								path="/collections/all/products/category/:category?/subcategory/:subcategory?"
								component={AllProductsPage}
							/>
							<Route path="/collections/all/products/category/:category?" component={AllProductsPage} />

							<Route path="/collections/all/products/:pathname" component={ProductPage} />
							<Route
								path="/pages/contact/:reason?"
								exact={true}
								component={(props) => <ContactPage userInfo={userInfo} {...props} />}
							/>
							{/* <Route path="/pages/contact/:reason?" exact={true} component={ContactPage} /> */}
							<Route
								path="/pages/glowcontrol"
								component={(props) => <GlowControlHomePage userInfo={userInfo} {...props} />}
							/>
							<Route path="/pages/terms" exact={true} component={TermsPage} />
							<Route path="/pages/about" exact={true} component={AboutPage} />
							<Route path="/pages/faq" exact={true} component={FAQPage} />
							<Route path="/pages/sitemap" exact={true} component={SitemapPage} />
							<Route path="/pages/featured" exact={true} component={FeaturedPage} />
							<Route path="/" exact={true} component={HomePage} />

							<Route component={Four04Page} />
						</Switch>
					</ScrollToTop>
				</Content>

				<Footer backgroundColor={theme_colors.footer} />
			</Container>
		</Router>
	);
};

export default App;
