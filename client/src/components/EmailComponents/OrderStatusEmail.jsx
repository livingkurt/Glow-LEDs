import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { listEmails } from '../../actions/emailActions';
import { API_Emails, API_Orders } from '../../utils';
import { determine_tracking_number, format_date, toCapitalize } from '../../utils/helper_functions';
import { update_order } from '../../actions/orderActions';
import { determine_product_name, order_status_steps } from '../../utils/react_helper_functions';
import { Loading } from '../UtilityComponents';

const OrderStatusEmail = (props) => {
	const [ loading, set_loading ] = useState(false);
	const history = useHistory();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order } = orderDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();

	const [ message_to_user, set_message_to_user ] = useState('');
	const [ email, set_email ] = useState({});

	useEffect(() => {
		let clean = true;
		if (clean) {
			dispatch(listEmails({ email_type: toCapitalize(props.match.params.status), active: true, limit: 1 }));
		}
		return () => (clean = false);
	}, []);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				const message = localStorage.getItem('message_to_user');
				console.log({ message });
				if (message) {
					set_message_to_user(message);
				}
			}
			return () => (clean = false);
		},
		[ emails ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (emails) {
					set_email(emails[0]);
				}
			}
			return () => (clean = false);
		},
		[ emails ]
	);

	const jsx = (
		<body
			style={{
				background: 'unset',
				color: 'white',
				padding: 0,
				margin: 0,
				fontSize: '16px'
				// height: '100%'
			}}
		>
			{order &&
			email && (
				<table
					style={{
						// height: '100%',
						width: '100%',

						borderSpacing: '0',
						// borderCollapse: 'collapse',
						// border: 'none',
						color: 'white',
						margin: 'auto',
						fontSize: '16px',
						// fontFamily: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
						backgroundColor: '#5f5f5f'
					}}
				>
					<tr>
						<td
							style={{
								fontFamily: 'helvetica',
								color: 'white'
							}}
						>
							<table
								style={{
									width: '100%',
									borderSpacing: '0',
									// borderCollapse: 'collapse',
									// margin: '40px 0 20px',
									color: 'white',
									background: '#333333',
									padding: '20px'
									// marginTop: '-278px'
								}}
							>
								<tr>
									<td
										style={{
											fontFamily: 'helvetica',
											color: 'white'
										}}
									>
										<center>
											<table
												style={{
													maxWidth: '560px',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '0 auto',
													color: 'white'
												}}
											>
												<tr>
													<td
														style={{
															fontFamily: 'helvetica',
															color: 'white'
														}}
													>
														<table
															style={{
																width: '100%',
																borderSpacing: '0',
																// borderCollapse: 'collapse',
																color: 'white'
															}}
														>
															<tr>
																<td
																	style={{
																		fontFamily: 'helvetica',
																		color: 'white'
																	}}
																>
																	<img
																		src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
																		alt="Glow LEDs Logo"
																		title="Glow LEDs Logo"
																		style={{
																			// textAlign: 'center',
																			width: '100%',
																			// marginRight: '20px'
																			marginLeft: '-15px'
																		}}
																	/>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<table
												style={{
													maxWidth: '560px',
													width: '100%',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '0 auto',
													color: 'white'
												}}
											>
												<tr>
													<td
														style={{
															fontFamily: 'helvetica',
															color: 'white'
														}}
													>
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
															{email && email.h1}
														</h4>
													</td>
												</tr>
											</table>
										</center>
									</td>
								</tr>
							</table>
							<table
								style={{
									width: '100%',
									borderSpacing: '0',
									padding: '10px'
									// borderCollapse: 'collapse'
								}}
							>
								<tr>
									<td
										style={{
											fontFamily: 'helvetica',
											// paddingBottom: '40px',
											border: '0'
										}}
									>
										<center>
											<table
												style={{
													maxWidth: '560px',
													width: '100%',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '0 auto'
												}}
											>
												<tbody>
													<tr>
														<td
															style={{
																fontFamily: 'helvetica'
															}}
														>
															{/* <h2
																	style={{
																		fontWeight: 'normal',
																		fontSize: '24px',
																		margin: '0 0=10px'
																	}}
																>
																	{email && email.h1}
																</h2> */}

															{order_status_steps(order, props.match.params.status)}

															<p
																style={{
																	color: 'white',
																	lineHeight: '150%',
																	fontSize: '16px',
																	margin: '0'
																}}
															>
																{order.isRefunded ? (
																	<h3 style={{ fontFamily: 'helvetica' }}>
																		Your Order has been refunded for{' '}
																		{order.payment.refund_reason[order.payment.refund_reason.length - 1]}{' '}
																		on {format_date(order.refundedAt)}
																	</h3>
																) : (
																	<p style={{ fontSize: '16px', lineHeight: 2 }}>
																		Hi {order.shipping.first_name},{' '}
																		{email && email.h2 && email.h2}
																	</p>
																)}
															</p>
															{/* <p>{email.p ? email.p : email.p}</p> */}
															<p>{email && email.p}</p>
															<table
																style={{
																	width: '100%',
																	borderSpacing: '0',
																	// borderCollapse: 'collapse',
																	marginTop: '20px'
																}}
															>
																<tbody>
																	<tr
																		style={{
																			fontFamily: 'helvetica',
																			lineHeight: '0em'
																		}}
																	>
																		<td
																			style={{
																				fontFamily: 'helvetica',
																				lineHeight: '0em'
																			}}
																		/>
																	</tr>
																	<tr>
																		<td
																			style={{
																				fontFamily: 'helvetica'
																			}}
																		>
																			<table
																				style={{
																					borderSpacing: '0',
																					// borderCollapse: 'collapse',
																					float: 'left',
																					marginRight: '15px'
																				}}
																			>
																				<tbody>
																					<tr>
																						<td
																							style={{
																								fontFamily: 'helvetica',
																								borderRadius: '4px'
																							}}
																							align="center"
																							bgcolor="#4c4f60"
																						>
																							<a
																								style={{
																									fontSize: '16px',
																									textDecoration:
																										'none',
																									display: 'block',
																									color: 'white',
																									padding:
																										'20px 25px',
																									backgroundColor:
																										'#4c4f60',
																									border: 'none'
																								}}
																								href={
																									'https://www.glow-leds.com/account/login?redirect=/secure/account/order/' +
																									order._id
																								}
																							>
																								View your order
																							</a>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																			<table
																				style={{
																					borderSpacing: '0',
																					// borderCollapse: 'collapse',
																					marginTop: '19px'
																				}}
																			>
																				<tbody>
																					<tr
																						style={{
																							fontFamily: 'helvetica',
																							borderRadius: '4px'
																						}}
																					>
																						<td>
																							or{' '}
																							<a
																								style={{
																									fontSize: '16px',
																									marginLeft: '10px',
																									textDecoration:
																										'none',
																									color: 'white'
																								}}
																								href="https://www.glow-leds.com/"
																							>
																								Visit our store
																							</a>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</center>
									</td>
								</tr>
							</table>

							<table
								style={{
									width: '100%',
									borderSpacing: '0'
									// padding: '10px'
									// borderCollapse: 'collapse'
								}}
							>
								<tr>
									<td
										style={{
											fontFamily: 'helvetica'
											// padding: '40px 0'
										}}
									>
										<center>
											<table
												style={{
													maxWidth: '560px',
													width: '100%',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													padding: '10px',
													margin: '0 auto'
												}}
											>
												<tbody>
													<tr>
														<td
															colSpan={2}
															style={{ verticalAlign: 'top', lineHeight: '25px' }}
															valign="top"
														>
															<table
																style={{
																	width: '100%',
																	lineHeight: 'inherit',
																	textAlign: 'left'
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
																			<strong>Order #:</strong> {order._id}
																			<br />
																			<strong>Created:</strong>{' '}
																			{order.createdAt && format_date(order.createdAt)}
																			{order.tracking_number && (
																				<div>
																					<strong>Tracking Number: </strong>{' '}
																					<a
																						href={determine_tracking_number(
																							order.tracking_number
																						)}
																						target="_blank"
																						rel="noopener noreferrer"
																						style={{
																							textDecoration: 'underline',
																							color: 'white'
																						}}
																					>
																						{order.tracking_number}
																					</a>
																				</div>
																			)}
																			<br />
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
													{order.order_note && (
														<tr>
															<td
																style={{
																	verticalAlign: 'top',
																	color: 'white',
																	fontSize: '16px',
																	lineHeight: '40px'
																}}
																valign="top"
																align="left"
															>
																<div>
																	<strong>Order Note:</strong> {order.order_note}
																</div>
																{console.log({ message_to_user })}
																{message_to_user && (
																	<div>
																		<strong>Message To User:</strong>{' '}
																		{message_to_user}
																	</div>
																)}
																<br />
																<br />
															</td>
														</tr>
													)}
													<tr>
														<td
															style={{
																fontFamily: 'helvetica'
															}}
														>
															<h3
																style={{
																	fontWeight: 'normal',
																	fontSize: '20px',
																	margin: '0 0 25px'
																}}
															>
																<strong>Items in this order</strong>
															</h3>
														</td>
													</tr>
												</tbody>
											</table>

											<table
												style={{
													maxWidth: '560px',
													padding: '10px',
													textAlign: 'left',
													borderSpacing: '0',
													width: '100%',
													// borderCollapse: 'collapse',
													margin: '0 auto'
												}}
											>
												<tr>
													<td
														style={{
															fontFamily: 'helvetica'
														}}
													>
														<table
															style={{
																width: '100%',
																borderSpacing: '0'
																// borderCollapse: 'collapse'
															}}
														>
															<tbody>
																{order.orderItems.map((item, index) => (
																	<tr>
																		<td
																			style={{
																				fontFamily: 'helvetica'
																			}}
																		>
																			<table
																				style={{
																					width: '100%',
																					borderSpacing: '0',
																					borderBottom: '1px white solid'
																					// borderCollapse: 'collapse'
																				}}
																			>
																				<tbody>
																					<tr style={{ width: '100%' }}>
																						<td
																							style={{
																								fontFamily: 'helvetica'
																							}}
																						>
																							<table
																								style={{
																									borderSpacing: '0',
																									width: '100%',
																									margin: '10px auto'
																									// borderCollapse:
																									// 	'collapse'
																								}}
																							>
																								<tbody>
																									<tr>
																										<td
																											style={{
																												fontFamily:
																													'helvetica'
																											}}
																										>
																											<img
																												src={
																													item.display_image
																												}
																												align="left"
																												width="60"
																												height="60"
																												alt="text"
																												style={{
																													marginRight:
																														'15px',
																													borderRadius:
																														'8px'
																													// border:
																													// 	'1px solid #e5e5e5'
																												}}
																											/>
																										</td>
																										<td
																											style={{
																												fontFamily:
																													'helvetica',
																												width:
																													'100%'
																											}}
																										>
																											<span
																												style={{
																													fontSize:
																														'16px',
																													fontWeight:
																														'600',
																													lineHeight:
																														'1.4',
																													color:
																														'white'
																												}}
																											>
																												{determine_product_name(
																													item,
																													true,
																													order.createdAt
																												)}
																											</span>
																											<br />
																										</td>
																									</tr>
																								</tbody>
																							</table>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</td>
												</tr>
											</table>
										</center>
									</td>
								</tr>
							</table>
							<table
								style={{
									maxWidth: '400px',
									textAlign: 'center',
									borderSpacing: '0px',
									margin: '10px auto',
									width: '100%'
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												fontFamily: 'helvetica',

												// width: '50%',
												fontSize: '30px',
												color: 'white'
											}}
										>
											<table
												style={{
													maxWidth: '560px',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '0 auto'
												}}
											>
												<tbody>
													<tr>
														<td
															style={{
																fontFamily: 'helvetica'
															}}
														>
															<p
																style={{
																	textAlign: 'center',
																	fontSize: '14px',
																	color: 'white',
																	lineHeight: 2
																}}
															>
																<strong>Tag us in your videos and pictures!</strong>
																<br /> We want to feature you!
															</p>
															<p
																style={{
																	textAlign: 'center',
																	fontSize: '14px',
																	color: 'white',
																	marginBottom: '-10px'
																}}
															/>
															<table
																style={{
																	borderSpacing: '0',
																	// borderCollapse: 'collapse',
																	// float: 'left',
																	// marginRight: '15px'
																	textAlign: 'center',
																	margin: 'auto'
																}}
															>
																<tbody>
																	<tr>
																		<td
																			style={{
																				fontFamily: 'helvetica',
																				borderRadius: '4px'
																			}}
																			align="center"
																			bgcolor="#4c4f60"
																		>
																			<a
																				style={{
																					fontSize: '16px',
																					textDecoration: 'none',
																					display: 'block',
																					color: 'white',
																					padding: '20px 25px',
																					backgroundColor: '#4c4f60',
																					border: 'none'
																				}}
																				href={
																					'https://www.glow-leds.com/pages/contact/submit_content_to_be_featured'
																				}
																			>
																				Feature Content
																			</a>
																		</td>
																	</tr>
																</tbody>
															</table>
															<p
																style={{
																	textAlign: 'center',
																	fontSize: '14px'
																}}
															>
																We appreciate all of the love and support! It truely
																drives us to do what we do. Thank you so much 💙
															</p>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
							<table
								style={{
									width: '100%',
									borderSpacing: '0',
									// borderCollapse: 'collapse',
									borderTopWidth: '1px',
									// borderTopColor: 'white',
									borderTopStyle: 'solid',
									backgroundColor: '#333333'
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												fontFamily: 'helvetica',
												paddingBottom: '35px 0'
											}}
										>
											<center>
												<table
													// style={{
													// 	width: '100%',
													// 	borderSpacing: '0',
													// 	margin: '0px auto'
													// 	// borderCollapse: 'collapse'
													// }}
													style={{
														maxWidth: '400px',
														textAlign: 'center',
														borderSpacing: '0px',
														margin: '10px auto',
														width: '100%'
													}}
												>
													<tbody>
														<tr>
															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
																	fontSize: '30px',
																	color: 'white'
																}}
															>
																<a
																	href="https://www.facebook.com/Glow-LEDscom-100365571740684"
																	target="_blank"
																	rel="noopener noreferrer"
																	aria-label="Facebook"
																>
																	{/* <i className="fab fa-facebook zoom" style={{ color: 'white' }} /> */}
																	{/* <Facebook fill="white" /> */}
																	<img
																		src="https://images2.imgbox.com/9b/a0/XAC4qmRL_o.png"
																		style={{ height: '25px' }}
																		alt="Facebook"
																		title="Facebook Logo"
																	/>
																</a>
															</td>

															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
																	fontSize: '30px',
																	color: 'white'
																}}
															>
																<a
																	href="https://www.instagram.com/glow_leds/"
																	target="_blank"
																	rel="noopener noreferrer"
																	aria-label="Instagram"
																>
																	{/* <i className="fab fa-instagram zoom" style={{ color: 'white' }} /> */}
																	<img
																		src="https://images2.imgbox.com/d2/77/vuk6FOeW_o.png"
																		style={{ height: '25px' }}
																		alt="Instagram"
																		title="Instagram Logo"
																	/>
																</a>
															</td>
															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
																	fontSize: '30px',
																	color: 'white'
																}}
															>
																<a
																	href="https://www.tiktok.com/@glow_leds?lang=en"
																	target="_blank"
																	rel="noopener noreferrer"
																	aria-label="Youtube"
																>
																	{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
																	<img
																		src="https://images2.imgbox.com/c1/ea/6hNkTIwU_o.png"
																		style={{ height: '22px' }}
																		alt="Tiktok"
																		title="Tiktok Logo"
																	/>
																</a>
															</td>
															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
																	fontSize: '30px',
																	color: 'white'
																}}
															>
																<a
																	href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1"
																	target="_blank"
																	rel="noopener noreferrer"
																	aria-label="Soundcloud"
																>
																	{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
																	<img
																		src="https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png"
																		style={{ height: '22px' }}
																		alt="Youtube"
																		title="Youtube Logo"
																	/>
																</a>
															</td>
														</tr>
													</tbody>
												</table>
												<table
													style={{
														maxWidth: '560px',
														textAlign: 'left',
														borderSpacing: '0',
														// borderCollapse: 'collapse',
														margin: '0 auto'
													}}
												>
													<tbody>
														<tr>
															<td
																style={{
																	fontFamily: 'helvetica'
																}}
															>
																<p
																	style={{
																		color: 'white',
																		lineHeight: '150%',
																		fontSize: '14px',
																		margin: '0',
																		textAlign: 'center',
																		padding: '10px'
																	}}
																>
																	If you have any questions, reply to this email or
																	contact us at{' '}
																	<a
																		href="mailto:info.glowleds@gmail.com"
																		style={{
																			fontSize: '14px',
																			textDecoration: 'none',
																			color: '#009eff'
																		}}
																	>
																		info.glowleds@gmail.com
																	</a>
																</p>
															</td>
														</tr>
													</tbody>
												</table>
											</center>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</table>
			)}
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);
	console.log({ email_template });

	const send_order_email = async (email, first_name, subject) => {
		set_loading(true);
		console.log({ email_template });
		// const { data } = await API_Emails.send_user_email(email_template, subject, email);
		// const { data: request } = await API_Emails.send_admin_email(
		// 	email_template,
		// 	'Order Status Updated for ' + first_name
		// );
		// console.log({ data });
		// console.log({ request });
		const { data: user_email } = await API_Emails.send_email(email_template, subject, email);
		const { data: admin_email } = await API_Emails.send_email(
			email_template,
			'Order Status Updated for ' + first_name
		);
		console.log({ user_email });
		console.log({ admin_email });
		if (user_email && admin_email) {
			if (props.match.params.batch === 'true') {
				console.log({ send_order_email: 'mark_as_shipped' });
				const { data: orders } = await API_Orders.mark_as_shipped();
				dispatch(update_order(orders[0], false, 'isShipped', 'shippedAt'));
				// const { data: orders } = await API_Orders.mark_as_shipped();
				console.log({ send_order_email: 'redirect to order status email' });
				history.push(`/secure/glow/emails/order_status/${orders[0]._id}/shipped/true/true`);
			} else {
				history.push(`/secure/account/order/${order._id}`);
			}

			set_loading(false);
			localStorage.removeItem('message_to_user');
		}
	};
	// const [ num, set_num ] = useState(0);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				// if (num === 0) {
				if (order) {
					if (email) {
						if (props.match.params.send === 'true') {
							if (order.orderItems.length > 0) {
								if (props.match.params.id) {
									send_order_email(order.shipping.email, order.shipping.first_name, email.h1);
									// set_num(1);
								}
							}
						}
						// }
					}
				}
			}
			return () => (clean = false);
		},
		[ emails ]
	);

	return (
		<div>
			<Loading loading={loading} />
			{userInfo &&
			userInfo.isAdmin && (
				<div className="jc-b mb-1rem">
					<Link to="/secure/glow/emails">
						<button className="btn primary">Back to Emails</button>
					</Link>
					<Link to={props.location.previous_path || '/secure/glow/orders?page=1?limit=10'}>
						<button className="btn primary">Back to Orders</button>
					</Link>
					{order && (
						<Link to={'/secure/account/order/' + order._id}>
							<button className="btn primary">Back to Order</button>
						</Link>
					)}
					{/* <div>
						<label htmlFor="message_to_user">Message to User</label>
						<input
							type="text"
							value={message_to_user}
							name="message_to_user"
							id="message_to_user"
							onChange={(e) => set_message_to_user(e.target.value)}
						/>
					</div> */}
					<button
						className="btn primary mb-1rem"
						onClick={() => send_order_email('lavacquek@icloud.com', 'Kurt', email.h1)}
					>
						Send Test Email
					</button>
					<button
						className="btn primary mb-1rem"
						onClick={() => send_order_email(order.shipping.email, order.shipping.first_name, email.h1)}
					>
						Send Order Status Email
					</button>
					{/* <Loading loading={loading_email} /> */}
				</div>
			)}
			{jsx}
		</div>
	);
};

export default OrderStatusEmail;
