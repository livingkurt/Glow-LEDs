import isEmpty from 'is-empty';
import Validator from 'validator';
import axios, { AxiosResponse } from 'axios';

interface errors {
	email: string;
	password: string;
}

export const humanize = (str: string) => {
	var i,
		frags = str.split('_');
	for (i = 0; i < frags.length; i++) {
		frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	}
	return frags.join(' ');
};

export const format_date = (unformatted_date: string) => {
	const month = unformatted_date.slice(5, 7);
	const day = unformatted_date.slice(8, 10);
	const year = unformatted_date.slice(0, 4);
	const formatted_date = `${month}/${day}/20`;
	return formatted_date;
};

export const unformat_date = (formatted_date: string) => {
	const date = formatted_date.split('/');
	const day = date[1];
	const month = date[0];
	const year = date[2];
	const unformat_date = `2020-${month}-${day}`;
	return unformat_date;
};

export const occurrence = function(array: any) {
	'use strict';
	// console.log(array);
	var result: any = {};
	if (array instanceof Array) {
		// Check if input is array.
		for (let i of array) {
			i.orderItems.forEach(function(v: any, i: any) {
				if (!result[v.product]) {
					// Initial object property creation.
					result[v.product] = [ i ]; // Create an array for that property.
				} else {
					// Same occurrences found.
					result[v.product].push(i); // Fill the array.
				}
			});
		}
	}

	return result;
};

// export const hsvToRgb = (h, s, v) => {
// 	var r, g, b;

// 	var i = Math.floor(h * 6);
// 	var f = h * 6 - i;
// 	var p = v * (1 - s);
// 	var q = v * (1 - f * s);
// 	var t = v * (1 - (1 - f) * s);

// 	switch (i % 6) {
// 		case 0:
// 			(r = v), (g = t), (b = p);
// 			break;
// 		case 1:
// 			(r = q), (g = v), (b = p);
// 			break;
// 		case 2:
// 			(r = p), (g = v), (b = t);
// 			break;
// 		case 3:
// 			(r = p), (g = q), (b = v);
// 			break;
// 		case 4:
// 			(r = t), (g = p), (b = v);
// 			break;
// 		case 5:
// 			(r = v), (g = p), (b = q);
// 			break;
// 	}

// 	return [ r * 255, g * 255, b * 255 ];
// };

export const hslToHex = (h: any, s: any, l: any) => {
	console.log(h);
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;
	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		const hue2rgb = (p: any, q: any, t: any) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	const toHex = (x: any) => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// export const email_validations = email => {

export const validate_promo_code = (data: any) => {
	let errors: any = {};
	interface errors {
		promo_code: string;
	}
	const promo_codes = data.promos.map((promo: any) => promo.promo_code);
	const promo = data.promos.find((promo: any) => promo.promo_code === data.promo_code);

	// Convert empty fields to an empty string so we can use validator functions
	data.promo_code = !isEmpty(data.promo_code) ? data.promo_code : '';
	// Email checks
	if (Validator.isEmpty(data.promo_code)) {
		errors.promo_code = 'Promo Code Field Empty';
	}
	if (!promo.active) {
		errors.promo_code = 'Promo Code Not Active';
	}
	if (!promo.for_customer) {
		if (!promo.sponsor === data.user.sponsor) {
			errors.promo_code = 'Promo Code Not Active';
		}
	}
	if (!promo_codes.includes(data.promo_code.toLowerCase())) {
		errors.promo_code = 'Promo Code Not Valid';
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
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Valid email required';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
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
	// let request: AxiosResponse<any>;
	// if (data.email) {
	// 	request = await axios.post('/api/users/checkemail', { email: data.email });
	// 	console.log({ request: request.data });
	// 	// Password checks
	// 	if (!request.data) {
	// 		errors.email = 'Email Already in Use';
	// 	}
	// }
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';
	// First Name checks
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email must a valid email';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_shipping = (data: {
	first_name: any;
	last_name: any;
	address: any;
	city: any;
	state: any;
	postalCode: any;
	country: any;
	international: any;
}) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.address = !isEmpty(data.address) ? data.address : '';
	data.city = !isEmpty(data.city) ? data.city : '';
	data.state = !isEmpty(data.state) ? data.state : '';
	data.postalCode = !isEmpty(data.postalCode) ? data.postalCode : '';
	data.country = !isEmpty(data.country) ? data.country : '';
	// data.international = !isEmpty(data.international) ? data.international : '';
	// First Name checks
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Address checks
	if (Validator.isEmpty(data.address)) {
		errors.address = 'Address field is required';
	}
	// City checks
	if (Validator.isEmpty(data.city)) {
		errors.city = 'City field is required';
	}
	// State checks
	if (Validator.isEmpty(data.state)) {
		errors.state = 'State field is required';
	}
	// Postal Code checks
	if (Validator.isEmpty(data.postalCode)) {
		errors.postalCode = 'Postal Code field is required';
	}
	// // International checks
	// if (Validator.isEmpty(data.international)) {
	// 	errors.international = 'Country field is required';
	// }
	if (data.international) {
		// Country checks
		if (Validator.isEmpty(data.country)) {
			errors.country = 'Country field is required';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
export const validate_payment = (data: { paymentMethod: any }) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : '';
	// First Name checks
	if (Validator.isEmpty(data.paymentMethod)) {
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
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email must be a valid email';
	}
	// // Password checks
	// if (Validator.isEmpty(data.order_number)) {
	// 	errors.order_number = 'Order Number field is required';
	// }
	if (Validator.isEmpty(data.reason_for_contact)) {
		errors.reason_for_contact = 'Reason for Contact field is required';
	}
	if (Validator.isEmpty(data.message)) {
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
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Valid email required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
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
		request = await axios.post('/api/users/getuser/' + data.id, { current_password: data.current_password });
		console.log({ request: request.data });
		// Password checks
		if (!request.data) {
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
	if (Validator.isEmpty(data.current_password)) {
		errors.current_password = 'Current Password field is required';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
