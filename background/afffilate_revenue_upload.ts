import axios from 'axios';
const google_sheets_json = require('./glow-leds-0e697a43198d.json');
import dotenv from 'dotenv';
dotenv.config();

const affiliate_revenue_upload = async () => {
	google_sheets_json.private_key = process.env.GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('182QRD1-8UI0BmtBqbmtsuuRMf2_WUbuhQIRPHkgCmCk');

		// use service account creds
		// await doc.useServiceAccountAuth({
		//   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		//   private_key: process.env.GOOGLE_PRIVATE_KEY,
		// });
		// OR load directly from json file if not in secure environment
		await doc.useServiceAccountAuth(google_sheets_json);
		// OR use service account to impersonate a user (see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)
		// await doc.useServiceAccountAuth(require('./creds-from-google.json'), 'some-user@my-domain.com');
		// OR use API key -- only for read-only access to public sheets
		// doc.useApiKey('YOUR-API-KEY');

		await doc.loadInfo(); // loads document properties and worksheets
		// console.log(doc.title);
		// await doc.updateProperties({ title: 'KYEO FB Product Sheet' });

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([ 'promo_code', 'uses', 'revenue' ]);

		let total_promo_code_usage: any;
		let total_affiliate_revenue: any;

		const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders');
		const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		console.log({ orders });
		console.log({ affiliates });

		// const get_total = () => {
		// 	const uses = affiliates.map((affiliate: { promo_code: string }) => {
		// 		return orders.filter((order: { promo_code: string }) => {
		// 			return order.promo_code && order.promo_code.toLowerCase() === affiliate.promo_code.toLowerCase();
		// 		}).length;
		// 	});
		// 	total_promo_code_usage = uses.reduce((a: any, c: any) => a + c, 0);
		// 	console.log({ uses });
		// 	const revenue = affiliates.map((affiliate: { promo_code: string }) => {
		// 		return orders
		// 			.filter(
		// 				(order: { promo_code: string }) =>
		// 					order.promo_code && order.promo_code.toLowerCase() === affiliate.promo_code.toLowerCase()
		// 			)
		// 			.reduce(
		// 				(a: any, order: { totalPrice: any; taxPrice: number }) => a + order.totalPrice - order.taxPrice,
		// 				0
		// 			)
		// 			.toFixed(2);
		// 	});
		// 	total_affiliate_revenue = revenue.reduce((a: string, c: string) => parseFloat(a) + parseFloat(c), 0);
		// 	console.log({ revenue });
		// };
		const new_rows = affiliates.map((affiliate: any) => {
			return {
				promo_code: affiliate.promo_code,
				uses: orders.filter((order: any) => {
					return order.promo_code && order.promo_code.toLowerCase() === affiliate.promo_code.toLowerCase();
				}).length,
				revenue: ` $${orders
					.filter(
						(order: any) =>
							order.promo_code && order.promo_code.toLowerCase() === affiliate.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`
			};
		});
		console.log({ new_rows });

		// const new_rows = affiliates.map((affiliate: any, i: number) => {
		// 	return {
		// 		promo_code: affiliate.promo_code
		// 	};
		// });
		// const new_rows = data.map((product: any, i: number) => {
		// 	const id = product._id;
		// 	const title = product.name;
		// 	const description = product.description;
		// 	const availability = 'In Stock';
		// 	const condition = 'New';
		// 	const price = product.price + ' USD';
		// 	const link = 'https://www.glow-leds.com/collections/all/products/' + product.pathname;
		// 	const image_link = product.images[0];
		// 	const additional_image_link = product.images[1];
		// 	const brand = 'Glow LEDs';
		// 	const inventory = product.countInStock;
		// 	const fb_product_category = 'toys & games > electronic toys';
		// 	const google_product_category = 'Toys & Games > Toys > Visual Toys';
		// 	const sale_price = product.sale_price;
		// 	const sale_price_effective_date = product.sale_price_effective_date;
		// 	const product_type = product.category;

		// 	return {
		// 		id,
		// 		title,
		// 		description,
		// 		availability,
		// 		condition,
		// 		price,
		// 		link,
		// 		image_link,
		// 		additional_image_link,
		// 		brand,
		// 		inventory,
		// 		fb_product_category,
		// 		google_product_category,
		// 		sale_price,
		// 		sale_price_effective_date,
		// 		product_type
		// 	};
		// });

		await sheet.addRows(new_rows);
		await sheet.saveUpdatedCells();
		// adding / removing sheets
		// const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

affiliate_revenue_upload();