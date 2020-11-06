import axios from 'axios';

export default {
	get_category_images: (category: any) => {
		// console.log({ category });
		return axios.get('/api/products/images/' + category);
	},
	// get_product_names: (array: any) => {
	// 	console.log({ not_paid_email: array });
	// 	return axios.post('/api/products/array', array);
	// },
	save_product: (order: any, user_data: any, product: any) => {
		console.log({ save_product: { order, user_data, product } });
		return axios.put('/api/orders/addproduct', { order, user_data, product });
	},
	save_secondary_product: (order: any, user_data: any, secondary_product: any) => {
		console.log({ save_secondary_product: { order, user_data, secondary_product } });
		return axios.put('/api/orders/addsecondaryproduct', { order, user_data, secondary_product });
	},
	get_original_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/originalcaps');
	},
	get_mini_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/minicaps');
	},
	get_occurrences: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/orders/occurrences');
	}
};
