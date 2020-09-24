import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveOrder, detailsOrder, listOrders } from '../../actions/orderActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';
import { listProducts } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions';

const EditOrderPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ orderItems, set_orderItems ] = useState([ {} ]);
	const [ shipping, set_shipping ] = useState({});
	const [ user, set_user ] = useState('');
	// const [ loading, set_loading ] = useState(true);
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
	const [ order_note, set_order_note ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');

	const history = useHistory();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const userList = useSelector((state) => state.userList);
	const { loading: loading_users, users, error: error_users } = userList;

	const orderList = useSelector((state) => state.orderList);
	const { orders } = orderList;

	const productList = useSelector((state) => state.productList);
	const { loading: products_loading, products, error: error_loading } = productList;

	const dispatch = useDispatch();
	const order_id = props.match.params.id ? props.match.params.id : '';

	console.log({ order });

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsOrder(props.match.params.id));
			dispatch(detailsOrder(props.match.params.id));
			dispatch(listProducts(''));
			dispatch(listUsers(''));
		} else {
			dispatch(detailsOrder(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (order) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
				set_orderItems([ {} ]);
			}

			return () => {};
		},
		[ order ]
	);

	const set_state = () => {
		set_id(order._id);
		set_user(order.user);
		set_orderItems(order.orderItems);
		set_shipping(order.shipping);
		set_payment(order.payment);
		set_itemsPrice(order.itemsPrice);
		set_taxPrice(order.taxPrice);
		set_shippingPrice(order.shippingPrice);
		set_totalPrice(order.totalPrice);
		set_isPaid(order.isPaid);
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

		// console.log(format_date(order.isManufactured));
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_orderItems('');
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
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log(isManufactured);
		// console.log(format_date(isManufactured));
		// console.log(unformat_date(format_date(isManufactured)));
		// console.log(unformat_date(isManufactured));
		// console.log(format_date(unformat_date(isManufactured)));
		// console.log(format_date(unformat_date(isManufactured)));

		console.log({
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
			manufacturedAt,
			isPackaged,
			packagedAt,
			isShipped,
			shippedAt,
			isDelivered,
			deliveredAt,
			isRefunded,
			refundedAt,
			order_note,
			promo_code
		});
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
				manufacturedAt: unformat_date(manufacturedAt),
				isPackaged,
				packagedAt: unformat_date(packagedAt),
				isShipped,
				shippedAt: unformat_date(shippedAt),
				isDelivered,
				deliveredAt: unformat_date(deliveredAt),
				isRefunded,
				refundedAt: unformat_date(refundedAt),
				order_note,
				promo_code
			})
		);
		e.target.reset();
		set_id('');
		set_user('');
		set_orderItems('');
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
		// if (id) {
		// 	history.push('/collections/all/orders/' + id);
		// } else {
		history.push('/secure/glow/orders');
		// }
	};

	const add_order_item = (e) => {
		e.preventDefault();
		set_orderItems((items) => [ ...items, {} ]);
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Order' : 'Create Order'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{order && (
							<div>
								<MetaTags>
									<title>Edit {order.name} | Glow LEDs</title>
								</MetaTags>

								<ul
									className="edit-form-container"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									>
										{loading ? 'Order' : order.name}
									</h1>
									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											{/* <h2>User</h2> */}
											{/* <li>
												<label htmlFor="user">User</label>
												<input
													type="text"
													defaultValue={order.user && order.user._id}
													name="user"
													id="user"
													onChange={(e) => set_user(e.target.value)}
												/>
											</li> */}
											<li>
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mb-15px"
												>
													User
												</label>
												<div className="ai-c h-25px mb-15px">
													<div className="custom-select">
														<select
															defaultValue={order.user && order.user._id}
															// defaultValue={user.product}
															className="qty_select_dropdown"
															onChange={(e) => set_user(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose User---
															</option>
															{users &&
																users.map((user, index) => (
																	<option key={index} defaultValue={user._id}>
																		{user.first_name} {user.last_name}
																	</option>
																))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</li>

											<h2>Shipping</h2>
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
												<label htmlFor="address">Address</label>
												<input
													type="text"
													defaultValue={shipping && shipping.address}
													name="address"
													id="address"
													onChange={(e) =>
														set_shipping({ ...shipping, address: e.target.value })}
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
														set_shipping({ ...shipping, international: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="country">Country</label>
												<input
													type="text"
													value={shipping.country}
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
													onChange={(e) => set_shippingPrice(e.target.value)}
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
										</div>

										<div className="w-228px m-10px">
											<h2>Order State</h2>
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
											<li>
												<label htmlFor="manufacturedAt">Manufactured At</label>
												<input
													type="text"
													name="manufacturedAt"
													value={paidAt}
													id="manufacturedAt"
													onChange={(e) => set_manufacturedAt(e.target.value)}
												/>
											</li>
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
										<button className="button primary" onClick={(e) => add_order_item(e)}>
											Add Another Order Item
										</button>
									</li>
									<div className="row wrap jc-b">
										{orderItems &&
											orderItems.map((item, index) => {
												return (
													<div key={index} className="w-410px m-10px">
														<h2>Order Item {index + 1}</h2>

														<li>
															<label htmlFor="name">Order Item Name</label>
															<input
																type="text"
																name="name"
																defaultValue={item.name}
																id="name"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		name: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor="qty">Quantity</label>
															<input
																type="text"
																name="qty"
																defaultValue={item.qty}
																id="qty"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		qty: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor="display_image">Display Image</label>
															<input
																type="text"
																name="display_image"
																defaultValue={item.display_image}
																id="display_image"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		display_image: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor="diffuser_cap_color">
																Diffuser Cap Color
															</label>
															<input
																type="text"
																name="diffuser_cap_color"
																defaultValue={item.diffuser_cap_color}
																id="diffuser_cap_color"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		diffuser_cap_color: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor="diffuser_cap_name">Diffuser Cap Name</label>
															<input
																type="text"
																name="diffuser_cap_name"
																defaultValue={item.diffuser_cap_name}
																id="diffuser_cap_name"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		diffuser_cap_name: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor="price">Price</label>
															<input
																type="text"
																name="price"
																defaultValue={item.price}
																id="price"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		price: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor="category">Category</label>
															<input
																type="text"
																name="category"
																defaultValue={item.category}
																id="category"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		category: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor="sale_price">Sale Price</label>
															<input
																type="text"
																name="sale_price"
																defaultValue={item.sale_price}
																id="sale_price"
																onChange={(e) =>
																	set_orderItems({
																		...orderItems[index],
																		sale_price: e.target.value
																	})}
															/>
														</li>
														{/* <li>
														<label htmlFor="product">Product</label>
														<input
															type="text"
															name="product"
															defaultValue={item.product}
															id="product"
															onChange={(e) => set_product(e.target.value)}
														/>
													</li> */}

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
																		defaultValue={item.product}
																		// defaultValue={item.product}
																		className="qty_select_dropdown"
																		onChange={(e) =>
																			set_orderItems({
																				...orderItems[index],
																				product: e.target.value
																			})}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{products.map((product, index) => (
																			<option
																				key={index}
																				defaultValue={product._id}
																			>
																				{product.name}
																			</option>
																		))}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
														{/* <li>
														<label htmlFor="secondary_product">Secondary Product</label>
														<input
															type="text"
															name="secondary_product"
															defaultValue={item.secondary_product}
															id="secondary_product"
															onChange={(e) => set_secondary_product(e.target.value)}
														/>
													</li> */}
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
																		// defaultValue={item.secondary_product}
																		className="qty_select_dropdown"
																		onChange={(e) =>
																			set_orderItems({
																				...orderItems[index],
																				secondary_product: e.target.value
																			})}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{products.map((product, index) => (
																			<option
																				key={index}
																				defaultValue={product._id}
																			>
																				{product.name}
																			</option>
																		))}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
													</div>
												);
											})}
									</div>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to="/secure/glow/orders">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Order
												</button>
											</Link>
										) : (
											<Link to="/secure/glow/orders">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Orders
												</button>
											</Link>
										)}
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
