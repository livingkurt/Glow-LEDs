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
		<Route path="/checkout/decision" />
		<Route path="/checkout/placeorder" />
		<Route path="/checkout/shipping" />

		<Route path="/checkout/cart/:pathname?" />
		<Route path="/collections/all/products/:category?/:subcategory?/:collection?/:pathname?" />
		<Route path="/checkout/order/receipt/:id/:status/:send?" />
		<Route path="/pages/contact/:reason?" exact={true} />
		<Route path="/pages/glowcontrol" />
		<Route path="/pages/terms" exact={true} />
		<Route path="/pages/menu/:pathname" exact={true} />

		<Route path="/pages/about" exact={true} />
		<Route path="/pages/faq" exact={true} />
		<Route path="/pages/sitemap" exact={true} />
		<Route path="/collections/all/features/:category?" exact={true} />
		<Route path="/collections/all/features/:category/:pathname?" exact={true} />
		<Route path="/collections/all/sponsors" exact={true} />
		<Route path="/collections/all/sponsors/:promo_code?" exact={true} />
		<Route path="/collections/all/teams/category/:category?" exact={true} />
		<Route path="/account/feature/receipt/:pathname/:status/:send?" />
		<Route path="/account/affiliate/receipt/:pathname/:status/:send?" />
		<Route path="/account/submit_feature" />
		<Route path="/collections/all/teams" exact={true} />
		<Route path="/collections/all/teams/:pathname?" exact={true} />
		<Route path="/pages/music" exact={true} />
		<Route path="/" exact={true} />
		<Route path="/pages/track_your_order" exact={true} />
		<Route path="/checkout/order/:id" exact={true} />
		<Route path="/pages/announcements" exact={true} />
		<Route path="/pages/manual/:pathname?" exact={true} />
		<Route path="/pages/affiliate_terms" exact={true} />
		<Route path="/pages/become_affiliate" exact={true} />
		<Route />
	</Switch>
);
