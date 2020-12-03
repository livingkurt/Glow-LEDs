// import axios from 'axios';
// import keys = require('./config/keys');
// import Product from './models/product';
const axios = require('axios');
const Product = require('./models/product');

const fb_product_feed_job = async () => {
	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1NqPY49Q-58oCVuslOw576zNyBUnyAAaOmGdzCrVT4g8');

		// use service account creds
		// await doc.useServiceAccountAuth({
		//   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		//   private_key: process.env.GOOGLE_PRIVATE_KEY,
		// });
		// OR load directly from json file if not in secure environment
		await doc.useServiceAccountAuth(require('./glow-leds-0e697a43198d.json'));
		// OR use service account to impersonate a user (see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)
		// await doc.useServiceAccountAuth(require('./creds-from-google.json'), 'some-user@my-domain.com');
		// OR use API key -- only for read-only access to public sheets
		// doc.useApiKey('YOUR-API-KEY');

		await doc.loadInfo(); // loads document properties and worksheets
		// console.log(doc.title);
		// await doc.updateProperties({ title: 'KYEO FB Product Sheet' });

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([
			'id',
			'title',
			'description',
			'availability',
			'condition',
			'price',
			'link',
			'image_link',
			'brand',
			'inventory',
			'fb_product_category',
			'google_product_category',
			'sale_price'
		]);
		console.log('Test');
		// const { data } = await axios.get('/api/products?category=&subcategory=&searchKeyword=&sortOrder=');
		const { data } = await axios.get('https://www.glow-leds.com/api/products');
		// const products = await Product.find({ deleted: false });
		console.log({ data });

		// products.forEach((item) => {
		// 	console.log({ item });
		// });

		const new_rows = data.map((product: any, i: number) => {
			const id = product._id;
			const title = product.name;
			const description = product.description;
			const availability = 'In Stock';
			// if (p.availability) {
			// 	availability = 'available for order';
			// } else {
			// 	availability = 'discontinued';
			// }
			const condition = 'New';
			const price = product.price;

			// let category_pathname;
			// if (product.categories.length > 0) {
			// 	let category = product.categories.find((category: string) => category.deleted_at === undefined || category.deleted_at === null);
			// 	if (category) {
			// 		category_pathname = category.path_name;
			// 	} else {
			// 		category_pathname = 'n_o_n_e';
			// 	}
			// } else {
			// 	category_pathname = 'n_o_n_e';
			// }

			const link = 'https://www.glow-leds.com/collections/all/products/' + product.pathname;
			// let image_link;
			// if (product.images.i1 !== null) {
			const image_link = product.images[0];
			// }
			const brand = 'Glow LEDs';
			const inventory = product.countInStock;
			const fb_product_category = 'toys & games > electronic toys';
			const google_product_category = 'Toys & Games > Toys > Visual Toys';
			const sale_price = product.sale_price;

			return {
				id,
				title,
				description,
				availability,
				condition,
				price,
				link,
				image_link,
				brand,
				inventory,
				fb_product_category,
				google_product_category,
				sale_price
			};
		});

		await sheet.addRows(new_rows);
		await sheet.saveUpdatedCells();
		// adding / removing sheets
		// const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

fb_product_feed_job();
