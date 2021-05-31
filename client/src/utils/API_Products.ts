import axios from 'axios';

export default {
	get_category_images: (category: any) => {
		// console.log({ category });
		return axios.get('/api/products/get_images/' + category);
	},
	get_categories: () => {
		return axios.get('/api/products/get_categories');
	},
	get_product_options: (pathname: any) => {
		return axios.get('/api/products/get_options/' + pathname);
	},
	get_product: (pathname: any) => {
		return axios.get('/api/products/get_one/' + pathname);
	},
	// get_product_names: (array: any) => {
	// 	console.log({ not_paid_email: array });
	// 	return axios.post('/api/products/array', array);
	// },
	// save_product: (order: any, user_data: any, product: any) => {
	// 	console.log({ save_product: { order, user_data, product } });
	// 	return axios.put('/api/orders/addproduct', { order, user_data, product });
	// },
	update_product_order: (product: any, order: any) => {
		console.log({ update_product_order: { product, order } });
		return axios.put('/api/products/update_product_order', { product, order });
	},
	update_stock: (product_id: string, count_in_stock: number) => {
		console.log({ update_stock: { product_id, count_in_stock } });
		return axios.put('/api/products/update_stock', { product_id, count_in_stock });
	},
	update_pathname: (product_id: string, pathname: string, product: any) => {
		console.log({ update_pathname: { product_id, pathname } });
		return axios.put('/api/products/update_pathname', { product_id, pathname, product });
	},
	update_product_option_stock: (product_id: string, product_option: any, count_in_stock: number) => {
		console.log({ update_product_option_stock: { product_id, product_option, count_in_stock } });
		return axios.put('/api/products/update_product_option_stock', { product_id, product_option, count_in_stock });
	},
	// save_secondary_product: (order: any, user_data: any, secondary_product: any) => {
	// 	console.log({ save_secondary_product: { order, user_data, secondary_product } });
	// 	return axios.put('/api/orders/addsecondaryproduct', { order, user_data, secondary_product });
	// },
	get_original_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_caps');
	},
	get_mega_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_mega_caps');
	},
	get_occurrences: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/orders/occurrences');
	},
	get_all_products: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_all_products');
	},
	get_best_sellers: (occurences: any) => {
		// console.log({ not_paid_email: array });
		return axios.post('/api/products/get_best_sellers', { occurences });
	},
	get_essentials: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_essentials');
	},
	get_shown_products: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_shown');
	},

	// get_product_pictures: (category: string) => {
	// 	return axios.get('/api/products/category/' + category);
	// },
	get_product_pictures: (category: string, subcategory: string) => {
		return axios.get('/api/products/get_categories/' + category + '/subcategory/' + subcategory);
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
					Authorization: 'Bearer ' + user.token
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
