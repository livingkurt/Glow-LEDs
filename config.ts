import dotenv from 'dotenv';

dotenv.config();

export default {
	PORT: process.env.PORT || 5000,
	RESTORED_MONGODB_URI: process.env.RESTORED_MONGODB_URI,
	NEW_MONGODB_URI: process.env.NEW_MONGODB_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	DISPLAY_EMAIL: process.env.DISPLAY_EMAIL,
	EMAIL: process.env.EMAIL,
	PASSWORD: process.env.PASSWORD,
	REACT_APP_FILESTACK_API: process.env.REACT_APP_FILESTACK_API,
	REACT_APP_STRIPE_PUBLISHER_KEY: process.env.REACT_APP_STRIPE_PUBLISHER_KEY,
	REACT_APP_STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY,
	REACT_APP_STRIPE_TEST_PUBLISHER_KEY: process.env.REACT_APP_STRIPE_TEST_PUBLISHER_KEY,
	REACT_APP_STRIPE_TEST_SECRET_KEY: process.env.REACT_APP_STRIPE_TEST_SECRET_KEY,
	REACT_APP_STRIPE_LIVE_PUBLISHER_KEY: process.env.REACT_APP_STRIPE_LIVE_PUBLISHER_KEY,
	REACT_APP_STRIPE_LIVE_SECRET_KEY: process.env.REACT_APP_STRIPE_LIVE_SECRET_KEY
};
