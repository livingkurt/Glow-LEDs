import React from 'react';
import { Route } from 'react-router';

export default (
	<Route>
		<Route path="/account/login" />
		<Route path="/account/verified/:id" />
		<Route path="/account/checkemail" />
		<Route path="/account/changepassword" />
		<Route path="/account/register" />
		<Route path="/account/passwordreset" />
		<Route path="/account/resetpassword/:id" />
		<Route path="/checkout/cart/:pathname?" />
		<Route path="/collections/all/products" />
		<Route path="/collections/all/products/category/:category?" />
		<Route path="/collections/all/products/:pathname" />
		<Route path="/pages/contact/:reason?" />
		<Route path="/pages/terms" />
		<Route path="/pages/about" />
		<Route path="/pages/faq" />
		<Route path="/" />
	</Route>
);
