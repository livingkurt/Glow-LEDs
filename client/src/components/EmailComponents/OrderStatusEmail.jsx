import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';
import { toCapitlize } from '../../utils/helper_functions';
import { detailsOrder } from '../../actions/orderActions';

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

	const determin_card_logo = (card_type) => {
		switch (card_type) {
			case 'American Express':
				return 'https://images2.imgbox.com/ea/c8/r82jUQW8_o.png';
			case 'Visa':
				return 'https://images2.imgbox.com/18/a3/wHEnyn5x_o.png';
			case 'MasterCard':
				return 'https://images2.imgbox.com/84/a2/oPcysx6p_o.png';
			case 'Discover':
				return 'https://images2.imgbox.com/f3/4b/R1EL09Rw_o.png';
		}
	};
	const sale_price_switch = (item) => {
		if (item.sale_price !== 0) {
			return (
				<label>
					<label style={{ marginRight: '3px' }}>On Sale!</label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }}>${item.price && (item.price * item.qty).toFixed(2)}</label>
					</del>{' '}
					{'-->'} ${item.sale_price && (item.sale_price * item.qty).toFixed(2)}
				</label>
			);
		} else if (item.countInStock === 0) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white', marginLeft: '7px' }}>
							${item.price && (item.price * item.qty).toFixed(2)}
						</label>
					</del>{' '}
					{'-->'} <label style={{ color: 'black', marginLeft: '7px' }}>Sold Out</label>
				</label>
			);
		} else {
			return <label>${item.price && (item.price * item.qty).toFixed(2)}</label>;
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
						{email && email.h1}
					</h4>
				</div>
				{order &&
				email && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column'
						}}
					>
						<div
							style={{
								margin: 'auto',
								maxWidth: '600px',
								width: '100%'
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
								<p>{email.p ? email.p : email.h2}</p>
								<p style={{ textAlign: 'right', margin: '1rem 0' }}>
									<strong>Order #:</strong> {order._id}
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
									<div style={{ marginLeft: '20px', width: '20px' }}>or</div>

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
								{order.tracking_number && (
									<p style={{ textAlign: 'right', marginTop: '1rem' }}>
										<strong>USPS Tracking Number: </strong>{' '}
										<a
											href={
												'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
												order.tracking_number
											}
											target="_blank"
											rel="noopener noreferrer"
											className="mv-2rem ml-1rem"
											style={{
												textDecoration: 'underline',
												color: 'white'
											}}
										>
											{order.tracking_number}
										</a>
									</p>
								)}

								<div style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px' }} />
								<table
									cellPadding={0}
									cellSpacing={0}
									style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
									width="100%"
									align="left"
								>
									<tbody>
										<h4
											style={{
												fontFamily: 'helvetica',
												width: '100%',
												margin: '0 auto',
												lineHeight: '50px',
												color: 'white',
												fontSize: '20px',
												marginTop: '1.5rem'
											}}
										>
											Items in Order
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
													<div style={{ display: 'flex', alignItems: 'center' }}>
														<table width="100%" style={{ maxWidth: '75px' }}>
															<tr>
																<td>
																	<img
																		src={item.display_image}
																		alt="Glow LEDs"
																		style={{
																			textAlign: 'center',
																			width: '100%',
																			borderRadius: '10px'
																		}}
																	/>
																</td>
															</tr>
														</table>
														<div style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
															{item.category === 'diffuser_caps' ||
															item.category === 'mega_diffuser_caps' ||
															item.category === 'frosted_diffusers' ? (
																`${item.diffuser_cap_color} - `
															) : (
																''
															)}
															{item.name}
															{item.secondary_product ? (
																`w (${item.secondary_product.name})`
															) : (
																''
															)}
															{' x ' + item.qty}
														</div>
													</div>
												</td>
											</tr>
										))}
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
							</div>
							<div style={{ marginBottom: '20px' }}>
								<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
									<strong>Tag us in your videos and pictures!</strong>
									<br />We want to feature you!
								</p>
								<a
									href="https://www.glow-leds.com/pages/contact/submit_content_to_be_featured"
									target="_blank"
									rel="noopener noreferrer"
								>
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
											src="https://images2.imgbox.com/9b/a0/XAC4qmRL_o.png"
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
											src="https://images2.imgbox.com/d2/77/vuk6FOeW_o.png"
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
											src="https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png"
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
											src="https://images2.imgbox.com/ed/d9/eyAcj7D2_o.png"
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

	const send_order_email = async (email, first_name, subject) => {
		console.log({ email_template });
		const { data } = await API_Emails.send_order_email(email_template, subject, email);
		const { data: request } = await API_Emails.send_order_created_email(
			email_template,
			'Order Status Updated for ' + first_name
		);
		console.log({ data });
		console.log({ request });
	};

	// useEffect(
	// 	() => {
	// 		if (order) {
	// 			if (order.orderItems.length > 0) {
	// 				if (props.match.params.id) {
	// 					send_order_email(order.shipping.email, order.shipping.first_name);
	// 				}
	// 			}
	// 		}

	// 		return () => {};
	// 	},
	// 	[ order ]
	// );

	return (
		<div>
			{userInfo &&
			userInfo.isAdmin && (
				<div className="jc-b mb-1rem">
					<Link to="/secure/glow/emails">
						<button className="button primary">Back to Emails</button>
					</Link>
					<Link to="/secure/glow/orders">
						<button className="button primary">Back to Orders</button>
					</Link>
					{order && (
						<Link to={'/secure/account/order/' + order._id}>
							<button className="button primary">Back to Order</button>
						</Link>
					)}

					<button
						className="button primary mb-1rem"
						onClick={() => send_order_email('lavacquek@icloud.com', 'Kurt', email.h1)}
					>
						Send Test Email
					</button>
					<button
						className="button primary mb-1rem"
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
