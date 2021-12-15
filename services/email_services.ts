import { email_db, user_db } from '../db';
import { determine_filter } from '../util';
require('dotenv').config();

export default {
	findAll_emails_s: async (query: any) => {
		try {
			const search = query.search
				? {
						email_type: {
							$regex: query.search,
							$options: 'i'
						}
					}
				: {};
			const filter = determine_filter(query, search);
			const sort_query = query.sort && query.sort.toLowerCase();
			let sort: any = { _id: -1 };
			if (sort_query === 'email type') {
				sort = { email_type: 1 };
			} else if (sort_query === 'newest') {
				sort = { _id: -1 };
			}

			return await email_db.findAll_emails_db(filter, sort);
		} catch (error) {
			console.log({ findAll_emails_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_emails_s: async (params: any) => {
		try {
			return await email_db.findById_emails_db(params.id);
		} catch (error) {
			console.log({ findById_emails_s_error: error });
			throw new Error(error.message);
		}
	},
	create_emails_s: async (body: any) => {
		try {
			return await email_db.create_emails_db(body);
		} catch (error) {
			console.log({ create_emails_s_error: error });
			throw new Error(error.message);
		}
	},
	update_emails_s: async (params: any, body: any) => {
		try {
			return await email_db.update_emails_db(params.id, body);
		} catch (error) {
			console.log({ update_emails_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_emails_s: async (params: any) => {
		try {
			return await email_db.remove_emails_db(params.id);
		} catch (error) {
			console.log({ remove_emails_s_error: error });
			throw new Error(error.message);
		}
	},
	send_emails_s: async (body: any) => {
		const test = [ 'lavacquek@icloud.com' ];
		const email: any = body.test ? test : body.email ? body.email : process.env.EMAIL;
		const mailOptions = {
			to: email,
			from: process.env.DISPLAY_EMAIL,
			subject: body.subject,
			html: body.template
		};
		return mailOptions;
	},
	send_all_emails_s: async (body: any) => {
		// const users = await User.find({ deleted: false, email_subscription: true });
		const users = await user_db.findAll_users_db({ deleted: false, email_subscription: true }, {});
		const all_emails = users
			.filter((user: any) => user.deleted === false)
			.filter((user: any) => user.email_subscription === true)
			.map((user: any) => user.email);
		console.log({ all_emails });
		const test = [
			'lavacquek@icloud.com',
			'lavacquek@gmail.com',
			'livingkurt222@gmail.com',
			'destanyesalinas@gmail.com',
			'zestanye@gmail.com'
		];
		const emails: any = body.test ? test : all_emails;
		console.log({ emails });
		const mailOptions = {
			to: body.email ? body.email : process.env.EMAIL,
			from: process.env.DISPLAY_EMAIL,
			subject: body.subject,
			html: body.template,
			bcc: emails
		};
		return mailOptions;
	}
};
