export {};
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const { user_routes, product_routes, order_routes, email_routes } = require('./routes/index');
const Product = require('./models/product');

mongoose
	.connect(config.RESTORED_MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', user_routes);
app.use('/api/products', product_routes);
app.use('/api/orders', order_routes);
app.use('/api/emails', email_routes);
app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.put('/api/all', async (req, res) => {
	const product = await Product.updateMany({
		// $rename: { shipping_price: 'volume' }
		$set: { deleted: false }
		// $unset: { shipping_price: 1 }
	});
	res.send(product);
});

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.PORT, () => {
	console.log('Server started at http://localhost:5000');
});
