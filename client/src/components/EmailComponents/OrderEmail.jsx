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

	const jsx = (
		<div
			className="invoice-box"
			style={{
				display: 'flex',
				flexDirection: 'column',
				// maxWidth: '800px',
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
				/>
			</div>
			{order && (
				<div>
					<table
						cellPadding={0}
						cellSpacing={0}
						style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
						width="100%"
						align="left"
					>
						<tbody>
							<tr className="top">
								<td colSpan={2} style={{ verticalAlign: 'top' }} valign="top">
									<table
										style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
										width="100%"
										align="left"
									>
										<tbody>
											<tr>
												<td
													className="title"
													style={{ verticalAlign: 'top', lineHeight: '45px', color: '#333' }}
													valign="top"
												>
													<img
														src="https://images2.imgbox.com/cd/00/K5HGEKDJ_o.png"
														style={{ width: '100px', marginLeft: '-5px' }}
													/>
												</td>
												<td
													style={{ verticalAlign: 'top', textAlign: 'right' }}
													valign="top"
													align="right"
												>
													Invoice #: ${order._id}
													<br />
													{/* Created: ${format_date(order.createdAt)} */}
													<br />
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr className="information">
								<td colSpan={2} style={{ verticalAlign: 'top' }} valign="top">
									<table
										style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
										width="100%"
										align="left"
									>
										<tbody>
											<tr>
												<td style={{ verticalAlign: 'top' }} valign="top">
													Glow LEDs<br />
													404 Kenniston Dr<br />
													Austin, TX 78752<br />
													info.glowleds@gmail.com
												</td>
												<td
													style={{ verticalAlign: 'top', textAlign: 'right' }}
													valign="top"
													align="right"
												>
													${order.shipping.first_name} ${order.shipping.last_name}
													<br />
													${order.shipping.address}
													<br />
													${order.shipping.city}, ${order.shipping.state} ${order.shipping.postalCode}
													<br />
													${order.shipping.email}
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr className="heading">
								<td
									style={{
										padding: '5px',
										verticalAlign: 'top',
										background: '#eee',
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
										background: '#eee',
										borderBottom: '1px solid #ddd',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									Last 4
								</td>
							</tr>
							<tr className="details">
								<td
									style={{ padding: '5px', verticalAlign: 'top', borderBottom: '1px solid #eee' }}
									valign="top"
								>
									${order.payment.charge ? order.payment.charge.source.brand : ''}
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
									${order.payment.charge ? order.payment.charge.source.last4 : ''}
								</td>
							</tr>
							<tr className="heading">
								<td
									style={{
										padding: '5px',
										verticalAlign: 'top',
										background: '#eee',
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
										background: '#eee',
										borderBottom: '1px solid #ddd',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									Price
								</td>
							</tr>
							{order.orderItems.map((item) => (
								<tr className="item">
									<td
										style={{ padding: '5px', verticalAlign: 'top', borderBottom: '1px solid #eee' }}
										valign="top"
									>
										{item.qty}x - ${item.category === 'diffuser_caps' ||
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
											borderBottom: '1px solid #eee'
										}}
										valign="top"
										align="right"
									>
										{/* ${item.price.toFixed(2)} */}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="total" style={{ width: '100%' }}>
						<div style={{ verticalAlign: 'top' }} valign="top" />
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-end',
								paddingRight: '9px'
							}}
						>
							<div
								style={{ padding: '5px', verticalAlign: 'top', textAlign: 'right', width: '100%' }}
								valign="top"
								align="right"
							>
								{/* Tax: ${order.taxPrice.toFixed(2)} */}
							</div>
							<div
								style={{ padding: '5px', verticalAlign: 'top', textAlign: 'right', width: '100%' }}
								valign="top"
								align="right"
							>
								{/* Shipping: ${order.shippingPrice.toFixed(2)} */}
							</div>
							<div
								style={{
									verticalAlign: 'top',
									width: '25%',
									marginLeft: 'auto',
									borderTop: '1px solid #eee'
								}}
								valign="top"
							/>
							<div
								style={{
									padding: '5px',
									verticalAlign: 'top',
									textAlign: 'right',
									width: '100%',
									fontWeight: 'bold'
								}}
								valign="top"
								align="right"
							>
								{/* Total: ${order.totalPrice.toFixed(2)} */}
							</div>
						</div>
					</div>
					<div>
						<div style={{ textAlign: 'center' }}>
							<strong>Tag us in your videos and pictures!</strong>
						</div>
						<div style={{ textAlign: 'center' }}>We want to feature you!</div>
						<div style={{ textAlign: 'center' }}>
							We are figuring this out as we go so any feedback is welcome.
						</div>
						<div style={{ textAlign: 'center' }}>We appreciate you more than you know.</div>
						<div style={{ textAlign: 'center' }}>
							<strong>Questions or concerns?:</strong> info.glowleds@gmail.com
						</div>
					</div>
					<div style={{ backgroundColor: '#333333', padding: '20px' }}>
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
