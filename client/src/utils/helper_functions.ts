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

export const format_date_display = (unformatted_date: string | number | Date) => {
	const date = new Date(unformatted_date);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const formatted_date = `${month}/${day}/${year}`;
	return formatted_date;
};

// export const email_validations = email => {

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
	// Country checks
	if (Validator.isEmpty(data.country)) {
		errors.country = 'Country field is required';
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
