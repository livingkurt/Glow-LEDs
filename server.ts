require('newrelic');
export {};
import sslRedirect from 'heroku-ssl-redirect';
// import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';
import template_routes from './email_templates/template_routes';
const config = require('./config');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const compression = require('compression');
const expressAttack = require('express-attack');
const requestIp = require('request-ip');
const scout = require('@scout_apm/scout-apm');
const express = require('express');

// The "main" function
async function start() {
	// Trigger the download and installation of the core-agent
	await scout.install({
		allowShutdown: true, // allow shutting down spawned scout-agent processes from this program
		monitor: true, // enable monitoring
		name: '',
		key: ''
	});

	mongoose
		.connect(config.RESTORED_MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		.catch((error: { reason: any }) => console.log(error.reason));

	// Initialize your express application
	const app = express();

	// Enable the app-wide scout middleware
	app.use(scout.expressMiddleware());

	// Add other middleware and routes
	// app.use( ... )
	// app.get( ... )

	app.all('*', function(req: any, res: any, next: any) {
		const origin = req.get('origin');
		res.header('Access-Control-Allow-Origin', origin);
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});
	// app.use(allowCrossDomain);
	app.use(cors());
	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ limit: '50mb' }));
	// app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(compression());
	app.use(sslRedirect());

	// Passport middleware
	app.use(passport.initialize());

	// Passport config
	require('./passport')(passport);
	// Bugsnag.notify(new Error('Test error'));

	app.use(routes);
	app.use('/api/templates', template_routes);

	// app.use('/', htmlRoutes);
	app.get('/api/config/paypal', (req: any, res: any) => {
		res.send(config.PAYPAL_CLIENT_ID);
	});

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static('client/build'));
	}

	app.get('*', (request: any, response: any) => {
		response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});

	app.listen(config.PORT, () => {
		console.log('Server started at http://localhost:5000');
	});

	// Start express
	app.start();
}

// If this script is executed directly, run the start function
if (require.main === module) {
	start();
}

// require('newrelic');
// export {};
// import sslRedirect from 'heroku-ssl-redirect';
// import express from 'express';
// import path from 'path';
// import mongoose from 'mongoose';
// import routes from './routes';
// import template_routes from './email_templates/template_routes';
// const config = require('./config');
// const cors = require('cors');
// require('dotenv').config();
// const passport = require('passport');
// const compression = require('compression');
// const expressAttack = require('express-attack');
// const requestIp = require('request-ip');
// const scout = require('@scout_apm/scout-apm');

// // const allowCrossDomain = function(req: any, res: any, next: any) {
// // 	res.header('Access-Control-Allow-Origin', '*');
// // 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// // 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

// // 	// intercept OPTIONS method
// // 	if ('OPTIONS' == req.method) {
// // 		res.send(200);
// // 	} else {
// // 		next();
// // 	}
// // };

// mongoose
// 	.connect(config.RESTORED_MONGODB_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true
// 	})
// 	.catch((error: { reason: any }) => console.log(error.reason));

// // Initialize your express application

// const app = express();

// app.all('*', function(req, res, next) {
// 	const origin = req.get('origin');
// 	res.header('Access-Control-Allow-Origin', origin);
// 	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
// 	next();
// });
// app.use(allowCrossDomain);
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
// // app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(compression());
// app.use(sslRedirect());

// // throttle request when given IP hit 50 times over 300 seconds
// function throttleByIp(req: any) {
// 	const clientIp = requestIp.getClientIp(req);

// 	return {
// 		key: clientIp,
// 		limit: 200,
// 		period: 60
// 	};
// }

// app.use(
// 	expressAttack({
// 		throttles: [ throttleByIp ]
// 	})
// );
// // Passport middleware
// app.use(passport.initialize());

// // Passport config
// require('./passport')(passport);
// // Bugsnag.notify(new Error('Test error'));

// app.use(routes);
// app.use('/api/templates', template_routes);

// // app.use('/', htmlRoutes);
// app.get('/api/config/paypal', (req, res) => {
// 	res.send(config.PAYPAL_CLIENT_ID);
// });

// app.use((req, res, next) => {
// 	const host = req.get('Host');
// 	if (host === 'http://Glow-LEDs.com') {
// 		return res.redirect(301, 'https://wwww.glow-leds.com/' + req.originalUrl);
// 	}
// 	if (host === 'Glow-LEDs.com') {
// 		return res.redirect(301, 'https://wwww.glow-leds.com/' + req.originalUrl);
// 	}
// 	if (host === 'http://glow-leds.com') {
// 		return res.redirect(301, 'https://wwww.glow-leds.com/' + req.originalUrl);
// 	}
// 	return next();
// });

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));
// }

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// app.listen(config.PORT, () => {
// 	console.log('Server started at http://localhost:5000');
// });
