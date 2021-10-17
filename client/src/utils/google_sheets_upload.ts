import axios from 'axios';
import { removeDuplicates, calculate_affiliate_usage, calculate_sponsor_usage } from './helper_functions';

// import dotenv from 'dotenv';
// dotenv.config();
const google_sheets_json = require('./glow-leds-0e697a43198d.json');

const unformatted_date = new Date();
// const day = date.getDay();
const day = unformatted_date.toString().slice(8, 10);

const day_num = parseInt(day);

// console.log({ day_num });

export const top_code_usage_upload = async (affiliates: any, orders: any, last_months_orders: any) => {
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

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([ 'Promo Code', 'Uses' ]);

		// const { data: last_months_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		// const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		// const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		// console.log({ orders });

		// const affiliates_w_inkybois = [ ..affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const toCapitalize = (string: string) => {
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
		};

		const last_months_rows = affiliates.filter((affiliate: any) => affiliate.active).map((affiliate: any) => {
			return {
				'Promo Code': toCapitalize(affiliate.public_code.promo_code),
				Uses: last_months_orders.filter((order: any) => {
					return (
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					);
				}).length
			};
		});
		const total_rows = affiliates.filter((affiliate: any) => affiliate.active).map((affiliate: any) => {
			return {
				'Promo Code': toCapitalize(affiliate.public_code.promo_code),
				Uses: orders.filter((order: any) => {
					return (
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					);
				}).length
			};
		});

		// const sorted_total_rows = total_rows.sort((a: any, b: any) => (parseInt(a.Uses) > parseInt(b.Uses) ? -1 : 1));
		const sorted_total_rows = total_rows.sort((a: any, b: any) => (parseInt(a.Uses) > parseInt(b.Uses) ? -1 : 1));
		await sheet.addRows(removeDuplicates(sorted_total_rows, 'Promo Code'));
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const months = [
			'December',
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November'
		];
		const date = new Date();
		const month = date.getMonth();
		const year = date.getFullYear();

		const newSheet = await doc.addSheet({
			title: `${months[month]} ${year} Affiliate Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses' ]);
		const sorted_last_months_rows = last_months_rows.sort(
			(a: any, b: any) => (parseInt(a.Uses) > parseInt(b.Uses) ? -1 : 1)
		);
		await newSheet.addRows(removeDuplicates(sorted_last_months_rows, 'Promo Code'));
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const top_earner_upload = async (affiliates: any, orders: any, last_months_orders: any) => {
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

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);

		// const { data: last_months_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		// const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		// const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		// console.log({ orders });

		// const affiliates_w_inkybois = [ ..affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const toCapitalize = (string: string) => {
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
		};

		const last_months_rows = affiliates.filter((affiliate: any) => affiliate.active).map((affiliate: any) => {
			return {
				'Promo Code': toCapitalize(affiliate.public_code.promo_code),
				Uses: last_months_orders.filter((order: any) => {
					return (
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					);
				}).length,
				Revenue: ` $${last_months_orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`,
				Earned: `$${affiliate.promoter
					? last_months_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
							.toFixed(2)
					: last_months_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
							.toFixed(2)}`
			};
		});
		const total_rows = affiliates.filter((affiliate: any) => affiliate.active).map((affiliate: any) => {
			return {
				'Promo Code': toCapitalize(affiliate.public_code.promo_code),
				Uses: orders.filter((order: any) => {
					return (
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					);
				}).length,
				Revenue: ` $${orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`,
				Earned: `$${affiliate.promoter
					? orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
							.toFixed(2)
					: orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
							.toFixed(2)}`
			};
		});

		const sorted_total_rows = total_rows.sort(
			(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
		);
		await sheet.addRows(removeDuplicates(sorted_total_rows, 'Promo Code'));
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const months = [
			'December',
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November'
		];
		const date = new Date();
		const month = date.getMonth();
		const year = date.getFullYear();
		console.log({ month: months[month], year });

		const newSheet = await doc.addSheet({
			title: `${months[month]} ${year} Affiliate Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);
		const sorted_last_months_rows = last_months_rows.sort(
			(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
		);
		await newSheet.addRows(removeDuplicates(sorted_last_months_rows, 'Promo Code'));
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const promoter_revenue_upload = async (affiliates: any, orders: any, last_months_orders: any) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1vy1OKH0P96cDkjuq-_yBT56CA1yQRMY3XZ2kgN95Spg');

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
		await sheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);

		// const { data: last_months_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		// const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		// const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		// console.log({ orders });

		// const affiliates_w_inkybois = [ ..affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const toCapitalize = (string: string) => {
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
		};

		const last_months_rows = calculate_affiliate_usage(
			affiliates.filter((affiliate: any) => affiliate.promoter).filter((affiliate: any) => affiliate.active),
			last_months_orders
		);
		const total_rows = calculate_affiliate_usage(
			affiliates.filter((affiliate: any) => affiliate.promoter).filter((affiliate: any) => affiliate.active),
			orders
		);

		console.log({ last_months_rows });
		console.log({ total_rows });

		await sheet.addRows(
			total_rows.sort(
				(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
			)
		);
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const months = [
			'December',
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November'
		];
		const date = new Date();
		const month = date.getMonth();
		const year = date.getFullYear();

		const newSheet = await doc.addSheet({
			title: `${months[month]} ${year} Promoter Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned', 'Percentage Off' ]);
		await newSheet.addRows(
			last_months_rows.sort(
				(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
			)
		);
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const sponsor_revenue_upload = async (affiliates: any, orders: any, last_months_orders: any) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1nxYhdgGqme0tSvOrYeb6oU9RIOLeA2aik3-K4H1dRpA');

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
		await sheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);

		// const { data: last_months_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		// const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		// const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		// console.log({ orders });

		// const affiliates_w_inkybois = [ ..affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const last_months_rows = calculate_sponsor_usage(
			affiliates.filter((affiliate: any) => affiliate.sponsor).filter((affiliate: any) => affiliate.active),
			last_months_orders
		);
		const total_rows = calculate_sponsor_usage(
			affiliates.filter((affiliate: any) => affiliate.sponsor).filter((affiliate: any) => affiliate.active),
			orders
		);

		console.log({ last_months_rows });
		console.log({ total_rows });

		await sheet.addRows(
			total_rows.sort(
				(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
			)
		);
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const months = [
			'December',
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November'
		];
		const date = new Date();
		const month = date.getMonth();
		const year = date.getFullYear();

		const newSheet = await doc.addSheet({
			title: `${months[month]} ${year} Sponsor Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned', 'Percentage Off' ]);
		await newSheet.addRows(
			last_months_rows.sort(
				(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
			)
		);
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const team_revenue_upload = async (teams: any, orders: any, last_months_orders: any) => {
	google_sheets_json.private_key = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;

	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1OmtRqSVEBCZCamz1qPceXW8CPfuwvWwGxIiu1YzMtMI');

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
		await sheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Team Earned', 'Individual Earned' ]);

		// const { data: last_months_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		// const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		// const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		// const { data: teams } = await axios.get('https://www.glow-leds.com/api/teams');
		// console.log({ orders });
		console.log({ teams });

		// const affiliates_w_inkybois = [ ..affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const toCapitalize = (string: string) => {
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
		};

		const last_months_rows = teams.map((team: any) => {
			return {
				'Promo Code': toCapitalize(team.public_code.promo_code),
				Uses: last_months_orders.filter((order: any) => {
					return (
						order.promo_code && order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					);
				}).length,
				Revenue: ` $${last_months_orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`,
				'Team Earned': `$${last_months_orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
					.toFixed(2)}`,
				'Individual Earned': `$${(last_months_orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0) /
					team.affiliates.length).toFixed(2)}`
			};
		});
		const total_rows = teams.map((team: any) => {
			return {
				'Promo Code': toCapitalize(team.public_code.promo_code),
				Uses: orders.filter((order: any) => {
					return (
						order.promo_code && order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					);
				}).length,
				Revenue: ` $${orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`,
				'Team Earned': `$${orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
					.toFixed(2)}`,
				'Individual Earned': `$${(orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0) /
					team.affiliates.length).toFixed(2)}`
			};
		});
		console.log({ last_months_rows });
		console.log({ total_rows });

		await sheet.addRows(
			total_rows.sort(
				(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
			)
		);
		await sheet.saveUpdatedCells();
		// adding / removing sheets

		const months = [
			'December',
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November'
		];
		const date = new Date();
		const month = date.getMonth();
		const year = date.getFullYear();

		const newSheet = await doc.addSheet({
			title: `${months[month]} ${year} Team Revenue`
		});
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Team Earned', 'Individual Earned' ]);
		await newSheet.addRows(
			last_months_rows.sort(
				(a: any, b: any) => (parseInt(a.Revenue.substring(2)) > parseInt(b.Revenue.substring(2)) ? -1 : 1)
			)
		);
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

		const new_rows = products
			.filter((product: any) => !product.hidden)
			.filter((product: any) => product.category !== 'options')
			.map((product: any, i: number) => {
				const id = product._id;
				const title = product.name;
				const description = product.description;
				const availability = 'In Stock';
				const condition = 'New';
				const price = `${product.price} USD`;
				const link = `https://www.glow-leds.com/collections/products/${product.category}/${product.subcategory}/${product.pathname}`;
				const image_link = product.images[0];
				const additional_image_link = product.images[1];
				const brand = 'Glow LEDs';
				const inventory = product.countInStock;
				const fb_product_category = 'toys & games > electronic toys';
				const google_product_category = 'Toys & Games > Toys > Visual Toys';
				const sale_price = product.sale_price;
				const sale_price_effective_date = product.sale_price_effective_date;
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

		const new_rows = products.filter((product: any) => !product.hidden).map((product: any, i: number) => {
			const id = product._id;
			const title = product.name;
			const description = product.description;
			const availability = 'In Stock';
			const condition = 'New';
			const price = product.price + ' USD';
			const link = `https://www.glow-leds.com/collections/products/${product.category}/${product.subcategory}/${product.pathname}`;
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
