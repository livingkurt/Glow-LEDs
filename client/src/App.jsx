import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
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
	ChangePasswordPage
} from './pages/index';
import { Header, Container, Content, Footer, Sidebar } from './components/ContainerComponents/index';
import { useSelector } from 'react-redux';
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';

const App = () => {
	const userLogin = useSelector((state) => state.userLogin);

	let { userInfo } = userLogin;

	return (
		<Router>
			<Container>
				<Header userInfo={userInfo} />
				<Sidebar userInfo={userInfo} />
				<Content>
					<Switch>
						{/* Public Routes */}
						<Route path="/login" component={LoginPage} />
						<Route path="/verified/:id" component={VerifiedPage} />
						<Route path="/checkemail" component={CheckEmailPage} />
						<Route path="/changepassword" component={ChangePasswordPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/product/:id" component={ProductPage} />
						<Route path="/passwordreset" component={PasswordResetPage} />
						<Route path="/resetpassword/:id" component={ResetPasswordPage} />
						<Route path="/cart/:id?" component={CartPage} />
						<Route path="/category/:id?" component={AllProductsPage} />
						<Route path="/allproducts/:id?" exact={true} component={AllProductsPage} />
						<Route path="/" exact={true} component={HomePage} />
						<Route path="/contact" exact={true} component={ContactPage} />

						{/* Private Routes */}
						<Route path="/profile" component={ProfilePage} />
						<Route path="/editprofile" component={EditProfilePage} />
						<Route path="/userorders" component={UserOrdersPage} />
						<Route path="/products" component={ProductsPage} />
						<Route path="/shipping" component={ShippingPage} />
						<Route path="/payment" component={PaymentPage} />
						<Route path="/order/:id" component={(props) => <OrderPage userInfo={userInfo} {...props} />} />
						<Route
							path="/placeorder"
							component={(props) => <PlaceOrderPage userInfo={userInfo} {...props} />}
						/>
						{/* Admin Routes */}
						<Route path="/editproduct/:id?" component={EditProductPage} />
						<Route path="/orders" component={OrdersPage} />
						<Route component={Four04Page} />
					</Switch>
				</Content>
				<Footer />
			</Container>
		</Router>
	);
};

export default App;
