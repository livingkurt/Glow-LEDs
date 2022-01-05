import axios from 'axios';
import { API_Orders } from '.';
import { removeDuplicates, calculate_affiliate_usage, calculate_sponsor_usage, toCapitalize } from './helper_functions';

// import dotenv from 'dotenv';
// dotenv.config();
const google_sheets_json = require('./glow-leds-0e697a43198d.json');

const unformatted_date = new Date();
// const day = date.getDay();
const day = unformatted_date.toString().slice(8, 10);

const day_num = parseInt(day);

// console.log({ day_num });

export const top_code_usage_upload = async (year: number, month: string) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1iGUFKugqgZs6kwbgz_FgQzqa7ivFA7BZmvjTJvvyHyI');

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

		const { data: last_months_rows } = await API_Orders.affiliate_code_usage_orders_a({
			year,
			month,
			position: ''
		});
		const { data: total_rows } = await API_Orders.affiliate_code_usage_orders_a({
			year: '',
			month: '',
			position: ''
		});
		console.log({ last_months_rows });
		console.log({ total_rows });

		const sorted_total_rows = total_rows.affiliates.sort(
			(a: any, b: any) => (parseFloat(a.Uses) > parseFloat(b.Uses) ? -1 : 1)
		);

		const formated_total = removeDuplicates(sorted_total_rows, 'Promo Code').map((affiliate: any) => {
			return { ...affiliate, Revenue: `$${affiliate.Revenue}` };
		});

		const sorted_last_months_rows = last_months_rows.affiliates.sort(
			(a: any, b: any) => (parseFloat(a.Uses) > parseFloat(b.Uses) ? -1 : 1)
		);
		const formated_last_month = removeDuplicates(sorted_last_months_rows, 'Promo Code').map((affiliate: any) => {
			return { ...affiliate, Revenue: `$${affiliate.Revenue}` };
		});

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([ 'Promo Code', 'Uses' ]);

		await sheet.addRows(formated_total);
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const newSheet = await doc.addSheet({
			title: `${toCapitalize(month)} ${year} Affiliate Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue' ]);

		await newSheet.addRows(formated_last_month);
		await newSheet.saveUpdatedCells();
		// // await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const top_earner_upload = async (year: number, month: string) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1HMi3HF1f_5mJZqievCYOfrOuDjQkZeNLD88DoCw7kl0');

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

		const { data: last_months_rows } = await API_Orders.affiliate_code_usage_orders_a({
			year,
			month,
			position: ''
		});
		const { data: total_rows } = await API_Orders.affiliate_code_usage_orders_a({
			year: '',
			month: '',
			position: ''
		});
		console.log({ last_months_rows });
		console.log({ total_rows });

		const sorted_last_months_rows = last_months_rows.affiliates.sort(
			(a: any, b: any) => (parseFloat(a.Revenue) > parseFloat(b.Revenue) ? -1 : 1)
		);
		const formated_last_month = removeDuplicates(sorted_last_months_rows, 'Promo Code').map((affiliate: any) => {
			return { ...affiliate, Revenue: `$${affiliate.Revenue}` };
		});

		const sorted_total_rows = total_rows.affiliates.sort(
			(a: any, b: any) => (parseFloat(a.Revenue) > parseFloat(b.Revenue) ? -1 : 1)
		);

		const formated_total = removeDuplicates(sorted_total_rows, 'Promo Code').map((affiliate: any) => {
			return { ...affiliate, Revenue: `$${affiliate.Revenue}` };
		});

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([ 'Promo Code', 'Revenue', 'Uses' ]);

		await sheet.addRows(formated_total);
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const newSheet = await doc.addSheet({
			title: `${toCapitalize(month)} ${year} Affiliate Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Revenue', 'Uses' ]);

		await newSheet.addRows(formated_last_month);
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const affiliate_revenue_upload = async (position: any, year: number, month: string, google_sheet: string) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet(google_sheet);

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

		const { data: last_months_rows } = await API_Orders.affiliate_code_usage_orders_a({
			year,
			month,
			position
		});
		const { data: total_rows } = await API_Orders.affiliate_code_usage_orders_a({ year: '', month: '', position });

		console.log({ last_months_rows });
		console.log({ total_rows });

		const sorted_total_rows = total_rows.affiliates.sort(
			(a: any, b: any) => (parseFloat(a.Revenue) > parseFloat(b.Revenue) ? -1 : 1)
		);
		const sorted_last_months_rows = last_months_rows.affiliates.sort(
			(a: any, b: any) => (parseFloat(a.Revenue) > parseFloat(b.Revenue) ? -1 : 1)
		);
		const formated_total = removeDuplicates(sorted_total_rows, 'Promo Code').map((affiliate: any) => {
			return { ...affiliate, Revenue: `$${affiliate.Revenue}` };
		});
		const formated_last_month = removeDuplicates(sorted_last_months_rows, 'Promo Code').map((affiliate: any) => {
			return { ...affiliate, Revenue: `$${affiliate.Revenue}` };
		});

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue' ]);

		await sheet.addRows(formated_total);
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const newSheet = await doc.addSheet({
			title: `${toCapitalize(month)} ${year} ${position ? toCapitalize(position) : 'Affiliate'} Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Percentage Off' ]);

		await newSheet.addRows(formated_last_month);
		await newSheet.saveUpdatedCells();

		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const facebook_catalog_upload = async (products: any) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1NqPY49Q-58oCVuslOw576zNyBUnyAAaOmGdzCrVT4g8');
		// const doc = new GoogleSpreadsheet('1IS8GkQmPTsBcPM8qv0ifGIjTpeDSjkx4FuYA0ZmEq2o');

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
		await sheet.setHeaderRow([
			'id',
			'title',
			'description',
			'availability',
			'condition',
			'price',
			'link',
			'image_link',
			'additional_image_link',
			'brand',
			'inventory',
			'fb_product_category',
			'google_product_category',
			'sale_price',
			'sale_price_effective_date',
			'product_type',
			'color',
			'size'
			// 'shipping_weight',
			// 'item_group_id'
		]);

		// const { data } = await axios.get('https://www.glow-leds.com/api/products/shown');

		const new_rows = products.map((product: any, i: number) => {
			const id = product._id;
			const title = product.name === 'Supremes' ? 'GL Whites' : product.name;
			const description = product.description;
			const availability = 'In Stock';
			const condition = 'New';
			const price = `${product.price} USD`;
			const link = `https://www.glow-leds.com/collections/all/products/${product.pathname}`;
			const image_link = product.images[0];
			const additional_image_link = product.images[1];
			const brand = 'Glow LEDs';
			const inventory = product.count_in_stock;
			const fb_product_category = 'toys & games > electronic toys';
			const google_product_category = 'Toys & Games > Toys > Visual Toys';
			const sale_price = `${product.sale_price && product.sale_price.toFixed(2)} USD`;
			const sale_price_effective_date = `${product.sale_start_date &&
				product.sale_start_date.slice(0, -1)}/${product.sale_end_date && product.sale_end_date.slice(0, -1)}`;
			const product_type = product.category;
			const color = product.color;
			const size = product.size;
			// const shipping_weight = `${product.weight_pounds
			// 	? product.weight_pounds * 16 + product.weight_ounces
			// 	: product.weight_ounces} oz`;
			// const item_group_id = product.item_group_id ? product.item_group_id : '';

			return {
				id,
				title,
				description,
				availability,
				condition,
				price,
				link,
				image_link,
				additional_image_link,
				brand,
				inventory,
				fb_product_category,
				google_product_category,
				sale_price,
				sale_price_effective_date,
				product_type,
				color,
				size
				// shipping_weight,
				// item_group_id
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

export const google_catalog_upload = async (products: any) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;
	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		const doc = new GoogleSpreadsheet('1V9vSROcN0RA-OFRGOIbvt_raXh3ZG2BYDY9DSOudaqU');
		// const doc = new GoogleSpreadsheet('1f-SCHyQRz3oWRcYBTk2OKG1--KRXC1ynkY5lbWM-1hk');

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
		await sheet.setHeaderRow([
			'id',
			'title',
			'description',
			'link',
			'condition',
			'price',
			'availability',
			'image_link',
			'mpn',
			'brand',
			'google_product_category',
			'sale_price',
			'sale_price_effective_date'
		]);
		// const { data } = await axios.get('https://www.glow-leds.com/api/products/shown');

		const new_rows = products.map((product: any, i: number) => {
			const id = product._id;
			const title = product.name;
			const description = product.description;
			const availability = 'In Stock';
			const condition = 'New';
			const price = product.price + ' USD';
			const link = `https://www.glow-leds.com/collections/all/products/${product.category}/${product.subcategory}/${product.pathname}`;
			const image_link = product.images[0];
			const brand = 'Glow LEDs';
			const mpn = product.pathname;
			const google_product_category = 'Toys & Games > Toys > Visual Toys';
			const sale_price = product.sale_price + ' USD';
			const sale_price_effective_date = '';

			return {
				id,
				title,
				description,
				link,
				condition,
				price,
				availability,
				image_link,
				mpn,
				brand,
				google_product_category,
				sale_price,
				sale_price_effective_date
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
