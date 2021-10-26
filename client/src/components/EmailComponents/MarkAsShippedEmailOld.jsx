// import React, { useEffect, useCallback, useState } from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
// import { detailsEmail, listEmails } from '../../actions/emailActions';
// import { API_Emails, API_Orders } from '../../utils';
// import { determine_tracking_number, format_date, toCapitalize } from '../../utils/helper_functions';
// import { detailsOrder, detailsOrderPublic, update_order } from '../../actions/orderActions';
// import {
// 	determine_product_name,
// 	email_sale_price_switch,
// 	order_status_steps
// } from '../../utils/react_helper_functions';
// import { listPromos } from '../../actions/promoActions';
// import { Loading } from '../UtilityComponents';

// const MarkAsShippedEmail = (props) => {
// 	const [ loading, set_loading ] = useState(false);
// 	const [ order, set_order ] = useState();
// 	const history = useHistory();
// 	// const orderDetails = useSelector((state) => state.orderDetails);
// 	// const { order } = orderDetails;

// 	const emailDetails = useSelector((state) => state.emailDetails);
// 	const { email } = emailDetails;
// 	// const orderUpdate = useSelector((state) => state.orderUpdate);
// 	// const { success } = orderUpdate;

// 	const userLogin = useSelector((state) => state.userLogin);
// 	const { userInfo } = userLogin;

// 	const emailList = useSelector((state) => state.emailList);
// 	const { emails } = emailList;

// 	const dispatch = useDispatch();

// 	const [ message_to_user, set_message_to_user ] = useState('');
// 	// const message = props.match.params.message ? props.match.params.message : '';

// 	useEffect(() => {
// 		dispatch(listEmails(toCapitalize(props.match.params.status)));
// 		// dispatch(detailsOrder(props.match.params.id));
// 		return () => {};
// 	}, []);

// 	useEffect(() => {
// 		const message = localStorage.getItem('message_to_user');
// 		console.log({ message });
// 		if (message) {
// 			set_message_to_user(message);
// 		}
// 		return () => {};
// 	}, []);

// 	useEffect(
// 		() => {
// 			if (emails) {
// 				const active_email = emails.find((email) => email.active === true);
// 				if (active_email) {
// 					dispatch(detailsEmail(active_email._id));
// 				}
// 			}

// 			return () => {};
// 		},
// 		[ emails ]
// 	);

// 	const jsx = (
// 		<body
// 			style={{
// 				background: 'unset',
// 				color: 'white',
// 				padding: 0,
// 				margin: 0,
// 				fontSize: '16px'
// 				// height: '100%'
// 			}}
// 		>
// 			{order &&
// 			email && (
// 				<table
// 					style={{
// 						// height: '100%',
// 						width: '100%',

// 						borderSpacing: '0',
// 						// borderCollapse: 'collapse',
// 						// border: 'none',
// 						color: 'white',
// 						margin: 'auto',
// 						fontSize: '16px',
// 						// fontFamily: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
// 						backgroundColor: '#5f5f5f'
// 					}}
// 				>
// 					<tr>
// 						<td
// 							style={{
// 								fontFamily: 'helvetica',
// 								color: 'white'
// 							}}
// 						>
// 							<table
// 								style={{
// 									width: '100%',
// 									borderSpacing: '0',
// 									// borderCollapse: 'collapse',
// 									// margin: '40px 0 20px',
// 									color: 'white',
// 									background: '#333333',
// 									padding: '20px'
// 									// marginTop: '-278px'
// 								}}
// 							>
// 								<tr>
// 									<td
// 										style={{
// 											fontFamily: 'helvetica',
// 											color: 'white'
// 										}}
// 									>
// 										<center>
// 											<table
// 												style={{
// 													maxWidth: '560px',
// 													textAlign: 'left',
// 													borderSpacing: '0',
// 													// borderCollapse: 'collapse',
// 													margin: '0 auto',
// 													color: 'white'
// 												}}
// 											>
// 												<tr>
// 													<td
// 														style={{
// 															fontFamily: 'helvetica',
// 															color: 'white'
// 														}}
// 													>
// 														<table
// 															style={{
// 																width: '100%',
// 																borderSpacing: '0',
// 																// borderCollapse: 'collapse',
// 																color: 'white'
// 															}}
// 														>
// 															<tr>
// 																<td
// 																	style={{
// 																		fontFamily: 'helvetica',
// 																		color: 'white'
// 																	}}
// 																>
// 																	<img
// 																		src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
// 																		alt="Glow LEDs Logo"
// 																		title="Glow LEDs Logo"
// 																		style={{
// 																			// textAlign: 'center',
// 																			width: '100%',
// 																			// marginRight: '20px'
// 																			marginLeft: '-15px'
// 																		}}
// 																	/>
// 																</td>
// 															</tr>
// 														</table>
// 													</td>
// 												</tr>
// 											</table>
// 											<table
// 												style={{
// 													maxWidth: '560px',
// 													width: '100%',
// 													textAlign: 'left',
// 													borderSpacing: '0',
// 													// borderCollapse: 'collapse',
// 													margin: '0 auto',
// 													color: 'white'
// 												}}
// 											>
// 												<tr>
// 													<td
// 														style={{
// 															fontFamily: 'helvetica',
// 															color: 'white'
// 														}}
// 													>
// 														<h4
// 															style={{
// 																textAlign: 'center',
// 																fontFamily: 'helvetica',
// 																width: '100%',
// 																margin: '0 auto',
// 																lineHeight: '50px',
// 																color: 'white',
// 																fontSize: '2em'
// 															}}
// 														>
// 															{email && email.h1}
// 														</h4>
// 													</td>
// 												</tr>
// 											</table>
// 										</center>
// 									</td>
// 								</tr>
// 							</table>
// 							<table
// 								style={{
// 									width: '100%',
// 									borderSpacing: '0',
// 									padding: '10px'
// 									// borderCollapse: 'collapse'
// 								}}
// 							>
// 								<tr>
// 									<td
// 										style={{
// 											fontFamily: 'helvetica',
// 											// paddingBottom: '40px',
// 											border: '0'
// 										}}
// 									>
// 										<center>
// 											<table
// 												style={{
// 													maxWidth: '560px',
// 													width: '100%',
// 													textAlign: 'left',
// 													borderSpacing: '0',
// 													// borderCollapse: 'collapse',
// 													margin: '0 auto'
// 												}}
// 											>
// 												<tbody>
// 													<tr>
// 														<td
// 															style={{
// 																fontFamily: 'helvetica'
// 															}}
// 														>
// 															{/* <h2
// 																	style={{
// 																		fontWeight: 'normal',
// 																		fontSize: '24px',
// 																		margin: '0 0=10px'
// 																	}}
// 																>
// 																	{email && email.h1}
// 																</h2> */}

// 															{order_status_steps(order, props.match.params.status)}

// 															<p
// 																style={{
// 																	color: 'white',
// 																	lineHeight: '150%',
// 																	fontSize: '16px',
// 																	margin: '0'
// 																}}
// 															>
// 																{order.isRefunded ? (
// 																	<h3 style={{ fontFamily: 'helvetica' }}>
// 																		Your Order has been refunded for{' '}
// 																		{order.payment.refund_reason[order.payment.refund_reason.length - 1]}{' '}
// 																		on {format_date(order.refundedAt)}
// 																	</h3>
// 																) : (
// 																	<p style={{ fontSize: '16px', lineHeight: 2 }}>
// 																		Hi {order.shipping.first_name},{' '}
// 																		{email && email.h2 && email.h2}
// 																	</p>
// 																)}
// 															</p>
// 															{/* <p>{email.p ? email.p : email.p}</p> */}
// 															<p>{email && email.p}</p>
// 															<table
// 																style={{
// 																	width: '100%',
// 																	borderSpacing: '0',
// 																	// borderCollapse: 'collapse',
// 																	marginTop: '20px'
// 																}}
// 															>
// 																<tbody>
// 																	<tr
// 																		style={{
// 																			fontFamily: 'helvetica',
// 																			lineHeight: '0em'
// 																		}}
// 																	>
// 																		<td
// 																			style={{
// 																				fontFamily: 'helvetica',
// 																				lineHeight: '0em'
// 																			}}
// 																		/>
// 																	</tr>
// 																	<tr>
// 																		<td
// 																			style={{
// 																				fontFamily: 'helvetica'
// 																			}}
// 																		>
// 																			<table
// 																				style={{
// 																					borderSpacing: '0',
// 																					// borderCollapse: 'collapse',
// 																					float: 'left',
// 																					marginRight: '15px'
// 																				}}
// 																			>
// 																				<tbody>
// 																					<tr>
// 																						<td
// 																							style={{
// 																								fontFamily: 'helvetica',
// 																								borderRadius: '4px'
// 																							}}
// 																							align="center"
// 																							bgcolor="#4c4f60"
// 																						>
// 																							<a
// 																								style={{
// 																									fontSize: '16px',
// 																									textDecoration:
// 																										'none',
// 																									display: 'block',
// 																									color: 'white',
// 																									padding:
// 																										'20px 25px',
// 																									backgroundColor:
// 																										'#4c4f60',
// 																									border: 'none'
// 																								}}
// 																								href={
// 																									'https://www.glow-leds.com/account/login?redirect=/secure/account/order/' +
// 																									order._id
// 																								}
// 																							>
// 																								View your order
// 																							</a>
// 																						</td>
// 																					</tr>
// 																				</tbody>
// 																			</table>
// 																			<table
// 																				style={{
// 																					borderSpacing: '0',
// 																					// borderCollapse: 'collapse',
// 																					marginTop: '19px'
// 																				}}
// 																			>
// 																				<tbody>
// 																					<tr
// 																						style={{
// 																							fontFamily: 'helvetica',
// 																							borderRadius: '4px'
// 																						}}
// 																					>
// 																						<td>
// 																							or{' '}
// 																							<a
// 																								style={{
// 																									fontSize: '16px',
// 																									marginLeft: '10px',
// 																									textDecoration:
// 																										'none',
// 																									color: 'white'
// 																								}}
// 																								href="https://www.glow-leds.com/"
// 																							>
// 																								Visit our store
// 																							</a>
// 																						</td>
// 																					</tr>
// 																				</tbody>
// 																			</table>
// 																		</td>
// 																	</tr>
// 																</tbody>
// 															</table>
// 														</td>
// 													</tr>
// 												</tbody>
// 											</table>
// 										</center>
// 									</td>
// 								</tr>
// 							</table>

// 							<table
// 								style={{
// 									width: '100%',
// 									borderSpacing: '0'
// 									// padding: '10px'
// 									// borderCollapse: 'collapse'
// 								}}
// 							>
// 								<tr>
// 									<td
// 										style={{
// 											fontFamily: 'helvetica'
// 											// padding: '40px 0'
// 										}}
// 									>
// 										<center>
// 											<table
// 												style={{
// 													maxWidth: '560px',
// 													width: '100%',
// 													textAlign: 'left',
// 													borderSpacing: '0',
// 													// borderCollapse: 'collapse',
// 													padding: '10px',
// 													margin: '0 auto'
// 												}}
// 											>
// 												<tbody>
// 													<tr>
// 														<td
// 															colSpan={2}
// 															style={{ verticalAlign: 'top', lineHeight: '25px' }}
// 															valign="top"
// 														>
// 															<table
// 																style={{
// 																	width: '100%',
// 																	lineHeight: 'inherit',
// 																	textAlign: 'left'
// 																}}
// 																width="100%"
// 																align="left"
// 															>
// 																<tbody>
// 																	<tr>
// 																		<td
// 																			style={{
// 																				verticalAlign: 'top',
// 																				lineHeight: '45px',
// 																				color: '#333'
// 																			}}
// 																			valign="top"
// 																		/>
// 																		<td
// 																			style={{
// 																				verticalAlign: 'top',
// 																				textAlign: 'right',
// 																				color: 'white',
// 																				fontSize: '16px'
// 																			}}
// 																			valign="top"
// 																			align="right"
// 																		>
// 																			<strong>Order #:</strong> {order._id}
// 																			<br />
// 																			<strong>Created:</strong>{' '}
// 																			{order.createdAt && format_date(order.createdAt)}
// 																			{order.tracking_number && (
// 																				<div>
// 																					<strong>Tracking Number: </strong>{' '}
// 																					<a
// 																						href={determine_tracking_number(
// 																							order.tracking_number
// 																						)}
// 																						target="_blank"
// 																						rel="noopener noreferrer"
// 																						style={{
// 																							textDecoration: 'underline',
// 																							color: 'white'
// 																						}}
// 																					>
// 																						{order.tracking_number}
// 																					</a>
// 																				</div>
// 																			)}
// 																			<br />
// 																		</td>
// 																	</tr>
// 																</tbody>
// 															</table>
// 														</td>
// 													</tr>
// 													{order.order_note && (
// 														<tr>
// 															<td
// 																style={{
// 																	verticalAlign: 'top',
// 																	color: 'white',
// 																	fontSize: '16px',
// 																	lineHeight: '40px'
// 																}}
// 																valign="top"
// 																align="left"
// 															>
// 																<div>
// 																	<strong>Order Note:</strong> {order.order_note}
// 																</div>
// 																{console.log({ message_to_user })}
// 																{message_to_user && (
// 																	<div>
// 																		<strong>Message To User:</strong>{' '}
// 																		{message_to_user}
// 																	</div>
// 																)}
// 																<br />
// 																<br />
// 															</td>
// 														</tr>
// 													)}
// 													<tr>
// 														<td
// 															style={{
// 																fontFamily: 'helvetica'
// 															}}
// 														>
// 															<h3
// 																style={{
// 																	fontWeight: 'normal',
// 																	fontSize: '20px',
// 																	margin: '0 0 25px'
// 																}}
// 															>
// 																<strong>Items in this order</strong>
// 															</h3>
// 														</td>
// 													</tr>
// 												</tbody>
// 											</table>

// 											<table
// 												style={{
// 													maxWidth: '560px',
// 													padding: '10px',
// 													textAlign: 'left',
// 													borderSpacing: '0',
// 													width: '100%',
// 													// borderCollapse: 'collapse',
// 													margin: '0 auto'
// 												}}
// 											>
// 												<tr>
// 													<td
// 														style={{
// 															fontFamily: 'helvetica'
// 														}}
// 													>
// 														<table
// 															style={{
// 																width: '100%',
// 																borderSpacing: '0'
// 																// borderCollapse: 'collapse'
// 															}}
// 														>
// 															<tbody>
// 																{order.orderItems.map((item, index) => (
// 																	<tr>
// 																		<td
// 																			style={{
// 																				fontFamily: 'helvetica'
// 																			}}
// 																		>
// 																			<table
// 																				style={{
// 																					width: '100%',
// 																					borderSpacing: '0',
// 																					borderBottom: '1px white solid'
// 																					// borderCollapse: 'collapse'
// 																				}}
// 																			>
// 																				<tbody>
// 																					<tr style={{ width: '100%' }}>
// 																						<td
// 																							style={{
// 																								fontFamily: 'helvetica'
// 																							}}
// 																						>
// 																							<table
// 																								style={{
// 																									borderSpacing: '0',
// 																									width: '100%',
// 																									margin: '10px auto'
// 																									// borderCollapse:
// 																									// 	'collapse'
// 																								}}
// 																							>
// 																								<tbody>
// 																									<tr>
// 																										<td
// 																											style={{
// 																												fontFamily:
// 																													'helvetica'
// 																											}}
// 																										>
// 																											<img
// 																												src={
// 																													item.display_image
// 																												}
// 																												align="left"
// 																												width="60"
// 																												height="60"
// 																												alt="text"
// 																												style={{
// 																													marginRight:
// 																														'15px',
// 																													borderRadius:
// 																														'8px'
// 																													// border:
// 																													// 	'1px solid #e5e5e5'
// 																												}}
// 																											/>
// 																										</td>
// 																										<td
// 																											style={{
// 																												fontFamily:
// 																													'helvetica',
// 																												width:
// 																													'100%'
// 																											}}
// 																										>
// 																											<span
// 																												style={{
// 																													fontSize:
// 																														'16px',
// 																													fontWeight:
// 																														'600',
// 																													lineHeight:
// 																														'1.4',
// 																													color:
// 																														'white'
// 																												}}
// 																											>
// 																												{determine_product_name(
// 																													item,
// 																													true,
// 																													order.createdAt
// 																												)}
// 																											</span>
// 																											<br />
// 																										</td>
// 																									</tr>
// 																								</tbody>
// 																							</table>
// 																						</td>
// 																					</tr>
// 																				</tbody>
// 																			</table>
// 																		</td>
// 																	</tr>
// 																))}
// 															</tbody>
// 														</table>
// 													</td>
// 												</tr>
// 											</table>
// 										</center>
// 									</td>
// 								</tr>
// 							</table>
// 							<table
// 								style={{
// 									maxWidth: '400px',
// 									textAlign: 'center',
// 									borderSpacing: '0px',
// 									margin: '10px auto',
// 									width: '100%'
// 								}}
// 							>
// 								<tbody>
// 									<tr>
// 										<td
// 											style={{
// 												fontFamily: 'helvetica',

// 												// width: '50%',
// 												fontSize: '30px',
// 												color: 'white'
// 											}}
// 										>
// 											<table
// 												style={{
// 													maxWidth: '560px',
// 													textAlign: 'left',
// 													borderSpacing: '0',
// 													// borderCollapse: 'collapse',
// 													margin: '0 auto'
// 												}}
// 											>
// 												<tbody>
// 													<tr>
// 														<td
// 															style={{
// 																fontFamily: 'helvetica'
// 															}}
// 														>
// 															<p
// 																style={{
// 																	textAlign: 'center',
// 																	fontSize: '14px',
// 																	color: 'white',
// 																	lineHeight: 2
// 																}}
// 															>
// 																<strong>Tag us in your videos and pictures!</strong>
// 																<br /> We want to feature you!
// 															</p>
// 															<p
// 																style={{
// 																	textAlign: 'center',
// 																	fontSize: '14px',
// 																	color: 'white',
// 																	marginBottom: '-10px'
// 																}}
// 															/>
// 															<table
// 																style={{
// 																	borderSpacing: '0',
// 																	// borderCollapse: 'collapse',
// 																	// float: 'left',
// 																	// marginRight: '15px'
// 																	textAlign: 'center',
// 																	margin: 'auto'
// 																}}
// 															>
// 																<tbody>
// 																	<tr>
// 																		<td
// 																			style={{
// 																				fontFamily: 'helvetica',
// 																				borderRadius: '4px'
// 																			}}
// 																			align="center"
// 																			bgcolor="#4c4f60"
// 																		>
// 																			<a
// 																				style={{
// 																					fontSize: '16px',
// 																					textDecoration: 'none',
// 																					display: 'block',
// 																					color: 'white',
// 																					padding: '20px 25px',
// 																					backgroundColor: '#4c4f60',
// 																					border: 'none'
// 																				}}
// 																				href={
// 																					'https://www.glow-leds.com/pages/contact/submit_content_to_be_featured'
// 																				}
// 																			>
// 																				Feature Content
// 																			</a>
// 																		</td>
// 																	</tr>
// 																</tbody>
// 															</table>
// 															<p
// 																style={{
// 																	textAlign: 'center',
// 																	fontSize: '14px'
// 																}}
// 															>
// 																We appreciate all of the love and support! It truely
// 																drives us to do what we do. Thank you so much 💙
// 															</p>
// 														</td>
// 													</tr>
// 												</tbody>
// 											</table>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 							<table
// 								style={{
// 									width: '100%',
// 									borderSpacing: '0',
// 									// borderCollapse: 'collapse',
// 									borderTopWidth: '1px',
// 									// borderTopColor: 'white',
// 									borderTopStyle: 'solid',
// 									backgroundColor: '#333333'
// 								}}
// 							>
// 								<tbody>
// 									<tr>
// 										<td
// 											style={{
// 												fontFamily: 'helvetica',
// 												paddingBottom: '35px 0'
// 											}}
// 										>
// 											<center>
// 												<table
// 													// style={{
// 													// 	width: '100%',
// 													// 	borderSpacing: '0',
// 													// 	margin: '0px auto'
// 													// 	// borderCollapse: 'collapse'
// 													// }}
// 													style={{
// 														maxWidth: '400px',
// 														textAlign: 'center',
// 														borderSpacing: '0px',
// 														margin: '10px auto',
// 														width: '100%'
// 													}}
// 												>
// 													<tbody>
// 														<tr>
// 															<td
// 																style={{
// 																	fontFamily: 'helvetica',

// 																	// width: '50%',
// 																	fontSize: '30px',
// 																	color: 'white'
// 																}}
// 															>
// 																<a
// 																	href="https://www.facebook.com/Glow-LEDscom-100365571740684"
// 																	target="_blank"
// 																	rel="noopener noreferrer"
// 																>
// 																	{/* <i className="fab fa-facebook zoom" style={{ color: 'white' }} /> */}
// 																	{/* <Facebook fill="white" /> */}
// 																	<img
// 																		src="https://images2.imgbox.com/9b/a0/XAC4qmRL_o.png"
// 																		style={{ height: '25px' }}
// 																		alt="Facebook"
// 																		title="Facebook Logo"
// 																	/>
// 																</a>
// 															</td>

// 															<td
// 																style={{
// 																	fontFamily: 'helvetica',

// 																	// width: '50%',
// 																	fontSize: '30px',
// 																	color: 'white'
// 																}}
// 															>
// 																<a
// 																	href="https://www.instagram.com/glow_leds/"
// 																	target="_blank"
// 																	rel="noopener noreferrer"
// 																>
// 																	{/* <i className="fab fa-instagram zoom" style={{ color: 'white' }} /> */}
// 																	<img
// 																		src="https://images2.imgbox.com/d2/77/vuk6FOeW_o.png"
// 																		style={{ height: '25px' }}
// 																		alt="Instagram"
// 																		title="Instagram Logo"
// 																	/>
// 																</a>
// 															</td>
// 															<td
// 																style={{
// 																	fontFamily: 'helvetica',

// 																	// width: '50%',
// 																	fontSize: '30px',
// 																	color: 'white'
// 																}}
// 															>
// 																<a
// 																	href="https://www.tiktok.com/@glow_leds?lang=en"
// 																	target="_blank"
// 																	rel="noopener noreferrer"
// 																>
// 																	{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
// 																	<img
// 																		src="https://images2.imgbox.com/c1/ea/6hNkTIwU_o.png"
// 																		style={{ height: '22px' }}
// 																		alt="Tiktok"
// 																		title="Tiktok Logo"
// 																	/>
// 																</a>
// 															</td>
// 															<td
// 																style={{
// 																	fontFamily: 'helvetica',

// 																	// width: '50%',
// 																	fontSize: '30px',
// 																	color: 'white'
// 																}}
// 															>
// 																<a
// 																	href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1"
// 																	target="_blank"
// 																	rel="noopener noreferrer"
// 																>
// 																	{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
// 																	<img
// 																		src="https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png"
// 																		style={{ height: '22px' }}
// 																		alt="Youtube"
// 																		title="Youtube Logo"
// 																	/>
// 																</a>
// 															</td>
// 														</tr>
// 													</tbody>
// 												</table>
// 												<table
// 													style={{
// 														maxWidth: '560px',
// 														textAlign: 'left',
// 														borderSpacing: '0',
// 														// borderCollapse: 'collapse',
// 														margin: '0 auto'
// 													}}
// 												>
// 													<tbody>
// 														<tr>
// 															<td
// 																style={{
// 																	fontFamily: 'helvetica'
// 																}}
// 															>
// 																<p
// 																	style={{
// 																		color: 'white',
// 																		lineHeight: '150%',
// 																		fontSize: '14px',
// 																		margin: '0',
// 																		textAlign: 'center',
// 																		padding: '10px'
// 																	}}
// 																>
// 																	If you have any questions, reply to this email or
// 																	contact us at{' '}
// 																	<a
// 																		href="mailto:info.glowleds@gmail.com"
// 																		style={{
// 																			fontSize: '14px',
// 																			textDecoration: 'none',
// 																			color: '#009eff'
// 																		}}
// 																	>
// 																		info.glowleds@gmail.com
// 																	</a>
// 																</p>
// 															</td>
// 														</tr>
// 													</tbody>
// 												</table>
// 											</center>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</td>
// 					</tr>
// 				</table>
// 			)}
// 		</body>
// 	);

// 	// const [ email_template, set_email_template ] = useState('');

// 	// const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

// 	const send_order_email = async (email, first_name, subject, email_template) => {
// 		set_loading(true);

// 		const waitForElement = async (email_template) => {
// 			if (email_template && email_template.length > 100) {
// 				console.log({ email_template: email_template && email_template.length });
// 				const { data: user_email } = await API_Emails.send_email(email_template, subject, email);
// 				const { data: admin_email } = await API_Emails.send_email(
// 					email_template,
// 					'Order Status Updated for ' + first_name
// 				);
// 				if (user_email && admin_email) {
// 					set_loading(false);
// 					return;
// 				}
// 			} else {
// 				console.log('Checking');
// 				setTimeout(waitForElement, 50);
// 			}
// 		};
// 		waitForElement(email_template);
// 	};
// 	const [ num, set_num ] = useState(0);

// 	useEffect(() => {
// 		return () => {};
// 	}, []);

// 	// useEffect(
// 	// 	() => {
// 	// 		if (num === 0) {
// 	// 			if (order) {
// 	// 				if (email) {
// 	// 					if (props.match.params.send === 'true') {
// 	// 						if (order.orderItems.length > 0) {
// 	// 							if (props.match.params.id) {
// 	// 								send_order_email(order.shipping.email, order.shipping.first_name, email.h1);
// 	// 								set_num(1);
// 	// 							}
// 	// 						}
// 	// 					}
// 	// 				}
// 	// 			}
// 	// 		}

// 	// 		return () => {};
// 	// 	},
// 	// 	[ email ]
// 	// );

// 	const [ loading_mark_as_shipped, set_loading_mark_as_shipped ] = useState(false);
// 	const [ success, set_success ] = useState(false);

// 	const mark_as_shipped = async () => {
// 		const { data: orders } = await API_Orders.mark_as_shipped();
// 		console.log({ orders });
// 		let num = 0;
// 		console.log({ before_num: num, length: orders.length - 1 });
// 		orders.forEach(async (order, i) => {
// 			// set_loading_mark_as_shipped(true);
// 			((i) => {
// 				setTimeout(() => {
// 					console.log('Hello' + i);
// 					// setTimeout(() => {
// 					// 	set_email_template(ReactDOMServer.renderToStaticMarkup(jsx));
// 					// }, 1000);
// 					set_order(order);
// 					dispatch(update_order(order, true, 'isShipped', 'shippedAt'));
// 					send_order_email(
// 						order.shipping.email,
// 						order.shipping.first_name,
// 						email.h1,
// 						ReactDOMServer.renderToStaticMarkup(jsx)
// 					);
// 					num++;
// 				}, 5000 * i);
// 			})(i);
// 			// set_loading_mark_as_shipped(false);
// 		});
// 		setTimeout(() => {
// 			set_success(true);
// 			history.push(`/secure/glow/orders`);
// 		}, 5000 * orders.length - 1);
// 	};

// 	// useEffect(
// 	// 	() => {
// 	// 		history.push(`/secure/glow/orders`);
// 	// 		return () => {};
// 	// 	},
// 	// 	[ success ]
// 	// );

// 	useEffect(() => {
// 		mark_as_shipped();
// 		return () => {};
// 	}, []);

// 	return (
// 		<div>
// 			<Loading loading={loading} />
// 			<Loading loading={loading_mark_as_shipped} />
// 			{userInfo &&
// 			userInfo.isAdmin && (
// 				<div className="jc-b mb-1rem">
// 					<Link to="/secure/glow/emails">
// 						<button className="btn primary">Back to Emails</button>
// 					</Link>
// 					<Link to="/secure/glow/orders">
// 						<button className="btn primary">Back to Orders</button>
// 					</Link>
// 					{order && (
// 						<Link to={'/secure/account/order/' + order._id}>
// 							<button className="btn primary">Back to Order</button>
// 						</Link>
// 					)}
// 					{/* <div>
// 						<label htmlFor="message_to_user">Message to User</label>
// 						<input
// 							type="text"
// 							value={message_to_user}
// 							name="message_to_user"
// 							id="message_to_user"
// 							onChange={(e) => set_message_to_user(e.target.value)}
// 						/>
// 					</div> */}
// 					<button
// 						className="btn primary mb-1rem"
// 						onClick={() => send_order_email('lavacquek@icloud.com', 'Kurt', email.h1)}
// 					>
// 						Send Test Email
// 					</button>
// 					<button
// 						className="btn primary mb-1rem"
// 						onClick={() => send_order_email(order.shipping.email, order.shipping.first_name, email.h1)}
// 					>
// 						Send Order Status Email
// 					</button>
// 					{/* <Loading loading={loading_email} /> */}
// 				</div>
// 			)}
// 			{jsx}
// 		</div>
// 	);
// };

// export default MarkAsShippedEmail;
