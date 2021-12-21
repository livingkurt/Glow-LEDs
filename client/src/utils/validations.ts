import isEmpty from 'is-empty';
// import Validator from 'validator';
import axios, { AxiosResponse } from 'axios';

interface errors {
	email: string;
	password: string;
}
export const validate_promo_code = (data: any) => {
	let errors: any = {};
	interface errors {
		promo_code: string;
	}
	const promo_codes = data.promos.map((promo: any) => promo.promo_code.toLowerCase());
	// console.log({ promo_codes });
	const promo = data.promos.find((promo: any) => promo.promo_code === data.promo_code.toLowerCase());

	// Convert empty fields to an empty string so we can use validator functions
	data.promo_code = !isEmpty(data.promo_code) ? data.promo_code : '';
	// Email checks
	if (isEmpty2(data.promo_code)) {
		errors.promo_code = 'Promo Code Field Empty';
	}
	if (data.userInfo) {
		if (promo && promo.admin_only && data.userInfo.isAdmin === false) {
			errors.promo_code = 'Promo Code Not Active';
		} else if (promo && promo.affiliate_only && data.userInfo.is_affiliated === false) {
			errors.promo_code = 'Promo Code Not Active';
		} else if (promo && promo.sponsor_only && data.userInfo.affiliate.sponsor === false) {
			errors.promo_code = 'Promo Code Not Active';
		}
	}
	if (!data.userInfo.hasOwnProperty('first_name')) {
		if (promo && promo.admin_only) {
			errors.promo_code = 'Promo Code Not Active';
		} else if (promo && promo.affiliate_only) {
			errors.promo_code = 'Promo Code Not Active';
		}
	}
	let included_deductions = 0;
	if (promo && promo.minimum_total) {
		if (promo.include) {
			included_deductions = promo.included_products.reduce((a: any, item: any) => a + item.price, 0);
			if (promo.minimum_total > data.items_price - included_deductions) {
				errors.promo_code = 'Minimum Order Total Not Met';
			}
		} else {
			if (promo.minimum_total > data.items_price) {
				errors.promo_code = 'Minimum Order Total Not Met';
			}
		}
	}
	// if (promo && promo.minimum_total && promo.minimum_total > data.items_price) {
	// 	errors.promo_code = 'Minimum Order Total Not Met';
	// }
	// errors.promo_code = 'Promo Code Not Active Start';
	if (promo && !promo.active) {
		errors.promo_code = 'Promo Code Not Active';
	}
	if (promo && promo.include) {
		console.log({ cartItems: data.cartItems });
		// console.log({ included_categories: promo.included_categories });
		// console.log({ included_products: promo.included_products });
		// const category_cart_items = data.cartItems.filter((item: any) =>
		// 	promo.included_categories.include(item.category)
		// );
		// console.log({ category_cart_items });
		let included_item_exists = false;
		data.cartItems.forEach((item: any) => {
			console.log({ item_pathname: item.pathname });
			return promo.included_products.forEach((included_product: any) => {
				console.log({ included_product_pathname: included_product.pathname });
				if (included_product.pathname === item.pathname) {
					included_item_exists = true;
				}
			});
		});
		// console.log({ product_cart_items });
		console.log({ included_item_exists });
		if (!included_item_exists) {
			errors.promo_code = 'Promo Code Not Active Not Included';
		}
	}

	if (promo && promo.single_use && promo.used_once) {
		// console.log({ single_use: promo.single_use, used_once: promo.used_once });
		errors.promo_code = 'Promo Code Not Active';
	}
	if (!promo_codes.includes(data.promo_code.toLowerCase())) {
		errors.promo_code = 'Promo Code Not Valid';
	}
	const today = new Date();

	if (promo && promo.time_limit) {
		console.log({ today, start_date: new Date(promo.start_date) });
		if (today > new Date(promo.end_date) || today < new Date(promo.start_date)) {
			// console.log('Today is Greater');
			errors.promo_code = 'Promo Code Not Active 7';
		}
		// else {
		// }
		// if (today < new Date(promo.start_date) && today > new Date(promo.end_date)) {
		// 	console.log('hello');
		// }
		// console.log('hello');
		// errors.promo_code = 'Promo Code Not Active';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_email = async (data: { email: any; password: any }) => {
	let errors: any = {};
	interface errors {
		email: string;
	}
	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : '';
	// Email checks
	const { data: user } = await axios.post('/api/users/validate_email/' + data.email);
	if (user) {
		errors.email = 'Email Already Registered';
	}
	if (isEmpty2(data.email)) {
		errors.email = 'Email field is required';
	} else if (!isEmail(data.email)) {
		errors.email = 'Valid email required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_login = (data: { email: any; password: any }) => {
	let errors: any = {};
	interface errors {
		email: string;
		password: string;
	}
	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	// Email checks
	if (isEmpty2(data.email)) {
		errors.email = 'Email field is required';
	} else if (!isEmail(data.email)) {
		errors.email = 'Valid email required';
	}
	// Password checks
	if (isEmpty2(data.password)) {
		errors.password = 'Password field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_registration = (data: {
	first_name: any;
	last_name: any;
	email: any;
	password: any;
	rePassword: any;
}) => {
	let errors: any = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';
	// First Name checks
	if (isEmpty2(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (isEmpty2(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (isEmpty2(data.email)) {
		errors.email = 'Email field is required';
	} else if (!isEmail(data.email)) {
		errors.email = 'Email must a valid email';
	}
	// else if (data.email === data.email.toLowerCase()) {
	// 	errors.email = 'Email must a not contain uppercase letters';
	// }
	// Password checks
	if (isEmpty2(data.password)) {
		errors.password = 'Password field is required';
	}
	if (isEmpty2(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!isEquals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_shipping = (data: {
	email: string;
	first_name: string;
	last_name: string;
	address_1: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	international: boolean;
}) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : '';
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.address_1 = !isEmpty(data.address_1) ? data.address_1 : '';
	data.city = !isEmpty(data.city) ? data.city : '';
	data.state = !isEmpty(data.state) ? data.state : '';
	data.postalCode = !isEmpty(data.postalCode) ? data.postalCode : '';
	data.country = !isEmpty(data.country) ? data.country : '';
	// data.international = !isEmpty2(data.international) ? data.international : '';
	console.log({ data });
	// Email Name checks
	if (data.hasOwnProperty('email')) {
		if (isEmpty2(data.email)) {
			errors.email = 'Email field is required';
		} else if (!isEmail(data.email)) {
			errors.email = 'Valid email required';
		}
	}
	console.log({ validate_shipping: data });
	// First Name checks
	if (isEmpty2(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (isEmpty2(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Address checks
	if (isEmpty2(data.address_1)) {
		errors.address_1 = 'Address field is required';
	}
	// City checks
	if (isEmpty2(data.city)) {
		errors.city = 'City field is required';
	}
	// State checks
	if (isEmpty2(data.state)) {
		errors.state = 'State field is required';
	}
	// // Postal Code checks
	// if (isEmpty2(data.postalCode)) {
	// 	errors.postalCode = 'Postal Code field is required';
	// }
	// if (!data.international) {
	// 	if (data.postalCode.toString().length < 5 || data.postalCode.toString().length > 5) {
	// 		errors.postalCode = 'Postal Code must a valid Postal Code';
	// 	}
	// }

	// // International checks
	// if (isEmpty2(data.international)) {
	// 	errors.international = 'Country field is required';
	// }
	if (data.international) {
		// Country checks
		if (isEmpty2(data.country)) {
			errors.country = 'Country field is required';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

const isEmpty2 = (str: string) => {
	return !str || str.length === 0;
};
const isEquals = (str_1: string, str_2: string) => {
	return str_1 === str_2;
};
const isLength = (str: string, length: { min: number; max: number }) => {
	if (str.length >= length.max && str.length <= length.min) {
		return false;
	} else {
		return true;
	}
};

const isEmail = (email: string) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	console.log({ re: re.test(String(email).toLowerCase()) });
	return re.test(String(email).toLowerCase());
};

export const validate_payment = (data: { paymentMethod: any }) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : '';
	// First Name checks
	if (isEmpty2(data.paymentMethod)) {
		errors.paymentMethod = 'Payment Method is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_contact = (data: {
	first_name: any;
	last_name: any;
	email: any;
	// order_number: any;
	reason_for_contact: any;
	message: any;
}) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	// data.order_number = !isEmpty(data.order_number) ? data.order_number : '';
	data.reason_for_contact = !isEmpty(data.reason_for_contact) ? data.reason_for_contact : '';
	data.message = !isEmpty(data.message) ? data.message : '';
	// First Name checks
	if (isEmpty2(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (isEmpty2(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (isEmpty2(data.email)) {
		errors.email = 'Email field is required';
	} else if (!isEmail(data.email)) {
		errors.email = 'Email must be a valid email';
	}
	// // Password checks
	// if (isEmpty2(data.order_number)) {
	// 	errors.order_number = 'Order Number field is required';
	// }
	if (isEmpty2(data.reason_for_contact)) {
		errors.reason_for_contact = 'Reason for Contact field is required';
	}
	if (isEmpty2(data.message)) {
		errors.message = 'Message field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_profile = (data: { first_name: any; last_name: any; email: any }) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	// First Name checks
	if (isEmpty2(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (isEmpty2(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (isEmpty2(data.email)) {
		errors.email = 'Email field is required';
	} else if (!isEmail(data.email)) {
		errors.email = 'Valid email required';
	}

	return {
		errors,
		isValid: !isEmpty2(errors)
	};
};

export const validate_password_change = async (data: {
	id: any;
	current_password: any;
	password: any;
	rePassword: any;
}) => {
	// console.log({ data })
	// console.log({ data: data.current_password })
	let errors: any = {};
	let request: AxiosResponse<any>;
	if (data.current_password) {
		try {
			request = await axios.post('/api/users/check_password/' + data.id, {
				current_password: data.current_password
			});
			console.log({ request: request });
			// Password checks
		} catch (error) {
			errors.current_password = 'Current Password is Incorrect';
		}
	}

	// Convert empty fields to an empty string so we can use validator functions
	data.current_password = !isEmpty(data.current_password) ? data.current_password : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';

	// // Password checks
	// if (!request.data) {
	// 	errors.current_password = 'Current Password is Incorrect';
	// }
	// Password checks
	if (isEmpty2(data.current_password)) {
		errors.current_password = 'Current Password field is required';
	}
	// Password checks
	if (isEmpty2(data.password)) {
		errors.password = 'Password field is required';
	}
	if (isEmpty2(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!isEquals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	console.log({ errors });
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_passwords = async (data: { id: any; password: any; rePassword: any }) => {
	// console.log({ data })
	// console.log({ data: data.current_password })
	let errors: any = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.password = !isEmpty(data.password) ? data.password : '';
	data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';

	// // Password checks
	// if (!request.data) {
	// 	errors.current_password = 'Current Password is Incorrect';
	// }
	// Password checks
	if (isEmpty2(data.password)) {
		errors.password = 'Password field is required';
	}
	if (isEmpty2(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!isEquals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_affiliate = (data: { artist_name: any; years: any }) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.artist_name = !isEmpty(data.artist_name) ? data.artist_name : '';
	data.years = !isEmpty(data.years) ? data.years : '';
	// data.international = !isEmpty(data.international) ? data.international : '';
	// First Name checks
	if (isEmpty2(data.artist_name)) {
		errors.artist_name = 'First Name field is required';
	}
	// Last Name checks
	if (isEmpty2(data.years)) {
		errors.instagram_handle = 'Last Name field is required';
	}
	// else if (data.years)
	// // International checks
	// if (Validator.isEmpty(data.international)) {
	// 	errors.international = 'Country field is required';
	// }

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
