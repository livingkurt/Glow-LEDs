import React, { useEffect, useCallback, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';
import { format_date, toCapitlize } from '../../utils/helper_functions';
import { detailsOrder, detailsOrderPublic } from '../../actions/orderActions';
import { determine_product_name, email_sale_price_switch } from '../../utils/react_helper_functions';
import { listPromos } from '../../actions/promoActions';
import { Loading } from '../UtilityComponents';

const OrderStatusEmail = (props) => {
	const history = useHistory();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order } = orderDetails;

	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	const [ message_to_user, set_message_to_user ] = useState('');

	useEffect(
		() => {
			stableDispatch(listEmails(toCapitlize(props.match.params.status)));
			stableDispatch(detailsOrder(props.match.params.id));
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

	const order_status_steps = () => {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					maxWidth: '58rem',
					width: '100%',
					margin: '1rem auto'
				}}
			>
				<div
					style={
						order ? (
							{
								borderTop: '.3rem white solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						) : (
							{
								borderTop: '.3rem #c0c0c0 solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						)
					}
				>
					<div>Ordered</div>
					{/* <i class="fas fa-check-square" /> */}
				</div>
				<div
					style={
						order.isPaid ? (
							{
								borderTop: '.3rem white solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						) : (
							{
								borderTop: '.3rem #c0c0c0 solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						)
					}
				>
					<div>Paid </div>
					{/* <i class="fas fa-money-bill-wave" /> */}
				</div>
				<div
					style={
						order.isManufactured ? (
							{
								borderTop: '.3rem white solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						) : (
							{
								borderTop: '.3rem #c0c0c0 solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						)
					}
				>
					<div>Manufactured </div>
					{/* <i class="fas fa-hammer" /> */}
				</div>
				<div
					style={
						order.isPackaged ? (
							{
								borderTop: '.3rem white solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						) : (
							{
								borderTop: '.3rem #c0c0c0 solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						)
					}
				>
					<div>Packaged </div>
					{/* <i class="fas fa-box" /> */}
				</div>
				<div
					style={
						order.isShipped ? (
							{
								borderTop: '.3rem white solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						) : (
							{
								borderTop: '.3rem #c0c0c0 solid',
								color: '$font_color',
								flex: '1 1',
								paddingTop: '1rem',
								textAlign: 'center'
							}
						)
					}
				>
					<div>Shipped</div>
				</div>
			</div>
		);
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

															{order_status_steps(order)}

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
							{/* { assign gift_card_line_item = line_items | where: "gift_card" }
        { if gift_card_line_item.first }
        <table class="row section">
          <tr>
            <td class="section__cell">
              <center>
                <table >
                  <tr>
                    <td>
                      <h3>Gift card</h3>
                    </td>
                  </tr>
                </table>
                <table >
                  <tr>
                    <td>

                      <p> You’ll receive separate emails for any gift cards.</p>

                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
        { endif } */}
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
																						href={
																							'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
																							order.tracking_number
																						}
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
																													true
																												)}
																											</span>
																											<br />
																										</td>
																										{/* <td
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
																										</td> */}
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
														{/* <table
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
														</table> */}
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

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_order_email = async (email, first_name, subject) => {
		console.log({ email_template });
		const { data } = await API_Emails.send_user_email(email_template, subject, email);
		const { data: request } = await API_Emails.send_admin_email(
			email_template,
			'Order Status Updated for ' + first_name
		);
		console.log({ data });
		console.log({ request });
		if (request) {
			// history.goBack();
			history.push(`/secure/account/order/${order._id}`);
		}
	};

	useEffect(
		() => {
			if (props.match.params.send === 'true' && order && email) {
				if (order.orderItems.length > 0) {
					if (props.match.params.id) {
						send_order_email(order.shipping.email, order.shipping.first_name, email.h1);
					}
				}
			}

			return () => {};
		},
		[ order ]
	);

	// const send_order_email = async (email, first_name, subject) => {
	// 	console.log({ email_template });
	// 	const { data } = await API_Emails.send_user_email(email_template, subject, email);
	// 	const { data: request } = await API_Emails.send_admin_email(
	// 		email_template,
	// 		'Order Status Updated for ' + first_name
	// 	);
	// 	console.log({ data });
	// 	console.log({ request });
	// 	if (request) {
	// 		// history.goBack();
	// 		history.push(`/secure/account/order/${order._id}`);
	// 	}
	// };
	// // let num = 1;

	// useEffect(() => {
	// 	// if (num === 1) {
	// 	if (props.match.params.send === 'true' && order && email) {
	// 		if (order.orderItems.length > 0) {
	// 			if (props.match.params.id) {
	// 				send_order_email(order.shipping.email, order.shipping.first_name, email.h1);
	// 				// num++;
	// 			}
	// 		}
	// 	}
	// 	// }

	// 	return () => {};
	// }, []);

	return (
		<div>
			{userInfo &&
			userInfo.isAdmin && (
				<div className="jc-b mb-1rem">
					<Link to="/secure/glow/emails">
						<button className="btn primary">Back to Emails</button>
					</Link>
					<Link to="/secure/glow/orders">
						<button className="btn primary">Back to Orders</button>
					</Link>
					{order && (
						<Link to={'/secure/account/order/' + order._id}>
							<button className="btn primary">Back to Order</button>
						</Link>
					)}
					<div>
						<label htmlFor="message_to_user">Message to User</label>
						<input
							type="text"
							value={message_to_user}
							name="message_to_user"
							id="message_to_user"
							onChange={(e) => set_message_to_user(e.target.value)}
						/>
					</div>
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
