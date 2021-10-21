import dotenv from 'dotenv';

dotenv.config();

module.exports = {
	PORT: process.env.PORT || 5000,
	RESTORED_MONGODB_URI: process.env.RESTORED_MONGODB_URI,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	GOOGLE_SHEETS_PRIVATE: process.env.GOOGLE_SHEETS_PRIVATE
	// MONGODB_URL: process.env.MONGODB_URI || 'mongodb://livingkurt:07QXtrAS7vN7gp4G@ds217349.mlab.com:17349/heroku_vljhv1ts',
};

// export default {
// 	PORT: process.env.PORT || 5000,
// 	RESTORED_MONGODB_URI: process.env.RESTORED_MONGODB_URI,
// 	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
// 	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
// 	// MONGODB_URL: process.env.MONGODB_URI || 'mongodb://livingkurt:07QXtrAS7vN7gp4G@ds217349.mlab.com:17349/heroku_vljhv1ts',
// };
