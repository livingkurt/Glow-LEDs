import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { detailsAffiliate } from '../../actions/affiliateActions';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';
import { toCapitalize } from '../../utils/helper_functions';

const AffiliateEmail = (props) => {
	const history = useHistory();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ test, set_test ] = useState(true);
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const affiliateDetails = useSelector((state) => state.affiliateDetails);
	const { affiliate } = affiliateDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(detailsAffiliate(props.match.params.pathname));
				dispatch(listEmails({ email_type: 'Affiliate' }));
			}
			return () => (clean = false);
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				const active_email = emails.find((email) => email.active === true);
				if (active_email) {
					dispatch(detailsEmail(active_email._id));
				}
			}
			return () => (clean = false);
		},
		[ emails, dispatch ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

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
			{email && (
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
									padding: '20px',
									height: '100%'
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
													maxWidth: '800px',
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
																		color: 'white',
																		padding: '10px'
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
													maxWidth: '800px',
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
							<table width="100%" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
								<tr>
									<td>
										<img
											src={email && email.images && email.images[0]}
											alt="Glow LEDs"
											title="Email Image"
											style={{
												textAlign: 'center',
												width: '100%',
												borderRadius: '20px'
											}}
										/>
									</td>
								</tr>
								<tr>
									<table
										style={{
											borderSpacing: '0',
											// borderCollapse: 'collapse',
											// marginTop: '19px'
											margin: 'auto'
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
													<h4
														style={{
															textAlign: 'center',
															fontFamily: 'helvetica',
															color: 'white',
															fontSize: '20px',
															marginTop: '20px',
															marginBottom: '0'
														}}
													>
														{email && email.h2}
													</h4>
												</td>
											</tr>
										</tbody>
									</table>
									<table
										style={{
											borderSpacing: '0',
											// borderCollapse: 'collapse',
											// marginTop: '19px',
											// margin: 'auto'
											width: '100%',
											padding: '10px'
										}}
									>
										<tbody>
											<tr style={{ fontSize: '16px' }}>
												<td>
													<p
														style={{
															fontSize: '16px',
															lineHeight: '30px',
															maxWidth: '800px',
															textAlign: 'center',
															width: '100%',
															// margin: '20px auto',
															color: 'white',
															margin: 'auto'
														}}
													>
														{email.p}
													</p>
												</td>
											</tr>
										</tbody>
									</table>
									<table
										style={{
											maxWidth: '800px',
											width: '100%',
											textAlign: 'left',
											borderSpacing: '0',
											// borderCollapse: 'collapse',
											margin: '15px auto',
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
												<div
													style={{
														borderBottom: '1px white solid'
													}}
												/>
											</td>
										</tr>
									</table>
									{affiliate && (
										<table
											style={{
												borderSpacing: '0',
												// borderCollapse: 'collapse',

												// margin: 'auto'
												width: '100%',
												maxWidth: '800px',
												margin: 'auto',
												padding: '10px'
												// marginTop: '19px'
											}}
										>
											<tbody>
												<tr>
													<td style={{ fontSize: '20px', textAlign: 'center' }}>
														<h4>Artist Info</h4>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px', height: '30px' }}>
														Artist Name: {affiliate && affiliate.artist_name}
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px', height: '30px' }}>
														Email: {affiliate && affiliate.email}
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px', height: '30px' }}>
														Category:{' '}
														{affiliate &&
															affiliate.category &&
															toCapitalize(affiliate.category)}
													</td>
												</tr>
												{affiliate.instagram_handle && (
													<tr>
														<td
															style={{ fontSize: '16px', height: '30px' }}
														>{`Instagram: ${affiliate.instagram_handle}`}</td>
													</tr>
												)}
												{affiliate.facebook_name && (
													<tr>
														<td
															style={{ fontSize: '16px', height: '30px' }}
														>{`Facebook: ${affiliate.facebook_name}`}</td>
													</tr>
												)}
												{affiliate.tiktok && (
													<tr>
														<td
															style={{ fontSize: '16px', height: '30px' }}
														>{`Facebook: ${affiliate.tiktok}`}</td>
													</tr>
												)}
												{affiliate.bio && (
													<tr>
														<td
															style={{ fontSize: '16px', height: '30px' }}
														>{`Bio: ${affiliate.bio}`}</td>
													</tr>
												)}

												<tr>
													<td
														style={{
															fontFamily: 'helvetica',
															color: 'white'
														}}
													>
														<div
															style={{
																borderBottom: '1px white solid',
																marginBottom: '20px'
															}}
														/>
													</td>
												</tr>
												<tr>
													<td
														style={{
															fontSize: '20px',
															textAlign: 'center',
															marginTop: '10px'
														}}
													>
														<h4>Promo Codes</h4>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px', height: '30px' }}>
														{affiliate.public_code && (
															<div
															>{`Public Code: ${affiliate.public_code.promo_code.toUpperCase()}`}</div>
														)}
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px', height: '30px' }}>
														{affiliate.public_code && (
															<div
															>{`Auto Input Code Link: https://www.glow-leds.com/collections/all/products/code/${affiliate.public_code.promo_code.toUpperCase()}`}</div>
														)}
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px', height: '30px' }}>
														{' '}
														{affiliate.private_code && (
															<div
															>{`Private Code: ${affiliate.private_code.promo_code.toUpperCase()} - DO NOT SHARE PRIVATE CODE`}</div>
														)}
													</td>
												</tr>

												<tr>
													<td
														style={{
															fontFamily: 'helvetica',
															color: 'white'
														}}
													>
														<div
															style={{
																borderBottom: '1px white solid',
																marginBottom: '20px'
															}}
														/>
													</td>
												</tr>

												<tr>
													<td
														style={{
															fontSize: '20px',
															textAlign: 'center',
															marginTop: '10px'
														}}
													>
														<h4>Questions</h4>
													</td>
												</tr>

												<tr>
													<td style={{ fontSize: '16px' }}>
														<p>
															<strong>Question 1: </strong>
															<br />
															<br />
															How did you hear about Glow LEDs?
														</p>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px' }}>
														<strong>Answer 1:</strong>
														<br />
														<br />
														<div>
															{affiliate && affiliate.answers && affiliate.answers[0]}
														</div>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px' }}>
														<p>
															<strong>Question 2: </strong>
															<br />
															<br />
															What is your favorite Glow LEDs Product?
														</p>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px' }}>
														<strong>Answer 2:</strong>
														<br />
														<br />
														<div>
															{affiliate && affiliate.answers && affiliate.answers[1]}
														</div>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px' }}>
														<p>
															<strong>Question 3: </strong>
															<br />
															<br />
															Why do you want to be a Glow LEDs Affiliate?
														</p>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px' }}>
														<strong>Answer 3:</strong>
														<br />
														<br />
														<div>
															{affiliate && affiliate.answers && affiliate.answers[2]}
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									)}
									<table
										// style={{
										// 	width: '100%',
										// 	borderSpacing: '0',
										// 	margin: '0px auto'
										// 	// borderCollapse: 'collapse'
										// }}
										style={{
											// maxWidth: '400px',
											textAlign: 'center',
											borderSpacing: '0px',
											margin: '10px auto',
											width: '100%'
										}}
									>
										{affiliate &&
										affiliate.promoter && (
											<tbody>
												{/* <tr> */}
												{/* <td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
																	fontSize: '30px',
																	color: 'white'
																}}
															> */}
												<tr>
													<td>
														<div
															style={{
																display: 'flex',
																justifyContent: 'center'

																// marginBottom: '20px'
															}}
														>
															<a
																href={
																	'https://docs.google.com/document/d/1j3Bcv2__QGiTlVf--R-BNVpvGRN_RzWvuvMFCPodqS4/edit?usp=sharing'
																}
																style={{
																	backgroundColor: '#4c4f60',
																	color: 'white',
																	borderRadius: '10px',
																	border: 0,
																	padding: '15px',
																	margin: '20px',
																	// width: '100%',
																	width: '100%',
																	maxWidth: '600px',
																	textDecoration: 'none'
																}}
																target="_blank"
																rel="noopener noreferrer"
															>
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		margin: 0,
																		fontSize: '20px',
																		textAlign: 'center'
																		// width: '100%'
																	}}
																>
																	View Promoter Terms
																</h4>
															</a>
														</div>

														<div
															style={{
																display: 'flex',
																justifyContent: 'center'
																// justifyContent: 'center'
															}}
														>
															<a
																href={
																	'https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit'
																}
																target="_blank"
																rel="noopener noreferrer"
																style={{
																	backgroundColor: '#4c4f60',
																	color: 'white',
																	borderRadius: '10px',
																	border: 0,
																	padding: '15px',
																	margin: '20px',
																	width: '100%',
																	maxWidth: '600px',
																	textDecoration: 'none'
																	// width: '100%'
																}}
															>
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		margin: 0,
																		fontSize: '20px',
																		textAlign: 'center'
																		// width: '100%'
																	}}
																>
																	View Affiliate Learnings
																</h4>
															</a>
														</div>
													</td>
												</tr>
												{/* </td> */}
												{/* </tr> */}
											</tbody>
										)}
									</table>

									{email.link &&
									email.button && (
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												margin: '10px 0'
											}}
										>
											<a
												href={email.link}
												style={{
													backgroundColor: '#4c4f60',
													color: 'white',
													borderRadius: '10px',
													border: 0,
													padding: '15px',
													textDecoration: 'none'
												}}
											>
												<h4
													style={{
														fontFamily: 'helvetica',
														margin: 0,
														fontSize: '20px',
														textAlign: 'center'
													}}
												>
													{email.button}
												</h4>
											</a>
										</div>
									)}
								</tr>
							</table>

							<table
								style={{
									width: '100%',
									borderSpacing: '0',
									// borderCollapse: 'collapse',
									// borderTopWidth: '1px',
									// borderTopColor: 'white',
									// borderTopStyle: 'solid',
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
														maxWidth: '800px',
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

	// const send_announcement_email = async (chunk) => {
	// 	const data = await API_Emails.send_announcement_email(email_template, email.h1, test, chunk);
	// 	console.log('Announcement Email Sent Successfully');
	// 	console.log(data);
	// };
	const send_affiliate_email = async (email, first_name, subject) => {
		console.log({ email_template });
		const { data: user_email } = await API_Emails.send_email(email_template, subject, email);
		const { data: admin_email } = await API_Emails.send_email(
			email_template,
			'New Affiliate Created by ' + first_name
		);
		console.log({ user_email });
		console.log({ admin_email });
	};

	const save_html = async () => {
		const data = await API_Emails.save_html(email_template, email, userInfo.access_token);
		console.log(data);
		console.log('Success');
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (props.match.params.send === 'true' && affiliate) {
					console.log({ 'props.match.params.send === true && affiliate': affiliate });
					// if (order.orderItems.length > 0) {
					// 	console.log({ 'order.orderItems.length > 0': order });
					if (affiliate && affiliate.artist_name && email_template.length > 1000) {
						// setTimeout(() => {
						send_affiliate_email(
							affiliate && affiliate.user && affiliate.user.email,
							affiliate.artist_name,
							'Your Glow LEDs Affiliate Application'
						);
						// }, 3000);
					}

					// }
				}
			}
			return () => (clean = false);
		},
		[ affiliate ]
	);

	console.log({ email_template });
	return (
		<div className="">
			<div className="jc-b mb-1rem ai-c">
				<button className="btn primary" onClick={() => history.goBack()}>
					Back to Emails
				</button>
				<button className="btn primary mb-1rem" onClick={() => save_html()}>
					Save HTML
				</button>
				{loading_checkboxes ? (
					<div>Loading...</div>
				) : (
					<div>
						<label htmlFor="test">Test</label>
						<input
							type="checkbox"
							name="test"
							defaultChecked={test}
							id="test"
							onChange={(e) => {
								set_test(e.target.checked);
							}}
						/>
					</div>
				)}
				<button
					className="btn primary mb-1rem"
					onClick={() =>
						send_affiliate_email(
							affiliate && affiliate.user && affiliate.user.email,
							affiliate.artist_name,
							'Your Glow LEDs Affiliate Application'
						)}
				>
					Send Email
				</button>
				{/* <button className="btn primary mb-1rem" onClick={() => send_announcement_email(1)}>
					Send 2/4
				</button>
				<button className="btn primary mb-1rem" onClick={() => send_announcement_email(2)}>
					Send 3/4
				</button>
				<button className="btn primary mb-1rem" onClick={() => send_announcement_email(3)}>
					Send 4/4
				</button> */}

				{email && (
					<Link to={'/secure/glow/editemail/' + email._id}>
						<button className="btn primary">Edit Email</button>
					</Link>
				)}
			</div>
			{jsx}
		</div>
	);
};

export default AffiliateEmail;
