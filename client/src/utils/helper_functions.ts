import isEmpty from 'is-empty';
import Validator from 'validator';
import axios, { AxiosResponse } from 'axios';
import invariant from 'tiny-invariant';
import { API_Products } from '.';
import { determine_secondary_product_name } from './react_helper_functions';
import { getTracking } from 'ts-tracking-number';

interface errors {
	email: string;
	password: string;
}

export const create_query = (query: any) => {
	const params = new URLSearchParams(query);
	return params;
};

export const humanize = (str: string) => {
	const frags = str.split('_');
	for (let i = 0; i < frags.length; i++) {
		frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	}
	return frags.join(' ');
};
export const snake_case = (str: string) => {
	let snake_case = str;
	snake_case.replace(/\W+/g, ' ').toLowerCase().split(' ').join('_');
	if (snake_case.substr(-1) === ')') {
		return str.replace(/\W+/g, ' ').toLowerCase().split(' ').join('_').slice(0, -1);
	} else {
		return str.replace(/\W+/g, ' ').toLowerCase().split(' ').join('_');
	}
};

export const removeDuplicates = (originalArray: any, prop: any) => {
	var newArray = [];
	var lookupObject: any = {};

	for (var i in originalArray) {
		lookupObject[originalArray[i][prop]] = originalArray[i];
	}

	for (i in lookupObject) {
		newArray.push(lookupObject[i]);
	}
	return newArray;
};

export const shuffle = (array: any) => {
	var currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[ array[currentIndex], array[randomIndex] ] = [ array[randomIndex], array[currentIndex] ];
	}

	return array;
};

// export const determnine_link = (item: any) => {
// 	return `/collections/all/products/${item.pathname}${item.color ? '?color=' + item.color : ''}${item.secondary_color
// 		? '?secondary_color=' + item.secondary_color
// 		: ''}${item.option ? '?option=' + item.option : ''}${item.secondary_product
// 		? '?secondary=' + item.size ? item.size : item.option_product_name
// 		: ''}`;
// };
export const determnine_link = (item: any) => {
	// console.log({ [item.name]: item });
	const link = `/collections/all/products/${item.pathname}${item.color
		? '?color=' + item.color
		: ''}${item.secondary_color ? '?secondary_color=' + item.secondary_color : ''}${item.option_product
		? '?option=' + item.size
		: ''}${item.secondary_product_name
		? '?secondary=' + determine_secondary_product_name(item.secondary_product_name, item.category, item.subcategory)
		: ''}`;
	// console.log({ [item.name]: link });
	return link;
};

// item.size ? item.size : item.option_product_name
// export const determnine_link = (item: any) => {
// 	console.log({ [item.name]: item });
// 	const link = `/collections/all/products/${item.pathname}${item.color
// 		? '?color=' + item.color
// 		: ''}${item.secondary_color ? '?secondary_color=' + item.secondary_color : ''}${item.name === 'Nova Clip'
// 		? item.option_product ? '?option=' + item.option_product.split('-')[1].trim() : ''
// 		: item.option_product_name
// 			? '?option=' + item.option_product_name.split('-')[1].trim()
// 			: ''}${item.secondary_product_name ? '?secondary=' + item.secondary_product_name.split('-')[1].trim() : ''}`;
// 	console.log({ [item.name]: link });
// 	return link;
// };

// export const snake_case = (str: string) => {
// 	return str.replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).map((word) => word.toLowerCase()).join('_');
// };

export const determine_tracking_number = (tracking_number: string) => {
	if (tracking_number) {
		const tracking: any = getTracking(tracking_number);
		if (tracking.name.includes('USPS')) {
			return 'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' + tracking_number;
		}
		if (tracking.name.includes('UPS')) {
			return (
				'https://wwwapps.ups.com/WebTracking/processInputRequest?AgreeToTermsAndConditions=yes&loc=en_US&tracknum=' +
				tracking_number +
				'&requester=ST/trackdetails'
			);
		}
		if (tracking.name.includes('FedEx')) {
			return (
				'https://www.fedex.com/fedextrack/?trknbr=' +
				tracking_number +
				'&trkqual=2459474000~' +
				tracking_number +
				'~FX'
			);
		}
	}
};

export const prnt = (info: any) => {
	console.log(info);
};

export const toCapitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const determine_promoter_code_tier = (code_usage: number) => {
	console.log({ promter_code_usage: code_usage });
	if (code_usage === 0 || code_usage === 1) {
		return 20;
	} else if (code_usage >= 2 && code_usage <= 5) {
		return 25;
	} else if (code_usage >= 6 && code_usage <= 9) {
		return 30;
	} else if (code_usage >= 10 && code_usage <= 13) {
		return 35;
	} else if (code_usage >= 14 && code_usage <= 17) {
		return 40;
	} else if (code_usage >= 18 && code_usage <= 21) {
		return 45;
	} else if (code_usage >= 22) {
		return 60;
	}
};
export const determine_sponsor_code_tier = (code_usage: number) => {
	console.log({ sponsor_code_usage: code_usage });
	if (code_usage === 0 || code_usage === 1) {
		return 30;
	} else if (code_usage >= 2 && code_usage <= 5) {
		return 35;
	} else if (code_usage >= 6 && code_usage <= 9) {
		return 40;
	} else if (code_usage >= 10 && code_usage <= 14) {
		return 50;
	} else if (code_usage >= 15) {
		return 75;
	}
};

export const format_date = (unformatted_date: string) => {
	const month = unformatted_date.slice(5, 7);
	const day = unformatted_date.slice(8, 10);
	const year = unformatted_date.slice(0, 4);
	const formatted_date = `${month}/${day}/${year}`;
	return formatted_date;
};
export const format_time = (unformatted_time: any) => {
	let hour = unformatted_time.slice(11, 13);
	let formatted_hour = hour > 12 ? hour - 12 : hour;
	const minute = unformatted_time.slice(14, 16);
	const second = unformatted_time.slice(17, 19);
	const formatted_time = `${formatted_hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
	return formatted_time;
};

export const unformat_time = (formatted_time: any) => {
	let hour = formatted_time.slice(11, 13);
	let formatted_hour = hour > 12 ? hour - 12 : hour;
	const minute = formatted_time.slice(14, 16);
	const second = formatted_time.slice(17, 19);
	const unformatted_time = `${formatted_hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
	return formatted_time;
};

export const accurate_date = (date: any) => {
	var tzo = -date.getTimezoneOffset(),
		dif = tzo >= 0 ? '+' : '-',
		pad = function(num: any) {
			var norm = Math.floor(Math.abs(num));
			return (norm < 10 ? '0' : '') + norm;
		};

	return (
		date.getFullYear() +
		'-' +
		pad(date.getMonth() + 1) +
		'-' +
		pad(date.getDate()) +
		'T' +
		pad(date.getHours()) +
		':' +
		pad(date.getMinutes()) +
		':' +
		pad(date.getSeconds()) +
		dif +
		pad(tzo / 60) +
		':' +
		pad(tzo % 60)
	);
};

// var dt = new Date();

export const unformat_date = (formatted_date: string) => {
	// console.log({ formatted_date });
	const date = formatted_date.split('/');
	const day = date[1];
	const month = date[0];
	const year = date[2];
	const unformat_date = `${year}-${month}-${day}`;
	return unformat_date;
};
export const unformat_date_and_time = (formatted_date: string, formatted_time: string) => {
	const date = formatted_date.split('/');
	const time = formatted_time.trim().split(':');
	const day = date[1];
	const month = date[0];
	const year = date[2];
	let hour;
	const minute_time = time[1];
	let minute = minute_time.slice(0, 2);
	if (minute_time.slice(-2) === 'PM') {
		hour = parseInt(time[0]) + 12;
	} else if (minute_time.slice(-2) === 'AM') {
		if (time[0].length === 1) {
			hour = `0${time[0]}`;
		} else if (time[0].length === 2) {
			hour = time[0];
		}
	}
	const unformat_date = `${year}-${month}-${day}T${hour}:${minute}:00`;
	console.log({ unformat_date });
	return unformat_date;
};
export const format_date_and_time = (formatted_date: string, formatted_time: string) => {
	// console.log({ formatted_date });
	const date = formatted_date.split('/');
	const time = formatted_time.split(':');
	const day = date[1];
	const month = date[0];
	const year = date[2];
	const hour = time[1];
	const second = time[0];
	const ms = time[2];
	const unformat_date = `${year}-${month}-${day}T${hour}.${second}.${ms}`;
	return unformat_date;
};

export const daysBetween = (date1: any, date2: any) => {
	console.log({ date1, date2 });
	const date_1: any = new Date(date1);
	const date_2: any = new Date(date2);
	const diffTime = Math.abs(date_2 - date_1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
	console.log({ diffDays });
	return diffDays;
};

export const occurrence = function(array: any) {
	'use strict';
	// console.log(array);
	const result: any = {};
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

export const decide_warning = (date_1: string, date_2: string) => {
	if (new Date() > new Date(date_1) && new Date() < new Date(date_2)) {
		const confirm = window.confirm(
			`Glow LEDs will be out of office from ${format_date(date_1)} - ${format_date(
				date_2
			)}. \n\nYou may still place orders in this time, but orders will not be shipped until after ${format_date(
				date_2
			)} \n\nThank you so much for your support! 💙`
		);
		console.log({ confirm });
		return confirm;
	} else {
		return true;
	}
};

export const determine_total = (cartItems: any) => {
	const today = new Date();
	let total = 0;
	if (cartItems) {
		cartItems.forEach((item: any) => {
			if (
				today >= new Date(item.sale_start_date) &&
				today <= new Date(item.sale_end_date) &&
				item.sale_price !== 0
			) {
				total = total + item.sale_price * item.qty;
			} else {
				total = total + item.price * item.qty;
			}
		});
		return total;
	}
};

const colors = [
	{ color: 'Black', price: 11.99 },
	{ color: 'White', price: 15.99 },
	{ color: 'Red', price: 15.99 },
	{ color: 'Green', price: 15.99 },
	{ color: 'Blue', price: 15.99 },
	{ color: 'Violet', price: 15.99 },
	{ color: 'Purple', price: 15.99 }
];
const diffuser_colors = [
	{ color: 'Translucent White', price: 11.99 },
	{ color: 'Red', price: 11.99 },
	{ color: 'Green', price: 11.99 },
	{ color: 'Blue', price: 11.99 },
	{ color: 'Violet', price: 11.99 },
	{ color: 'Purple', price: 11.99 }
];

export const determine_price = (color: any, diffuser_cap: any) => {
	console.log(color);
	console.log(diffuser_cap);
	let price: any = 11.99;
	if (diffuser_cap) {
		price = colors.filter((cap_color: any) => {
			return cap_color.color === colors;
		});
	} else {
		price = diffuser_colors.filter((cap_color: any) => {
			return cap_color.color === colors;
		});
	}
	return price;
};

// export const hsvToRgb = (h, s, v) => {
// 	const r, g, b;

// 	const i = Math.floor(h * 6);
// 	const f = h * 6 - i;
// 	const p = v * (1 - s);
// 	const q = v * (1 - f * s);
// 	const t = v * (1 - (1 - f) * s);

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
	// console.log(h);
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

export const calculate_affiliate_usage = (affiliates: any, orders: any) => {
	return affiliates.map((affiliate: any) => {
		const code_usage = orders.filter((order: any) => {
			return (
				order.promo_code && order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
			);
		}).length;
		return {
			'Promo Code': toCapitalize(affiliate.public_code.promo_code),
			Uses: code_usage,
			Revenue: ` $${orders
				.filter(
					(order: any) =>
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				)
				.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
				.toFixed(2)}`,
			Earned: `$${orders
				.filter(
					(order: any) =>
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				)
				.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
				.toFixed(2)}`,
			'Percentage Off':
				!affiliate.team && affiliate.promoter
					? `${determine_promoter_code_tier(code_usage)}%`
					: `${determine_sponsor_code_tier(code_usage)}%`
		};
	});
};

export const calculate_sponsor_usage = (affiliates: any, orders: any) => {
	return affiliates.map((affiliate: any) => {
		const code_usage = orders.filter((order: any) => {
			return (
				order.promo_code && order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
			);
		}).length;
		return {
			'Promo Code': toCapitalize(affiliate.public_code.promo_code),
			Uses: code_usage,
			Revenue: ` $${orders
				.filter(
					(order: any) =>
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				)
				.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
				.toFixed(2)}`,
			Earned: `$${orders
				.filter(
					(order: any) =>
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				)
				.reduce((a: any, order: any) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
				.toFixed(2)}`,
			'Percentage Off':
				!affiliate.team && affiliate.promoter
					? `${determine_promoter_code_tier(code_usage)}%`
					: `${determine_sponsor_code_tier(code_usage)}%`
		};
	});
};

// export const state_names = [
// 	'Alabama',
// 	'Alaska',
// 	'American Samoa',
// 	'Arizona',
// 	'Arkansas',
// 	'Armed Forces Pacific',
// 	'Armed Forces Europe',
// 	'Armed Forces America',
// 	'California',
// 	'Colorado',
// 	'Connecticut',
// 	'Delaware',
// 	'District of Columbia',
// 	'Federated States of Micronesia',
// 	'Florida',
// 	'Georgia',
// 	'Guam',
// 	'Hawaii',
// 	'Idaho',
// 	'Illinois',
// 	'Indiana',
// 	'Iowa',
// 	'Kansas',
// 	'Kentucky',
// 	'Louisiana',
// 	'Maine',
// 	'Marshall Islands',
// 	'Maryland',
// 	'Massachusetts',
// 	'Michigan',
// 	'Minnesota',
// 	'Mississippi',
// 	'Missouri',
// 	'Montana',
// 	'Nebraska',
// 	'Nevada',
// 	'New Hampshire',
// 	'New Jersey',
// 	'New Mexico',
// 	'New York',
// 	'North Carolina',
// 	'North Dakota',
// 	'Northern Mariana Islands',
// 	'Ohio',
// 	'Oklahoma',
// 	'Oregon',
// 	'Palau',
// 	'Pennsylvania',
// 	'Puerto Rico',
// 	'Rhode Island',
// 	'South Carolina',
// 	'South Dakota',
// 	'Tennessee',
// 	'Texas',
// 	'Utah',
// 	'Vermont',
// 	'Virgin Island',
// 	'Virginia',
// 	'Washington',
// 	'West Virginia',
// 	'Wisconsin',
// 	'Wyoming'
// ];
export const state_names = [
	{ long_name: 'Alabama', short_name: 'AL' },
	{ long_name: 'Alaska', short_name: 'AK' },
	{ long_name: 'American Samoa', short_name: 'AS' },
	{ long_name: 'Arizona', short_name: 'AZ' },
	{ long_name: 'Arkansas', short_name: 'AR' },
	{ long_name: 'Armed Forces Pacific', short_name: 'AP' },
	{ long_name: 'Armed Forces Europe', short_name: 'AE' },
	{ long_name: 'Armed Forces America', short_name: 'AA' },
	{ long_name: 'California', short_name: 'CA' },
	{ long_name: 'Colorado', short_name: 'CO' },
	{ long_name: 'Connecticut', short_name: 'CT' },
	{ long_name: 'Delaware', short_name: 'DE' },
	{ long_name: 'District of Columbia', short_name: 'DC' },
	{ long_name: 'Federated States of Micronesia', short_name: 'FSM' },
	{ long_name: 'Florida', short_name: 'FL' },
	{ long_name: 'Georgia', short_name: 'GA' },
	{ long_name: 'Guam', short_name: 'GU' },
	{ long_name: 'Hawaii', short_name: 'HI' },
	{ long_name: 'Idaho', short_name: 'ID' },
	{ long_name: 'Illinois', short_name: 'IL' },
	{ long_name: 'Indiana', short_name: 'IN' },
	{ long_name: 'Iowa', short_name: 'IA' },
	{ long_name: 'Kansas', short_name: 'KS' },
	{ long_name: 'Kentucky', short_name: 'KY' },
	{ long_name: 'Louisiana', short_name: 'LA' },
	{ long_name: 'Maine', short_name: 'ME' },
	{ long_name: 'Marshall Islands', short_name: 'MH' },
	{ long_name: 'Maryland', short_name: 'MD' },
	{ long_name: 'Massachusetts', short_name: 'MA' },
	{ long_name: 'Michigan', short_name: 'MI' },
	{ long_name: 'Minnesota', short_name: 'MN' },
	{ long_name: 'Mississippi', short_name: 'MS' },
	{ long_name: 'Missouri', short_name: 'MO' },
	{ long_name: 'Montana', short_name: 'MT' },
	{ long_name: 'Nebraska', short_name: 'NE' },
	{ long_name: 'Nevada', short_name: 'NV' },
	{ long_name: 'New Hampshire', short_name: 'NH' },
	{ long_name: 'New Jersey', short_name: 'NJ' },
	{ long_name: 'New Mexico', short_name: 'NM' },
	{ long_name: 'New York', short_name: 'NY' },
	{ long_name: 'North Carolina', short_name: 'NC' },
	{ long_name: 'North Dakota', short_name: 'ND' },
	{ long_name: 'Northern Mariana Islands', short_name: 'MP' },
	{ long_name: 'Ohio', short_name: 'OH' },
	{ long_name: 'Oklahoma', short_name: 'OK' },
	{ long_name: 'Oregon', short_name: 'OR' },
	{ long_name: 'Palau', short_name: 'PW' },
	{ long_name: 'Pennsylvania', short_name: 'PA' },
	{ long_name: 'Puerto Rico', short_name: 'PR' },
	{ long_name: 'Rhode Island', short_name: 'RI' },
	{ long_name: 'South Carolina', short_name: 'SC' },
	{ long_name: 'South Dakota', short_name: 'SD' },
	{ long_name: 'Tennessee', short_name: 'TN' },
	{ long_name: 'Texas', short_name: 'TX' },
	{ long_name: 'Utah', short_name: 'UT' },
	{ long_name: 'Vermont', short_name: 'VT' },
	{ long_name: 'Virgin Island', short_name: 'VI' },
	{ long_name: 'Virginia', short_name: 'VA' },
	{ long_name: 'Washington', short_name: 'WA' },
	{ long_name: 'West Virginia', short_name: 'WV' },
	{ long_name: 'Wisconsin', short_name: 'WI' },
	{ long_name: 'Wyoming', short_name: 'WY' }
];

export const categories = [
	'whites',
	'accessories',
	'decals',
	'diffuser_caps',
	'diffusers',
	'exo_diffusers',
	'glow_casings',
	'glow_strings',
	'glowskins'
];
export const subcategories = [
	'singles',
	'refresh',
	'battery_storage',
	'batteries',
	'stickers',
	'clips',
	'casings',
	'universal',
	'batman',
	'outline',
	'patterns',
	'abstract',
	'shapes',
	'diffuser_adapters',
	'geometric',
	'starter_kit',
	'sacred_geometry',
	'imperfect',
	'domes',
	'closed_hole',
	'fisheye',
	'open_hole',
	'polygons',
	'cylinders',
	'polyhedrons',
	'gift_card',
	'nova',
	'classics',
	'novaskins',
	'alt_novaskins',
	'symbols',
	'emoji',
	'custom',
	'colors',
	'sizes',
	'secondary_colors'
];

export const homepage_videos = [
	{
		name: 'EXO Diffusers',
		category: 'exo_diffusers',
		video: 'hPxFDj7R5Lg',
		color: '#8e4a4a',
		description:
			'The next breakthrough in diffuser technology is here!! Wiffle Ball Diffusers! Wiffle Ball Diffusers or filter use a 2 material technology that allows for a perfect blend of the colors as well as incorporating a opaque layer to give a light filtering effect that will leave the viewer speechless! '
	},
	{
		name: 'Glow Strings V2',
		category: 'glow_strings',
		video: 'mNBwaZKWi8c',
		color: '#b1832f',
		description:
			'Make your space glow! Our Glow Strings come with many preprogrammed patterns that will turn your home into a festival. Strobes, fades, flashes, they have it all. Fill your universe with a swimming pool of light in every color of the rainbow. '
	},
	{
		name: 'Glow Casings',
		category: 'glow_casings',
		video: '_aJDfd6vlYU',
		color: '#b1a72f',
		description:
			'What makes Glowskins special? Glowskins are a Casing and Diffuser all in one! Place your entire chip inside and create a glow throughout the whole casing! This differs from our Frosted Diffusers which create a glow only around the bulb. There are 3 unique sizes, each designed for Coffin, Nano or Coin chip microlights. Glowskins are made with semi-flexible TPU plastic so your fingers will always feel comfortable! They do not inhibit access to your microlight button for mode switching. Our light and streamline design makes your fingers feel weightless. Smooth finish for easy removal from whites.'
	},
	{
		name: 'Glowskins',
		category: 'glowskins',
		video: '3Yk0QOMBlAo',
		color: '#427942',
		description:
			'What makes Glowskins special? Glowskins are a Casing and Diffuser all in one! Place your entire chip inside and create a glow throughout the whole casing! This differs from our Frosted Diffusers which create a glow only around the bulb. There are 3 unique sizes, each designed for Coffin, Nano or Coin chip microlights. Glowskins are made with semi-flexible TPU plastic so your fingers will always feel comfortable! They do not inhibit access to your microlight button for mode switching. Our light and streamline design makes your fingers feel weightless. Smooth finish for easy removal from whites.'
	},

	{
		name: 'Diffuser Caps',
		category: 'diffuser_caps',
		video: '0b1cn_3EczE',
		color: '#416d63',
		description:
			'Take your light shows to a new dimension with Diffuser Caps! This new gloving tech puts patterns and designs on the outside of your glove to add a mesmerizing and unique effect to your lightshows. These Diffuser Adapters are the secret to the technology. Simply place the Diffuser Adapters (sold separately) on your microlight inside of the glove and then twist on the cap to the Diffuser Adapter from the outside of the glove! Diffuser caps are about the size of a classic dome diffuser. 15mm in Diameter. People will be speechless at your tracers and effects! 100% facemelt guarantee. Lights not included. Patent pending. The Diffuser Caps are compatible with the Mini Diffuser Caps purchased before 12/3/20. View the graphic below for visual representation of what we'
	},
	{
		name: 'Frosted Diffusers',
		category: 'diffusers',
		video: 'uY2xjrGrZd0',
		color: '#6d416d',
		description:
			'Tired of diffusers that dont actually diffuse? these frosted diffusers will give your lightshow an added smoothness and flow. these diffusers will distribute the light into an even glow without a bright center point.'
	}
];

export const manuals = {
	glow_strings: {
		name: 'Glow Strings V2 Manual',
		manual: '/Glow_Strings_V2_Manual.png',
		videos: [
			{
				title: 'One Button Functionality',
				video: 'oHNFMaUepLs'
			},
			{
				title: 'One Button Functionality',
				video: 'dCjgyMdiKhY'
			},
			{
				title: 'One Button Functionality',
				video: 'LxtZ1noaxlk'
			},
			{
				title: 'One Button Functionality',
				video: '6RCxB4waLAI'
			}
		]
	},
	diffuser_caps: {
		name: 'Diffuser Caps Manual',
		manual: '',
		videos: [
			{
				title: 'Diffuser Caps 101',
				video: 'FJbKd0ClkFM'
			},
			{
				title: 'Orienting Diffuser Caps 101',
				video: 'vG4qgtrotkw'
			}
		]
	},
	glowskins: {
		name: 'Glowskins Manual',
		manual: '',
		videos: [
			{
				title: 'Glowskins 101',
				video: 's49fiZPC5G0'
			}
		]
	}
	// glow_casings: {
	// 	name: 'Diffuser Caps Manual',
	// 	manual: '/Diffuser_Caps_Manual.png',
	// 	videos: [
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'oHNFMaUepLs'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'dCjgyMdiKhY'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'LxtZ1noaxlk'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: '6RCxB4waLAI'
	// 		}
	// 	]
	// },
	// diffusers: {
	// 	name: 'Diffuser Caps Manual',
	// 	manual: '/Diffuser_Caps_Manual.png',
	// 	videos: [
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'oHNFMaUepLs'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'dCjgyMdiKhY'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'LxtZ1noaxlk'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: '6RCxB4waLAI'
	// 		}
	// 	]
	// },
	// exo_diffusers: {
	// 	name: 'Diffuser Caps Manual',
	// 	manual: '/Diffuser_Caps_Manual.png',
	// 	videos: [
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'oHNFMaUepLs'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'dCjgyMdiKhY'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: 'LxtZ1noaxlk'
	// 		},
	// 		{
	// 			title: 'One Button Functionality',
	// 			video: '6RCxB4waLAI'
	// 		}
	// 	]
	// }
};

export const descriptions = {
	all_products:
		'Take your rave and festival experience to the next level with our LED Accessories at Glow LEDs. Shop Diffuser Caps, Glowskins, and Glow Strings. Click to Shop.',
	diffusers:
		'Take your gloving light shows to the next level with our Frosted Dome Diffusers at Glow LEDs. Shop Dome Diffusers, Large Dome Diffusers, and Frosted Diffusers. Click to Shop.',
	diffuser_caps:
		'Take your gloving light shows to the next level with our Diffuser Caps at Glow LEDs. Shop Screw on LED Caps, Cap over Diffusers, and Diffuser filters. Click to Shop.',
	diffuser_adapters:
		'Take your gloving light shows to the next level with our Diffuser Adapters at Glow LEDs. Shop Screw On Diffusers, LED Adapters, and Diffuser Cap Adapters. Click to Shop.',
	glow_strings:
		'Decorate your home and festival with these stunning glow strings at Glow LEDs. Shop String Lights, LED Strips, and Addressable LEDs. Click to Shop.',
	glowskins:
		'Take your gloving light shows to the next level with our Glowskins at Glow LEDs. Shop Diffuser Skins, LED Skins, and Diffuser Casing Combo. Click to Shop.'
};

export const description_determination = (category: any) => {
	if (category === 'diffusers') {
		return descriptions.diffusers;
	}
	if (category === 'diffuser_adapters') {
		return descriptions.diffuser_adapters;
	}
	if (category.toLowerCase() === 'diffuser_caps') {
		return descriptions.diffuser_caps;
	}
	if (category === 'glowskins') {
		return descriptions.glowskins;
	}
	if (category === 'glow_strings') {
		return descriptions.glow_strings;
	} else {
		return descriptions.all_products;
	}
};

export const update_products_url = (history: any, search = '', sort = '', filter = '', page = 1, limit = 0) => {
	history.push({
		search: `${search ? '?search=' + search : ''}${sort ? '?sort=' + sort : ''}${filter
			? '?filter=' + filter
			: ''}${page ? '?page=' + page : ''}${limit ? '?limit=' + limit : ''}`
	});
};

export const getUrlParameter = (location: any) => {
	const search: any = location.search.split('?');
	const search_object: any = {};
	search.filter((item: any) => item !== '').forEach((item: any) => {
		search_object[item.split('=')[0]] = item.split('=')[1];
	});
	return search_object;
};

export const sort_options = [ 'Category', 'Newest', 'Lowest', 'Highest' ];

export const mutliDragAwareReorder = (args: any) => {
	console.log('hello');
	if (args.selectedProductIds.length > 1) {
		return reorderMultiDrag(args);
	}
	return reorderSingleDrag(args);
};
// const reorder_entities = (list: any, startIndex: any, endIndex: any) => {
// 	// const result = Array.from(list);
// 	// console.log({ list });
// 	const result = list.products;
// 	const [ removed ] = result.splice(startIndex, 1);
// 	result.splice(endIndex, 0, removed);

// 	return result;
// };

const reorderSingleDrag = ({ entities, selectedProductIds, source, destination }: any) => {
	console.log('reorderSingleDrag');
	// moving in the same list

	if (source.droppableId === destination.droppableId) {
		const column = entities.columns[source.droppableId];
		const reordered = reorder(column.product_ids, source.index, destination.index);
		// const reordered_entities = reorder_entities(entities, source.index, destination.index);
		console.log({ entities, selectedProductIds, source, destination });
		const updated = {
			...entities,
			columns: {
				...entities.columns,
				[column.id]: withNewProductIds(column, reordered)
			}
		};
		console.log({ reorderSingleDrag: updated });
		return {
			entities: updated,
			selectedProductIds
		};
	}

	// moving to a new list
	const home = entities.columns[source.droppableId];
	const foreign = entities.columns[destination.droppableId];

	// the id of the product to be moved
	const productId = home.product_ids[source.index];

	// remove from home column
	const newHomeProductIds = [ ...home.product_ids ];
	newHomeProductIds.splice(source.index, 1);

	// add to foreign column
	const newForeignProductIds = [ ...foreign.product_ids ];
	newForeignProductIds.splice(destination.index, 0, productId);

	const updated = {
		...entities,
		columns: {
			...entities.columns,
			[home.id]: withNewProductIds(home, newHomeProductIds),
			[foreign.id]: withNewProductIds(foreign, newForeignProductIds)
		}
	};

	return {
		entities: updated,
		selectedProductIds
	};
};

const reorderMultiDrag = ({ entities, selectedProductIds, source, destination }: any) => {
	console.log('reorderMultiDrag');
	// console.log({ entities });
	// console.log({ columns: entities.columns });
	// console.log({ source });
	// console.log({ droppableId: source.droppableId });
	const start = entities.columns[source.droppableId];
	console.log({ start });
	const dragged = start.product_ids[source.index];
	console.log({ dragged });
	const insertAtIndex = (() => {
		const destinationIndexOffset = selectedProductIds.reduce((previous: any, current: any) => {
			if (current === dragged) {
				return previous;
			}

			const final = entities.columns[destination.droppableId];
			const column = getHomeColumn(entities, current);

			if (column !== final) {
				return previous;
			}

			const index = column.product_ids.indexOf(current);

			if (index >= destination.index) {
				return previous;
			}

			// the selected item is before the destination index
			// we need to account for this when inserting into the new location
			return previous + 1;
		}, 0);

		const result = destination.index - destinationIndexOffset;

		console.log({ result });
		return result;
	})();

	// doing the ordering now as we are required to look up columns
	// and know original ordering
	const orderedSelectedProductIds = [ ...selectedProductIds ];
	orderedSelectedProductIds.sort((a, b) => {
		// moving the dragged item to the top of the list
		if (a === dragged) {
			return -1;
		}
		if (b === dragged) {
			return 1;
		}

		// sorting by their natural indexes
		const columnForA = getHomeColumn(entities, a);
		const indexOfA = columnForA.product_ids.indexOf(a);
		const columnForB = getHomeColumn(entities, b);
		const indexOfB = columnForB.product_ids.indexOf(b);

		if (indexOfA !== indexOfB) {
			return indexOfA - indexOfB;
		}

		// sorting by their order in the selectedProductIds list
		return -1;
	});

	// we need to remove all of the selected products from their columns
	const withRemovedProducts = entities.columnOrder.reduce((previous: any, columnId: any) => {
		const column = entities.columns[columnId];

		// remove the id's of the items that are selected
		const remainingProductIds = column.product_ids.filter((id: any) => !selectedProductIds.includes(id));

		previous[column.id] = withNewProductIds(column, remainingProductIds);
		return previous;
	}, entities.columns);

	const final = withRemovedProducts[destination.droppableId];
	console.log({ final });
	const withInserted = (() => {
		const base = [ ...final.product_ids ];
		base.splice(insertAtIndex, 0, ...orderedSelectedProductIds);
		return base;
	})();

	// insert all selected products into final column
	const withAddedProducts = {
		...withRemovedProducts,
		[final.id]: withNewProductIds(final, withInserted)
	};
	console.log({ withAddedProducts });

	const updated = {
		...entities,
		columns: withAddedProducts
	};
	console.log({ updated });
	console.log({ entities });

	return {
		entities: updated,
		selectedProductIds: orderedSelectedProductIds
	};
};

const withNewProductIds = (column: any, product_ids: any) => ({
	id: column.id,
	title: column.title,
	product_ids
});

export const getHomeColumn = (entities: any, productId: any) => {
	console.log({ entities, productId });
	const columnId = entities.columnOrder.find((id: any) => {
		const column = entities.columns[id];
		console.log({ column });
		console.log({ includes: column.product_ids.includes(productId) });
		return column.product_ids.includes(productId);
	});

	// invariant(columnId, 'Count not find column for product');

	return entities.columns[columnId];
};

export const multiSelectTo = (entities: any, selectedProductIds: any, newProductId: any) => {
	// Nothing already selected
	if (!selectedProductIds.length) {
		return [ newProductId ];
	}

	const columnOfNew = getHomeColumn(entities, newProductId);

	const indexOfNew = columnOfNew.product_ids.indexOf(newProductId);

	const lastSelected = selectedProductIds[selectedProductIds.length - 1];
	const columnOfLast = getHomeColumn(entities, lastSelected);
	const indexOfLast = columnOfLast.product_ids.indexOf(lastSelected);

	// multi selecting to another column
	// select everything up to the index of the current item
	if (columnOfNew !== columnOfLast) {
		return columnOfNew.product_ids.slice(0, indexOfNew + 1);
	}

	// multi selecting in the same column
	// need to select everything between the last index and the current index inclusive

	// nothing to do here
	if (indexOfNew === indexOfLast) {
		return null;
	}

	const isSelectingForwards = indexOfNew > indexOfLast;
	const start = isSelectingForwards ? indexOfLast : indexOfNew;
	const end = isSelectingForwards ? indexOfNew : indexOfLast;

	const inBetween = columnOfNew.product_ids.slice(start, end + 1);

	// everything inbetween needs to have it's selection toggled.
	// with the exception of the start and end values which will always be selected

	const toAdd = inBetween.filter((productId: any) => {
		// if already selected: then no need to select it again
		if (selectedProductIds.includes(productId)) {
			return false;
		}
		return true;
	});

	const sorted = isSelectingForwards ? toAdd : [ ...toAdd ].reverse();
	const combined = [ ...selectedProductIds, ...sorted ];

	return combined;
};

const reorder = (list: any, startIndex: any, endIndex: any) => {
	const result = Array.from(list);
	const [ removed ] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const no_state = {
	option: true,
	option_products: [],
	color_products: [],
	secondary_color_products: [],
	product_options: [],
	option_products_name: '',
	color_products_name: '',
	secondary_color_products_name: '',
	secondary_products_name: '',
	option_product_group: false,
	color_product_group: false,
	secondary_color_product_group: false,
	secondary_product_group: false
};

export const create_color_products = async (
	e: any,
	type: any,
	product: any,
	set_color_products: any,
	color_products: any,
	set_secondary_color_products: any,
	secondary_color_products: any,
	set_option_products: any,
	option_products: any
) => {
	e.preventDefault();
	// set_loading_options(true);
	let list: any = [];
	if (product.category === 'glowskins') {
		list = [
			{
				name: `Clear ${product.name}`,
				pathname: snake_case(`Clear ${product.name}`),
				color: 'Clear',
				color_code: '#4b4b4b',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: true,
				...no_state
			},
			{
				name: `Frosted ${product.name}`,
				pathname: snake_case(`Frosted ${product.name}`),
				color: 'Frosted',
				color_code: 'white',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Emerald ${product.name}`,
				pathname: snake_case(`Emerald ${product.name}`),
				color: 'Emerald',
				color_code: '#15715a',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Teal ${product.name}`,
				pathname: snake_case(`Teal ${product.name}`),
				color: 'Teal',
				color_code: '#1da5b3',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Frosted ${product.name}`,
				pathname: snake_case(`Frosted ${product.name}`),
				color: 'Frosted',
				color_code: '#abaeb5',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Green ${product.name}`,
				pathname: snake_case(`Green ${product.name}`),
				color: 'Green',
				color_code: '#00c700',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Purple ${product.name}`,
				pathname: snake_case(`Purple ${product.name}`),
				color: 'Purple',
				color_code: 'purple',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 1`,
				pathname: snake_case(`${product.name} - 1`),
				size: 1,
				category: 'options',
				subcategory: 'sizes',
				price: 2.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 8`,
				pathname: snake_case(`${product.name} - 8`),
				size: 8,
				category: 'options',
				subcategory: 'sizes',
				price: 17.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 10`,
				pathname: snake_case(`${product.name} - 10`),
				size: 10,
				category: 'options',
				subcategory: 'sizes',
				price: 19.99,
				item_group_id: product._id,
				default_option: true,
				...no_state
			}
		];
	} else if (product.category === 'glow_casings') {
		list = [
			{
				name: `Clear ${product.name}`,
				pathname: snake_case(`Clear ${product.name}`),
				color: 'Clear',
				color_code: '#4b4b4b',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: true,
				...no_state
			},
			{
				name: `Frosted ${product.name}`,
				pathname: snake_case(`Frosted ${product.name}`),
				color: 'Frosted',
				color_code: 'white',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				secondary_products: [],
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Emerald ${product.name}`,
				pathname: snake_case(`Emerald ${product.name}`),
				color: 'Emerald',
				color_code: '#15715a',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Teal ${product.name}`,
				pathname: snake_case(`Teal ${product.name}`),
				color: 'Teal',
				color_code: '#1da5b3',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Black  ${product.name}`,
				pathname: snake_case(`Black  ${product.name}`),
				color: 'Black',
				color_code: 'black',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 1`,
				pathname: snake_case(`${product.name} - 1`),
				size: 1,
				category: 'options',
				subcategory: 'sizes',
				price: 2.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 8`,
				pathname: snake_case(`${product.name} - 8`),
				size: 8,
				category: 'options',
				subcategory: 'sizes',
				price: 17.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 10`,
				pathname: snake_case(`${product.name} - 10`),
				size: 10,
				category: 'options',
				subcategory: 'sizes',
				price: 19.99,
				item_group_id: product._id,
				default_option: true,
				...no_state
			}
		];
	} else if (product.category === 'diffuser_caps') {
		list = [
			{
				name: `Black ${product.name}`,
				pathname: snake_case(`Black ${product.name}`),
				color: 'Black',
				color_code: 'black',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: true,
				...no_state
			},
			{
				name: `White ${product.name}`,
				pathname: snake_case(`White ${product.name}`),
				color: 'White',
				color_code: 'white',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Green ${product.name}`,
				pathname: snake_case(`Green ${product.name}`),
				color: 'Green',
				color_code: '#00c700',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Purple ${product.name}`,
				pathname: snake_case(`Purple ${product.name}`),
				color: 'Purple',
				color_code: 'purple',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 15 mm (Classic)`,
				pathname: snake_case(`${product.name} - 15 mm (Classic)`),
				size: 1,
				category: 'options',
				subcategory: 'sizes',
				item_group_id: product._id,
				default_option: true,
				...no_state
			},
			{
				name: `${product.name} - 20 mm (Mega)`,
				pathname: snake_case(`${product.name} - 20 mm (Mega)`),
				size: 8,
				category: 'options',
				subcategory: 'sizes',
				item_group_id: product._id,
				default_option: false,
				...no_state
			}
		];
	} else if (product.category === 'diffusers') {
		list = [
			{
				name: `Frosted ${product.name}`,
				pathname: snake_case(`Frosted ${product.name}`),
				color: 'Frosted',
				color_code: '#abaeb5',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Green ${product.name}`,
				pathname: snake_case(`Green ${product.name}`),
				color: 'Green',
				color_code: '#00c700',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Purple ${product.name}`,
				pathname: snake_case(`Purple ${product.name}`),
				color: 'Purple',
				color_code: 'purple',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			}
		];
	} else if (product.category === 'exo_diffusers') {
		list = [
			{
				name: `Black ${product.name}`,
				pathname: snake_case(`Black ${product.name}`),
				color: 'Black',
				color_code: 'black',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `White ${product.name}`,
				pathname: snake_case(`White ${product.name}`),
				color: 'White',
				color_code: 'white',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Green ${product.name}`,
				pathname: snake_case(`Green ${product.name}`),
				color: 'Green',
				color_code: '#00c700',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Purple ${product.name}`,
				pathname: snake_case(`Purple ${product.name}`),
				color: 'Purple',
				color_code: 'purple',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Frosted ${product.name}`,
				pathname: snake_case(`Frosted ${product.name}`),
				color: 'Frosted',
				color_code: '#abaeb5',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Green ${product.name}`,
				pathname: snake_case(`Green ${product.name}`),
				color: 'Green',
				color_code: '#00c700',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Purple ${product.name}`,
				pathname: snake_case(`Purple ${product.name}`),
				color: 'Purple',
				color_code: 'purple',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			}
		];
	} else if (product.subcategory === 'novaskins' || product.subcategory === 'alt_novaskins') {
		list = [
			{
				name: `Clear ${product.name}`,
				pathname: snake_case(`Clear ${product.name}`),
				color: 'Clear',
				color_code: '#4b4b4b',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: true,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Emerald ${product.name}`,
				pathname: snake_case(`Emerald ${product.name}`),
				color: 'Emerald',
				color_code: '#15715a',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Teal ${product.name}`,
				pathname: snake_case(`Teal ${product.name}`),
				color: 'Teal',
				color_code: '#1da5b3',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Clear ${product.name}`,
				pathname: snake_case(`Clear ${product.name}`),
				color: 'Clear',
				color_code: '#4b4b4b',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Frosted ${product.name}`,
				pathname: snake_case(`Frosted ${product.name}`),
				color: 'Frosted',
				color_code: '#abaeb5',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Red ${product.name}`,
				pathname: snake_case(`Red ${product.name}`),
				color: 'Red',
				color_code: '#c11c22',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Green ${product.name}`,
				pathname: snake_case(`Green ${product.name}`),
				color: 'Green',
				color_code: '#00c700',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Blue ${product.name}`,
				pathname: snake_case(`Blue ${product.name}`),
				color: 'Blue',
				color_code: '#0014ff',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Purple ${product.name}`,
				pathname: snake_case(`Purple ${product.name}`),
				color: 'Purple',
				color_code: 'purple',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Violet ${product.name}`,
				pathname: snake_case(`Violet ${product.name}`),
				color: 'Violet',
				color_code: '#543abb',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `Black ${product.name}`,
				pathname: snake_case(`Black ${product.name}`),
				color: 'Black',
				color_code: 'black',
				category: 'options',
				subcategory: 'secondary_colors',
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 1`,
				pathname: snake_case(`${product.name} - 1`),
				size: 1,
				category: 'options',
				subcategory: 'sizes',
				price: 5.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 2`,
				pathname: snake_case(`${product.name} - 2`),
				size: 2,
				category: 'options',
				subcategory: 'sizes',
				price: 12.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 4`,
				pathname: snake_case(`${product.name} - 4`),
				size: 4,
				category: 'options',
				subcategory: 'sizes',
				price: 22.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 10`,
				pathname: snake_case(`${product.name} - 10`),
				size: 10,
				category: 'options',
				subcategory: 'sizes',
				price: 59.99,
				item_group_id: product._id,
				default_option: true,
				...no_state
			},
			{
				name: `${product.name} - 1 Skin`,
				pathname: snake_case(`${product.name} - 1 Skin`),
				size: 4,
				category: 'options',
				subcategory: 'sizes',
				price: 2.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			},
			{
				name: `${product.name} - 1 Sled`,
				pathname: snake_case(`${product.name} - 1 Sled`),
				size: 10,
				category: 'options',
				subcategory: 'sizes',
				price: 2.99,
				item_group_id: product._id,
				default_option: false,
				...no_state
			}
		];
	}
	list.map(async (item: any, index: number) => {
		const new_product = { ...product, ...item };
		delete new_product._id;
		console.log({ new_product });
		const { data } = await API_Products.create_products_a(new_product);
		console.log({ data, index });
		if (item.subcategory === 'colors' && type === 'colors') {
			if (color_products) {
				set_color_products((colors_products: any) => [ ...colors_products, data ]);
			} else {
				set_color_products([ data ]);
			}
		} else if (item.subcategory === 'secondary_colors' && type === 'secondary_colors') {
			if (secondary_color_products) {
				set_secondary_color_products((colors_products: any) => [ ...colors_products, data ]);
			} else {
				set_secondary_color_products([ data ]);
			}
		} else if (item.subcategory === 'sizes' && type === 'sizes') {
			if (option_products) {
				set_option_products((colors_products: any) => [ ...colors_products, data ]);
			} else {
				set_option_products([ data ]);
			}
		}
	});
	// set_loading_options(false);
};

export const dates_in_year = (year: number) => {
	return [
		{ month: 'january', number_of_days: 31, start_date: year + '-01-01', end_date: year + '-01-31' },
		{ month: 'february', number_of_days: 28, start_date: year + '-02-01', end_date: year + '-02-28' },
		{ month: 'march', number_of_days: 31, start_date: year + '-03-01', end_date: year + '-03-31' },
		{ month: 'april', number_of_days: 30, start_date: year + '-04-01', end_date: year + '-04-30' },
		{ month: 'may', number_of_days: 31, start_date: year + '-05-01', end_date: year + '-05-31' },
		{ month: 'june', number_of_days: 30, start_date: year + '-06-01', end_date: year + '-06-30' },
		{ month: 'july', number_of_days: 31, start_date: year + '-07-01', end_date: year + '-07-31' },
		{ month: 'august', number_of_days: 31, start_date: year + '-08-01', end_date: year + '-08-31' },
		{ month: 'september', number_of_days: 30, start_date: year + '-09-01', end_date: year + '-09-30' },
		{ month: 'october', number_of_days: 31, start_date: year + '-10-01', end_date: year + '-10-31' },
		{ month: 'november', number_of_days: 30, start_date: year + '-11-01', end_date: year + '-11-30' },
		{ month: 'december', number_of_days: 31, start_date: year + '-12-01', end_date: year + '-12-31' }
	];
};
