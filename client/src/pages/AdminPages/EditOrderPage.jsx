import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveOrder, detailsOrder } from '../../actions/orderActions';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { listProducts } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions';
import { API_External, API_Products } from '../../utils';
import { isError } from 'util';

const EditOrderPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ orderItems, set_orderItems ] = useState([ {} ]);
	const [ order_items, set_order_items ] = useState([ {} ]);
	const [ shipping, set_shipping ] = useState({});
	const [ user, set_user ] = useState('');
	const [ display_image, set_display_image ] = useState('');
	const [ payment, set_payment ] = useState({});
	const [ itemsPrice, set_itemsPrice ] = useState(0);
	const [ taxPrice, set_taxPrice ] = useState(0);
	const [ shippingPrice, set_shippingPrice ] = useState(0);
	const [ totalPrice, set_totalPrice ] = useState(0);
	const [ isPaid, set_isPaid ] = useState(false);
	const [ paidAt, set_paidAt ] = useState();
	const [ isManufactured, set_isManufactured ] = useState(false);
	const [ manufacturedAt, set_manufacturedAt ] = useState('');
	const [ isPackaged, set_isPackaged ] = useState(false);
	const [ packagedAt, set_packagedAt ] = useState();
	const [ isShipped, set_isShipped ] = useState(false);
	const [ shippedAt, set_shippedAt ] = useState('');
	const [ isDelivered, set_isDelivered ] = useState(false);
	const [ deliveredAt, set_deliveredAt ] = useState();
	const [ isRefunded, set_isRefunded ] = useState(false);
	const [ refundedAt, set_refundedAt ] = useState('');
	const [ createdAt, set_createdAt ] = useState('');
	const [ order_note, set_order_note ] = useState('');
	const [ tax_rate, set_tax_rate ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ tracking_number, set_tracking_number ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ loading_tax_rate, set_loading_tax_rate ] = useState(false);
	const [ order_products, set_order_products ] = useState(false);
	const [ update_total_prices, set_update_total_prices ] = useState(true);
	// const [ product_option, set_product_option ] = useState({});
	// const [ product_option_images, set_product_option_images ] = useState([] ]);

	const history = useHistory();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const dispatch = useDispatch();

	console.log({ order });

	const set_state = () => {
		set_id(order._id);
		set_user(order.user && order.user._id);
		set_orderItems(order.orderItems);
		set_order_items(order.orderItems);
		set_shipping(order.shipping);
		set_payment(order.payment);
		set_itemsPrice(order.itemsPrice);
		set_taxPrice(order.taxPrice);
		set_shippingPrice(order.shippingPrice);
		set_totalPrice(order.totalPrice);
		set_isPaid(order.isPaid);

		if (order.createdAt) {
			set_createdAt(format_date(order.createdAt));
		}
		if (order.paidAt) {
			set_paidAt(format_date(order.paidAt));
		}
		set_isManufactured(order.isManufactured);
		if (order.manufacturedAt) {
			set_manufacturedAt(format_date(order.manufacturedAt));
		}
		set_isPackaged(order.isPackaged);
		if (order.packagedAt) {
			set_packagedAt(format_date(order.packagedAt));
		}
		set_isShipped(order.isShipped);
		if (order.shippedAt) {
			set_shippedAt(format_date(order.shippedAt));
		}
		set_isDelivered(order.isDelivered);
		if (order.deliveredAt) {
			set_deliveredAt(format_date(order.deliveredAt));
		}
		set_isRefunded(order.isRefunded);
		if (order.refundedAt) {
			set_refundedAt(format_date(order.refundedAt));
		}

		set_order_note(order.order_note);
		set_promo_code(order.promo_code);
		set_tracking_number(order.tracking_number);
		// set_product_option_images(
		// 	product.product_options && product.product_options.map((option, index) => option.images)
		// );

		// console.log(format_date(order.isManufactured));
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_orderItems([ {} ]);
		set_shipping('');
		set_payment('');
		set_itemsPrice('');
		set_taxPrice('');
		set_shippingPrice('');
		set_totalPrice('');
		set_isPaid('');
		set_paidAt('');
		set_isManufactured('');
		set_manufacturedAt('');
		set_isPackaged('');
		set_packagedAt('');
		set_isShipped('');
		set_shippedAt('');
		set_isDelivered('');
		set_deliveredAt('');
		set_isRefunded('');
		set_refundedAt('');
		set_order_note('');
		set_promo_code('');
		set_tracking_number('');
		// set_product_option({});
	};

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				dispatch(detailsOrder(props.match.params.id));
				dispatch(detailsOrder(props.match.params.id));
				dispatch(listProducts(''));
				dispatch(listUsers(''));
			} else {
				dispatch(detailsOrder(''));
			}
			set_state();
			return () => {};
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			if (order) {
				console.log('Set');
				set_state();
				get_products(order.orderItems);
			} else {
				console.log('UnSet');
				unset_state();
				set_orderItems([ {} ]);
			}

			return () => {};
		},
		[ order ]
	);

	const submitHandler = (e) => {
		console.log({ user });
		e.preventDefault();
		dispatch(
			saveOrder({
				_id: id,
				user,
				orderItems,
				shipping,
				payment,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
				isPaid,
				paidAt,
				isManufactured,
				manufacturedAt: manufacturedAt && unformat_date(manufacturedAt),
				isPackaged,
				packagedAt: packagedAt && unformat_date(packagedAt),
				isShipped,
				shippedAt: shippedAt && unformat_date(shippedAt),
				isDelivered,
				deliveredAt: deliveredAt && unformat_date(deliveredAt),
				isRefunded,
				refundedAt: refundedAt && unformat_date(refundedAt),
				createdAt: createdAt && unformat_date(createdAt),
				order_note,
				promo_code,
				tracking_number
				// product_option
			})
		);
		e.target.reset();
		unset_state();
		history.push(props.location.previous_path || '/secure/glow/orders?page=1');
	};

	const add_order_item = (e) => {
		e.preventDefault();
		set_orderItems((items) => [ ...items, { product_option: {} } ]);
	};

	const remove_order_item = async (order_item_index, e) => {
		e.preventDefault();
		const new_order_items = order_items.filter((order_item, index) => {
			return order_item_index !== index;
		});
		set_orderItems((order_item) =>
			order_item.filter((order_item, index) => {
				return order_item_index !== index;
			})
		);
		console.log({ orderItems: [ ...new_order_items ] });
		const price_items = [ ...new_order_items ].reduce((a, c) => a + c.price * c.qty, 0);
		// [ ...new_order_items ].forEach((item) => console.log(item.price));

		set_itemsPrice(price_items);
		const rate_tax = await get_tax_rates();
		console.log({ rate_tax });
		const tax = rate_tax * price_items;
		console.log({ price_items });
		console.log({ tax });
		console.log({ shippingPrice });
		set_taxPrice(tax);
		set_totalPrice(price_items + shippingPrice + tax);
	};

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const update_order_item = async (e, index) => {
		const order_item = JSON.parse(e.target.value);
		let new_order_items = [ ...orderItems ];
		new_order_items[index] = {
			...new_order_items[index],
			name: order_item.name,
			qty: orderItems[index].qty || 1,
			display_image: order_item.images[0],
			price: order_item.price,
			category: order_item.category,
			pathname: order_item.pathname,
			// sale_price: orderItems[index].sale_price,
			package_volume: order_item.package_volume,
			weight_pounds: order_item.weight_pounds,
			weight_ounces: order_item.weight_ounces,
			package_length: order_item.package_length,
			package_width: order_item.package_width,
			package_height: order_item.package_height,
			product_option: order_item.product_options.find((option) => option.default === true),
			reviewed: order_item.reviewed,
			product: { _id: order_item._id },
			color_products: order_item.color_products,
			secondary_color_products: order_item.secondary_color_products,
			option_products: order_item.option_products,
			secondary_products: order_item.secondary_products,
			color_group_name: order_item.color_group_name,
			secondary_color_group_name: order_item.secondary_color_group_name,
			option_group_name: order_item.option_group_name,
			secondary_group_name: order_item.secondary_group_name
		};
		set_orderItems(new_order_items);
		set_orderItems(new_order_items);
		if (update_total_prices) {
			const price_items = [ ...new_order_items ].reduce((a, c) => a + c.price * c.qty, 0);
			set_itemsPrice(price_items);
			const rate_tax = await get_tax_rates();
			const tax = rate_tax * price_items;
			set_taxPrice(tax);
			set_totalPrice(price_items + shippingPrice + tax);
		}
	};

	const get_tax_rates = async () => {
		set_taxPrice(0);
		set_loading_tax_rate(true);
		const { data } = await API_External.get_tax_rates();
		const tax_rate = parseFloat(data[shipping.state]) / 100;

		if (isNaN(tax_rate)) {
			console.log('Not a Number');
		} else {
			console.log({ [shipping.state]: tax_rate });
			set_tax_rate(tax_rate);
			if (shipping.international) {
				set_taxPrice(0);
				return;
			}
			return tax_rate;
		}
		set_loading_tax_rate(false);
	};

	const update_order_item_property = (value, field_name, index) => {
		console.log({ value, field_name, index });
		let new_order_items = [ ...orderItems ];
		new_order_items[index] = {
			...new_order_items[index],
			[field_name]: value
		};
		set_orderItems(new_order_items);
		console.log({ orderItems });
	};

	const update_order_item_property_by_template = (value, field_name, index) => {
		const option = JSON.parse(value);
		console.log({ value, field_name, index });
		let new_order_items = [ ...orderItems ];
		if (field_name === 'color_product') {
			new_order_items[index] = {
				...new_order_items[index],
				color: option.color,
				color_code: option.color_code,
				color_product_name: option.name,
				color_product: option._id,
				display_image: option.images.length > 0 ? option.images[0] : orderItems[index].display_image
			};
		}
		if (field_name === 'secondary_color_product') {
			new_order_items[index] = {
				...new_order_items[index],
				secondary_color: option.color,
				secondary_color_code: option.color_code,
				secondary_color_product_name: option.name,
				secondary_color_product: option._id,
				display_image: option.images.length > 0 ? option.images[0] : orderItems[index].display_image
			};
		}
		if (field_name === 'option_product') {
			new_order_items[index] = {
				...new_order_items[index],
				option_product_name: option.name,
				option_product: option._id,
				size: option.size,
				display_image: option.images.length > 0 ? option.images[0] : orderItems[index].display_image
			};
		}
		if (field_name === 'secondary_product') {
			new_order_items[index] = {
				...new_order_items[index],
				secondary_product_name: option.name,
				secondary_product: option._id,
				display_image: option.images.length > 0 ? option.images[0] : orderItems[index].display_image
			};
		}
		set_orderItems(new_order_items);

		console.log({ orderItems });
	};

	const get_products = async (orderItems) => {
		const products = await Promise.all(
			orderItems.map(async (item) => {
				const { data } = await API_Products.get_product(item.pathname);
				return data;
			})
		);
		console.log({ products });
		set_order_products(products);
	};

	const update_shipping_price = (e) => {
		set_shippingPrice(e.target.value);
		set_totalPrice(itemsPrice + parseFloat(e.target.value) + taxPrice);
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Order' : 'Create Order'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{order && (
							<div>
								<Helmet>
									<title>Edit Order | Glow LEDs</title>
								</Helmet>

								<ul
									className="edit-form-container"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											<li>
												<label htmlFor="user">User</label>
												<input
													type="text"
													name="user"
													defaultValue={user}
													id="user"
													onChange={(e) => set_user(e.target.value)}
												/>
											</li>
											{users && (
												<div className="ai-c h-25px mv-10px mb-30px jc-c">
													<div className="custom-select w-100per">
														<select
															className="qty_select_dropdown w-100per"
															onChange={(e) => set_user(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose User---
															</option>
															{users.map((user, index) => (
																<option key={index} value={user._id}>
																	{user.first_name} {user.last_name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											)}

											<h2>Shipping</h2>
											<li>
												<label htmlFor="email">Email</label>
												<input
													type="text"
													defaultValue={shipping && shipping.email}
													name="email"
													id="email"
													onChange={(e) =>
														set_shipping({ ...shipping, email: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="first_name">First Name</label>
												<input
													type="text"
													defaultValue={shipping && shipping.first_name}
													name="first_name"
													id="first_name"
													onChange={(e) =>
														set_shipping({ ...shipping, first_name: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="last_name">Last Name</label>
												<input
													type="text"
													defaultValue={shipping && shipping.last_name}
													name="last_name"
													id="last_name"
													onChange={(e) =>
														set_shipping({ ...shipping, last_name: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="address_1">Address</label>
												<input
													type="text"
													defaultValue={shipping && shipping.address_1}
													name="address_1"
													id="address_1"
													onChange={(e) =>
														set_shipping({ ...shipping, address_1: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="address_2">Apt/Suite</label>
												<input
													type="text"
													defaultValue={shipping && shipping.address_2}
													name="address_2"
													id="address_2"
													onChange={(e) =>
														set_shipping({ ...shipping, address_2: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="city">City</label>
												<input
													type="text"
													defaultValue={shipping && shipping.city}
													name="city"
													id="city"
													onChange={(e) =>
														set_shipping({ ...shipping, city: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="state">State</label>
												<input
													type="text"
													defaultValue={shipping && shipping.state}
													name="state"
													id="state"
													onChange={(e) =>
														set_shipping({ ...shipping, state: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="postalCode">Postal Code</label>
												<input
													type="text"
													defaultValue={shipping && shipping.postalCode}
													name="postalCode"
													id="postalCode"
													onChange={(e) =>
														set_shipping({ ...shipping, postalCode: e.target.value })}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="international">International</label>
													<input
														type="checkbox"
														name="international"
														// defaultChecked={international ? 'checked' : 'unchecked'}
														defaultValue={shipping && shipping.international}
														defaultChecked={shipping && shipping.international}
														defaultValue={shipping && shipping.international}
														id="international"
														onChange={(e) =>
															set_shipping({
																...shipping,
																international: e.target.value
															})}
													/>
												</li>
											)}
											<li>
												<label htmlFor="country">Country</label>
												<input
													type="text"
													value={shipping && shipping.country}
													name="country"
													id="country"
													onChange={(e) =>
														set_shipping({ ...shipping, country: e.target.value })}
												/>
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>Payment</h2>
											<li>
												<label htmlFor="payment">Payment</label>
												<input
													type="text"
													name="payment"
													value={payment}
													id="payment"
													onChange={(e) => set_payment(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="payment">Payment Method</label>
												<input
													type="text"
													name="payment"
													defaultValue={payment.paymentMethod}
													id="payment"
													onChange={(e) =>
														set_payment({ ...payment, paymentMethod: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="itemsPrice">Items Price</label>
												<input
													type="text"
													name="itemsPrice"
													value={itemsPrice}
													id="itemsPrice"
													onChange={(e) => set_itemsPrice(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="taxPrice">Tax Price</label>
												<input
													type="text"
													name="taxPrice"
													value={taxPrice}
													id="taxPrice"
													onChange={(e) => set_taxPrice(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="shippingPrice">Shipping Price</label>
												<input
													type="text"
													name="shippingPrice"
													value={shippingPrice}
													id="shippingPrice"
													onChange={(e) => {
														update_shipping_price(e);
													}}
												/>
											</li>
											<li>
												<label htmlFor="totalPrice">Total Price</label>
												<input
													type="text"
													name="totalPrice"
													value={totalPrice}
													id="totalPrice"
													onChange={(e) => set_totalPrice(e.target.value)}
												/>
											</li>
											<h2>Other Info</h2>
											<li>
												<label htmlFor="order_note">Order Note</label>
												<input
													type="text"
													name="order_note"
													value={order_note}
													id="order_note"
													onChange={(e) => set_order_note(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="promo_code">Promo Code</label>
												<input
													type="text"
													name="promo_code"
													value={promo_code}
													id="promo_code"
													onChange={(e) => set_promo_code(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="tracking_number">Tracking Number</label>
												<input
													type="text"
													name="tracking_number"
													value={tracking_number}
													id="tracking_number"
													onChange={(e) => set_tracking_number(e.target.value)}
												/>
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>Order State</h2>
											<li>
												<label htmlFor="createdAt">Created At</label>
												<input
													type="text"
													name="createdAt"
													value={createdAt}
													id="createdAt"
													onChange={(e) => set_createdAt(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isPaid">Paid?</label>
													<input
														type="checkbox"
														name="isPaid"
														// defaultChecked={isPaid ? 'checked' : 'unchecked'}
														// defaultValue={isPaid}
														defaultChecked={isPaid}
														// value={isPaid ? '1' : '0'}
														id="isPaid"
														onChange={(e) => {
															set_isPaid(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="paidAt">Paid At</label>
												<input
													type="text"
													name="paidAt"
													value={paidAt}
													id="paidAt"
													onChange={(e) => set_paidAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isManufactured">Manufactured?</label>
													<input
														type="checkbox"
														name="isManufactured"
														// defaultChecked={isManufactured ? 'checked' : 'unchecked'}
														// defaultValue={isManufactured}
														defaultChecked={isManufactured}
														// value={isManufactured ? '1' : '0'}
														id="isManufactured"
														onChange={(e) => {
															set_isManufactured(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="manufacturedAt">Manufactured At</label>
												<input
													type="text"
													name="manufacturedAt"
													value={manufacturedAt}
													id="manufacturedAt"
													onChange={(e) => set_manufacturedAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isPackaged">Packaged?</label>
													<input
														type="checkbox"
														name="isPackaged"
														// defaultChecked={isPackaged ? 'checked' : 'unchecked'}
														// defaultValue={isPackaged}
														defaultChecked={isPackaged}
														// value={isPackaged ? '1' : '0'}
														id="isPackaged"
														onChange={(e) => {
															set_isPackaged(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="packagedAt">Packaged At</label>
												<input
													type="text"
													name="packagedAt"
													value={packagedAt}
													id="packagedAt"
													onChange={(e) => set_packagedAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isShipped">Shipped?</label>
													<input
														type="checkbox"
														name="isShipped"
														// defaultChecked={isShipped ? 'checked' : 'unchecked'}
														// defaultValue={isShipped}
														defaultChecked={isShipped}
														// value={isShipped ? '1' : '0'}
														id="isShipped"
														onChange={(e) => {
															set_isShipped(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="shippedAt">Shipped At</label>
												<input
													type="text"
													name="shippedAt"
													value={shippedAt}
													id="shippedAt"
													onChange={(e) => set_shippedAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isDelivered">Delivered?</label>
													<input
														type="checkbox"
														name="isDelivered"
														// defaultChecked={isDelivered ? 'checked' : 'unchecked'}
														// defaultValue={isDelivered}
														defaultChecked={isDelivered}
														// value={isDelivered ? '1' : '0'}
														id="isDelivered"
														onChange={(e) => {
															set_isDelivered(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="deliveredAt">Delivered At</label>
												<input
													type="text"
													name="deliveredAt"
													value={deliveredAt}
													id="deliveredAt"
													onChange={(e) => set_deliveredAt(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="isRefunded">Refunded?</label>
												<input
													type="checkbox"
													name="isRefunded"
													// defaultChecked={isRefunded ? 'checked' : 'unchecked'}
													// defaultValue={isRefunded}
													defaultChecked={isRefunded}
													// value={isRefunded ? '1' : '0'}
													id="isRefunded"
													onChange={(e) => {
														set_isRefunded(e.target.checked);
													}}
												/>
											</li>
											<li>
												<label htmlFor="refundedAt">Refunded At</label>
												<input
													type="text"
													name="refundedAt"
													value={refundedAt}
													id="refundedAt"
													onChange={(e) => set_refundedAt(e.target.value)}
												/>
											</li>
										</div>
									</div>
									<li>
										<button className="btn primary" onClick={(e) => add_order_item(e)}>
											Add Another Order Item
										</button>
									</li>
									{loading_checkboxes ? (
										<div>Loading...</div>
									) : (
										<li>
											<label htmlFor="update_total_prices">Update Total</label>
											<input
												type="checkbox"
												name="update_total_prices"
												defaultValue={update_total_prices}
												defaultChecked={update_total_prices}
												id="update_total_prices"
												onChange={(e) => set_update_total_prices(e.target.checked)}
											/>
										</li>
									)}
									<div className="row wrap jc-b">
										{orderItems &&
											orderItems.map((item, index) => {
												return (
													<div key={index} className="w-410px m-10px">
														<h2>Order Item {index + 1}</h2>
														<button
															className="btn primary w-4rem h-4rem p-14px mr-1rem mb-1rem"
															onClick={(e) => remove_order_item(index, e)}
														>
															<i className="fas fa-times mr-5px" />
														</button>
														<li>
															<label htmlFor="product">Product</label>
															{console.log({ product: item.product })}
															<input
																type="text"
																name="product"
																defaultValue={item.product && item.product._id}
																value={item.product && item.product._id}
																id="product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>

														<li>
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mb-15px"
															>
																Product
															</label>
															<div className="ai-c h-25px mb-15px">
																<div className="custom-select">
																	<select
																		className="qty_select_dropdown"
																		onChange={(e) => update_order_item(e, index)}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{products
																			.filter((product) => !product.option)
																			.map((product, index) => (
																				<option
																					key={index}
																					value={JSON.stringify(product)}
																				>
																					{product.name}
																				</option>
																			))}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
														<li>
															<label htmlFor="name">Order Item Name</label>
															<input
																type="text"
																name="name"
																defaultValue={item.name}
																value={item.name}
																id="name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="qty">Quantity</label>
															<input
																type="text"
																name="qty"
																defaultValue={item.qty}
																value={item.qty}
																id="qty"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="display_image">Display Image</label>
															<input
																type="text"
																name="display_image"
																defaultValue={item.display_image}
																value={item.display_image}
																id="display_image"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="price">Price</label>
															<input
																type="text"
																name="price"
																defaultValue={item.price}
																value={item.price}
																id="price"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="category">Category</label>
															<input
																type="text"
																name="category"
																defaultValue={item.category}
																value={item.category}
																id="category"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="sale_price">Sale Price</label>
															<input
																type="text"
																name="sale_price"
																defaultValue={item.sale_price}
																value={item.sale_price}
																id="sale_price"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="product">Pathname</label>
															<input
																type="text"
																name="product"
																defaultValue={item.pathname}
																value={item.pathname}
																id="product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<h3>Dimmensions</h3>
														</li>
														<li>
															<label htmlFor="package_length">Length</label>
															<input
																type="text"
																name="package_length"
																defaultValue={item.package_length}
																value={item.package_length}
																id="package_length"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_width">Width</label>
															<input
																type="text"
																name="package_width"
																defaultValue={item.package_width}
																value={item.package_width}
																id="package_width"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_height">Height</label>
															<input
																type="text"
																name="package_height"
																defaultValue={item.package_height}
																value={item.package_height}
																id="package_height"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_volume">Volume</label>
															<input
																type="text"
																name="package_volume"
																defaultValue={item.package_volume}
																value={item.package_volume}
																id="package_volume"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="weight_pounds">Weight Pounds</label>
															<input
																type="text"
																name="weight_pounds"
																defaultValue={item.weight_pounds}
																value={item.weight_pounds}
																id="weight_pounds"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="weight_ounces">Weight Ounces</label>
															<input
																type="text"
																name="weight_ounces"
																defaultValue={item.weight_ounces}
																value={item.weight_ounces}
																id="weight_ounces"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<h3>Color</h3>
														</li>
														<li>
															<label htmlFor="color_group_name">Color Group Name</label>
															<input
																type="text"
																name="color_group_name"
																defaultValue={item.color_group_name}
																value={item.color_group_name}
																id="color_group_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="color">Color</label>
															<input
																type="text"
																name="color"
																defaultValue={item.color}
																value={item.color}
																id="color"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="color_code">Color Code</label>
															<input
																type="text"
																name="color_code"
																defaultValue={item.color_code}
																value={item.color_code}
																id="color_code"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>

														<li>
															<label htmlFor="color_product_name">
																Color Product Name
															</label>
															<input
																type="text"
																name="color_product_name"
																defaultValue={item.color_product_name}
																value={item.color_product_name}
																id="color_product_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="color_product">Color Product</label>
															<input
																type="text"
																name="color_product"
																defaultValue={item.color_product && item.color_product}
																value={item.color_product && item.color_product}
																id="color_product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mb-15px"
															>
																Color Product
															</label>
															<div className="ai-c h-25px mb-15px">
																<div className="custom-select">
																	<select
																		defaultValue={item.color_product}
																		value={item.color_product}
																		className="qty_select_dropdown"
																		name="color_product"
																		onChange={(e) =>
																			update_order_item_property_by_template(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{order_products &&
																			order_products[index] &&
																			order_products[
																				index
																			].color_products.map((product, index) => (
																				<option
																					key={index}
																					value={JSON.stringify(product)}
																				>
																					{product.name}
																				</option>
																			))}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
														<li>
															<h3>Secondary Color</h3>
														</li>
														<li>
															<label htmlFor="secondary_color_group_name">
																Secondary Color Group Name
															</label>
															<input
																type="text"
																name="secondary_color_group_name"
																defaultValue={item.secondary_color_group_name}
																value={item.secondary_color_group_name}
																id="secondary_color_group_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="secondary_color">Secondary Color</label>
															<input
																type="text"
																name="secondary_color"
																defaultValue={item.secondary_color}
																value={item.secondary_color}
																id="secondary_color"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>

														<li>
															<label htmlFor="secondary_color_code">
																Secondary Color Code
															</label>
															<input
																type="text"
																name="secondary_color_code"
																defaultValue={item.secondary_color_code}
																value={item.secondary_color_code}
																id="secondary_color_code"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>

														<li>
															<label htmlFor="secondary_color_product_name">
																Secondary Color Product Name
															</label>
															<input
																type="text"
																name="secondary_color_product_name"
																defaultValue={item.secondary_color_product_name}
																value={item.secondary_color_product_name}
																id="secondary_color_product_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="secondary_color_product">
																Secondary Color Product
															</label>
															<input
																type="text"
																name="secondary_color_product"
																defaultValue={
																	item.secondary_color_product &&
																	item.secondary_color_product
																}
																value={
																	item.secondary_color_product &&
																	item.secondary_color_product
																}
																id="secondary_color_product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mb-15px"
															>
																Secondary Color Product
															</label>
															<div className="ai-c h-25px mb-15px">
																<div className="custom-select">
																	<select
																		defaultValue={item.secondary_color_product}
																		value={item.secondary_color_product}
																		className="qty_select_dropdown"
																		name="secondary_color_product"
																		onChange={(e) =>
																			update_order_item_property_by_template(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{order_products &&
																			order_products[index] &&
																			order_products[
																				index
																			].secondary_color_products.map(
																				(product, index) => (
																					<option
																						key={index}
																						value={JSON.stringify(product)}
																					>
																						{product.name}
																					</option>
																				)
																			)}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
														<li>
															<h3>Option</h3>
														</li>
														<li>
															<label htmlFor="option_group_name">Option Group Name</label>
															<input
																type="text"
																name="option_group_name"
																defaultValue={item.option_group_name}
																value={item.option_group_name}
																id="option_group_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="option_product_name">
																Option Product Name
															</label>
															<input
																type="text"
																name="option_product_name"
																defaultValue={item.option_product_name}
																value={item.option_product_name}
																id="option_product_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="size">Size</label>
															<input
																type="text"
																name="size"
																defaultValue={item.size}
																value={item.size}
																id="size"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="option_product">Option Product</label>
															<input
																type="text"
																name="option_product"
																defaultValue={
																	item.option_product && item.option_product
																}
																value={item.option_product && item.option_product}
																id="option_product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mb-15px"
															>
																Option Product
															</label>
															<div className="ai-c h-25px mb-15px">
																<div className="custom-select">
																	<select
																		defaultValue={item.option_product}
																		value={item.option_product}
																		className="qty_select_dropdown"
																		name="option_product"
																		onChange={(e) =>
																			update_order_item_property_by_template(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{order_products &&
																			order_products[index] &&
																			order_products[
																				index
																			].option_products.map((product, index) => (
																				<option
																					key={index}
																					value={JSON.stringify(product)}
																				>
																					{product.name}
																				</option>
																			))}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>

														<li>
															<h3>Secondary Product</h3>
														</li>
														<li>
															<label htmlFor="secondary_group_name">
																Secondary Group Name
															</label>
															<input
																type="text"
																name="secondary_group_name"
																defaultValue={item.secondary_group_name}
																value={item.secondary_group_name}
																id="secondary_group_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="secondary_product_name">
																Secondary Product Name
															</label>
															<input
																type="text"
																name="secondary_product_name"
																defaultValue={item.secondary_product_name}
																value={item.secondary_product_name}
																id="secondary_product_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>

														<li>
															<label htmlFor="secondary_product">Secondary Product</label>
															<input
																type="text"
																name="secondary_product"
																defaultValue={
																	item.secondary_product && item.secondary_product
																}
																value={item.secondary_product && item.secondary_product}
																id="secondary_product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mb-15px"
															>
																Secondary Product
															</label>
															<div className="ai-c h-25px mb-15px">
																<div className="custom-select">
																	<select
																		defaultValue={item.secondary_product}
																		value={item.secondary_product}
																		className="qty_select_dropdown"
																		name="secondary_product"
																		onChange={(e) =>
																			update_order_item_property_by_template(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{order_products &&
																			order_products[index] &&
																			order_products[
																				index
																			].secondary_products.map(
																				(product, index) => (
																					<option
																						key={index}
																						value={JSON.stringify(product)}
																					>
																						{product.name}
																					</option>
																				)
																			)}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
														{/* {item.product_option && (
															<div key={index} className="">
																<div className="jc-b">
																	<h2>Product Option {index + 1}</h2>
																	<button className="btn primary w-4rem h-4rem p-14px mr-1rem mb-1rem">
																		<i className="fas fa-times mr-5px" />
																	</button>
																</div>
																<li>
																	<div className="ai-c h-25px mb-15px">
																		<div className="custom-select">
																			<select
																				className="qty_select_dropdown"
																				onChange={(e) =>
																					update_product_option(e, index)}
																			>
																				<option key={1} defaultValue="">
																					---Choose Option---
																				</option>
																				{item.product &&
																					item.product.product_options &&
																					item.product.product_options.map(
																						(option, index) => (
																							<option
																								key={index}
																								value={JSON.stringify(
																									option
																								)}
																							>
																								{option.name}
																							</option>
																						)
																					)}
																			</select>
																			<span className="custom-arrow" />
																		</div>
																	</div>
																</li>
																<li>
																	<label htmlFor="name">Name</label>
																	<input
																		type="text"
																		name="name"
																		defaultValue={item.product_option.name}
																		value={item.product_option.name}
																		id="name"
																		onChange={(e) =>
																			update_product_option_property(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	/>
																</li>
																<li>
																	<label htmlFor="size">Size</label>
																	<input
																		type="text"
																		name="size"
																		defaultValue={item.product_option.size}
																		value={item.product_option.size}
																		id="size"
																		onChange={(e) =>
																			update_product_option_property(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	/>
																</li>
																<li>
																	<label htmlFor="price">Price</label>
																	<input
																		type="text"
																		name="price"
																		defaultValue={item.product_option.price}
																		value={item.product_option.price}
																		id="price"
																		onChange={(e) =>
																			update_product_option_property(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	/>
																</li>
																<li>
																	<label htmlFor="sale_price">Sale Price</label>
																	<input
																		type="text"
																		name="sale_price"
																		defaultValue={item.product_option.sale_price}
																		value={item.product_option.sale_price}
																		id="sale_price"
																		onChange={(e) =>
																			update_product_option_property(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	/>
																</li>
																<li>
																	<label htmlFor="color">Color</label>
																	<input
																		type="text"
																		name="color"
																		defaultValue={item.product_option.color}
																		value={item.product_option.color}
																		id="color"
																		onChange={(e) =>
																			update_product_option_property(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	/>
																</li>
																<li>
																	<label htmlFor="quantity_state">
																		Count In Stock
																	</label>
																	<input
																		type="text"
																		name="quantity_state"
																		defaultValue={
																			item.product_option.quantity_state
																		}
																		value={item.product_option.quantity_state}
																		id="quantity_state"
																		onChange={(e) =>
																			update_product_option_property(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	/>
																</li>
															</div>
														)} */}
													</div>
												);
											})}
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Orders
										</button>
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditOrderPage;
