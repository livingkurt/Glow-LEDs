import React, { useEffect, useCallback, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';
import { format_date, toCapitalize } from '../../utils/helper_functions';
import { detailsOrderPublic } from '../../actions/orderActions';
import { determine_product_name, email_sale_price_switch } from '../../utils/react_helper_functions';
import { listPromos } from '../../actions/promoActions';
import { Loading } from '../UtilityComponents';
import { Survey } from '../SpecialtyComponents';

const OrderEmail = (props) => {
	const history = useHistory();
	const [ loading, set_loading ] = useState(false);
	const orderDetailsPublic = useSelector((state) => state.orderDetailsPublic);
	const { order } = orderDetailsPublic;
	console.log({ order });

	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;

	const dispatch = useDispatch();
	// const stableDispatch = useCallback(dispatch, []);

	useEffect(() => {
		dispatch(listEmails(toCapitalize(props.match.params.status)));
		dispatch(detailsOrderPublic(props.match.params.id));
		// dispatch(detailsOrderPublic(props.match.params.id));
		dispatch(listPromos());
		// stableDispatch(detailsOrder('5fa43d5f248dcacd5d8e2d3f'));
		return () => {};
	}, []);

	useEffect(
		() => {
			if (emails) {
				const active_email = emails.find((email) => email.active === true);
				if (active_email) {
					dispatch(detailsEmail(active_email._id));
				}
			}

			return () => {};
		},
		[ emails ]
	);

	const determin_card_logo = (card_type) => {
		switch (card_type) {
			case 'amex':
				return 'https://images2.imgbox.com/ea/c8/r82jUQW8_o.png';
			case 'visa':
				return 'https://images2.imgbox.com/18/a3/wHEnyn5x_o.png';
			case 'mastercard':
				return 'https://images2.imgbox.com/84/a2/oPcysx6p_o.png';
			case 'discover':
				return 'https://images2.imgbox.com/f3/4b/R1EL09Rw_o.png';
			default:
				return '';
		}
	};

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
			{order && (
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

																{/* <td
																		style={{
																			fontFamily: 'helvetica',
																			textTransform: 'uppercase',
																			fontSize: '14px',
																			color: 'white'
																		}}
																		align="right"
																	>
																		<span style={{ fontSize: '16px' }}>
																			Order {order && order._id}
																		</span>
																	</td> */}
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
																fontSize: '25px'
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
															{/* <p>{email && email.p}</p> */}
															<p
																style={{
																	color: 'white',
																	lineHeight: '150%',
																	fontSize: '16px',
																	margin: '0'
																}}
															>
																{order.isRefunded ? (
																	<h4 style={{ fontFamily: 'helvetica' }}>
																		Your Order has been refunded for{' '}
																		{order.payment.refund_reason[order.payment.refund_reason.length - 1]}{' '}
																		on {format_date(order.refundedAt)}
																	</h4>
																) : (
																	<p style={{ fontSize: '16px', lineHeight: 2 }}>
																		Hi {order.shipping.first_name},{' '}
																		{email && email.h2 && email.h2}
																	</p>
																)}
															</p>
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

															{/* <table>
																	<tr>
																		<td>
																			<table>
																				<tr>
																					<td>
																						<a href="https://www.glow-leds.com/">
																							Visit our store
																						</a>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table> */}
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
									borderSpacing: '0',
									padding: '10px'
									// borderCollapse: 'collapse'
								}}
							>
								<tr>
									<td
										style={{
											fontFamily: 'helvetica',
											padding: '40px 0'
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
															style={{
																fontFamily: 'helvetica'
															}}
														>
															<h4
																style={{
																	fontWeight: 'normal',
																	fontSize: '20px',
																	margin: '0 0 25px'
																}}
															>
																<strong>Order Summary</strong>
															</h4>
														</td>
													</tr>
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
																			<br />
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
													maxWidth: '560px',
													padding: '10px',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '0 auto',
													width: '100%'
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
																										<td
																											style={{
																												fontFamily:
																													'helvetica',
																												width:
																													'100%',
																												whiteSpace:
																													'nowrap'
																											}}
																										>
																											<p
																												style={{
																													color:
																														'white',
																													lineHeight:
																														'150%',
																													fontSize:
																														'16px',
																													fontWeight:
																														'600',
																													margin:
																														'0 0 0 15px'
																												}}
																												align="right"
																											>
																												{email_sale_price_switch(
																													item,
																													'white'
																												)}
																											</p>
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
														<table
															style={{
																width: '100%',

																borderSpacing: '0'

																// borderCollapse: 'collapse',
																// marginTop: '15px'
																// borderTopWidth: '1px',
																// borderTopColor: 'white',
																// borderTopStyle: 'solid'
															}}
														>
															<tbody>
																<tr>
																	<td
																		style={{
																			fontFamily: 'helvetica',
																			width: '40%'
																		}}
																	/>
																	<td
																		style={{
																			fontFamily: 'helvetica'
																		}}
																	>
																		<table
																			style={{
																				width: '100%',
																				borderSpacing: '0',
																				// borderCollapse: 'collapse',
																				marginTop: '20px'
																			}}
																		>
																			<tbody>
																				{order.promo_code && (
																					<tr>
																						<td
																							style={{
																								fontFamily: 'helvetica',
																								padding: '5px 0',
																								width: '100%'
																							}}
																						>
																							<p
																								style={{
																									color: 'white',
																									lineHeight: '1.2em',
																									fontSize: '16px',
																									margin: '0'
																								}}
																							>
																								<span
																									style={{
																										fontSize: '16px'
																									}}
																								>
																									Discount
																								</span>
																								<span
																									style={{
																										fontSize:
																											'16px',
																										marginLeft:
																											'5px'
																									}}
																								>
																									{/* <i
																										width="18"
																										height="18"
																										style={{
																											verticalAlign:
																												'middle',
																											marginRight:
																												'10px'
																										}}
																										class="fas fa-tag"
																									/> */}

																									<img
																										src="https://images2.imgbox.com/a1/63/ptqm33q2_o.png"
																										style={{
																											height:
																												'16px',

																											marginRight:
																												'10px'
																										}}
																										alt="tag_logo"
																									/>
																									<span
																										style={{
																											fontSize:
																												'14px',
																											lineHeight:
																												'1.1',
																											marginLeft:
																												'-4px'
																										}}
																									>
																										{order &&
																											order.promo_code &&
																											order.promo_code.toUpperCase()}
																									</span>
																								</span>
																							</p>
																						</td>
																						<td
																							style={{
																								fontFamily: 'helvetica',
																								padding: '5px 0',
																								textAlign: 'right'
																							}}
																							align="righ=t"
																						>
																							<strong
																								style={{
																									fontSize: '16px',
																									color: 'white'
																								}}
																							>
																								-${(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) - order.itemsPrice).toFixed(2)}
																							</strong>
																						</td>
																					</tr>
																				)}
																				<tr>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '5px 0'
																						}}
																					>
																						<p
																							style={{
																								color: 'white',
																								lineHeight: '1.2em',
																								fontSize: '16px',
																								margin: '0'
																							}}
																						>
																							<span
																								style={{
																									fontSize: '16px'
																								}}
																							>
																								Subtotal
																							</span>
																						</p>
																					</td>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '5px 0',
																							textAlign: 'right'
																						}}
																						align="righ=t"
																					>
																						<strong
																							style={{
																								fontSize: '16px',
																								color: 'white'
																							}}
																						>
																							${order.promo_code ? (
																								order.itemsPrice.toFixed(
																									2
																								)
																							) : (
																								(order.orderItems &&
																								order.orderItems.reduce(
																									(a, c) =>
																										a +
																										c.sale_price *
																											c.qty,
																									0
																								) === 0
																									? order.orderItems.reduce(
																											(a, c) =>
																												a +
																												c.price *
																													c.qty,
																											0
																										)
																									: order.orderItems.reduce(
																											(a, c) =>
																												a +
																												c.sale_price *
																													c.qty,
																											0
																										)).toFixed(2)
																							)}
																						</strong>
																					</td>
																				</tr>
																				<tr>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '5px 0'
																						}}
																					>
																						<p
																							style={{
																								color: 'white',
																								lineHeight: '1.2em',
																								fontSize: '16px',
																								margin: '0'
																							}}
																						>
																							<span
																								style={{
																									fontSize: '16px'
																								}}
																							>
																								Shipping
																							</span>
																						</p>
																					</td>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '5px 0',
																							textAlign: 'right'
																						}}
																						align="righ=t"
																					>
																						<strong
																							style={{
																								fontSize: '16px',
																								color: 'white'
																							}}
																						>
																							${order.shippingPrice && order.shippingPrice.toFixed(2)}
																						</strong>
																					</td>
																				</tr>
																				<tr>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '5px 0'
																						}}
																					>
																						<p
																							style={{
																								color: 'white',
																								lineHeight: '1.2em',
																								fontSize: '16px',
																								margin: '0'
																							}}
																						>
																							<span
																								style={{
																									fontSize: '16px'
																								}}
																							>
																								Taxes
																							</span>
																						</p>
																					</td>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '5px 0',
																							textAlign: 'right'
																						}}
																						align="righ=t"
																					>
																						<strong
																							style={{
																								fontSize: '16px',
																								color: 'white'
																							}}
																						>
																							${order.taxPrice && order.taxPrice.toFixed(2)}
																						</strong>
																					</td>
																				</tr>
																				{order.tip > 0 && (
																					<tr>
																						<td
																							style={{
																								fontFamily: 'helvetica',
																								padding: '5px 0'
																							}}
																						>
																							<p
																								style={{
																									color: 'white',
																									lineHeight: '1.2em',
																									fontSize: '16px',
																									margin: '0'
																								}}
																							>
																								<span
																									style={{
																										fontSize: '16px'
																									}}
																								>
																									Tip
																								</span>
																							</p>
																						</td>
																						<td
																							style={{
																								fontFamily: 'helvetica',
																								padding: '5px 0',
																								textAlign: 'right'
																							}}
																							align="righ=t"
																						>
																							<strong
																								style={{
																									fontSize: '16px',
																									color: 'white'
																								}}
																							>
																								${order.tip && order.tip.toFixed(2)}
																							</strong>
																						</td>
																					</tr>
																				)}
																			</tbody>
																		</table>
																		<table
																			style={{
																				width: '100%',
																				borderSpacing: '0',
																				// borderCollapse: 'collapse',
																				marginTop: '20px',
																				borderTopWidth: '2px',
																				borderTopColor: 'white',
																				borderTopStyle: 'solid'
																			}}
																		>
																			<tbody>
																				<tr>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '20px 0 0'
																						}}
																					>
																						<p
																							style={{
																								color: 'white',
																								lineHeight: '1.2em',
																								fontSize: '16px',
																								margin: '0'
																							}}
																						>
																							<span
																								style={{
																									fontSize: '16px'
																								}}
																							>
																								Total
																							</span>
																						</p>
																					</td>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							padding: '20px 0 0'
																						}}
																						align="right"
																					>
																						<strong
																							style={{
																								fontSize: '24px',
																								color: 'white'
																							}}
																						>
																							${order.totalPrice && order.totalPrice.toFixed(2)}
																						</strong>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		{order.promo_code && (
																			<p
																				style={{
																					color: 'white',
																					lineHeight: '1.1',
																					fontSize: '16px',
																					margin: '10px 0 0'
																				}}
																				align="right"
																			>
																				You saved{' '}
																				<span
																					style={{
																						fontSize: '16px',
																						color: 'white'
																					}}
																				>
																					${(order.orderItems.reduce(
																						(a, c) => a + c.price * c.qty,
																						0
																					) - order.itemsPrice).toFixed(2)}
																				</span>
																			</p>
																		)}
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</table>
										</center>
									</td>
								</tr>
							</table>
							{order.order_note && (
								<table
									style={{
										maxWidth: '560px',
										textAlign: 'left',
										borderSpacing: '0',
										// borderCollapse: 'collapse',
										margin: '0 auto',
										paddingBottom: '10px',
										borderBottom: '1px white solid',
										width: '100%'
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
														fontSize: '16px',
														margin: '0'
													}}
												>
													<strong>Order Note:</strong> {order.order_note}
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							)}

							<table
								style={{
									width: '100%',
									padding: '10px',
									borderSpacing: '0'
									// borderCollapse: 'collapse'
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												fontFamily: 'helvetica',
												padding: '40px 0 0'
											}}
										>
											<center>
												<table
													style={{
														maxWidth: '560px',
														width: '100%',
														textAlign: 'left',
														borderSpacing: '0',
														// padding: '10px',
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
																<h4
																	style={{
																		fontWeight: 'normal',
																		fontSize: '20px',
																		margin: '0 0 25px'
																	}}
																>
																	<strong>Customer Information</strong>
																</h4>
															</td>
														</tr>
													</tbody>
												</table>
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
																<table
																	style={{
																		width: '100%',
																		borderSpacing: '0'
																		// borderCollapse: 'collapse'
																	}}
																>
																	<tbody>
																		<tr>
																			<td
																				style={{
																					fontFamily: 'helvetica',
																					paddingBottom: '40px',
																					width: '50%'
																				}}
																			>
																				<h4
																					style={{
																						fontWeight: '500',
																						fontSize: '16px',
																						color: 'white',
																						margin: '0 0 5px'
																					}}
																				>
																					<strong>Shipping Address</strong>
																				</h4>
																				<p
																					style={{
																						color: 'white',
																						lineHeight: '150%',
																						fontSize: '16px',
																						margin: '0'
																					}}
																				>
																					{order.shipping.first_name}{' '}
																					{order.shipping.last_name}
																					<br />
																					{order.shipping.address_1}{' '}
																					{order.shipping.address_2}
																					<br />
																					{order.shipping.city},{' '}
																					{order.shipping.state}{' '}
																					{order.shipping.postalCode}
																					<br />
																					{order.shipping.country}
																					<br />
																					{order.shipping.email}
																				</p>
																			</td>

																			{/* <td
																				style={{
																					fontFamily: 'helvetica',
																					paddingBottom: '40px',
																					width: '50%'
																				}}
																			>
																				<h4
																					style={{
																						fontWeight: '500',
																						fontSize: '16px',
																						color: 'white',
																						margin: '0 0 5px'
																					}}
																				>
																					<strong>Billing Address</strong>
																				</h4>
																				<p
																					style={{
																						color: 'white',
																						lineHeight: '150%',
																						fontSize: '16px',
																						margin: '0'
																					}}
																				>
																					{order.shipping.first_name}{' '}
																					{order.shipping.last_name}
																					<br />
																					{order.shipping.address_1}{' '}
																					{order.shipping.address_2}
																					<br />
																					{order.shipping.city},{' '}
																					{order.shipping.state}{' '}
																					{order.shipping.postalCode}
																					<br />
																					{order.shipping.country}
																				</p>
																			</td> */}
																		</tr>
																	</tbody>
																</table>
																<table
																	style={{
																		width: '100%',
																		borderSpacing: '0'
																		// borderCollapse: 'collapse'
																	}}
																>
																	<tbody>
																		<tr>
																			<td
																				style={{
																					fontFamily: 'helvetica',
																					paddingBottom: '40px',
																					width: '50%'
																				}}
																			>
																				<h4
																					style={{
																						fontWeight: '500',
																						fontSize: '16px',
																						color: 'white',
																						margin: '0 0 5px'
																					}}
																				>
																					<strong>Shipping Method</strong>
																				</h4>
																				<p
																					style={{
																						color: 'white',
																						lineHeight: '150%',
																						fontSize: '16px',
																						margin: '0'
																					}}
																				>
																					{order.shipping &&
																						order.shipping.shipping_rate &&
																						order.shipping.shipping_rate
																							.service}
																				</p>
																			</td>

																			<td
																				style={{
																					fontFamily: 'helvetica',
																					paddingBottom: '40px',
																					width: '50%'
																				}}
																			>
																				<h4
																					style={{
																						fontWeight: '500',
																						fontSize: '16px',
																						color: 'white',
																						margin: '0 0 5px',
																						textAlign: 'right'
																					}}
																				>
																					<strong>Payment Method</strong>
																				</h4>

																				<p
																					style={{
																						color: 'white',
																						lineHeight: '150%',
																						fontSize: '16px',
																						margin: '0',
																						textAlign: 'right'
																					}}
																				>
																					{order.payment.payment ? (
																						<img
																							src={determin_card_logo(
																								order.payment.payment
																									.card.brand
																							)}
																							style={{
																								height: '24px',
																								display: 'inline-block',
																								marginRight: '10px',
																								marginTop: '5px',
																								marginBottom: '-6px'
																							}}
																							alt="card_logo"
																						/>
																					) : (
																						''
																					)}{' '}
																					<span style={{ fontSize: '16px' }}>
																						ending with{' '}
																						{order.payment.payment ? order.payment.payment.card.last4 : ''}{' '}
																						<strong
																							style={{
																								fontSize: '16px',
																								color: 'white'
																							}}
																						>
																							${order.totalPrice && order.totalPrice.toFixed(2)}
																						</strong>
																					</span>
																				</p>
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
								</tbody>
							</table>
							<table
								style={{
									maxWidth: '560px',
									textAlign: 'center',
									borderSpacing: '0px',
									margin: '10px auto',
									width: '100%',
									borderTop: '1px white solid'
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
													maxWidth: '400px',
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

	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById('myBtn');

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName('close')[0];

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_order_email = async (email, first_name, subject, refunded) => {
		set_loading(true);
		console.log({ email_template });
		const response_1 = await API_Emails.send_user_email(email_template, subject, email);
		const response_2 = await API_Emails.send_admin_email(
			email_template,
			refunded ? 'Order Refunded for ' + first_name : 'New Order Created by ' + first_name
		);
		console.log({ response_1 });
		console.log({ response_2 });
		if (response_1 && response_2) {
			// history.push('/pages/survey/' + order._id);
			// modal.style.display = 'block';
			show_hide_survey();
			set_show_modal(true);
			set_loading(false);
		}
	};

	// useEffect(
	// 	() => {
	// 		if (props.match.params.send === 'true' && order) {
	// 			console.log({ 'props.match.params.send === true && order': order });
	// 			if (order.orderItems.length > 0) {
	// 				console.log({ 'order.orderItems.length > 0': order });
	// 				send_order_email(order.shipping.email, order.shipping.first_name, 'Your Glow LEDS Order');
	// 			}
	// 		}

	// 		return () => {};
	// 	},
	// 	[ order ]
	// );
	const [ num, set_num ] = useState(0);
	const [ show_modal, set_show_modal ] = useState(false);

	useEffect(
		() => {
			if (num === 0) {
				if (order) {
					if (email) {
						if (props.match.params.send === 'true') {
							if (order.orderItems.length > 0) {
								if (props.match.params.id) {
									send_order_email(
										order.shipping.email,
										order.shipping.first_name,
										'Your Glow LEDS Order'
									);
									set_num(1);
								}
							}
						}
					}
				}
			}

			return () => {};
		},
		[ email ]
	);

	// const send_order_email = async (email, first_name, subject, refunded) => {
	// 	// if (num === 1) {
	// 	set_loading(true);
	// 	console.log({ email_template });
	// 	const response_1 = await API_Emails.send_user_email(email_template, subject, email);
	// 	const response_2 = await API_Emails.send_admin_email(
	// 		email_template,
	// 		refunded ? 'Order Refunded for ' + first_name : 'New Order Created by ' + first_name
	// 	);
	// 	console.log({ response_1 });
	// 	console.log({ response_2 });
	// 	if (response_1 && response_2) {
	// 		history.push('/pages/survey/' + order._id);
	// 		set_loading(false);
	// 	}
	// 	// }
	// };

	// useEffect(() => {
	// 	// if (num === 1) {
	// 	if (props.match.params.send === 'true' && order) {
	// 		console.log({ 'props.match.params.send === true && order': order });
	// 		if (order.orderItems.length > 0) {
	// 			console.log({ 'order.orderItems.length > 0': order });
	// 			send_order_email(order.shipping.email, order.shipping.first_name, 'Your Glow LEDS Order');
	// 			// num++;
	// 		}
	// 	}
	// 	// }

	// 	return () => {};
	// }, []);

	// // When the user clicks on the button, open the modal
	// btn.onclick = function() {
	// 	modal.style.display = 'block';
	// };

	// // When the user clicks on <span> (x), close the modal
	// span.onclick = function() {
	// 	modal.style.display = 'none';
	// };

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	};

	const show_hide_survey = () => {
		set_show_modal((show) => (show ? false : true));
		// console.log({ modal: modal.style.display });
		// if (modal.style.display === 'block') {
		// 	modal.style.display = 'none';
		//   set_show_modal(true)
		// } else if (modal.style.display === '' || modal.style.display === 'none') {
		// 	modal.style.display = 'block';
		// }
	};

	return (
		<div>
			<Loading loading={loading} />
			{userInfo ? (
				<div className="jc-c m-auto wrap">
					<Link to={'/secure/account/order/' + props.match.params.id}>
						<button className="btn primary mh-10px">View Order</button>
					</Link>
					<Link to="/secure/account/orders">
						<button className="btn primary mh-10px">Your Orders</button>
					</Link>
					<Link to="/collections/all/products">
						<button className="btn primary mh-10px">Products</button>
					</Link>
				</div>
			) : (
				<div className="w-1000px jc-c m-auto">
					<Link to={'/checkout/order/' + props.match.params.id}>
						<button className="btn primary">View Order</button>
					</Link>
					<Link to="/collections/all/products">
						<button className="btn primary mh-10px">Products</button>
					</Link>
					<Link to="/pages/featured">
						<button className="btn primary mh-10px">Featured Videos</button>
					</Link>
					<Link to="/pages/music">
						<button className="btn primary mh-10px">NTRE Music</button>
					</Link>
					{/* <Link to="/account/register">
						<button className="btn primary mh-10px">Create Account</button>
					</Link> */}
				</div>
			)}
			<div className="jc-c">
				<p className="max-w-600px mv-2rem">
					{' '}
					Make sure to check your spam folder for the confirmation email. If you do not recieve a confirmation
					email please contact support.
				</p>
			</div>
			{userInfo &&
			userInfo.isAdmin && (
				<div className="jc-b mb-1rem">
					<Link to="/secure/glow/emails">
						<button className="btn primary mh-10px">Back to Emails</button>
					</Link>
					<Link to="/secure/glow/orders">
						<button className="btn primary mh-10px">Back to Orders</button>
					</Link>

					<button
						className="btn primary mb-1rem"
						onClick={() =>
							send_order_email('lavacquek@icloud.com', 'Kurt', 'Your Glow LEDS Order', order.isRefunded)}
					>
						Send Test Email
					</button>
					{/* <button id="myBtn">Open Modal</button> */}
					<button className="btn primary mh-10px" id="myBtn" onClick={() => show_hide_survey()}>
						Open Modal
					</button>

					<div id="myModal" style={{ display: show_modal ? 'block' : 'none' }} className="modal">
						<div class="modal-content">
							<span className="close" onClick={() => show_hide_survey()}>
								&times;
							</span>
							<Survey order_id={props.match.params.id} show_hide_survey={show_hide_survey} />
						</div>
					</div>
					<button
						className="btn primary mb-1rem"
						onClick={() =>
							send_order_email(
								order.shipping.email,
								order.shipping.first_name,
								'Your Glow LEDS Order',
								order.isRefunded
							)}
					>
						Send Order Email
					</button>
					{/* <button className="btn primary mb-1rem" onClick={() => send_order_email()}>
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
