export {};
import jwt from 'jsonwebtoken';
const config = require('./config');
import { Request } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
	user: any; // or any other type
}

export const getToken = (user: { _id: any; first_name: any; last_name: any; email: any; isAdmin: any }) => {
	return jwt.sign(
		{
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			isAdmin: user.isAdmin
		},
		config.JWT_SECRET,
		{
			expiresIn: '48h'
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
