import axios from 'axios';

// import dotenv from 'dotenv';
// dotenv.config();
const google_sheets_json = require('./glow-leds-0e697a43198d.json');

const unformatted_date = new Date();
// const day = date.getDay();
const day = unformatted_date.toString().slice(8, 10);

const day_num = parseInt(day);

console.log({ day_num });

export const promoter_revenue_upload = async () => {
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

		const { data: last_month_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		// console.log({ orders });
		console.log({ affiliates });

		// const affiliates_w_inkybois = [ ...affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const toCapitlize = (string: string) => {
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
		};

		const last_months_rows = affiliates.filter((affiliate: any) => affiliate.promoter).map((affiliate: any) => {
			return {
				'Promo Code': toCapitlize(affiliate.public_code.promo_code),
				Uses: last_month_orders.filter((order: any) => {
					return (
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					);
				}).length,
				Revenue: ` $${last_month_orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`,
				Earned: `$${affiliate.promoter
					? last_month_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
							.toFixed(2)
					: last_month_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
							.toFixed(2)}`
			};
		});
		const total_rows = affiliates.filter((affiliate: any) => affiliate.promoter).map((affiliate: any) => {
			return {
				'Promo Code': toCapitlize(affiliate.public_code.promo_code),
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
		console.log({ last_months_rows });
		console.log({ total_rows });

		await sheet.addRows(total_rows);
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
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);
		await newSheet.addRows(last_months_rows);
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const sponsor_revenue_upload = async () => {
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

		const { data: last_month_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		// console.log({ orders });
		console.log({ affiliates });

		// const affiliates_w_inkybois = [ ...affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const toCapitlize = (string: string) => {
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
		};

		const last_months_rows = affiliates.filter((affiliate: any) => affiliate.sponsor).map((affiliate: any) => {
			return {
				'Promo Code': toCapitlize(affiliate.public_code.promo_code),
				Uses: last_month_orders.filter((order: any) => {
					return (
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					);
				}).length,
				Revenue: ` $${last_month_orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`,
				Earned: `$${affiliate.sponsor
					? last_month_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
							.toFixed(2)
					: last_month_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
							.toFixed(2)}`
			};
		});
		const total_rows = affiliates.filter((affiliate: any) => affiliate.sponsor).map((affiliate: any) => {
			return {
				'Promo Code': toCapitlize(affiliate.public_code.promo_code),
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
				Earned: `$${affiliate.sponsor
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
		console.log({ last_months_rows });
		console.log({ total_rows });

		await sheet.addRows(total_rows);
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
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);
		await newSheet.addRows(last_months_rows);
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

export const team_revenue_upload = async () => {
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
		await sheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);

		const { data: last_month_orders } = await axios.get('https://www.glow-leds.com/api/orders/last_months_orders');
		const { data: orders } = await axios.get('https://www.glow-leds.com/api/orders/total_orders');
		const { data: affiliates } = await axios.get('https://www.glow-leds.com/api/affiliates');
		const { data: teams } = await axios.get('https://www.glow-leds.com/api/teams');
		// console.log({ orders });
		console.log({ affiliates });

		// const affiliates_w_inkybois = [ ...affiliates, { public_code: { promo_code: 'inkybois' } } ];

		const toCapitlize = (string: string) => {
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
		};

		const last_months_rows = teams.map((team: any) => {
			return {
				'Promo Code': toCapitlize(team.public_code.promo_code),
				Uses: last_month_orders.filter((order: any) => {
					return (
						order.promo_code && order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					);
				}).length,
				Revenue: ` $${last_month_orders
					.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
					)
					.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
					.toFixed(2)}`,
				Earned: `$${team.promoter
					? last_month_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
							.toFixed(2)
					: last_month_orders
							.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === team.public_code.promo_code.toLowerCase()
							)
							.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
							.toFixed(2)}`
			};
		});
		const total_rows = affiliates.filter((affiliate: any) => affiliate.promoter).map((affiliate: any) => {
			return {
				'Promo Code': toCapitlize(affiliate.public_code.promo_code),
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
		console.log({ last_months_rows });
		console.log({ total_rows });

		await sheet.addRows(total_rows);
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
		await newSheet.setHeaderRow([ 'Promo Code', 'Uses', 'Revenue', 'Earned' ]);
		await newSheet.addRows(last_months_rows);
		await newSheet.saveUpdatedCells();
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};
