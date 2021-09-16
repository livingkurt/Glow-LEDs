export {};
import jwt from 'jsonwebtoken';
const config = require('./config');
import { Request } from 'express';
import Log from './models/log';
import nodemailer from 'nodemailer';
import App from './email_templates/App';
import { error } from './email_templates/pages';
export interface IGetUserAuthInfoRequest extends Request {
	user: any; // or any other type
}

export const getToken = (user: any) => {
	return jwt.sign(
		{
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			password: user.password,
			isAdmin: user.isAdmin,
			isVerified: user.isVerified,
			affiliate: user.affiliate,
			email_subscription: user.email_subscription,
			shipping: user.shipping,
			is_affiliated: user.is_affiliated
		},
		config.JWT_SECRET,
		{
			expiresIn: '48h' // 1 year in seconds
		}
	);
};

export const isAuth = (
	req: { headers: { authorization: any }; user: any },
	res: { status: (arg0: number) => { (): any; new (): any; send: { (arg0: { msg: string }): any; new (): any } } },
	next: () => void
) => {
	const token = req.headers.authorization;

	if (token) {
		const onlyToken = token.slice(7, token.length);
		jwt.verify(onlyToken, config.JWT_SECRET, (err: any, decode: any) => {
			if (err) {
				return res.status(401).send({ msg: 'Invalid Token' });
			}
			req.user = decode;
			next();
			return;
		});
	} else {
		return res.status(401).send({ msg: 'Token is not supplied.' });
	}
};

export const isAdmin = (
	req: { user: { isAdmin: any } },
	res: { status: (arg0: number) => { (): any; new (): any; send: { (arg0: { msg: string }): any; new (): any } } },
	next: () => any
) => {
	// console.log(req.user);
	if (req.user && req.user.isAdmin) {
		return next();
	}
	return res.status(401).send({ msg: 'Admin Token is not valid.' });
};

export const make_private_code = (length: any) => {
	const result = [];
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return result.join('');
};

// const tryCatch = async () => {
// 	try {
// 		const data = await Promise;
// 		return [ data, null ];
// 	} catch (error) {
console.log({ error });
// 		console.error(error);
// 		return [ null, error ];
// 	}
// };

export const determine_parcel = (orderItems: any, parcels: any) => {
	const dimmensions = orderItems.map((item: any) => {
		// console.log({ item });
		if (item.product_option && item.product_option.length === 0) {
			return {
				length: item.product_option.package_length,
				width: item.product_option.package_width,
				height: item.product_option.package_height,
				volume: item.product_option.package_volume,
				qty: parseInt(item.product_option.qty)
			};
		} else {
			return {
				length: item.package_length,
				width: item.package_width,
				height: item.package_height,
				volume: item.package_volume,
				qty: parseInt(item.qty)
			};
		}
	});
	console.log({ dimmensions });
	const total_length = dimmensions.reduce((a: any, c: { length: any; qty: any }) => a + c.length * c.qty, 0);
	const total_width = dimmensions.reduce((a: any, c: { width: any; qty: any }) => a + c.width * c.qty, 0);
	const total_height = dimmensions.reduce((a: any, c: { height: any; qty: any }) => a + c.height * c.qty, 0);
	console.log({ total_length });
	console.log({ total_width });
	console.log({ total_height });
	// const total_length = orderItems.reduce(
	// 	(a: any, c: { package_length: any; qty: any }) => a + c.package_length * c.qty,
	// 	0
	// );
	// const total_width = orderItems.reduce(
	// 	(a: any, c: { package_width: any; qty: any }) => a + c.package_width * c.qty,
	// 	0
	// );
	// const total_height = orderItems.reduce(
	// 	(a: any, c: { package_height: any; qty: any }) => a + c.package_height * c.qty,
	// 	0
	// );
	const total_volume = Math.cbrt(total_length * total_width * total_height);
	const lengths = dimmensions.map((item: any) => item.length);
	const widths = dimmensions.map((item: any) => item.width);
	const heights = dimmensions.map((item: any) => item.height);
	// console.log({ lengths });
	// console.log({ widths });
	// console.log({ heights });
	const max_length: any = Math.max(...lengths);
	const max_width: any = Math.max(...widths);
	const max_height: any = Math.max(...heights);
	// const len_num = parseInt(max_length);
	// console.log({ max_length });
	// console.log({ max_width });
	// console.log({ max_height });
	// console.log({ parcels });
	let fit_parcels = [];

	// const check_name = (item) =>  {
	//   return item.name >= 'Glow Strings V2 50 LED / 3.5m';
	// }
	// const check = orderItems.map((item: any) => item.name === 'Glow Strings V2 50 LED / 3.5m');
	// console.log({ check: orderItems.some((item: any) => item.name === 'Glow Strings V2 50 LED / 3.5m') });
	const check = orderItems.some((item: any) => item.name === 'Glow Strings V2 50 LED / 3.5m');
	if (parcels.length <= 3) {
		if (check) {
			fit_parcels = parcels.filter((parcel: any) => {
				if (parcel.length > max_length && parcel.width > max_width && parcel.height > total_height) {
					return parcel;
				}
			});
		} else {
			fit_parcels = parcels.filter((parcel: any) => parcel.type !== 'box').filter((parcel: any) => {
				if (parcel.length > max_length && parcel.width > max_width && parcel.height > total_height) {
					return parcel;
				}
			});
		}
	} else if (parcels.length > 3) {
		if (check) {
			fit_parcels = parcels.filter((parcel: any) => {
				if (
					parcel.length > max_length &&
					parcel.width > max_width &&
					parcel.height > max_height + total_height * 0.5
				) {
					return parcel;
				}
			});
		} else {
			fit_parcels = parcels.filter((parcel: any) => parcel.type !== 'box').filter((parcel: any) => {
				if (
					parcel.length > max_length &&
					parcel.width > max_width &&
					parcel.height > max_height + total_height * 0.5
				) {
					return parcel;
				}
			});
		}
	}

	let parcel = { length: 0, width: 0, height: 0 };
	if (fit_parcels.length === 0) {
		const sorted_fit_parcels = parcels
			.filter((parcel: any) => parcel.type !== 'box')
			.sort((a: any, b: any) => (a.volume > b.volume ? -1 : 1));
		parcel = sorted_fit_parcels[0];
		console.log({ parcel });
		return parcel;
	}
	const sorted_fit_parcels = fit_parcels.sort((a: any, b: any) => (a.volume > b.volume ? 1 : -1));
	parcel = sorted_fit_parcels[0];
	console.log({ parcel });

	return parcel;
};

// const combinations = (a: any, m: any) => {
// 	const gc = (a: any) => {
// 		const fn = (n: any, src: any, got: any, all: any) => {
// 			if (n == 0) {
// 				if (got.length > 0) {
// 					all[all.length] = got;
// 				}
// 				return;
// 			}
// 			for (let j = 0; j < src.length; j++) {
// 				fn(n - 1, src.slice(j + 1), got.concat([ src[j] ]), all);
// 			}
// 			return;
// 		};
// 		const all: any = [];
// 		for (let i = 0; i < a.length; i++) {
// 			fn(i, a, [], all);
// 		}
// 		all.push(a);
// 		return all;
// 	};
// 	const c = gc(a);
// 	return c.filter((e: any) => {
// 		let n = e.length;
// 		let sum = 0;
// 		while (n--) sum += parseFloat(e[n]) || 0;
// 		return sum <= m;
// 	}, m);
// };
// // const a = [ 1, 3, 6, 10, -1 ];
// // combinations(a, 9);
