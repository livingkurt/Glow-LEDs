require('babel-register')({
	presets: [ 'es2015', 'react' ]
});

const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;
const fetch = require('node-fetch');
const API = 'http://localhost:5000';
export const categories = [
	'whites',
	'accessories',
	'decals',
	'diffuser_caps',
	'diffusers',
	'exo_diffusers',
	'glow_casings',
	'glow_strings',
	'glowskins'
];
export const subcategories = [
	'whites',
	'refresh',
	'battery_storage',
	'batteries',
	'stickers',
	'clips',
	'casings',
	'universal',
	'batman',
	'outline',
	'patterns',
	'abstract',
	'shapes',
	'diffuser_adapters',
	'geometric',
	'starter_kit',
	'sacred_geometry',
	'imperfect',
	'domes',
	'closed_hole',
	'fisheye',
	'open_hole',
	'polygons',
	'cylinders',
	'polyhedrons',
	'gift_card',
	'nova',
	'classics',
	'novaskins',
	'alt_novaskins',
	'symbols',
	'emoji',
	'custom',
	'colors',
	'sizes',
	'secondary_colors'
];

async function generateSitemap() {
	let products_res = await fetch(API + '/api/products/');
	let products = await products_res.json();

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
		'/collections/all/products/accessories/:subcategory?': subcategoryMap,
		'/collections/all/products/glowskins/:subcategory?': subcategoryMap,
		'/collections/all/products/exo_diffusers/:subcategory?': subcategoryMap,
		'/collections/all/products/glow_casings/:subcategory?': subcategoryMap,
		'/collections/all/products/diffuser_caps/:subcategory?': subcategoryMap,
		'/collections/all/products/diffusers/:subcategory?': subcategoryMap,
		'/collections/all/products/glow_strings/:subcategory?': subcategoryMap,
		'/collections/all/products/options/:subcategory?': subcategoryMap,
		'/collections/all/products/:category': categoryMap,
		'/collections/all/products/:pathname': productMap,
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
