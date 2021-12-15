import { expense_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_expenses_s: async (query: any) => {
		try {
			const search = query.search
				? {
						expense_name: {
							$regex: query.search,
							$options: 'i'
						}
					}
				: {};
			const filter = determine_filter(query, search);
			const sort_query = query.sort && query.sort.toLowerCase();
			let sort: any = { date_of_purchase: -1 };
			if (sort_query === 'lowest') {
				sort = { amount: 1 };
			} else if (sort_query === 'highest') {
				sort = { amount: -1 };
			} else if (sort_query === 'newest') {
				sort = { _id: -1 };
			} else if (sort_query === 'date') {
				sort = { date_of_purchase: -1 };
			} else if (sort_query === 'category') {
				sort = { category: 1, createdAt: -1 };
			} else if (sort_query === 'application') {
				sort = { application: 1, createdAt: -1 };
			}

			return await expense_db.findAll_expenses_db(filter, sort);
		} catch (error) {
			console.log({ findAll_expenses_s_error: error });
			throw new Error(error.message);
		}
	},
	findAllByDate_expenses_s: async (body: any) => {
		try {
			const filter = {
				deleted: false,
				date_of_purchase: {
					$gte: new Date(body.date_1),
					$lt: new Date(body.date_2)
				}
			};
			const sort = { date_of_purchase: 1 };

			return await expense_db.findAll_expenses_db(filter, sort);
		} catch (error) {
			console.log({ findAll_expenses_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_expenses_s: async (params: any) => {
		try {
			return await expense_db.findById_expenses_db(params.id);
		} catch (error) {
			console.log({ findById_expenses_s_error: error });
			throw new Error(error.message);
		}
	},
	create_expenses_s: async (body: any) => {
		try {
			return await expense_db.create_expenses_db(body);
		} catch (error) {
			console.log({ create_expenses_s_error: error });
			throw new Error(error.message);
		}
	},
	create_all_expenses_s: async (body: any) => {
		try {
			const determine_category = (place_of_purchase: string) => {
				if (
					place_of_purchase.includes('AMAZON') ||
					place_of_purchase.includes('Amazon') ||
					place_of_purchase.includes('AMZN')
				) {
					return 'Supplies';
				} else if (place_of_purchase.includes('PIRATE SHIP')) {
					return 'Shipping';
				} else if (place_of_purchase.includes('DOLLARTREE')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('THE HOME DEPOT')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('GLOW-LEDS')) {
					return 'Business';
				} else if (place_of_purchase.includes('THROWLIGHTS') || place_of_purchase.includes('Throwlights')) {
					return 'Equipment';
				} else if (place_of_purchase.includes('GOOGLE') || place_of_purchase.includes('Google')) {
					return 'Website';
				} else if (place_of_purchase.includes('PRUSA') || place_of_purchase.includes('Prusa')) {
					return 'Equipment';
				} else if (place_of_purchase.includes('EMAZINGLIGHTS')) {
					return 'Equipment';
				} else if (place_of_purchase.includes('HOBBY') || place_of_purchase.includes('Hobby')) {
					return 'Equipment';
				} else if (place_of_purchase.includes('DIGI KEY') || place_of_purchase.includes('Digi key')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('EASYPOST') || place_of_purchase.includes('Easypost')) {
					return 'Shipping';
				} else if (place_of_purchase.includes('PAYPAL') || place_of_purchase.includes('PayPal')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('HEROKU') || place_of_purchase.includes('Heroku')) {
					return 'Website';
				} else if (place_of_purchase.includes('ALIBABA') || place_of_purchase.includes('Alibaba')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('PAK') || place_of_purchase.includes('Pak')) {
					return 'Shipping';
				} else if (
					place_of_purchase.includes('KANDEKREATIONS') ||
					place_of_purchase.includes('Kandekreations')
				) {
					return 'Supplies';
				} else if (place_of_purchase.includes('FUTURISTIC') || place_of_purchase.includes('Futuristic')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('LEDGLOVES') || place_of_purchase.includes('LEDGloves')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('EMAZING') || place_of_purchase.includes('Emazing')) {
					return 'Supplies';
				} else if (place_of_purchase.includes('SPEC') || place_of_purchase.includes('Spec')) {
					return 'Entertainment';
				} else {
					return 'Not Categorized';
				}
			};
			const determine_place = (place_of_purchase: string) => {
				if (
					place_of_purchase.includes('AMAZON') ||
					place_of_purchase.includes('Amazon') ||
					place_of_purchase.includes('AMZN')
				) {
					return 'Amazon';
				} else if (place_of_purchase.includes('PIRATE SHIP')) {
					return 'Pirate Ship';
				} else if (place_of_purchase.includes('DOLLARTREE')) {
					return 'DollarTree';
				} else if (place_of_purchase.includes('THE HOME DEPOT')) {
					return 'The Home Depot';
				} else if (place_of_purchase.includes('GLOW-LEDS')) {
					return 'Glow LEDs';
				} else if (place_of_purchase.includes('THROWLIGHTS') || place_of_purchase.includes('Throwlights')) {
					return 'Throwlights';
				} else if (place_of_purchase.includes('PRUSA') || place_of_purchase.includes('Prusa')) {
					return 'Prusa';
				} else if (place_of_purchase.includes('EMAZINGLIGHTS')) {
					return 'Emazinglights';
				} else if (place_of_purchase.includes('GOOGLE') || place_of_purchase.includes('Google')) {
					return 'Google';
				} else if (place_of_purchase.includes('HOBBY') || place_of_purchase.includes('Hobby')) {
					return 'Hobby Lobby';
				} else if (place_of_purchase.includes('DIGI KEY') || place_of_purchase.includes('Digi key')) {
					return 'Digi Key';
				} else if (place_of_purchase.includes('EASYPOST') || place_of_purchase.includes('Easypost')) {
					return 'EasyPost';
				} else if (place_of_purchase.includes('PAYPAL') || place_of_purchase.includes('PayPal')) {
					return 'PayPal';
				} else if (place_of_purchase.includes('HEROKU') || place_of_purchase.includes('Heroku')) {
					return 'Heroku';
				} else if (place_of_purchase.includes('ALIBABA') || place_of_purchase.includes('Alibaba')) {
					return 'Alibaba';
				} else if (place_of_purchase.includes('PAK') || place_of_purchase.includes('Pak')) {
					return 'PAK Mail';
				} else if (
					place_of_purchase.includes('KANDEKREATIONS') ||
					place_of_purchase.includes('Kandekreations')
				) {
					return 'Kandekreations';
				} else if (place_of_purchase.includes('FUTURISTIC') || place_of_purchase.includes('Futuristic')) {
					return 'Futuristic';
				} else if (place_of_purchase.includes('LEDGLOVES') || place_of_purchase.includes('LEDGloves')) {
					return 'LEDGloves';
				} else if (place_of_purchase.includes('EMAZING') || place_of_purchase.includes('Emazing')) {
					return 'EmazingLights';
				} else if (place_of_purchase.includes('SPEC') || place_of_purchase.includes('Spec')) {
					return "Spec's";
				} else {
					return '';
				}
			};
			const determine_application = (place_of_purchase: string) => {
				if (place_of_purchase.includes('PIRATE SHIP')) {
					return 'Shipping';
				} else if (
					place_of_purchase.includes('AMAZON') ||
					place_of_purchase.includes('Amazon') ||
					place_of_purchase.includes('AMZN')
				) {
					return 'Products';
				} else if (place_of_purchase.includes('THE HOME DEPOT')) {
					return 'Tools';
				} else if (place_of_purchase.includes('GLOW-LEDS')) {
					return 'Test Purchases';
				} else if (place_of_purchase.includes('PRUSA') || place_of_purchase.includes('Prusa')) {
					return 'Tools';
				} else if (place_of_purchase.includes('DOLLARTREE')) {
					return 'Shipping';
				} else if (place_of_purchase.includes('EMAZINGLIGHTS')) {
					return 'Tools';
				} else if (place_of_purchase.includes('THROWLIGHTS') || place_of_purchase.includes('Throwlights')) {
					return 'Accessories';
				} else if (place_of_purchase.includes('GOOGLE') || place_of_purchase.includes('Google')) {
					return 'Website';
				} else if (place_of_purchase.includes('HOBBY') || place_of_purchase.includes('Hobby')) {
					return 'Tools';
				} else if (place_of_purchase.includes('DIGI KEY') || place_of_purchase.includes('Digi key')) {
					return 'Products';
				} else if (place_of_purchase.includes('EASYPOST') || place_of_purchase.includes('Easypost')) {
					return 'Shipping';
				} else if (place_of_purchase.includes('PAYPAL') || place_of_purchase.includes('PayPal')) {
					return 'Products';
				} else if (place_of_purchase.includes('HEROKU') || place_of_purchase.includes('Heroku')) {
					return 'Website';
				} else if (place_of_purchase.includes('ALIBABA') || place_of_purchase.includes('Alibaba')) {
					return 'Products';
				} else if (place_of_purchase.includes('PAK') || place_of_purchase.includes('Pak')) {
					return 'Shipping';
				} else if (
					place_of_purchase.includes('KANDEKREATIONS') ||
					place_of_purchase.includes('Kandekreations')
				) {
					return 'Tools';
				} else if (place_of_purchase.includes('FUTURISTIC') || place_of_purchase.includes('Futuristic')) {
					return 'Tools';
				} else if (place_of_purchase.includes('LEDGLOVES') || place_of_purchase.includes('LEDGloves')) {
					return 'Tools';
				} else if (place_of_purchase.includes('EMAZING') || place_of_purchase.includes('Emazing')) {
					return 'Tools';
				} else if (place_of_purchase.includes('SPEC') || place_of_purchase.includes('Spec')) {
					return 'Entertainment';
				} else {
					return '';
				}
			};

			const expense = {
				date_of_purchase: body.expense.date,
				expense_name: body.expense.place,
				place_of_purchase: determine_place(body.expense.place),
				card: body.card,
				application: determine_application(body.expense.place),
				category: determine_category(body.expense.place),
				amount:
					body.card === 'GL AMEX'
						? Math.abs(parseFloat(body.expense.amount)) * -1
						: parseFloat(body.expense.amount)
			};

			return await expense_db.create_expenses_db(expense);
		} catch (error) {
			console.log({ create_all_expenses_s_error: error });
			throw new Error(error.message);
		}
	},
	update_expenses_s: async (params: any, body: any) => {
		try {
			return await expense_db.update_expenses_db(params.id, body);
		} catch (error) {
			console.log({ update_expenses_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_expenses_s: async (params: any) => {
		try {
			return await expense_db.remove_expenses_db(params.id);
		} catch (error) {
			console.log({ remove_expenses_s_error: error });
			throw new Error(error.message);
		}
	}
};
