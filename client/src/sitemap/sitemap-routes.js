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
		
		
		<Route path="/collections/all/products/category/whites/subcategory/:subcategory" />
		<Route path="/collections/all/products/category/accessories/subcategory/:subcategory" />
		<Route path="/collections/all/products/category/decals/subcategory/:subcategory" />
		<Route path="/collections/all/products/category/diffuser_caps/subcategory/:subcategory" />
		<Route path="/collections/all/products/category/diffusers/subcategory/:subcategory" />
		<Route path="/collections/all/products/category/exo_diffusers/subcategory/:subcategory" />
		<Route path="/collections/all/products/category/glow_stringz/subcategory/:subcategory" />
		<Route path="/collections/all/products/category/glowskinz/subcategory/:subcategory" />


		<Route path="/collections/all/products/category/glowskinz/subcategory/clozd/collection/:collection" />
		<Route path="/collections/all/products/category/glowskinz/subcategory/opyn/collection/:collection" />

		<Route path="/collections/all/products/category/diffuser_caps/subcategory/texture/collection/:collection" />
		<Route path="/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/:collection" />
		<Route path="/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/:collection" />

		<Route path="/collections/all/products/category/:category" />
		{/* <Route path="/collections/all/products/category/:category/subcategory/:subcategory?" />
		<Route path="/collections/all/products/category/:category/subcategory/:subcategory/collection/:collection?" /> */}
		<Route path="/collections/all/products/:pathname" />
		<Route path="/checkout/order/receipt/:id/:status/:send?" />
		<Route path="/pages/contact/:reason?" exact={true} />
		<Route path="/pages/glowcontrol" />
		<Route path="/pages/terms" exact={true} />
		<Route path="/pages/menu/:pathname" exact={true} />

		<Route path="/pages/about" exact={true} />
		<Route path="/pages/faq" exact={true} />
		<Route path="/pages/sitemap" exact={true} />
		<Route path="/collections/all/features/category/:category?" exact={true} />
		<Route path="/collections/all/features/category/:category/:pathname?" exact={true} />
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
