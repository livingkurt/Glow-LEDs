import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { FlexContainer } from '../../components/ContainerComponents/index';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import API from '../../utils/API';
import { format_date } from '../../utils/helper_functions';
import { detailsOrder } from '../../actions/orderActions';

const OrderEmail = () => {
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email, loading, error } = emailDetails;
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading: loading_order, error: error_order } = orderDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { loading: loading_emails, emails, error: error_emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listEmails('Order'));
		dispatch(detailsOrder('5f74a250290441002a36d078'));
		return () => {};
	}, []);

	useEffect(
		() => {
			const active_email = emails.find((email) => email.active === true);
			if (active_email) {
				dispatch(detailsEmail(active_email._id));
			}
			return () => {};
		},
		[ emails ]
	);

	const determin_card_logo = (card_type) => {
		switch (card_type) {
			case 'American Express':
				return <i class="fab fa-cc-amex" />;
			case 'Visa':
				return <i class="fab fa-cc-visa" />;
			case 'Mastercard':
				return <i class="fab fa-cc-mastercard" />;
			case 'Discover':
				return <i class="fab fa-cc-discover" />;
		}
	};

	const jsx = (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				fontSize: '16px',
				fontFamily: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
				color: '#black'
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
								Hi Kurt, we're getting your order ready to be shipped. We will notify you when it has
								been sent.
							</p>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center'
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
											padding: '15px'
										}}
									>
										<h4
											style={{
												fontFamily: 'helvetica',
												margin: 0,
												fontSize: '1.2em',
												textAlign: 'center'
											}}
										>
											View your Order
										</h4>
									</a>
								</div>
								<div style={{ margin: '0px 10px' }}>or</div>

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
											// backgroundColor: '#4c4f60',
											color: 'white',
											// borderRadius: '10px',
											border: 0,
											fontSize: '13px',
											padding: '10px'
										}}
									>
										<h4
											style={{
												fontFamily: 'helvetica',
												margin: 0,
												fontSize: '1.2em',
												textAlign: 'center'
											}}
										>
											Visit our Store
										</h4>
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
															style={{ verticalAlign: 'top', textAlign: 'right' }}
															valign="top"
															align="right"
														>
															Order #: {order._id}
															<br />
															Created: {order.createdAt && format_date(order.createdAt)}
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
											fontSize: '1.3em'
										}}
									>
										Order Summary
									</h4>
									{/* <tr>
									<td
										style={{
											padding: '5px',
											verticalAlign: 'top',
											background: '#4d5061',
											borderBottom: '1px solid #ddd',
											fontWeight: 'bold'
										}}
										valign="top"
									>
										Item
									</td>
									<td
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right',
											background: '#4d5061',
											borderBottom: '1px solid #ddd',
											fontWeight: 'bold'
										}}
										valign="top"
										align="right"
									>
										Price
									</td>
								</tr> */}

									{order.orderItems.map((item) => (
										<tr>
											<td
												style={{
													padding: '5px',
													verticalAlign: 'top',
													borderBottom: '1px solid #eee',
													padding: '20px 0'
												}}
												valign="top"
											>
												{item.qty}x -{' '}
												{item.category === 'diffuser_caps' ||
												item.category === 'mini_diffuser_caps' ||
												item.category === 'frosted_diffusers' ? (
													`${item.diffuser_cap_color} -`
												) : (
													''
												)}
												{item.name}
												{item.secondary_product ? `w (${item.secondary_product.name})` : ''}
											</td>
											<td
												style={{
													padding: '5px',
													verticalAlign: 'top',
													textAlign: 'right',
													borderBottom: '1px solid #eee',
													padding: '20px 0'
												}}
												valign="top"
												align="right"
											>
												${item.price && item.price.toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</table>

							<table
								style={{ width: '100%', lineHeight: 'inherit', textAlign: 'right' }}
								width="100%"
								align="right"
							>
								<tbody>
									<tr>
										<td
											style={{ verticalAlign: 'top', width: '40%', textAlign: 'left' }}
											valign="top"
										/>
										<td
											style={{ verticalAlign: 'top', width: '30%', textAlign: 'left' }}
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

										<td style={{ verticalAlign: 'top', width: '20%' }} valign="top">
											${order.itemsPrice && order.itemsPrice.toFixed(2)}
											<br />
											${order.taxPrice && order.taxPrice.toFixed(2)}
											<br />
											${order.shippingPrice && order.shippingPrice.toFixed(2)}
											<br />
											<br />
											<div style={{ fontSize: 30, fontWeight: 800 }}>
												${order.totalPrice && order.totalPrice.toFixed(2)}
											</div>
										</td>
									</tr>
								</tbody>
							</table>
							<div
								style={{
									verticalAlign: 'top',
									width: '40%',
									textAlign: 'right'
								}}
								valign="top"
								align="right"
							/>
							<table
								cellPadding={0}
								cellSpacing={0}
								style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
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
														<td style={{ verticalAlign: 'top', width: '50%' }} valign="top">
															<h4
																style={{
																	fontFamily: 'helvetica',
																	width: '100%',
																	margin: '0 auto',
																	lineHeight: '50px',
																	color: 'white',
																	fontSize: '1.3em'
																}}
															>
																Customer Information
															</h4>
														</td>
													</tr>
													<tr>
														<td style={{ verticalAlign: 'top', width: '50%' }} valign="top">
															<h4
																style={{
																	fontFamily: 'helvetica',
																	width: '100%',
																	margin: '0 auto',
																	// lineHeight: '20px',
																	color: 'white',
																	fontSize: '1em',
																	padding: '10px 0 '
																}}
															>
																Shipping Address
															</h4>
														</td>
													</tr>
													<tr>
														<td style={{ verticalAlign: 'top', width: '50%' }} valign="top">
															{order.shipping.first_name} {order.shipping.last_name}
															<br />
															{order.shipping.address}
															<br />
															{order.shipping.city}, {order.shipping.state}{' '}
															{order.shipping.postalCode}
															<br />
															{order.shipping.email}
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
																	fontSize: '1em',
																	padding: '10px 0',
																	marginTop: '50px'
																}}
															>
																Payment Method
															</h4>
														</td>
													</tr>
													<tr>
														<td style={{ verticalAlign: 'top' }} valign="top">
															<div
																style={{
																	padding: '5px',
																	verticalAlign: 'top',
																	textAlign: 'right',
																	width: '100%',

																	display: 'flex',
																	alignItems: 'center'
																}}
															>
																<div
																	style={{
																		fontSize: '40px',
																		marginRight: '11px'
																	}}
																>
																	{order.payment.charge ? (
																		determin_card_logo(
																			order.payment.charge.source.brand
																		)
																	) : (
																		''
																	)}{' '}
																</div>
																ending with{' '}
																{order.payment.charge ? order.payment.charge.source.last4 : ''}{' '}
																<div style={{ margin: '0 10px' }}>-</div>
																<div
																	style={{
																		padding: '5px',
																		verticalAlign: 'top',
																		// textAlign: 'right',
																		fontWeight: 'bold'
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
									{/* <tr>
									<td
										style={{
											padding: '5px',
											verticalAlign: 'top',
											background: '#4d5061',
											borderBottom: '1px solid #ddd',
											fontWeight: 'bold'
										}}
										valign="top"
									>
										Payment Method
									</td>
									<td
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right',
											background: '#4d5061',
											borderBottom: '1px solid #ddd',
											fontWeight: 'bold'
										}}
										valign="top"
										align="right"
									>
										Last 4
									</td>
								</tr>
								<tr>
									<td
										style={{ padding: '5px', verticalAlign: 'top', borderBottom: '1px solid #eee' }}
										valign="top"
									>
										{order.payment.charge ? order.payment.charge.source.brand : ''}
									</td>
									<td
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right',
											borderBottom: '1px solid #eee'
										}}
										valign="top"
										align="right"
									>
										{order.payment.charge ? order.payment.charge.source.last4 : ''}
									</td>
								</tr> */}
								</tbody>
							</table>
						</div>
					</div>

					<div style={{ backgroundColor: '#333333', padding: '20px', paddingTop: 10 }}>
						<div>
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								<strong>Tag us in your videos and pictures!</strong>
								<br />We want to feature you!
							</p>

							<p style={{ textAlign: 'center', fontSize: '14px' }}>
								We are figuring this out as we go so any feedback is welcome.<br />We appreciate you
								more than you know.
							</p>
							<p style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>
								<strong>Questions or concerns?:</strong> info.glowleds@gmail.com
							</p>
						</div>
						<div
							style={{
								marginLeft: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								maxWidth: '250px',
								width: '100%',
								margin: '0 auto',
								color: 'white'
							}}
						>
							<div
								style={{
									fontSize: '30px',
									color: 'white'
								}}
							>
								<a
									rel="noreferrer"
									href="https://www.facebook.com/Glow-LEDscom-100365571740684"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i class="fab fa-facebook zoom" style={{ color: 'white' }} />
								</a>
							</div>
							<div
								style={{
									fontSize: '30px',
									color: 'white'
								}}
							>
								<a
									rel="noreferrer"
									href="https://www.instagram.com/glow_leds/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i class="fab fa-instagram zoom" style={{ color: 'white' }} />
								</a>
							</div>
							<div
								style={{
									fontSize: '30px',
									color: 'white'
								}}
							>
								<a
									rel="noreferrer"
									href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i class="fab fa-youtube zoom" style={{ color: 'white' }} />
								</a>
							</div>
							<div
								style={{
									fontSize: '30px',
									color: 'white'
								}}
							>
								<a
									rel="noreferrer"
									href="https://soundcloud.com/ntre/tracks"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i class="fab fa-soundcloud" style={{ color: 'white' }} />
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
								rel="noreferrer"
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
								rel="noreferrer"
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
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_announcement_email = async () => {
		const data = await API.send_announcement_email(email_template, email.announcement.h1);
		console.log('Success');
	};
	const save_html = async () => {
		const data = await API.save_html(email_template, email, userInfo.token);
		console.log(data);
		console.log('Success');
	};

	console.log({ email_template });
	return (
		<div className="">
			<div className="jc-b mb-1rem">
				<Link to="/secure/glow/emails">
					<button className="button primary">Back to Emails</button>
				</Link>
				<button className="button primary mb-1rem" onClick={() => save_html()}>
					Save HTML
				</button>
				{/* <button className="button primary mb-1rem" onClick={() => send_announcement_email()}>
					Send Announcement Email
				</button> */}
			</div>
			{jsx}
		</div>
	);
};

export default OrderEmail;
