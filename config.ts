import dotenv from 'dotenv';

dotenv.config();

export default {
	PORT: process.env.PORT || 5000,
	RESTORED_MONGODB_URI: process.env.RESTORED_MONGODB_URI,
	NEW_MONGODB_URI: process.env.NEW_MONGODB_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
};
