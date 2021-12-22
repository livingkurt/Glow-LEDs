import { affiliate_db, expense_db, order_db, user_db } from '../db';
import { dates_in_year, month_dates, toCapitalize } from '../util';
const scraper = require('table-scraper');

const today = new Date();

export default {
	findAll_orders_s: async (query: any) => {
		try {
			const page: any = query.page ? query.page : 1;
			const limit: any = query.limit ? query.limit : 10;
			let search = {};
			if (query.search && query.search.match(/^[0-9a-fA-F]{24}$/)) {
				search = query.search ? { _id: query.search } : {};
			} else {
				search = query.search
					? {
							$expr: {
								$regexMatch: {
									input: { $concat: [ '$shipping.first_name', ' ', '$shipping.last_name' ] },
									regex: query.search,
									options: 'i'
								}
							}
						}
					: {};
			}
			const sort_query = query.sort && query.sort.toLowerCase();
			let sort: any = { createdAt: -1 };
			let filter: any = { deleted: false };
			if (sort_query === 'lowest') {
				sort = { totalPrice: 1 };
			} else if (sort_query === 'highest') {
				sort = { totalPrice: -1 };
			} else if (sort_query === 'date') {
				sort = { createdAt: -1 };
			} else if (sort_query === 'paid') {
				filter = {
					deleted: false,
					isPaid: true,
					isManufactured: false,
					isPackaged: false,
					isShipped: false,
					isDelivered: false
				};
			} else if (sort_query === 'manufactured') {
				filter = {
					deleted: false,
					isPaid: true,
					isManufactured: true,
					isPackaged: false,
					isShipped: false,
					isDelivered: false
				};
			} else if (sort_query === 'packaged') {
				filter = {
					deleted: false,
					isPaid: true,
					isManufactured: true,
					isPackaged: true,
					isShipped: false,
					isDelivered: false
				};
			} else if (sort_query === 'shipped') {
				filter = {
					deleted: false,
					isPaid: true,
					isManufactured: true,
					isPackaged: true,
					isShipped: true,
					isDelivered: false
				};
			} else if (sort_query === 'delivered') {
				filter = {
					deleted: false,
					isPaid: true,
					isManufactured: true,
					isPackaged: true,
					isShipped: true,
					isDelivered: true
				};
			}
			const orders = await order_db.findAll_orders_db(
				{ ...filter, ...search },
				sort,
				parseInt(limit),
				parseInt(page)
			);
			const count = await order_db.count_orders_db({ ...filter, ...search });
			// const count = await Product.countDocuments(filter);
			return {
				orders,
				totalPages: Math.ceil(count / limit),
				currentPage: parseInt(page)
			};
		} catch (error) {
			console.log({ findAll_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	findMy_orders_s: async (params: any) => {
		try {
			const sort = { _id: -1 };
			const filter = { deleted: false, user: params.id };
			const limit = 0;
			const page = 1;
			return await order_db.findAll_orders_db(filter, sort, limit, page);
		} catch (error) {
			console.log({ findById_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_orders_s: async (params: any) => {
		try {
			return await order_db.findById_orders_db(params.id);
		} catch (error) {
			console.log({ findById_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	create_orders_s: async (body: any) => {
		try {
			return await order_db.create_orders_db(body);
		} catch (error) {
			console.log({ create_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	update_orders_s: async (params: any, body: any) => {
		try {
			return await order_db.update_orders_db(params.id, body);
		} catch (error) {
			console.log({ update_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_orders_s: async (params: any) => {
		try {
			return await order_db.remove_orders_db(params.id);
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	occurrences_orders_s: async (params: any) => {
		try {
			const sort = {};
			const filter = { deleted: false, user: params._id };
			const limit = 50;
			const page = 1;
			const orders = await order_db.findAll_orders_db(filter, sort, limit, page);
			const products: any = [];
			const ids: any = [];
			orders.forEach((order: any) => {
				order.orderItems.map((item: any) => {
					products.push(item.name);
					ids.push(item.product);
					if (item.secondary_product) {
						products.push(item.secondary_product.name);
						ids.push(item.secondary_product._id);
					}
				});
			});
			// // console.log({ ids });
			const result: any = {};
			const ids_result: any = {};
			for (let i = 0; i < products.length; ++i) {
				if (!result[products[i]]) {
					result[products[i]] = 0;
					ids_result[ids[i]] = 0;
				}
				++result[products[i]];
				++ids_result[ids[i]];
			}
			// // console.log({ ids_result });
			const final_result = [];
			for (const i in result) {
				const entry = { name: i, occurrence: result[i], id: ids_result[i] };
				final_result.push(entry);
			}
			final_result.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1));
			return final_result;
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	top_customers_orders_s: async (params: any) => {
		try {
			const users = await user_db.findAll_users_db({ deleted: false }, { _id: -1 });
			const orders = await Promise.all(
				users.map(async (user: any) => {
					const orders = await order_db.findAll_orders_db({ deleted: false, user: user._id }, { _id: -1 });
					const amount = orders.reduce(
						(total: any, c: any) => parseFloat(total) + parseFloat(c.totalPrice),
						0
					);
					return { user: user, number_of_orders: orders.length, amount: amount };
				})
			);
			const sorted_orders = orders
				.map((order: any) => {
					return { user: order.user, number_of_orders: order.number_of_orders, amount: order.amount };
				})
				.sort((a: any, b: any) => (a.amount > b.amount ? -1 : 1))
				.slice(0, 20);
			return sorted_orders;
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	category_occurrences_orders_s: async (params: any) => {
		try {
			const sort = {};
			const filter = { deleted: false, user: params._id };
			const limit = 50;
			const page = 1;
			const orders = await order_db.findAll_orders_db(filter, sort, limit, page);
			const products: any = [];
			const ids: any = [];
			orders.forEach((order: any) => {
				order.orderItems.map((item: any) => {
					products.push(item.category);
					ids.push(item._id);
					if (item.secondary_product) {
						products.push(item.secondary_product.category);
						ids.push(item.secondary_product._id);
					}
				});
			});
			// // console.log({ ids });
			const result: any = {};
			const ids_result: any = {};
			for (let i = 0; i < products.length; ++i) {
				if (!result[products[i]]) {
					result[products[i]] = 0;
					ids_result[ids[i]] = 0;
				}
				++result[products[i]];
				++ids_result[ids[i]];
			}
			// // console.log({ ids_result });
			const final_result = [];
			for (const i in result) {
				const entry = { category: i, occurrence: result[i], id: ids_result[i] };
				final_result.push(entry);
			}
			final_result.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1));
			return final_result;
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	code_usage_orders_s: async (params: any, body: any) => {
		try {
			const sort = {};
			const filter = { deleted: false, user: params._id, isPaid: true };
			const limit = 0;
			const page = 1;
			const orders = await order_db.findAll_orders_db(filter, sort, limit, page);
			const number_of_uses = orders
				.filter((order: any) => order.promo_code)
				.filter((order: any) => order.promo_code.toLowerCase() === body.promo_code.toLowerCase()).length;
			const revenue = orders
				.filter((order: any) => order.promo_code)
				.filter((order: any) => order.promo_code.toLowerCase() === body.promo_code.toLowerCase())
				.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
				.toFixed(2);

			// console.log({ number_of_uses, revenue });
			return { number_of_uses, revenue };
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	tax_rates_orders_s: async () => {
		try {
			const updatedSalesTaxes = 'http://www.salestaxinstitute.com/resources/rates';
			const result: any = {};

			const tableData = await scraper.get(updatedSalesTaxes);

			const tempData = tableData[0];
			tempData.map((state: any) => {
				const percentage = state['State Rate'];
				result[state['State']] = percentage.slice(0, percentage.indexOf('%') + 1);
			});
			return result;
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	promo_code_usage_orders_s: async (params: any) => {
		try {
			const affiliates = await affiliate_db.findAll_affiliates_db({ deleted: false, active: true }, {});
			const sort = {};
			let filter = {};
			if (params.days === 0) {
				filter = { deleted: false, isPaid: true };
			} else {
				filter = {
					deleted: false,
					createdAt: {
						$gte: new Date(<any>new Date() - params.days * 60 * 60 * 24 * 1000)
					}
				};
			}
			const limit = 0;
			const page = 1;
			const orders = await order_db.findAll_orders_db(filter, sort, limit, page);
			const affiliates_w_inkybois = [ ...affiliates, { promo_code: 'inkybois' } ];
			const rows = affiliates_w_inkybois.map((affiliate: any) => {
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
					Earned: `${affiliate.promoter
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
			return rows;
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	each_day_income_orders_s: async (params: any) => {
		try {
			const date = params.date;

			const sort = {};
			const filter = {
				deleted: false,
				createdAt: {
					$gt: new Date(<any>new Date(date).setHours(0, 0, 0)),
					$lt: new Date(<any>new Date(date).setHours(23, 59, 59))
				}
			};
			const limit = 50;
			const page = 1;
			return await order_db.findAll_orders_db(filter, sort, limit, page);
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	each_month_income_orders_s: async (params: any) => {
		try {
			const start_date = params.date;
			const year = start_date.split('-')[0];
			const month = start_date.split('-')[1];
			const day = dates_in_year[parseInt(start_date.split('-')[1]) - 1].number_of_days;
			const end_date = year + '-' + month + '-' + day;
			const sort = {};
			const filter = {
				deleted: false,
				createdAt: {
					$gt: new Date(<any>new Date(start_date).setHours(0, 0, 0) - 30 * 60 * 60 * 24 * 1000),
					$lt: new Date(<any>new Date(end_date).setHours(23, 59, 59))
				}
			};
			const limit = 50;
			const page = 1;
			return await order_db.findAll_orders_db(filter, sort, limit, page);
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	previous_income_orders_s: async (params: any) => {
		try {
			const sort = {};
			const filter = {
				deleted: false,
				createdAt: {
					$gte: new Date(<any>new Date() - params.days * 60 * 60 * 24 * 1000)
				}
			};
			const limit = 50;
			const page = 1;
			return await order_db.findAll_orders_db(filter, sort, limit, page);
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	specific_time_income_orders_s: async (body: any) => {
		try {
			const sort = {};
			const filter = {
				deleted: false,
				createdAt: {
					$gte: new Date(body.date_1),
					$lt: new Date(body.date_2)
				}
			};
			const limit = 50;
			const page = 1;
			return await order_db.findAll_orders_db(filter, sort, limit, page);
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	mark_as_shipped_orders_s: async (body: any) => {
		try {
			const sort = {};
			const filter = {
				deleted: false,
				isManufactured: true,
				isPackaged: true,
				isShipped: false,
				isDelivered: false
			};
			const limit = 0;
			const page = 1;
			return await order_db.findAll_orders_db(filter, sort, limit, page);
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	},
	income_orders_s: async (params: any) => {
		// const { month, year } = params;
		console.log({ params });
		let start_date = params.year + '-01-01';
		let end_date = params.year + '-12-31';
		if (params.month) {
			start_date = month_dates(params.month, params.year).start_date;
			end_date = month_dates(params.month, params.year).end_date;
		}
		try {
			const sort = {};
			const o_filter = {
				deleted: false,
				isPaid: true,
				createdAt: {
					$gte: new Date(start_date),
					$lte: new Date(end_date)
				}
			};
			const e_filter = {
				deleted: false,
				date_of_purchase: {
					$gte: new Date(start_date),
					$lte: new Date(end_date)
				}
			};
			const limit = 0;
			const page = 1;
			const orders_data = await order_db.findAll_orders_db(o_filter, sort, limit, page);
			const expenses_data = await expense_db.findAll_expenses_db(e_filter, sort);
			const income = orders_data.reduce(
				(a: any, c: any) =>
					a +
					c.totalPrice -
					c.taxPrice -
					(c.refundAmmount ? c.refundAmmount.reduce((a: any, c: any) => a + c, 0) / 100 : 0),
				0
			);
			const expenses = expenses_data.reduce((a: any, c: any) => a + c.amount, 0);
			// console.log({ income, expenses, profit: income + expenses });
			const batt_1620 = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.name === 'Bulk CR1620 Batteries');
			const batt_1616 = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.name === 'Bulk CR1616 Batteries');
			const batt_1225 = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.name === 'Bulk CR1225 Batteries');
			const batt_1620_options = batt_1620
				.filter((item: any) => item.product_option)
				.reduce((a: any, c: any) => a + c.product_option.size, 0);
			const batt_1616_options = batt_1616
				.filter((item: any) => item.product_option)
				.reduce((a: any, c: any) => a + c.product_option.size, 0);
			const batt_1225_options = batt_1225
				.filter((item: any) => item.product_option)
				.reduce((a: any, c: any) => a + c.product_option.size, 0);
			const batt_1620_size = batt_1620
				.filter((item: any) => item.size > 0)
				.reduce((a: any, c: any) => parseInt(a) + parseInt(c.size), 0);
			const batt_1616_size = batt_1616
				.filter((item: any) => item.size > 0)
				.reduce((a: any, c: any) => parseInt(a) + parseInt(c.size), 0);
			const batt_1225_size = batt_1225
				.filter((item: any) => item.size > 0)
				.reduce((a: any, c: any) => parseInt(a) + parseInt(c.size), 0);
			const batt_1620_options_total = batt_1620
				.filter((item: any) => item.product_option)
				.reduce((a: any, c: any) => a + c.product_option.price, 0);
			const batt_1616_options_total = batt_1616
				.filter((item: any) => item.product_option)
				.reduce((a: any, c: any) => a + c.product_option.price, 0);
			const batt_1225_options_total = batt_1225
				.filter((item: any) => item.product_option)
				.reduce((a: any, c: any) => a + c.product_option.price, 0);
			const batt_1620_size_total = batt_1620
				.filter((item: any) => item.size > 0)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const batt_1616_size_total = batt_1616
				.filter((item: any) => item.size > 0)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const batt_1225_size_total = batt_1225
				.filter((item: any) => item.size > 0)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);

			const decals = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.category === 'decals');
			const decals_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.category === 'decals')
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const whites = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.subcategory === 'singles');
			const s_whites = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - S'
				);
			const m_whites = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - M'
				);
			const l_whites = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - L'
				);
			const xl_whites = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - XL'
				);
			const refresh = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.subcategory === 'refresh');
			const s_refresh = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - S'
				);
			const m_refresh = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - M'
				);
			const l_refresh = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - L'
				);
			const xl_refresh = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - XL'
				);
			const whites_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter((item: any) => item.category === 'whites')
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const s_whites_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - S'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const m_whites_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - M'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const l_whites_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - L'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const xl_whites_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'singles' && item.option_product_name === 'Supreme Gloves - XL'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const s_refresh_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - S'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const m_refresh_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - M'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const l_refresh_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - L'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const xl_refresh_total = orders_data
				.map((order: any) => order.orderItems)
				.flat(1)
				.filter(
					(item: any) => item.subcategory === 'refresh' && item.option_product_name === 'Supreme Gloves - XL'
				)
				.reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
			const breakdown = {
				macro_income: {
					income,
					expenses,
					profit: income + expenses
				},
				batteries: {
					batt_1620_qty_sold: batt_1620_options + batt_1620_size,
					batt_1616_qty_sold: batt_1616_options + batt_1616_size,
					batt_1225_qty_sold: batt_1225_options + batt_1225_size,
					batt_1620_total_income: batt_1620_options_total + batt_1620_size_total,
					batt_1616_total_income: batt_1616_options_total + batt_1616_size_total,
					batt_1225_total_income: batt_1225_options_total + batt_1225_size_total,
					batt_1620_total_expenses: -(batt_1620_options + batt_1620_size) * 0.0632,
					batt_1616_total_expenses: -(batt_1616_options + batt_1616_size) * 0.0632,
					batt_1225_total_expenses: -(batt_1225_options + batt_1225_size) * 0.0632,
					batt_1620_profit:
						batt_1620_options_total + batt_1620_size_total - (batt_1620_options + batt_1620_size) * 0.0632,
					batt_1616_profit:
						batt_1616_options_total + batt_1616_size_total - (batt_1616_options + batt_1616_size) * 0.0632,
					batt_1225_profit:
						batt_1225_options_total + batt_1225_size_total - (batt_1225_options + batt_1225_size) * 0.0632,

					refresh_qty_sold: refresh.length,
					total_qty_sold:
						batt_1620_options +
						batt_1620_size +
						batt_1616_options +
						batt_1616_size +
						batt_1225_options +
						batt_1225_size,
					total_expenses:
						-(
							batt_1620_options +
							batt_1620_size +
							batt_1616_options +
							batt_1616_size +
							batt_1225_options +
							batt_1225_size
						) * 0.0632,
					total_profit:
						batt_1620_options_total +
						batt_1620_size_total +
						batt_1616_options_total +
						batt_1616_size_total +
						batt_1225_options_total +
						batt_1225_size_total -
						(batt_1620_options +
							batt_1620_size +
							batt_1616_options +
							batt_1616_size +
							batt_1225_options +
							batt_1225_size) *
							0.0632,
					total_income:
						batt_1620_options_total +
						batt_1620_size_total +
						batt_1616_options_total +
						batt_1616_size_total +
						batt_1225_options_total +
						batt_1225_size_total
				},
				decals: { qty_sold: decals.length * 11, sets: decals.length, total_income: decals_total },
				whites: {
					singles_qty_sold: whites.length,
					s_qty_sold: s_whites.length + s_refresh.length * 6,
					m_qty_sold: m_whites.length + m_refresh.length * 6,
					l_qty_sold: l_whites.length + l_refresh.length * 6,
					xl_qty_sold: xl_whites.length + xl_refresh.length * 6,
					s_total_income: s_whites_total + s_refresh_total,
					m_total_income: m_whites_total + m_refresh_total,
					l_total_income: l_whites_total + l_refresh_total,
					xl_total_income: xl_whites_total + xl_refresh_total,
					s_total_expenses: -(s_whites.length + s_refresh.length * 6) * 0.7,
					m_total_expenses: -(m_whites.length + m_refresh.length * 6) * 0.7,
					l_total_expenses: -(l_whites.length + l_refresh.length * 6) * 0.7,
					xl_total_expenses: -(xl_whites.length + xl_refresh.length * 6) * 0.7,
					s_total_profit:
						(s_whites.length + s_refresh.length * 6) * 3.95 -
						(s_whites.length + s_refresh.length * 6) * 0.7,
					m_total_profit:
						(m_whites.length + m_refresh.length * 6) * 3.95 -
						(m_whites.length + m_refresh.length * 6) * 0.7,
					l_total_profit:
						(l_whites.length + l_refresh.length * 6) * 3.95 -
						(l_whites.length + l_refresh.length * 6) * 0.7,
					xl_total_profit:
						(xl_whites.length + xl_refresh.length * 6) * 3.95 -
						(xl_whites.length + xl_refresh.length * 6) * 0.7,
					refresh_qty_sold: refresh.length,
					total_expenses: -(whites.length + refresh.length * 6) * 0.7,
					total_profit: whites_total - (whites.length + refresh.length * 6) * 0.7,
					total_qty_sold: whites.length + refresh.length * 6,
					total_income: whites_total
				}
			};
			console.log({ yearly: breakdown });
			return breakdown;
		} catch (error) {
			console.log({ remove_orders_s_error: error });
			throw new Error(error.message);
		}
	}
};
