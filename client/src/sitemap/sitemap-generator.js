require('babel-register')({
	presets: [ 'es2015', 'react' ]
});

const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;
const fetch = require('node-fetch');
const API = 'http://localhost:5000';

async function generateSitemap() {
	let products_res = await fetch(API + '/api/products/');
	let products = await products_res.json();
	let categories_res = await fetch(API + '/api/products/get_all_categories');
	let categories = await categories_res.json();
	let subcategories_res = await fetch(API + '/api/products/get_all_subcategories');
	let subcategories = await subcategories_res.json();

	let productMap = products.filter((product) => product.hidden === false).map((product) => {
		return { pathname: product.pathname };
	});
	let categoryMap = categories.map((category) => {
		return { category };
	});
	let subcategoryMap = subcategories.map((subcategory) => {
		return { subcategory };
	});

	const contact_reason = [
		{ reason: 'did_not_recieve_verification_email' },
		{ reason: 'order_issues' },
		{ reason: 'returns' },
		{ reason: 'technical_support' },
		{ reason: 'website_bugs' },
		{ reason: 'custom_orders' },
		{ reason: 'product_suggestions' },
		{ reason: 'submit_content_to_be_featured' }
	];
	const menu_types = [ { pathname: 'gloving' }, { pathname: 'featured' }, { pathname: 'support' } ];

	console.log({ productMap });
	console.log({ categoryMap });
	console.log({ subcategoryMap });

	const paramsConfig = {
		'/collections/products/accessories/:subcategory?': subcategoryMap,
		'/collections/products/glowskins/:subcategory?': subcategoryMap,
		'/collections/products/exo_diffusers/:subcategory?': subcategoryMap,
		'/collections/products/glow_casings/:subcategory?': subcategoryMap,
		'/collections/products/diffuser_caps/:subcategory?': subcategoryMap,
		'/collections/products/diffusers/:subcategory?': subcategoryMap,
		'/collections/products/glow_strings/:subcategory?': subcategoryMap,
		'/collections/products/options/:subcategory?': subcategoryMap,
		'/collections/products/:category': categoryMap,
		'/collections/products/:pathname': productMap,
		'/pages/contact/:reason': contact_reason,
		'/pages/menu/:pathname': menu_types
	};
	return new Sitemap(router)
		.applyParams(paramsConfig)
		.build('https://glow-leds.com')
		.save('../sitemap.xml')
		.save('public/sitemap.xml');
}

generateSitemap();
