// require('babel-register')({
// 	presets: [ 'es2015', 'react' ]
// });

// const router = require('./sitemap-routes').default;
// const Sitemap = require('react-router-sitemap').default;
// const fetch = require('node-fetch');
// const API = 'http://localhost:5000';

// async function generateSitemap() {
// 	let products_res = await fetch(API + '/api/products/');
// 	let products = await products_res.json();
// 	let categories_res = await fetch(API + '/api/sitemap/categories');
// 	let categories = await categories_res.json();

// 	let categoryMap = categories.map((cat) => {
// 		return { category: cat.path_name };
// 	});

// 	let productMap = categories.map((cat) => {
// 		return { category: cat.path_name };
// 	});

// 	productMap = productMap.map((obj) => {
// 		obj.product = [];
// 		return obj;
// 	});

// 	products.forEach((product) => {
// 		product.categories.forEach((cat) => {
// 			productMap = productMap.map((obj) => {
// 				if (obj.category === cat.path_name) {
// 					obj.product.push(product.path_name);
// 				}
// 				return obj;
// 			});
// 		});
// 	});

// 	productMap = productMap.filter((obj) => obj.product.length !== 0);

// 	const paramsConfig = {
// 		'/shop/:category/:product': productMap,
// 		'/shop/:category': categoryMap
// 	};
// return new Sitemap(router).applyParams(paramsConfig).build('http://my-site.ru').save('public/sitemap.xml');
// }

// generateSitemap();

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
	let categories_res = await fetch(API + '/api/products/categories');
	let categories = await categories_res.json();
	let subcategories_res = await fetch(API + '/api/products/subcategories');
	let subcategories = await subcategories_res.json();

	let productMap = products.map((product) => {
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
	// });
	console.log({ productMap });
	console.log({ categoryMap });
	console.log({ subcategoryMap });

	// 	let categoryMap = categories.map((category) => {
	// 	return { category: category.pathname };
	// });

	// let subcategoryMap = subcategories.map((cat) => {
	// 	return { subcategory: cat.pathname };
	// });

	// productMap = productMap.map((obj) => {
	// 	obj.product = [];
	// 	return obj;
	// });

	// products.forEach((product) => {
	// 	product.categories.forEach((cat) => {
	// 		productMap = productMap.map((obj) => {
	// 			if (obj.category === cat.pathname) {
	// 				obj.product.push(product.pathname);
	// 			}
	// 			return obj;
	// 		});
	// 	});
	// });

	// productMap = productMap.map((obj) => {
	// 	obj.product = [];
	// 	return obj;
	// });

	// productMap = productMap.filter((obj) => obj.product.length !== 0);

	const paramsConfig = {
		'/collections/all/products/category/accessories/subcategory/:subcategory': subcategoryMap,
		'/collections/all/products/category/diffuser_caps/subcategory/:subcategory': subcategoryMap,
		'/collections/all/products/category/frosted_diffusers/subcategory/:subcategory': subcategoryMap,
		'/collections/all/products/category/glow_strings/subcategory/:subcategory': subcategoryMap,
		'/collections/all/products/category/infinity_mirrors/subcategory/:subcategory': subcategoryMap,
		'/collections/all/products/category/mini_diffuser_caps/subcategory/:subcategory': subcategoryMap,
		'/collections/all/products/category/:category': categoryMap,
		'/collections/all/products/:pathname': productMap,
		'/pages/contact/:reason': contact_reason
	};
	return new Sitemap(router).applyParams(paramsConfig).build('https://glow-leds.com').save('public/sitemap.xml');
}

generateSitemap();
