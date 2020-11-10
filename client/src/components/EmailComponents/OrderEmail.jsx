import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';
import { format_date } from '../../utils/helper_functions';
import { detailsOrder } from '../../actions/orderActions';

const OrderEmail = (props) => {
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order } = orderDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails('Order'));
			// stableDispatch(detailsOrder(props.match.params.id));
			stableDispatch(detailsOrder('5fa43d5f248dcacd5d8e2d3f'));
			return () => {};
		},
		[ stableDispatch ]
	);

	useEffect(
		() => {
			const active_email = emails.find((email) => email.active === true);
			if (active_email) {
				stableDispatch(detailsEmail(active_email._id));
			}
			return () => {};
		},
		[ emails, stableDispatch ]
	);

	const determin_card_logo = (card_type) => {
		switch (card_type) {
			case 'American Express':
				return 'https://www.glow-leds.com/images/optimized_images/logo_images/Icons/cc-amex-brands.png';
			case 'Visa':
				return 'https://www.glow-leds.com/images/optimized_images/logo_images/Icons/cc-visa-brands.png';
			case 'Mastercard':
				return 'https://www.glow-leds.com/images/optimized_images/logo_images/Icons/cc-mastercard-brands.png';
			case 'Discover':
				return 'https://www.glow-leds.com/images/optimized_images/logo_images/Icons/cc-discover-brands.png';
		}
	};

	const sale_price_switch = (item) => {
		if (item.sale_price !== 0) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }}>${item.price ? item.price.toFixed(2) : item.price}</label>
					</del>{' '}
					{'-->'} ${item.sale_price ? item.sale_price.toFixed(2) : item.sale_price} On Sale!
				</label>
			);
		} else if (item.countInStock === 0) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white', marginLeft: '7px' }}>
							${item.price ? item.price.toFixed(2) : item.price}
						</label>
					</del>{' '}
					{'-->'} <label style={{ color: 'white', marginLeft: '7px' }}>Sold Out</label>
				</label>
			);
		} else {
			return <label>${item.price ? item.price.toFixed(2) : item.price}</label>;
		}
	};
	const sale_price_add = (order_items) => {
		return order_items
			.reduce((a, c) => {
				if (c.sale_price > 0) {
					return a + c.sale_price * c.qty;
				} else {
					return a + c.price * c.qty;
				}
			}, 0)
			.toFixed(2);
	};
	const promo_code_switch = (order) => {
		if (order.promo_code) {
			return (
				<div style={{ display: 'flex', marginRight: '-12px' }}>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }}>${sale_price_add(order.orderItems)}</label>
					</del>
					<label
						style={{
							color: 'white',
							display: 'flex',
							margin: '0 5px',
							width: '25px'
						}}
					>
						{' '}
						{'-->'}{' '}
					</label>
					<label
						style={{
							color: 'white',
							display: 'flex'
						}}
					>
						${order.itemsPrice && order.itemsPrice.toFixed(2)}
					</label>
				</div>
			);
		} else {
			return <div>${order.itemsPrice && order.itemsPrice.toFixed(2)}</div>;
		}
	};

	const jsx = (
		<body style={{ padding: 0, margin: 0, fontSize: '16px' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: 'auto',
					fontSize: '16px',
					fontFamily: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
					color: 'white',
					backgroundColor: '#5f5f5f'
				}}
			>
				<div style={{ backgroundColor: '#333333', padding: '20px' }}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<table width="100%" style={{ maxWidth: '500px' }}>
							<tr>
								<td>
									<img
										src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
										alt="Glow LEDs"
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: '20px'
										}}
									/>
								</td>
							</tr>
						</table>
					</div>
					<h4
						style={{
							textAlign: 'center',
							fontFamily: 'helvetica',
							width: '100%',
							margin: '0 auto',
							lineHeight: '50px',
							color: 'white',
							fontSize: '2em'
						}}
					>
						Thank You for your Purchase!
					</h4>
				</div>
				{order && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column'
						}}
					>
						<div
							style={{
								margin: 'auto'
							}}
						>
							<div
								style={{
									maxWidth: '600px',
									lineHeight: '30px',
									margin: '15px',
									display: 'flex',
									flexDirection: 'column'
								}}
							>
								<p>
									Hi {order.shipping.first_name}, we're getting your order ready to be shipped. We
									will notify you when it has been sent.
								</p>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										flexWrap: 'wrap'
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
										<a
											href={
												'https://www.glow-leds.com/account/login?redirect=/secure/account/order/' +
												order._id
											}
											alt="discount image"
											style={{
												backgroundColor: '#4c4f60',
												color: 'white',
												borderRadius: '10px',
												border: 0,
												padding: '15px',
												fontFamily: 'helvetica',
												margin: 0,
												fontWeight: 800,
												fontSize: '1.2em',
												textAlign: 'center',
												textDecoration: 'none !important',
												lineHeight: 'inherit !important'
											}}
										>
											View your Order
										</a>
									</div>
									<div style={{ margin: '0px 10px', width: '5px' }}>or</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
										<a
											href="https://www.glow-leds.com/collections/all/products"
											alt="discount image"
											style={{
												color: 'white',
												border: 0,
												padding: '10px',
												fontFamily: 'helvetica',
												margin: 0,
												fontWeight: 800,
												fontSize: '1.2em',
												textAlign: 'center',
												textDecoration: 'none !important',
												lineHeight: 'inherit !important'
											}}
										>
											Visit our Store
										</a>
									</div>
								</div>
								<div style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px' }} />
								<table
									cellPadding={0}
									cellSpacing={0}
									style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
									width="100%"
									align="left"
								>
									<tbody>
										<tr>
											<td colSpan={2} style={{ verticalAlign: 'top' }} valign="top">
												<table
													style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
													width="100%"
													align="left"
												>
													<tbody>
														<tr>
															<td
																style={{
																	verticalAlign: 'top',
																	lineHeight: '45px',
																	color: '#333'
																}}
																valign="top"
															/>
															<td
																style={{
																	verticalAlign: 'top',
																	textAlign: 'right',
																	color: 'white',
																	fontSize: '16px'
																}}
																valign="top"
																align="right"
															>
																Order #: {order._id}
																<br />
																Created:{' '}
																{order.createdAt && format_date(order.createdAt)}
																<br />
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<h4
											style={{
												fontFamily: 'helvetica',
												width: '100%',
												margin: '0 auto',
												lineHeight: '50px',
												color: 'white',
												fontSize: '25px'
											}}
										>
											Order Summary
										</h4>

										{order.orderItems.map((item, index) => (
											<tr>
												<td
													style={{
														verticalAlign: 'top',
														borderBottom: '1px solid #eee',
														padding: '20px 0',
														color: 'white',
														fontSize: '16px',
														fontWeight: 800
													}}
													key={index}
													valign="top"
												>
													{item.qty}x - {' '}
													{item.category === 'diffuser_caps' ||
													item.category === 'mini_diffuser_caps' ||
													item.category === 'frosted_diffusers' ? (
														`${item.diffuser_cap_color} - `
													) : (
														''
													)}
													{item.name}
													{item.secondary_product ? `w (${item.secondary_product.name})` : ''}
												</td>
												<td
													style={{
														verticalAlign: 'top',
														textAlign: 'right',
														borderBottom: '1px solid #eee',
														padding: '20px 0',
														color: 'white',
														fontSize: '16px'
														// fontWeight: 800
													}}
													valign="top"
													align="right"
												>
													{/* ${item.price && item.price.toFixed(2)} */}
													{sale_price_switch(item)}
												</td>
											</tr>
										))}
									</tbody>
								</table>

								<table
									style={{ width: '100%', lineHeight: 'inherit', textAlign: 'right', color: 'white' }}
									width="100%"
									align="right"
								>
									<tbody>
										<tr>
											<td
												style={{
													verticalAlign: 'top',
													width: '40%',
													textAlign: 'left',
													color: 'white'
												}}
												valign="top"
											/>
											<td
												style={{
													verticalAlign: 'top',
													width: '30%',
													textAlign: 'left',
													color: 'white',
													fontSize: '16px'
												}}
												valign="top"
											>
												Subtotal
												<br />
												Tax
												<br />
												Shipping
												<br />
												<br />
												<div>Total</div>
											</td>

											<td
												style={{
													verticalAlign: 'top',
													width: '20%',
													color: 'white',
													fontSize: '16px'
												}}
												valign="top"
											>
												{promo_code_switch(order)}
												${order.taxPrice && order.taxPrice.toFixed(2)}
												<br />
												${order.shippingPrice && order.shippingPrice.toFixed(2)}
												<br />
												<br />
												<div style={{ fontSize: 30, fontWeight: 800, color: 'white' }}>
													${order.totalPrice && order.totalPrice.toFixed(2)}
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								<table
									style={{
										width: '100%',
										lineHeight: 'inherit',
										textAlign: 'left',
										borderBottom: '1px white solid'
									}}
									width="100%"
									align="left"
								>
									<tbody>
										<tr>
											<td
												style={{
													verticalAlign: 'top',
													lineHeight: '45px',
													color: '#333',
													padding: 0
												}}
												valign="top"
											/>
											<td
												style={{
													verticalAlign: 'top',
													textAlign: 'left',
													color: 'white',
													fontSize: '16px'
												}}
												valign="top"
												align="right"
											>
												<strong>Promo Code:</strong> {order.promo_code}
												<br />
												<strong>Order Note:</strong> {order.order_note}
												<br />
											</td>
										</tr>
									</tbody>
								</table>
								<div
									style={{
										verticalAlign: 'top',
										width: '40%',
										color: 'white',
										textAlign: 'right'
									}}
									valign="top"
									align="right"
								/>
								<table
									cellPadding={0}
									cellSpacing={0}
									style={{
										width: '100%',
										lineHeight: 'inherit',
										color: 'white',
										textAlign: 'left',
										borderBottom: '1px white solid'
									}}
									width="100%"
									align="left"
								>
									<tbody>
										<tr
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												border: 0
											}}
										>
											<td
												style={{ verticalAlign: 'top', width: '50%', maxWidth: '320px' }}
												valign="top"
											>
												<table
													style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
													width="100%"
													align="left"
												>
													<tbody>
														<tr>
															<td
																style={{ verticalAlign: 'top', width: '50%' }}
																valign="top"
															>
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		width: '100%',
																		margin: '0 auto',
																		lineHeight: '50px',
																		color: 'white',
																		fontSize: '20px'
																	}}
																>
																	Customer Information
																</h4>
															</td>
														</tr>
														<tr>
															<td
																style={{ verticalAlign: 'top', width: '50%' }}
																valign="top"
															>
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		width: '100%',
																		margin: '0 auto',
																		// lineHeight: '20px',
																		color: 'white',
																		fontSize: '18px',
																		padding: '10px 0 '
																	}}
																>
																	Shipping Address
																</h4>
															</td>
														</tr>
														<tr>
															<td
																style={{
																	verticalAlign: 'top',
																	width: '50%',
																	color: 'white',
																	fontSize: '16px'
																}}
																valign="top"
															>
																{order.shipping.first_name} {order.shipping.last_name}
																<br />
																{order.shipping.address}
																<br />
																{order.shipping.city}, {order.shipping.state}{' '}
																{order.shipping.postalCode}
																<br />
																<a
																	href="#"
																	style={{
																		textDecoration: 'none !important',
																		fontSize: 'inherit !important',
																		fontFamily: 'inherit !important',
																		fontWeight: 'inherit !important',
																		lineHeight: 'inherit !important',
																		color: 'inherit !important;'
																	}}
																>
																	{order.shipping.email}
																</a>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
											<td style={{ verticalAlign: 'top' }} valign="top">
												<table
													style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
													width="100%"
													align="left"
												>
													<tbody>
														<tr>
															<td style={{ verticalAlign: 'top' }} valign="top">
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		width: '100%',
																		margin: '0 auto',
																		// lineHeight: '20px',
																		color: 'white',
																		padding: '10px 0',
																		marginTop: '50px',
																		fontSize: '18px'
																	}}
																>
																	Payment Method
																</h4>
															</td>
														</tr>
														<tr>
															<td
																style={{ verticalAlign: 'top', color: 'white' }}
																valign="top"
															>
																<div
																	style={{
																		padding: '5px',
																		verticalAlign: 'top',
																		textAlign: 'right',
																		width: '100%',
																		color: 'white',
																		display: 'flex',
																		alignItems: 'center',
																		fontSize: '16px'
																	}}
																>
																	<div
																		style={{
																			fontSize: '40px',
																			marginRight: '11px',
																			color: 'white'
																		}}
																	>
																		{order.payment.charge ? (
																			<img
																				src={determin_card_logo(
																					order.payment.charge.source.brand
																				)}
																				style={{ height: '25px' }}
																				alt="facebook"
																			/>
																		) : (
																			''
																		)}{' '}
																	</div>
																	ending with{' '}
																	{order.payment.charge ? order.payment.charge.source.last4 : ''}{' '}
																	<div style={{ margin: '0 10px', color: 'white' }}>-</div>
																	<div
																		style={{
																			padding: '5px',
																			verticalAlign: 'top',
																			// textAlign: 'right',
																			fontWeight: 'bold',
																			color: 'white'
																		}}
																		valign="top"
																		align="right"
																	>
																		${order.totalPrice && order.totalPrice.toFixed(2)}
																	</div>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div style={{ marginBottom: '20px' }}>
								<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
									<strong>Tag us in your videos and pictures!</strong>
									<br />We want to feature you!
								</p>
								{/* <Link to="/pages/contact/submit_content_to_be_featured">
							<div className="jc-c">
							
							</div> */}

								<a
									href="https://www.glow-leds.com/pages/contact/submit_content_to_be_featured"
									target="_blank"
									rel="noopener noreferrer"
								>
									{/* <i className="fab fa-facebook zoom" style={{ color: 'white' }} /> */}
									{/* <Facebook fill="white" /> */}
									<div style={{ display: 'flex', justifyContent: 'center' }}>
										<a
											href={
												'https://www.glow-leds.com/pages/contact/submit_content_to_be_featured'
											}
											alt="discount image"
											style={{
												backgroundColor: '#4c4f60',
												color: 'white',
												borderRadius: '10px',
												border: 0,
												padding: '15px',
												fontFamily: 'helvetica',
												margin: 0,
												fontWeight: 800,
												fontSize: '1em',
												textAlign: 'center',
												textDecoration: 'none !important',
												lineHeight: 'inherit !important'
											}}
										>
											Feature Content
										</a>
									</div>
								</a>
								<p style={{ textAlign: 'center', fontSize: '14px' }}>
									We are figuring this out as we go so any feedback is welcome.<br />We appreciate you
									more than you know.
								</p>
								<p style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>
									<strong>Questions or concerns?:</strong>{' '}
									<a
										href="#"
										style={{
											textDecoration: 'none !important',
											fontSize: 'inherit !important',
											fontFamily: 'inherit !important',
											fontWeight: 'inherit !important',
											lineHeight: 'inherit !important',
											color: 'inherit !important;'
										}}
									>
										info.glowleds@gmail.com
									</a>
								</p>
							</div>
						</div>

						<div style={{ backgroundColor: '#333333', padding: '20px', paddingTop: 10 }}>
							<div
								style={{
									marginLeft: '10px',
									display: 'flex',
									justifyContent: 'space-between',
									maxWidth: '250px',
									width: '100%',
									margin: '0 auto',
									color: 'white',
									alignItems: 'center'
								}}
							>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.facebook.com/Glow-LEDscom-100365571740684"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-facebook zoom" style={{ color: 'white' }} /> */}
										{/* <Facebook fill="white" /> */}
										<img
											src="https://www.glow-leds.com/images/optimized_images/logo_images/Icons/facebook-brands.png"
											style={{ height: '25px' }}
											alt="facebook"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.instagram.com/glow_leds/"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-instagram zoom" style={{ color: 'white' }} /> */}
										<img
											src="https://www.glow-leds.com/images/optimized_images/logo_images/Icons/instagram-brands.png"
											style={{ height: '25px' }}
											alt="facebook"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
										<img
											src="https://www.glow-leds.com/images/optimized_images/logo_images/Icons/youtube-brands.png"
											style={{ height: '20px' }}
											alt="facebook"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://soundcloud.com/ntre/tracks"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-soundcloud" style={{ color: 'white' }} /> */}
										<img
											src="https://www.glow-leds.com/images/optimized_images/logo_images/Icons/soundcloud-brands.png"
											style={{ height: '20px' }}
											alt="facebook"
										/>
									</a>
								</div>
							</div>
							<div
								style={{
									borderBottom: '1px white solid',
									maxWidth: '600px',
									width: '100%',
									margin: '15px auto'
								}}
							/>
							{/* <p style={{ textAlign: 'center' }}>Copyright © 2020 Throwlights, Inc., All rights reserved.</p> */}
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Our mailing address is: <br />404 Kenniston Dr Apt D, Austin, TX 78752{' '}
							</p>
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Want to change how you receive these emails? <br /> You can{' '}
								<a
									href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									update your preferences
								</a>{' '}
								or{' '}
								<a
									href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									unsubscribe{' '}
								</a>
								from this list.
							</p>
						</div>
					</div>
				)}
			</div>
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_order_email = async (email, first_name) => {
		console.log({ email_template });
		const { data } = await API_Emails.send_order_email(email_template, 'Your Glow LEDs Order', email);
		const { data: request } = await API_Emails.send_order_created_email(
			email_template,
			'New Order Created by ' + first_name
		);
		console.log({ data });
		console.log({ request });
	};

	useEffect(
		() => {
			if (order) {
				if (order.orderItems.length > 0) {
					if (props.match.params.id) {
						send_order_email(order.shipping.email, order.shipping.first_name);
					}
				}
			}

			return () => {};
		},
		[ order ]
	);

	return (
		<div>
			{userInfo ? (
				<div className="w-500px jc-c m-auto">
					<Link to={'/secure/account/order/' + props.match.params.id}>
						<button className="button primary mh-10px">View Order</button>
					</Link>
					<Link to="/secure/account/orders">
						<button className="button primary mh-10px">Your Orders</button>
					</Link>
					<Link to="/collections/all/products">
						<button className="button primary mh-10px">Products</button>
					</Link>
				</div>
			) : (
				<div className="w-1000px jc-c m-auto">
					<Link to="/collections/all/products">
						<button className="button primary mh-10px">Products</button>
					</Link>
					<Link to="/pages/featured">
						<button className="button primary mh-10px">Featured Videos</button>
					</Link>
					<Link to="/pages/music">
						<button className="button primary mh-10px">NTRE Music</button>
					</Link>
					<Link to="/account/register">
						<button className="button primary mh-10px">Create Account</button>
					</Link>
				</div>
			)}

			{userInfo &&
			userInfo.isAdmin && (
				<div className="jc-b mb-1rem">
					<Link to="/secure/glow/emails">
						<button className="button primary">Back to Emails</button>
					</Link>

					<button className="button primary mb-1rem" onClick={() => send_order_email('lavacquek@icloud.com')}>
						Send Test Email
					</button>
					{/* <button className="button primary mb-1rem" onClick={() => send_order_email()}>
					Send Order Email
				</button> */}
					{/* <Loading loading={loading_email} /> */}
				</div>
			)}
			{jsx}
		</div>
	);
};

export default OrderEmail;
