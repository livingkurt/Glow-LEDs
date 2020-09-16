import React from 'react';
import { Switch, Route } from 'react-router';

export default (
	// Switch is added in v4 react-router
	<Switch>
		<Route path="/account/login" />
		<Route path="/account/verified/:id" />
		<Route path="/account/checkemail" />
		<Route path="/account/emailsent" />
		<Route path="/account/changepassword" />
		<Route path="/account/register" />
		<Route path="/account/passwordreset" />
		<Route path="/account/resetpassword/:id" />
		<Route path="/checkout/cart/:pathname?" />
		<Route exact path="/collections/all/products" />
		<Route path="/collections/all/products/category/:category?" />
		<Route path="/collections/all/products/:pathname" />
		<Route exact path="/pages/contact/:reason?" />
		<Route exact path="/pages/terms" />
		<Route exact path="/pages/about" />
		<Route exact path="/pages/faq" />
		<Route exact path="/pages/sitemap" />
		<Route exact path="/pages/featured" />
		<Route exact path="/" />
		<Route />
	</Switch>
);
