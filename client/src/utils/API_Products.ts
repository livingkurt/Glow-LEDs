import axios from 'axios';
import { create_query } from './helper_functions';

const product_routes = {
	findAll_products_a: (query: any) => {
		return axios.get('/api/products?' + create_query(query));
	},
	findById_products_a: (id: any) => {
		return axios.get('/api/products/' + id);
	},
	create_products_a: (body: any) => {
		return axios.post('/api/products', body);
	},
	get_all_categories: () => {
		return axios.get('/api/products/get_all_categories');
	},
	get_all_subcategories: () => {
		return axios.get('/api/products/get_all_subcategories');
	},
	update_product_order: (product: any, order: any) => {
		// console.log({ update_product_order: { product, order } });
		return axios.put('/api/products/update_product_order', { product, order });
	},
	update_stock: (cartItems: any) => {
		// console.log({ update_stock: { product_id, new_count_in_stock } });
		return axios.put('/api/products/update_stock', { cartItems });
	},
	get_occurrences: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/orders/occurrences');
	},
	get_category_occurrences: () => {
		console.log({ get_category_occurrences: 'Hello' });
		return axios.get('/api/orders/category_occurrences');
	},
	get_best_sellers: (occurences: any) => {
		// console.log({ not_paid_email: array });
		return axios.post('/api/products/best_sellers', { occurences });
	},
	save_item_group_id: (option: any, item_group: any) => {
		// console.log({ option, item_group });
		return axios.put('/api/products/save_item_group_id', { option, item_group });
	},
	get_essentials: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/essentials');
	},
	batch_request: (
		method: string,
		collection: string,
		search_parameter_field: string,
		search_parameter: string,
		action: string,
		property: string,
		value: string,
		user: any
	) => {
		return axios.put(
			'/api/all/' + collection,
			{
				method,
				collection,
				search_parameter_field,
				search_parameter,
				action,
				property,
				value
			},
			{
				headers: {
					Authorization: 'Bearer ' + user.access_token
				}
			}
		);
	},
	set_sale_price: (discount_percentage: any, sale_start_date: any, sale_end_date: any) => {
		console.log({ discount_percentage, sale_start_date, sale_end_date });
		return axios.put('/api/all/product_sale_price', { discount_percentage, sale_start_date, sale_end_date });
	},
	clear_sale: (sale_start_date: any, sale_end_date: any) => {
		return axios.put('/api/all/clear_sale', { sale_start_date, sale_end_date });
	}
};

export default product_routes;
