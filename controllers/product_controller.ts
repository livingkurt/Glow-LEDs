import { Product } from '../models';
import { categories, snake_case, subcategories } from '../util';

export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			const collection = req.query.collection ? { product_collection: req.query.collection } : {};
			const page: any = req.query.page ? req.query.page : 1;
			const limit: any = req.query.limit ? req.query.limit : 21;
			console.log({ limit });
			const hidden: any = req.query.hidden
				? req.query.hidden === 'true' ? {} : { hidden: false }
				: { hidden: false };
			const option: any = req.query.option
				? { option: req.query.option === 'true' ? true : false }
				: { option: false };
			const chips = req.query.chip ? { chips: { $in: [ req.query.chip ] } } : {};
			// const chips = req.query.chip ? { chips: { $in: [ req.query.chip, '60203602dcf28a002a1a62ed' ] } } : {};
			let search = {};
			if (categories.includes(snake_case(req.query.search))) {
				search = req.query.search
					? {
							category: {
								$regex: snake_case(req.query.search),
								$options: 'i'
							}
						}
					: {};
			} else if (subcategories.includes(snake_case(req.query.search))) {
				search = req.query.search
					? {
							subcategory: {
								$regex: snake_case(req.query.search),
								$options: 'i'
							}
						}
					: {};
			} else {
				search = req.query.search
					? {
							name: {
								$regex: req.query.search.toLowerCase(),
								$options: 'i'
							}
						}
					: {};
			}

			let sortOrder = {};
			if (req.query.sortOrder === 'lowest') {
				sortOrder = { price: 1 };
			} else if (req.query.sortOrder === 'highest') {
				sortOrder = { price: -1 };
			} else if (req.query.sortOrder === 'newest') {
				sortOrder = { _id: -1 };
			} else if (req.query.sortOrder === 'hidden') {
				sortOrder = { hidden: -1 };
			} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
				sortOrder = { order: 1, _id: -1 };
			}

			const products = await Product.find({
				deleted: false,
				...category,
				...subcategory,
				...collection,
				...search,
				...chips,
				...option,
				...hidden
			})
				.sort(sortOrder)
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys')
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.exec();
			// console.log({ products });
			const count = await Product.countDocuments({
				deleted: false,
				...option,
				...hidden,
				...category,
				...subcategory,
				...collection,
				...search,
				...chips
			});
			// console.log({ products, count });

			res.json({
				products,
				totalPages: Math.ceil(count / limit),
				currentPage: parseInt(page)
			});

			// if (chips && Object.keys(chips).length === 0 && Object.getPrototypeOf(chips) === Object.prototype) {
			// 	// console.log('No Chip');
			// 	// res.send(products);
			// 	res.json({
			// 		products,
			// 		totalPages: Math.ceil(count / limit),
			// 		currentPage: parseInt(page)
			// 	});
			// } else {
			// 	// console.log('Yes Chip');
			// 	const glowskins = products.filter((product: any) => product.category === 'glowskins');
			// 	const glow_casings = products.filter((product: any) => product.category === 'glow_casings');
			// 	const accessories = products.filter((product: any) => product.category === 'accessories');
			// 	const diffusers = products.filter((product: any) => product.category === 'diffusers');
			// 	const diffuser_caps = products.filter((product: any) => product.category === 'diffuser_caps');
			// 	const decals = products.filter((product: any) => product.category === 'decals');
			// 	const exo_diffusers = products.filter((product: any) => product.category === 'exo_diffusers');
			// 	const glow_strings = products.filter((product: any) => product.category === 'glow_strings');

			// 	res.json({
			// 		products: [
			// 			...glowskins,
			// 			...glow_casings,
			// 			...accessories,
			// 			...exo_diffusers,
			// 			...decals,
			// 			...glow_strings,
			// 			...diffuser_caps,
			// 			...diffusers
			// 		],
			// 		totalPages: Math.ceil(count / limit),
			// 		currentPage: parseInt(page)
			// 	});
			// }
		} catch (error) {
			console.log({ findAll_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_all_options: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			const collection = req.query.collection ? { product_collection: req.query.collection } : {};
			// console.log({ category, collection });
			const chips = req.query.chip ? { chips: { $in: [ req.query.chip, '60203602dcf28a002a1a62ed' ] } } : {};
			const search = req.query.search
				? {
						name: {
							$regex: req.query.search,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'lowest') {
				sortOrder = { price: 1 };
			} else if (req.query.sortOrder === 'highest') {
				sortOrder = { price: -1 };
			} else if (req.query.sortOrder === 'newest') {
				sortOrder = { _id: -1 };
			} else if (req.query.sortOrder === 'hidden') {
				sortOrder = { hidden: -1 };
			} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
				sortOrder = { order: 1, _id: -1 };
			}

			const products = await Product.find({
				deleted: false,
				option: true,
				...category,
				...subcategory,
				...collection,
				...search,
				...chips
			})
				.sort(sortOrder)
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
			// console.log({ products });

			res.send(products);
		} catch (error) {
			console.log({ get_all_options_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_all_diffuser_caps: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			const collection = req.query.collection ? { product_collection: req.query.collection } : {};
			// console.log({ category, collection });
			const chips = req.query.chip ? { chips: { $in: [ req.query.chip, '60203602dcf28a002a1a62ed' ] } } : {};
			const search = req.query.search
				? {
						name: {
							$regex: req.query.search,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'lowest') {
				sortOrder = { price: 1 };
			} else if (req.query.sortOrder === 'highest') {
				sortOrder = { price: -1 };
			} else if (req.query.sortOrder === 'newest') {
				sortOrder = { _id: -1 };
			} else if (req.query.sortOrder === 'hidden') {
				sortOrder = { hidden: -1 };
			} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
				sortOrder = { order: 1, _id: -1 };
			}

			const products = await Product.find({
				deleted: false,
				category: 'diffuser_caps',
				...category,
				...subcategory,
				...collection,
				...search,
				...chips
			})
				.sort(sortOrder)
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
			// console.log({ products });

			res.send(products);
		} catch (error) {
			console.log({ get_all_diffuser_caps_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const product = await Product.findOne({ pathname: req.params.pathname })
				.populate('chips')
				.populate('products')
				.populate('color_products')
				.populate('secondary_color_products')
				.populate({
					path: 'secondary_products',
					populate: [
						{
							path: 'color_products'
						},
						{
							path: 'secondary_color_products'
						},
						{
							path: 'option_products'
						},
						{
							path: 'secondary_color_products'
						}
					]
				})
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');

			if (product) {
				res.send(product);
			} else {
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ findById_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			// console.log({ body: req.body });
			const newProduct = await Product.create(req.body);
			if (newProduct) {
				return res.status(201).send(newProduct);
			} else {
				return res.status(500).send({ message: ' Error in Creating Product.' });
			}
		} catch (error) {
			console.log({ create_products_error: error });

			res.status(500).send({ error, message: 'Error Creating Product' });
		}
	},
	create_product_option: async (req: any, res: any) => {
		try {
			// console.log({ body: req.body });
			const newProduct = await Product.create(req.body);
			if (newProduct) {
				return res.status(201).send({ message: 'New Product Created', data: newProduct });
			} else {
				return res.status(500).send({ message: ' Error in Creating Product.' });
			}
		} catch (error) {
			console.log({ create_product_option_products_error: error });
			res.status(500).send({ error, message: 'Error Creating Product' });
		}
	},

	update: async (req: any, res: any) => {
		try {
			// console.log({ product_routes_put: req.body });
			// console.log({ product_options: req.body.product_options });
			const productId = req.params.pathname;
			// console.log({ productId });
			const product = await Product.findById(productId);
			// console.log({ product });
			if (product) {
				const updatedProduct = await Product.updateOne({ _id: productId }, req.body);
				// console.log({ updatedProduct });
				if (updatedProduct) {
					return res.status(200).send(updatedProduct);
				}
			} else {
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ update_products_error: error });

			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Product Deleted' };
			const deleted_product = await Product.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_product) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ remove_products_error: error });

			res.status(500).send({ error, message: 'Error Deleting Product' });
		}
	},
	get_all_imperfect: async (req: any, res: any) => {
		try {
			console.log('Imperfect');
			const products = await Product.find({ deleted: false, subcategory: 'imperfect' }).sort({ order: -1 });
			// console.log({ products });
			if (products) {
				res.send(products);
			} else {
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ get_all_imperfect_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_products_by_category: async (req: any, res: any) => {
		try {
			const category = req.query.category && req.query.category !== 'all' ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			console.log({ category, subcategory });
			// const products = await Product.find({
			// 	deleted: false,
			// 	...category,
			// 	...subcategory			// }).sort({ _id: -1 });

			const products = await Product.find({
				deleted: false,
				hidden: false,
				option: false,
				...category,
				...subcategory
			})
				.sort({ order: 1 })
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
			// console.log({ products });

			res.send(products);
		} catch (error) {
			console.log({ get_products_by_category_products_error: error });
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_all_products: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false }).sort({ order: 1, _id: -1 });

			res.send(products);
		} catch (error) {
			console.log({ get_all_products_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_shown: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false, hidden: false });

			res.send(products);
		} catch (error) {
			console.log({ get_shown_products_error: error });
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_caps: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false, hidden: false, category: 'diffuser_caps' });

			res.send(products);
		} catch (error) {
			console.log({ get_caps_products_error: error });
			res.status(500).send({ error, message: 'Error Getting Original Caps' });
		}
	},
	get_mega_caps: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false, hidden: false, category: 'mega_diffuser_caps' });

			res.send(products);
		} catch (error) {
			console.log({ get_mega_caps_products_error: error });
			res.status(500).send({ error, message: 'Error Getting Mega Caps' });
		}
	},
	get_essentials: async (req: any, res: any) => {
		try {
			// const occurences = req.body.occurences;
			// console.log(occurences[0]);
			const names = [
				'Bulk CR1620 Batteries',
				'Bulk CR1225 Batteries',
				'Glow Strings V2 50 LED / 3.5m',
				'Wiffle Ball EXO Diffusers',
				'Dome Diffusers',
				'Coinskins V2',
				'Visor Diffusers',
				'Hybridskins',
				'Diffuser Caps + Adapters Starter Kit',
				'Space Cadet Diffuser Caps',
				'Apollo Glow Casings',
				'1225 Coin Battery Dispenser',
				'1620 Coin Battery Dispenser',
				'Coin Battery Storage'
			];
			console.log({ names });
			const products = await Product.find({ name: { $in: names } });
			// console.log({ products });
			if (products) {
				res.send(products);
			} else {
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ get_essentials_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_best_sellers: async (req: any, res: any) => {
		try {
			const occurences = req.body.occurences;

			const names = [
				occurences[0].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[0].name,
				occurences[1].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[1].name,
				occurences[2].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[2].name,
				occurences[3].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[3].name,
				occurences[4].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[4].name,
				occurences[5].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[5].name,
				occurences[6].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[6].name,
				occurences[7].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[7].name,
				occurences[8].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[8].name,
				occurences[9].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[9].name,
				occurences[10].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[10].name
			];
			console.log({ names });
			const products = await Product.find({ name: { $in: names } });
			// console.log({ products });
			if (products) {
				res.send(products);
			} else {
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ get_best_sellers_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_options: async (req: any, res: any) => {
		try {
			const product = await Product.findOne({ pathname: req.params.pathname }).populate('chips');

			if (product) {
				res.send(product);
			} else {
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ get_options_products_error: error });

			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_all_categories: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false }).sort({ category: 1 });
			const categories = products.map((product: any) => product.category);
			const no_dups_categories = categories.filter(
				(value: any, index: any) => categories.indexOf(value) === index
			);
			console.log({ no_dups_categories });
			res.send(no_dups_categories);
		} catch (error) {
			console.log({ get_all_categories_products_error: error });
		}
	},
	get_all_subcategories: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false }).sort({ category: 1 });
			const subcategories = products.map((product: any) => product.subcategory);
			const no_dups_subcategories = subcategories.filter(
				(value: any, index: any) => subcategories.indexOf(value) === index
			);
			res.send(no_dups_subcategories);
		} catch (error) {
			console.log({ products_error: error });
		}
	},
	get_images: async (req: any, res: any) => {
		// try {
		try {
			console.log(req.params.category);
			// const product = await Product.findOne({category: req.params.category});
			const product = await Product.findOne(
				{ category: 'diffuser_caps' },
				{},
				{ sort: { createdAt: -1 } },
				function(err: any, product: any) {
					console.log(product);
					console.log(product.images[0]);
					res.json(product.images[0]);
				}
			);
		} catch (error) {
			console.log({ get_images_products_error: error });
		}
	},
	update_stock: async (req: any, res: any) => {
		const { cartItems } = req.body;
		const save_product = async (id: string, qty: number) => {
			const product: any = await Product.findOne({ _id: id });
			console.log({ product });
			const new_count = product.count_in_stock - qty;
			console.log({ id, new_count });
			if (product.finite_stock) {
				console.log({ finite_stock: 'Hello' });
				if (new_count <= 0) {
					product.quantity = 30;
					product.count_in_stock = 0;
				} else if (product.count_in_stock <= product.quantity) {
					product.quantity = new_count;
					product.count_in_stock = new_count;
				} else {
					product.count_in_stock = new_count;
				}

				if (product) {
					const request = await product.save();
					res.status(200).send(request);
				}
			}
		};
		try {
			cartItems.forEach(async (item: any) => {
				console.log({ item });
				if (item.finite_stock) {
					save_product(item.product, item.qty);
				} else if (item.option_product) {
					save_product(item.option_product, item.qty);
				} else if (item.secondary_product) {
					save_product(item.secondary_product, item.qty);
				} else if (item.color_product) {
					save_product(item.color_product, item.qty);
				} else if (item.secondary_color_product) {
					save_product(item.secondary_color_product, item.qty);
				}
			});
		} catch (error) {
			console.log({ update_stock_products_error: error });
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	save_item_group_id: async (req: any, res: any) => {
		try {
			const option = req.body.option;
			const item_group = req.body.item_group;
			// console.log({ option, item_group });
			const product = await Product.findById(option._id);
			console.log({ option: option._id, price: item_group.price });
			if (product && option._id && item_group.price) {
				const updatedProduct = await Product.updateOne(
					{ _id: option._id },
					{ ...req.body, price: item_group.price }
				);
				// console.log({ updatedProduct });
				if (updatedProduct) {
					return res.status(200).send(updatedProduct);
				}
			} else {
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ save_item_group_id_products_error: error });

			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	update_product_order: async (req: any, res: any) => {
		try {
			const product_id = req.body.product._id;
			const order = req.body.order;
			console.log({ product_id });
			const product = await Product.findById(product_id);
			console.log({ product });
			if (product) {
				const updatedProduct = await Product.updateOne(
					{ _id: product_id },
					{ ...req.body.product, order: order }
				);
				console.log({ updatedProduct });
				if (updatedProduct) {
					return res.status(200).send(updatedProduct);
				}
			} else {
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ update_product_order_products_error: error });

			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	update_product_option_stock: async (req: any, res: any) => {
		try {
			// console.log({ product_id: req.body.product_id });
			// console.log({ quantity_state: req.body.quantity_state });
			// console.log({ product_option: req.body.product_option });
			console.log('update_product_option_stock');
			const product_id = req.body.product_id;
			const product_option = req.body.product_option;
			const quantity_state = req.body.quantity_state;
			// console.log({ product_id });
			const product = await Product.findById(product_id);
			// console.log({ product });
			if (product) {
				console.log({ product });
				// const option = product.product_options.find((option: any) => option.name === product_option.name);
				// console.log({ option });
				const index = product.product_options.findIndex((option: any) => option.name === product_option.name);
				console.log({ index });
				const product_options = [ ...product.product_options ];
				product_options[index] = {
					...product_option,
					quantity_state: quantity_state
				};
				console.log({ product_options });
				const updatedProduct = await Product.updateOne({ _id: product_id }, { ...req.body, product_options });
				console.log({ updatedProduct });
				if (updatedProduct) {
					return res.status(200).send(updatedProduct);
				}
			} else {
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ update_product_option_stock_products_error: error });
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	update_pathname: async (req: any, res: any) => {
		try {
			console.log({ product_routes_put: req.body });

			const product_id = req.body.product_id;
			const pathname = req.body.pathname;
			const body = req.body.product;
			console.log({ product_id });
			const product = await Product.findById(product_id);
			console.log({ product });
			if (product) {
				const updatedProduct = await Product.updateOne({ _id: product_id }, { ...body, pathname: pathname });
				console.log({ updatedProduct });
				if (updatedProduct) {
					return res.status(200).send(updatedProduct);
				}
			} else {
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ update_pathname_products_error: error });

			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	reviews: async (req: any, res: any) => {
		try {
			console.log(req.body);
			console.log({ pathname: req.params.pathname });
			const product = await Product.findOne({ pathname: req.params.pathname });
			if (product) {
				product.reviews = [
					...product.reviews,
					{
						user: req.body.userInfo._id,
						first_name: req.body.userInfo.first_name,
						last_name: req.body.userInfo.last_name,
						rating: Number(req.body.review.rating),
						comment: req.body.review.comment
					}
				];
				console.log({ reviews: product.reviews });
				product.numReviews = product.reviews.length;
				product.rating =
					product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;
				console.log({ product });
				const updatedProduct = await product.save();
				if (updatedProduct) {
					res.status(201).send({
						data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
						message: 'Review saved successfully.'
					});
				}
			} else {
				res.status(404).send({ message: 'Product Not Found' });
			}
		} catch (error) {
			console.log({ reviews_products_error: error });

			res.status(500).send({ error, message: 'Error Creating Product Review' });
		}
	}
};
