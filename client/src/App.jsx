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
	PaymentPage,
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
	EditUserProfilePage
} from './pages/index';
import { Header, Container, Content, Footer, Sidebar } from './components/ContainerComponents/index';
import { useSelector } from 'react-redux';

import { AdminRoute, PrivateRoute } from './components/RouteComponents';
import { ScrollToTop } from './components/UtilityComponents';

const App = () => {
	const userLogin = useSelector((state) => state.userLogin);

	let { userInfo } = userLogin;

	return (
		<Router>
			<Container>
				<Header userInfo={userInfo} />
				<Sidebar userInfo={userInfo} />
				<Content>
					<ScrollToTop>
						<Switch>
							{/* Private Routes */}
							<PrivateRoute path="/account/profile" component={ProfilePage} />
							<PrivateRoute path="/account/editprofile" component={EditProfilePage} />
							<PrivateRoute path="/account/orders" component={UserOrdersPage} />
							<PrivateRoute path="/checkout/shipping" component={ShippingPage} />
							<PrivateRoute path="/checkout/payment" component={PaymentPage} />
							<Route
								path="/checkout/paymentcomplete/:id"
								exact={true}
								component={OrderPaymentCompletePage}
							/>
							<PrivateRoute
								path="/account/order/:id"
								component={(props) => <OrderPage userInfo={userInfo} {...props} />}
							/>
							<PrivateRoute
								path="/checkout/placeorder"
								component={(props) => <PlaceOrderPage userInfo={userInfo} {...props} />}
							/>
							{/* Admin Routes */}
							<AdminRoute path="/admin/editproduct/:pathname?" component={EditProductPage} />
							<AdminRoute path="/admin/products" component={ProductsPage} />
							<AdminRoute path="/admin/orders" component={OrdersPage} />
							<AdminRoute path="/admin/users" component={UsersPage} />
							<AdminRoute path="/admin/userprofile/:id" component={UserProfilePage} />
							<AdminRoute path="/admin/edituserprofile" component={EditUserProfilePage} />
							{/* Public Routes */}
							<Route path="/account/login" component={LoginPage} />
							<Route path="/account/verified/:id" component={VerifiedPage} />
							<Route path="/account/checkemail" component={CheckEmailPage} />
							<Route path="/account/changepassword" component={ChangePasswordPage} />
							<Route path="/account/register" component={RegisterPage} />
							<Route path="/account/passwordreset" component={PasswordResetPage} />
							<Route path="/account/resetpassword/:id" component={ResetPasswordPage} />

							<Route path="/checkout/cart/:pathname?" component={CartPage} />
							<Route path="/collections/all/products" exact={true} component={AllProductsPage} />
							<Route path="/collections/all/products/category/:category?" component={AllProductsPage} />
							<Route path="/collections/all/products/:pathname" component={ProductPage} />
							<Route
								path="/pages/contact/:reason?"
								exact={true}
								component={(props) => <ContactPage userInfo={userInfo} {...props} />}
							/>
							{/* <Route path="/pages/contact/:reason?" exact={true} component={ContactPage} /> */}
							<Route path="/pages/terms" exact={true} component={TermsPage} />
							<Route path="/pages/about" exact={true} component={AboutPage} />
							<Route path="/pages/faq" exact={true} component={FAQPage} />
							<Route path="/" exact={true} component={HomePage} />

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
